if GetResourceState("es_extended") ~= "started" then
    return
end

print("Framework Loaded: esx")

ESX = exports['es_extended']:getSharedObject()

RegisterCommand("cash", function(source)
    local Player = ESX.GetPlayerFromId(source)
    local cashamount = Player.getMoney()
    TriggerClientEvent('hud:client:ShowAccounts', source, 'cash', cashamount)
end)

RegisterCommand("bank", function(source)
    local Player = ESX.GetPlayerFromId(source)
    local bankamount = Player.getAccount('bank').money
    TriggerClientEvent('hud:client:ShowAccounts', source, 'bank', bankamount)
end)

CreateCallback('hud:server:getRank', function(source, cb)
    local src = source
    if QBCore.Functions.HasPermission(src, 'admin') or IsPlayerAceAllowed(src, 'command') then
        cb(true)
    else
        cb(false)
    end
end)


RegisterNetEvent('hud:server:GainStress', function(amount)
    -- -- ESX doesnt have stress system, so just return 

    -- TriggerClientEvent('hud:client:UpdateStress', source, newStress)
    return
end)

RegisterNetEvent('hud:server:RelieveStress', function(amount)
    -- -- ESX doesnt have stress system, so just return 
    -- TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    return
end)