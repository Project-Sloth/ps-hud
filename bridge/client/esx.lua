if GetResourceState("es_extended") ~= "started" then
    return
end

print("Framework Loaded: esx")

ESX = exports['es_extended']:getSharedObject()
PlayerData = ESX.GetPlayerData()


RegisterNetEvent("esx:onPlayerLoaded", function()
    Wait(2000)
    HandleSetupResource()
    loadSettings()
    PlayerData = QBCore.Functions.GetPlayerData()
end)

RegisterNetEvent("esx:onPlayerLogout", function()
    PlayerData = {}
    admin = false
    SendAdminStatus()
end)

AddEventHandler('esx_status:onTick', function(data)
    local hunger, thirst
    for i = 1, #data do
        if data[i].name == 'thirst' then thirst = math.floor(data[i].percent) end
        if data[i].name == 'hunger' then hunger = math.floor(data[i].percent) end
    end

    thirst = thirst
    hunger = hunger
end)

function IsPlayerDead(player)
    return IsEntityDead(player)
end