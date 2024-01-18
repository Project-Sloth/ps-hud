-- This logic is taken from qb-core to make it compatible with ESX and QBCore at once

ServerCallbacks = {}

RegisterNetEvent('utils:TriggerCallback', function(name, ...)
    local src = source
    TriggerCallback(name, src, function(...)
        TriggerClientEvent('cl_utils:TriggerCallback', src, name, ...)
    end, ...)
end)

function CreateCallback(name, cb)
    ServerCallbacks[name] = cb
end

function TriggerCallback(name, source, cb, ...)
    if not ServerCallbacks[name] then return end
    ServerCallbacks[name](source, cb, ...)
end
