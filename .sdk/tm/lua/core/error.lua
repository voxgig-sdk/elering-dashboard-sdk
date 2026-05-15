-- EleringDashboard SDK error

local EleringDashboardError = {}
EleringDashboardError.__index = EleringDashboardError


function EleringDashboardError.new(code, msg, ctx)
  local self = setmetatable({}, EleringDashboardError)
  self.is_sdk_error = true
  self.sdk = "EleringDashboard"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function EleringDashboardError:error()
  return self.msg
end


function EleringDashboardError:__tostring()
  return self.msg
end


return EleringDashboardError
