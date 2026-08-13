# EleringDashboard SDK

from eleringdashboard_sdk.utility.voxgig_struct import voxgig_struct as vs
from eleringdashboard_sdk.core.utility_type import EleringDashboardUtility
from eleringdashboard_sdk.core.spec import EleringDashboardSpec
from eleringdashboard_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from eleringdashboard_sdk.utility import register

# Load features
from eleringdashboard_sdk.feature.base_feature import EleringDashboardBaseFeature
from eleringdashboard_sdk.features import _make_feature


class EleringDashboardSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = EleringDashboardUtility()
        self._utility = utility

        from eleringdashboard_sdk.config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return EleringDashboardUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = EleringDashboardSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "EleringDashboardSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("EleringDashboardSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Balance(self, data=None) -> "BalanceEntity":
        """Entity factory: client.Balance().list() / client.Balance().load({"id": ...})."""
        from eleringdashboard_sdk.entity.balance_entity import BalanceEntity
        return BalanceEntity(self, data)


    def BalanceController(self, data=None) -> "BalanceControllerEntity":
        """Entity factory: client.BalanceController().list() / client.BalanceController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.balance_controller_entity import BalanceControllerEntity
        return BalanceControllerEntity(self, data)


    def Firm(self, data=None) -> "FirmEntity":
        """Entity factory: client.Firm().list() / client.Firm().load({"id": ...})."""
        from eleringdashboard_sdk.entity.firm_entity import FirmEntity
        return FirmEntity(self, data)


    def FirmCapacityController(self, data=None) -> "FirmCapacityControllerEntity":
        """Entity factory: client.FirmCapacityController().list() / client.FirmCapacityController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.firm_capacity_controller_entity import FirmCapacityControllerEntity
        return FirmCapacityControllerEntity(self, data)


    def GasBalanceController(self, data=None) -> "GasBalanceControllerEntity":
        """Entity factory: client.GasBalanceController().list() / client.GasBalanceController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.gas_balance_controller_entity import GasBalanceControllerEntity
        return GasBalanceControllerEntity(self, data)


    def GasBorderTradeController(self, data=None) -> "GasBorderTradeControllerEntity":
        """Entity factory: client.GasBorderTradeController().list() / client.GasBorderTradeController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.gas_border_trade_controller_entity import GasBorderTradeControllerEntity
        return GasBorderTradeControllerEntity(self, data)


    def GasSystem(self, data=None) -> "GasSystemEntity":
        """Entity factory: client.GasSystem().list() / client.GasSystem().load({"id": ...})."""
        from eleringdashboard_sdk.entity.gas_system_entity import GasSystemEntity
        return GasSystemEntity(self, data)


    def GasSystemController(self, data=None) -> "GasSystemControllerEntity":
        """Entity factory: client.GasSystemController().list() / client.GasSystemController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.gas_system_controller_entity import GasSystemControllerEntity
        return GasSystemControllerEntity(self, data)


    def GasTrade(self, data=None) -> "GasTradeEntity":
        """Entity factory: client.GasTrade().list() / client.GasTrade().load({"id": ...})."""
        from eleringdashboard_sdk.entity.gas_trade_entity import GasTradeEntity
        return GasTradeEntity(self, data)


    def GasTradeController(self, data=None) -> "GasTradeControllerEntity":
        """Entity factory: client.GasTradeController().list() / client.GasTradeController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.gas_trade_controller_entity import GasTradeControllerEntity
        return GasTradeControllerEntity(self, data)


    def GasTransmissionController(self, data=None) -> "GasTransmissionControllerEntity":
        """Entity factory: client.GasTransmissionController().list() / client.GasTransmissionController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.gas_transmission_controller_entity import GasTransmissionControllerEntity
        return GasTransmissionControllerEntity(self, data)


    def GreenController(self, data=None) -> "GreenControllerEntity":
        """Entity factory: client.GreenController().list() / client.GreenController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.green_controller_entity import GreenControllerEntity
        return GreenControllerEntity(self, data)


    def Interruptible(self, data=None) -> "InterruptibleEntity":
        """Entity factory: client.Interruptible().list() / client.Interruptible().load({"id": ...})."""
        from eleringdashboard_sdk.entity.interruptible_entity import InterruptibleEntity
        return InterruptibleEntity(self, data)


    def InterruptibleCapacityController(self, data=None) -> "InterruptibleCapacityControllerEntity":
        """Entity factory: client.InterruptibleCapacityController().list() / client.InterruptibleCapacityController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.interruptible_capacity_controller_entity import InterruptibleCapacityControllerEntity
        return InterruptibleCapacityControllerEntity(self, data)


    def Nomination(self, data=None) -> "NominationEntity":
        """Entity factory: client.Nomination().list() / client.Nomination().load({"id": ...})."""
        from eleringdashboard_sdk.entity.nomination_entity import NominationEntity
        return NominationEntity(self, data)


    def NominationsController(self, data=None) -> "NominationsControllerEntity":
        """Entity factory: client.NominationsController().list() / client.NominationsController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.nominations_controller_entity import NominationsControllerEntity
        return NominationsControllerEntity(self, data)


    def NpsController(self, data=None) -> "NpsControllerEntity":
        """Entity factory: client.NpsController().list() / client.NpsController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.nps_controller_entity import NpsControllerEntity
        return NpsControllerEntity(self, data)


    def Renomination(self, data=None) -> "RenominationEntity":
        """Entity factory: client.Renomination().list() / client.Renomination().load({"id": ...})."""
        from eleringdashboard_sdk.entity.renomination_entity import RenominationEntity
        return RenominationEntity(self, data)


    def RenominationsController(self, data=None) -> "RenominationsControllerEntity":
        """Entity factory: client.RenominationsController().list() / client.RenominationsController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.renominations_controller_entity import RenominationsControllerEntity
        return RenominationsControllerEntity(self, data)


    def System(self, data=None) -> "SystemEntity":
        """Entity factory: client.System().list() / client.System().load({"id": ...})."""
        from eleringdashboard_sdk.entity.system_entity import SystemEntity
        return SystemEntity(self, data)


    def SystemController(self, data=None) -> "SystemControllerEntity":
        """Entity factory: client.SystemController().list() / client.SystemController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.system_controller_entity import SystemControllerEntity
        return SystemControllerEntity(self, data)


    def TransmissionController(self, data=None) -> "TransmissionControllerEntity":
        """Entity factory: client.TransmissionController().list() / client.TransmissionController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.transmission_controller_entity import TransmissionControllerEntity
        return TransmissionControllerEntity(self, data)


    def UmmGasController(self, data=None) -> "UmmGasControllerEntity":
        """Entity factory: client.UmmGasController().list() / client.UmmGasController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.umm_gas_controller_entity import UmmGasControllerEntity
        return UmmGasControllerEntity(self, data)


    def UmmRssFeedController(self, data=None) -> "UmmRssFeedControllerEntity":
        """Entity factory: client.UmmRssFeedController().list() / client.UmmRssFeedController().load({"id": ...})."""
        from eleringdashboard_sdk.entity.umm_rss_feed_controller_entity import UmmRssFeedControllerEntity
        return UmmRssFeedControllerEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "EleringDashboardSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from eleringdashboard_sdk.entity.balance_entity import BalanceEntity
    from eleringdashboard_sdk.entity.balance_controller_entity import BalanceControllerEntity
    from eleringdashboard_sdk.entity.firm_entity import FirmEntity
    from eleringdashboard_sdk.entity.firm_capacity_controller_entity import FirmCapacityControllerEntity
    from eleringdashboard_sdk.entity.gas_balance_controller_entity import GasBalanceControllerEntity
    from eleringdashboard_sdk.entity.gas_border_trade_controller_entity import GasBorderTradeControllerEntity
    from eleringdashboard_sdk.entity.gas_system_entity import GasSystemEntity
    from eleringdashboard_sdk.entity.gas_system_controller_entity import GasSystemControllerEntity
    from eleringdashboard_sdk.entity.gas_trade_entity import GasTradeEntity
    from eleringdashboard_sdk.entity.gas_trade_controller_entity import GasTradeControllerEntity
    from eleringdashboard_sdk.entity.gas_transmission_controller_entity import GasTransmissionControllerEntity
    from eleringdashboard_sdk.entity.green_controller_entity import GreenControllerEntity
    from eleringdashboard_sdk.entity.interruptible_entity import InterruptibleEntity
    from eleringdashboard_sdk.entity.interruptible_capacity_controller_entity import InterruptibleCapacityControllerEntity
    from eleringdashboard_sdk.entity.nomination_entity import NominationEntity
    from eleringdashboard_sdk.entity.nominations_controller_entity import NominationsControllerEntity
    from eleringdashboard_sdk.entity.nps_controller_entity import NpsControllerEntity
    from eleringdashboard_sdk.entity.renomination_entity import RenominationEntity
    from eleringdashboard_sdk.entity.renominations_controller_entity import RenominationsControllerEntity
    from eleringdashboard_sdk.entity.system_entity import SystemEntity
    from eleringdashboard_sdk.entity.system_controller_entity import SystemControllerEntity
    from eleringdashboard_sdk.entity.transmission_controller_entity import TransmissionControllerEntity
    from eleringdashboard_sdk.entity.umm_gas_controller_entity import UmmGasControllerEntity
    from eleringdashboard_sdk.entity.umm_rss_feed_controller_entity import UmmRssFeedControllerEntity
