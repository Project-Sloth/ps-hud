if not Framework.qb() then return end

local QBCore = exports['qb-core']:GetCoreObject()

Framework.PlayerData = function ()
    return QBCore.Functions.GetPlayerData()
end

Framework.PlayerMoney = function ( cB )
    local cash, bank = 0, 0
    
    cash = Framework.PlayerData().money['cash']
    bank = Framework.PlayerData().money['bank']
    
    if cB then cB(cash, bank) else return cash, bank end
end

Framework.PlayerDead = function ()
    return IsEntityDead(cache.ped) or Framework.PlayerData().metadata["inlaststand"] or Framework.PlayerData().metadata["isdead"]
end

Framework.Notify = function ( message, type, duration )
    return lib.notify({
        title = 'Project Sloth',
        description = message,
        type = type,
        duration = duration
    })
end

RegisterNetEvent('HUD:Notification', function( message, type, duration )
    return Framework.Notify( message, type, duration )
end)

RegisterNetEvent("QBCore:Client:OnPlayerLoaded", function()
    TriggerEvent('HUD:PlayerLoaded')
end)