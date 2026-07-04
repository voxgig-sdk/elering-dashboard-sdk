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
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
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


    @property
    def balance(self):
        """Idiomatic facade: client.balance.list() / client.balance.load({"id": ...})."""
        from entity.balance_entity import BalanceEntity
        cached = getattr(self, "_balance", None)
        if cached is None:
            cached = BalanceEntity(self, None)
            self._balance = cached
        return cached

    def Balance(self, data=None):
        # Deprecated: use client.balance instead.
        from entity.balance_entity import BalanceEntity
        return BalanceEntity(self, data)


    @property
    def balance_controller(self):
        """Idiomatic facade: client.balance_controller.list() / client.balance_controller.load({"id": ...})."""
        from entity.balance_controller_entity import BalanceControllerEntity
        cached = getattr(self, "_balance_controller", None)
        if cached is None:
            cached = BalanceControllerEntity(self, None)
            self._balance_controller = cached
        return cached

    def BalanceController(self, data=None):
        # Deprecated: use client.balance_controller instead.
        from entity.balance_controller_entity import BalanceControllerEntity
        return BalanceControllerEntity(self, data)


    @property
    def firm(self):
        """Idiomatic facade: client.firm.list() / client.firm.load({"id": ...})."""
        from entity.firm_entity import FirmEntity
        cached = getattr(self, "_firm", None)
        if cached is None:
            cached = FirmEntity(self, None)
            self._firm = cached
        return cached

    def Firm(self, data=None):
        # Deprecated: use client.firm instead.
        from entity.firm_entity import FirmEntity
        return FirmEntity(self, data)


    @property
    def firm_capacity_controller(self):
        """Idiomatic facade: client.firm_capacity_controller.list() / client.firm_capacity_controller.load({"id": ...})."""
        from entity.firm_capacity_controller_entity import FirmCapacityControllerEntity
        cached = getattr(self, "_firm_capacity_controller", None)
        if cached is None:
            cached = FirmCapacityControllerEntity(self, None)
            self._firm_capacity_controller = cached
        return cached

    def FirmCapacityController(self, data=None):
        # Deprecated: use client.firm_capacity_controller instead.
        from entity.firm_capacity_controller_entity import FirmCapacityControllerEntity
        return FirmCapacityControllerEntity(self, data)


    @property
    def gas_balance_controller(self):
        """Idiomatic facade: client.gas_balance_controller.list() / client.gas_balance_controller.load({"id": ...})."""
        from entity.gas_balance_controller_entity import GasBalanceControllerEntity
        cached = getattr(self, "_gas_balance_controller", None)
        if cached is None:
            cached = GasBalanceControllerEntity(self, None)
            self._gas_balance_controller = cached
        return cached

    def GasBalanceController(self, data=None):
        # Deprecated: use client.gas_balance_controller instead.
        from entity.gas_balance_controller_entity import GasBalanceControllerEntity
        return GasBalanceControllerEntity(self, data)


    @property
    def gas_border_trade_controller(self):
        """Idiomatic facade: client.gas_border_trade_controller.list() / client.gas_border_trade_controller.load({"id": ...})."""
        from entity.gas_border_trade_controller_entity import GasBorderTradeControllerEntity
        cached = getattr(self, "_gas_border_trade_controller", None)
        if cached is None:
            cached = GasBorderTradeControllerEntity(self, None)
            self._gas_border_trade_controller = cached
        return cached

    def GasBorderTradeController(self, data=None):
        # Deprecated: use client.gas_border_trade_controller instead.
        from entity.gas_border_trade_controller_entity import GasBorderTradeControllerEntity
        return GasBorderTradeControllerEntity(self, data)


    @property
    def gas_system(self):
        """Idiomatic facade: client.gas_system.list() / client.gas_system.load({"id": ...})."""
        from entity.gas_system_entity import GasSystemEntity
        cached = getattr(self, "_gas_system", None)
        if cached is None:
            cached = GasSystemEntity(self, None)
            self._gas_system = cached
        return cached

    def GasSystem(self, data=None):
        # Deprecated: use client.gas_system instead.
        from entity.gas_system_entity import GasSystemEntity
        return GasSystemEntity(self, data)


    @property
    def gas_system_controller(self):
        """Idiomatic facade: client.gas_system_controller.list() / client.gas_system_controller.load({"id": ...})."""
        from entity.gas_system_controller_entity import GasSystemControllerEntity
        cached = getattr(self, "_gas_system_controller", None)
        if cached is None:
            cached = GasSystemControllerEntity(self, None)
            self._gas_system_controller = cached
        return cached

    def GasSystemController(self, data=None):
        # Deprecated: use client.gas_system_controller instead.
        from entity.gas_system_controller_entity import GasSystemControllerEntity
        return GasSystemControllerEntity(self, data)


    @property
    def gas_trade(self):
        """Idiomatic facade: client.gas_trade.list() / client.gas_trade.load({"id": ...})."""
        from entity.gas_trade_entity import GasTradeEntity
        cached = getattr(self, "_gas_trade", None)
        if cached is None:
            cached = GasTradeEntity(self, None)
            self._gas_trade = cached
        return cached

    def GasTrade(self, data=None):
        # Deprecated: use client.gas_trade instead.
        from entity.gas_trade_entity import GasTradeEntity
        return GasTradeEntity(self, data)


    @property
    def gas_trade_controller(self):
        """Idiomatic facade: client.gas_trade_controller.list() / client.gas_trade_controller.load({"id": ...})."""
        from entity.gas_trade_controller_entity import GasTradeControllerEntity
        cached = getattr(self, "_gas_trade_controller", None)
        if cached is None:
            cached = GasTradeControllerEntity(self, None)
            self._gas_trade_controller = cached
        return cached

    def GasTradeController(self, data=None):
        # Deprecated: use client.gas_trade_controller instead.
        from entity.gas_trade_controller_entity import GasTradeControllerEntity
        return GasTradeControllerEntity(self, data)


    @property
    def gas_transmission_controller(self):
        """Idiomatic facade: client.gas_transmission_controller.list() / client.gas_transmission_controller.load({"id": ...})."""
        from entity.gas_transmission_controller_entity import GasTransmissionControllerEntity
        cached = getattr(self, "_gas_transmission_controller", None)
        if cached is None:
            cached = GasTransmissionControllerEntity(self, None)
            self._gas_transmission_controller = cached
        return cached

    def GasTransmissionController(self, data=None):
        # Deprecated: use client.gas_transmission_controller instead.
        from entity.gas_transmission_controller_entity import GasTransmissionControllerEntity
        return GasTransmissionControllerEntity(self, data)


    @property
    def green_controller(self):
        """Idiomatic facade: client.green_controller.list() / client.green_controller.load({"id": ...})."""
        from entity.green_controller_entity import GreenControllerEntity
        cached = getattr(self, "_green_controller", None)
        if cached is None:
            cached = GreenControllerEntity(self, None)
            self._green_controller = cached
        return cached

    def GreenController(self, data=None):
        # Deprecated: use client.green_controller instead.
        from entity.green_controller_entity import GreenControllerEntity
        return GreenControllerEntity(self, data)


    @property
    def interruptible(self):
        """Idiomatic facade: client.interruptible.list() / client.interruptible.load({"id": ...})."""
        from entity.interruptible_entity import InterruptibleEntity
        cached = getattr(self, "_interruptible", None)
        if cached is None:
            cached = InterruptibleEntity(self, None)
            self._interruptible = cached
        return cached

    def Interruptible(self, data=None):
        # Deprecated: use client.interruptible instead.
        from entity.interruptible_entity import InterruptibleEntity
        return InterruptibleEntity(self, data)


    @property
    def interruptible_capacity_controller(self):
        """Idiomatic facade: client.interruptible_capacity_controller.list() / client.interruptible_capacity_controller.load({"id": ...})."""
        from entity.interruptible_capacity_controller_entity import InterruptibleCapacityControllerEntity
        cached = getattr(self, "_interruptible_capacity_controller", None)
        if cached is None:
            cached = InterruptibleCapacityControllerEntity(self, None)
            self._interruptible_capacity_controller = cached
        return cached

    def InterruptibleCapacityController(self, data=None):
        # Deprecated: use client.interruptible_capacity_controller instead.
        from entity.interruptible_capacity_controller_entity import InterruptibleCapacityControllerEntity
        return InterruptibleCapacityControllerEntity(self, data)


    @property
    def nomination(self):
        """Idiomatic facade: client.nomination.list() / client.nomination.load({"id": ...})."""
        from entity.nomination_entity import NominationEntity
        cached = getattr(self, "_nomination", None)
        if cached is None:
            cached = NominationEntity(self, None)
            self._nomination = cached
        return cached

    def Nomination(self, data=None):
        # Deprecated: use client.nomination instead.
        from entity.nomination_entity import NominationEntity
        return NominationEntity(self, data)


    @property
    def nominations_controller(self):
        """Idiomatic facade: client.nominations_controller.list() / client.nominations_controller.load({"id": ...})."""
        from entity.nominations_controller_entity import NominationsControllerEntity
        cached = getattr(self, "_nominations_controller", None)
        if cached is None:
            cached = NominationsControllerEntity(self, None)
            self._nominations_controller = cached
        return cached

    def NominationsController(self, data=None):
        # Deprecated: use client.nominations_controller instead.
        from entity.nominations_controller_entity import NominationsControllerEntity
        return NominationsControllerEntity(self, data)


    @property
    def nps_controller(self):
        """Idiomatic facade: client.nps_controller.list() / client.nps_controller.load({"id": ...})."""
        from entity.nps_controller_entity import NpsControllerEntity
        cached = getattr(self, "_nps_controller", None)
        if cached is None:
            cached = NpsControllerEntity(self, None)
            self._nps_controller = cached
        return cached

    def NpsController(self, data=None):
        # Deprecated: use client.nps_controller instead.
        from entity.nps_controller_entity import NpsControllerEntity
        return NpsControllerEntity(self, data)


    @property
    def renomination(self):
        """Idiomatic facade: client.renomination.list() / client.renomination.load({"id": ...})."""
        from entity.renomination_entity import RenominationEntity
        cached = getattr(self, "_renomination", None)
        if cached is None:
            cached = RenominationEntity(self, None)
            self._renomination = cached
        return cached

    def Renomination(self, data=None):
        # Deprecated: use client.renomination instead.
        from entity.renomination_entity import RenominationEntity
        return RenominationEntity(self, data)


    @property
    def renominations_controller(self):
        """Idiomatic facade: client.renominations_controller.list() / client.renominations_controller.load({"id": ...})."""
        from entity.renominations_controller_entity import RenominationsControllerEntity
        cached = getattr(self, "_renominations_controller", None)
        if cached is None:
            cached = RenominationsControllerEntity(self, None)
            self._renominations_controller = cached
        return cached

    def RenominationsController(self, data=None):
        # Deprecated: use client.renominations_controller instead.
        from entity.renominations_controller_entity import RenominationsControllerEntity
        return RenominationsControllerEntity(self, data)


    @property
    def system(self):
        """Idiomatic facade: client.system.list() / client.system.load({"id": ...})."""
        from entity.system_entity import SystemEntity
        cached = getattr(self, "_system", None)
        if cached is None:
            cached = SystemEntity(self, None)
            self._system = cached
        return cached

    def System(self, data=None):
        # Deprecated: use client.system instead.
        from entity.system_entity import SystemEntity
        return SystemEntity(self, data)


    @property
    def system_controller(self):
        """Idiomatic facade: client.system_controller.list() / client.system_controller.load({"id": ...})."""
        from entity.system_controller_entity import SystemControllerEntity
        cached = getattr(self, "_system_controller", None)
        if cached is None:
            cached = SystemControllerEntity(self, None)
            self._system_controller = cached
        return cached

    def SystemController(self, data=None):
        # Deprecated: use client.system_controller instead.
        from entity.system_controller_entity import SystemControllerEntity
        return SystemControllerEntity(self, data)


    @property
    def transmission_controller(self):
        """Idiomatic facade: client.transmission_controller.list() / client.transmission_controller.load({"id": ...})."""
        from entity.transmission_controller_entity import TransmissionControllerEntity
        cached = getattr(self, "_transmission_controller", None)
        if cached is None:
            cached = TransmissionControllerEntity(self, None)
            self._transmission_controller = cached
        return cached

    def TransmissionController(self, data=None):
        # Deprecated: use client.transmission_controller instead.
        from entity.transmission_controller_entity import TransmissionControllerEntity
        return TransmissionControllerEntity(self, data)


    @property
    def umm_gas_controller(self):
        """Idiomatic facade: client.umm_gas_controller.list() / client.umm_gas_controller.load({"id": ...})."""
        from entity.umm_gas_controller_entity import UmmGasControllerEntity
        cached = getattr(self, "_umm_gas_controller", None)
        if cached is None:
            cached = UmmGasControllerEntity(self, None)
            self._umm_gas_controller = cached
        return cached

    def UmmGasController(self, data=None):
        # Deprecated: use client.umm_gas_controller instead.
        from entity.umm_gas_controller_entity import UmmGasControllerEntity
        return UmmGasControllerEntity(self, data)


    @property
    def umm_rss_feed_controller(self):
        """Idiomatic facade: client.umm_rss_feed_controller.list() / client.umm_rss_feed_controller.load({"id": ...})."""
        from entity.umm_rss_feed_controller_entity import UmmRssFeedControllerEntity
        cached = getattr(self, "_umm_rss_feed_controller", None)
        if cached is None:
            cached = UmmRssFeedControllerEntity(self, None)
            self._umm_rss_feed_controller = cached
        return cached

    def UmmRssFeedController(self, data=None):
        # Deprecated: use client.umm_rss_feed_controller instead.
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
