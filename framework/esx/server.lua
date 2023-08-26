if not Framework.esx() then return end

local ESX = exports.es_extended:getSharedObject()

Framework.GetPlayer = function ( src )
    local Player = ESX.GetPlayerFromId(src)
    if Player and Player ~= nil then return Player end
    return false
end

Framework.HasPermission = function ( group )
    return Player(source).state.group == group
end

Framework.PlayerJob = function ( src )
    return Player(src).state.job
end

Framework.PlayerMoney = function ( src, type )
    local amount = 0
    if type == 'cash' then
        amount = Framework.GetPlayer(src).getMoney()
    elseif type == 'bank' then
        amount = Framework.GetPlayer(src).getAccount('bank').money
    end
    return amount
end