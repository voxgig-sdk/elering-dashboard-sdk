# EleringDashboard SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import EleringDashboardUtility
from core.spec import EleringDashboardSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import EleringDashboardBaseFeature
from features import _make_feature


class EleringDashboardSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = EleringDashboardUtility()
        self._utility = utility

        from config import make_config
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

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
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
            return None, err

        return utility.make_fetch_def(ctx)

    def direct(self, fetchargs=None):
        utility = self._utility

        fetchdef, err = self.prepare(fetchargs)
        if err is not None:
            return {"ok": False, "err": err}, None

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
            return {"ok": False, "err": fetch_err}, None

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }, None

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
            }, None

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }, None


    def Balance(self, data=None):
        from entity.balance_entity import BalanceEntity
        return BalanceEntity(self, data)


    def BalanceController(self, data=None):
        from entity.balance_controller_entity import BalanceControllerEntity
        return BalanceControllerEntity(self, data)


    def Firm(self, data=None):
        from entity.firm_entity import FirmEntity
        return FirmEntity(self, data)


    def FirmCapacityController(self, data=None):
        from entity.firm_capacity_controller_entity import FirmCapacityControllerEntity
        return FirmCapacityControllerEntity(self, data)


    def GasBalanceController(self, data=None):
        from entity.gas_balance_controller_entity import GasBalanceControllerEntity
        return GasBalanceControllerEntity(self, data)


    def GasBorderTradeController(self, data=None):
        from entity.gas_border_trade_controller_entity import GasBorderTradeControllerEntity
        return GasBorderTradeControllerEntity(self, data)


    def GasSystem(self, data=None):
        from entity.gas_system_entity import GasSystemEntity
        return GasSystemEntity(self, data)


    def GasSystemController(self, data=None):
        from entity.gas_system_controller_entity import GasSystemControllerEntity
        return GasSystemControllerEntity(self, data)


    def GasTrade(self, data=None):
        from entity.gas_trade_entity import GasTradeEntity
        return GasTradeEntity(self, data)


    def GasTradeController(self, data=None):
        from entity.gas_trade_controller_entity import GasTradeControllerEntity
        return GasTradeControllerEntity(self, data)


    def GasTransmissionController(self, data=None):
        from entity.gas_transmission_controller_entity import GasTransmissionControllerEntity
        return GasTransmissionControllerEntity(self, data)


    def GreenController(self, data=None):
        from entity.green_controller_entity import GreenControllerEntity
        return GreenControllerEntity(self, data)


    def Interruptible(self, data=None):
        from entity.interruptible_entity import InterruptibleEntity
        return InterruptibleEntity(self, data)


    def InterruptibleCapacityController(self, data=None):
        from entity.interruptible_capacity_controller_entity import InterruptibleCapacityControllerEntity
        return InterruptibleCapacityControllerEntity(self, data)


    def Nomination(self, data=None):
        from entity.nomination_entity import NominationEntity
        return NominationEntity(self, data)


    def NominationsController(self, data=None):
        from entity.nominations_controller_entity import NominationsControllerEntity
        return NominationsControllerEntity(self, data)


    def NpsController(self, data=None):
        from entity.nps_controller_entity import NpsControllerEntity
        return NpsControllerEntity(self, data)


    def Renomination(self, data=None):
        from entity.renomination_entity import RenominationEntity
        return RenominationEntity(self, data)


    def RenominationsController(self, data=None):
        from entity.renominations_controller_entity import RenominationsControllerEntity
        return RenominationsControllerEntity(self, data)


    def System(self, data=None):
        from entity.system_entity import SystemEntity
        return SystemEntity(self, data)


    def SystemController(self, data=None):
        from entity.system_controller_entity import SystemControllerEntity
        return SystemControllerEntity(self, data)


    def TransmissionController(self, data=None):
        from entity.transmission_controller_entity import TransmissionControllerEntity
        return TransmissionControllerEntity(self, data)


    def UmmGasController(self, data=None):
        from entity.umm_gas_controller_entity import UmmGasControllerEntity
        return UmmGasControllerEntity(self, data)


    def UmmRssFeedController(self, data=None):
        from entity.umm_rss_feed_controller_entity import UmmRssFeedControllerEntity
        return UmmRssFeedControllerEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
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
