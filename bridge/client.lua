-- This logic is taken from qb-core to make it compatible with ESX and QBCore at once

ServerCallbacks = {}

function TriggerCallback(name, cb, ...)
    ServerCallbacks[name] = cb
    TriggerServerEvent('utils:TriggerCallback', name, ...)
end

RegisterNetEvent('cl_utils:TriggerCallback', function(name, ...)
    if ServerCallbacks[name] then
        ServerCallbacks[name](...)
        ServerCallbacks[name] = nil
    end
end)