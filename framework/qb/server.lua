if not Framework.qb() then return end

local QBCore = exports['qb-core']:GetCoreObject()

Framework.HasPermission = function ( group )
    return QBCore.Functions.HasPermission(source, group)
end

Framework.GetPlayer = function ( src )
    local Player = QBCore.Functions.GetPlayer(src)
    if Player and Player ~= nil then return Player end
    return false
end

Framework.PlayerJob = function ( src )
    local Player = Framework.GetPlayer(src)
    if not Player then return 'unemployed' end
    local PlayerJob = Player.PlayerData.job
    return PlayerJob
end

Framework.PlayerMoney = function ( src, type )
    local amount = 0
    if type == 'cash' then
        amount = Framework.GetPlayer(src).PlayerData.money['cash']
    elseif type == 'bank' then
        amount = Framework.GetPlayer(src).PlayerData.money['bank']
    end
    return amount
end

if GetResourceState(Config.smallresources) == 'missing' then 
    QBCore.Functions.CreateUseableItem("harness", function(source, item)
        TriggerClientEvent('seatbelt:client:UseHarness', source, item)
    end)
end
