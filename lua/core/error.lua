-- AgentAccessIndex SDK error

local json = require("dkjson")

local AgentAccessIndexError = {}
AgentAccessIndexError.__index = AgentAccessIndexError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function AgentAccessIndexError.new(code, msg, ctx)
  local self = setmetatable({}, AgentAccessIndexError)
  self.is_sdk_error = true
  self.sdk = "AgentAccessIndex"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function AgentAccessIndexError:context()
  return CONTEXT[self]
end


function AgentAccessIndexError:error()
  return self.msg
end


function AgentAccessIndexError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function AgentAccessIndexError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function AgentAccessIndexError:to_json()
  return json.encode(self:to_table())
end


function AgentAccessIndexError:__tostring()
  return self.msg
end


function AgentAccessIndexError.__tojson(self)
  return self:to_json()
end


return AgentAccessIndexError
