package = "voxgig-sdk-elering-dashboard"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/elering-dashboard-sdk.git"
}
description = {
  summary = "EleringDashboard SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["elering-dashboard_sdk"] = "elering-dashboard_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
