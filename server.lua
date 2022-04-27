local QBCore = exports['qb-core']:GetCoreObject()
local ResetStress = false

QBCore.Commands.Add('cash', 'Check Cash Balance', {}, false, function(source, args)
    local Player = QBCore.Functions.GetPlayer(source)
    local cashamount = Player.PlayerData.money.cash
    TriggerClientEvent('hud:client:ShowAccounts', source, 'cash', cashamount)
end)

QBCore.Commands.Add('bank', 'Check Bank Balance', {}, false, function(source, args)
    local Player = QBCore.Functions.GetPlayer(source)
    local bankamount = Player.PlayerData.money.bank
    TriggerClientEvent('hud:client:ShowAccounts', source, 'bank', bankamount)
end)

QBCore.Commands.Add("dev", "Enable/Disable developer Mode", {}, false, function(source, args)
    TriggerClientEvent("qb-admin:client:ToggleDevmode", source)
end, 'admin')

RegisterNetEvent('hud:server:GainStress', function(amount)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local newStress
    if not Player or (Config.DisablePoliceStress and Player.PlayerData.job.name == 'police') then return end
    if not ResetStress then
        if not Player.PlayerData.metadata['stress'] then
            Player.PlayerData.metadata['stress'] = 0
        end
        newStress = Player.PlayerData.metadata['stress'] + amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    Player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    TriggerClientEvent('QBCore:Notify', src, Lang:t("notify.stress_gain"), 'error', 1500)
end)

RegisterNetEvent('hud:server:RelieveStress', function(amount)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local newStress
    if not Player then return end
    if not ResetStress then
        if not Player.PlayerData.metadata['stress'] then
            Player.PlayerData.metadata['stress'] = 0
        end
        newStress = Player.PlayerData.metadata['stress'] - amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    Player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    TriggerClientEvent('QBCore:Notify', src, Lang:t("notify.stress_removed"))
end)

RegisterNetEvent('hud:server:saveUIData', function(data)
    local src = source
	-- Check Permissions
    if not QBCore.Functions.HasPermission(src, 'admin') and not IsPlayerAceAllowed(src, 'command') then
		return
	end

    -- Ensure a player is invoking this net event
    local Player = QBCore.Functions.GetPlayer(src)
	if not Player then return end

    local uiConfigData = {}
    uiConfigData.icons = {}

    local path = GetResourcePath(GetCurrentResourceName())
    path = path:gsub('//', '/')..'/uiconfig.lua'
    local file = io.open(path, 'w+')

    local heading = "UIConfig = {}\n"
    file:write(heading)

    -- write out icons
    file:write("\nUIConfig.icons = {}\n")
    
    -- Sort the icons so its easier to find in the config file
    local iconKeys = {}
    for k, v in pairs(data.icons) do
        table.insert(iconKeys, k)
    end

    table.sort(iconKeys)

    for _, iconName in ipairs(iconKeys) do
        uiConfigData.icons[iconName] = {}

        local iconLabel = "\nUIConfig.icons['"..iconName.."'] = {"
        file:write(iconLabel)

        -- sort the values as well inside icons
        local iconValues = {}
        for k, v in pairs(data.icons[iconName]) do
            table.insert(iconValues, k)
        end

        table.sort(iconValues)

        for _, iconValueName in ipairs(iconValues) do
            local str
            local v = data.icons[iconName][iconValueName]
            uiConfigData.icons[iconName][iconValueName] = v
            if type(v) == "string" then
                str = ("\n    %s = '%s',"):format(iconValueName, v)
            else
                str = ("\n    %s = %s,"):format(iconValueName, v)
            end
            file:write(str)
        end
        file:write("\n}\n")
    end

    local layoutLabel = "\nUIConfig.layout = '"..data.layout.."'\n"
    file:write(layoutLabel)

    uiConfigData.layout = data.layout
    file:close()

    UIConfig = uiConfigData

    -- -1 to send to all players
    TriggerClientEvent('hud:client:UpdateUISettings', -1, uiConfigData)
end)

QBCore.Functions.CreateCallback('hud:server:HasHarness', function(source, cb)
    local Ply = QBCore.Functions.GetPlayer(source)
    local Harness = Ply.Functions.GetItemByName("harness")
    if Harness ~= nil then
        cb(true)
    else
        cb(false)
    end
end)

QBCore.Functions.CreateCallback('hud:server:getMenu', function(source, cb)
    cb(Config.Menu)
end) 

QBCore.Functions.CreateCallback('hud:server:getRank', function(source, cb)
    local src = source
    if QBCore.Functions.HasPermission(src, 'admin') or IsPlayerAceAllowed(src, 'command') then
        cb(true)
    else
        cb(false)
    end
end)