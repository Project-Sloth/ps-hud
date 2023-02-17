ESX = exports['es_extended']:getSharedObject()
local ResetStress = false

--RegisterCommand('cash', 'Check Cash Balance', {}, false, function(source, args)
  --  local Player = ESX.Get.PlayerFromId(src)
   -- local cashamount = Player.PlayerData.money.cash
   -- TriggerClientEvent('hud:client:ShowAccounts', source, 'cash', cashamount)
--end)

--RegisterCommand('bank', 'Check Bank Balance', {}, false, function(source, args)
   -- local Player = ESX.Get.PlayerFromId(src)
   -- local bankamount = Player.PlayerData.money.bank
  --  TriggerClientEvent('hud:client:ShowAccounts', source, 'bank', bankamount)
--end)

ESX.RegisterCommand('dev', "admin", function(xPlayer, args, showError)
	xPlayer.triggerEvent('hud:client:ToggleDevmode')
end, true, {help = 'Enable/Disable developer Mode'})

RegisterNetEvent('hud:server:GainStress', function(amount)
    local src = source
    local Player = ESX.GetPlayerFromId(src)
    local newStress
    if not Player or (Config.DisablePoliceStress and Player.PlayerData.job.name == 'police') then return end
    if not ResetStress then
        if not Player.get('stress') then
            Player.set('stress', 0)
        end
        newStress = Player.get('stress') + amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    Player.set('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    --TriggerClientEvent('QBCore:Notify', src, Lang:t("notify.stress_gain"), 'error', 1500)
end)

RegisterNetEvent('hud:server:RelieveStress', function(amount)
    local src = source
    local Player = ESX.GetPlayerFromId(src)
    local newStress
    if not Player then return end
    if not ResetStress then
        if not Player.get('stress') then
            Player.set(‘stress’, 0)
        end
        newStress = Player.get('stress') - amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    Player.set('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    --TriggerClientEvent('QBCore:Notify', src, Lang:t("notify.stress_removed"))
end)

RegisterNetEvent('hud:server:saveUIData', function(data)
    local src = source
    local xPlayer = ESX.GetPlayerFromId(src)
	-- Check Permissions
    if not xPlayer.getGroup(src, 'admin') and not IsPlayerAceAllowed(src, 'command') then
		return
	end

    -- Ensure a player is invoking this net event
    local Player = ESX.GetPlayerFromId(src)
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
    for k, _ in pairs(data.icons) do
        table.insert(iconKeys, k)
    end
    table.sort(iconKeys)

    for _, iconName in ipairs(iconKeys) do
        uiConfigData.icons[iconName] = {}

        local iconLabel = "\nUIConfig.icons['"..iconName.."'] = {"
        file:write(iconLabel)

        -- sort the values as well inside icons
        local iconValues = {}
        for k, _ in pairs(data.icons[iconName]) do
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


    --local layoutLabel = "\nUIConfig.layout = '"..data.layout.."'\n"
    local layoutLabel = "\nUIConfig.layout = {"
    file:write(layoutLabel)
    for layoutName, layoutVal in pairs(data.layout) do
        local str
        if type(layoutVal) == "string" then
            str = ("\n    %s = '%s',"):format(layoutName, layoutVal)
        else
            str = ("\n    %s = %s,"):format(layoutName, layoutVal)
        end
        file:write(str)
    end
    file:write("\n}\n")
    uiConfigData.layout = data.layout


    -- write out color icons info
    file:write("\nUIConfig.colors = {}\n")
    uiConfigData.colors = {}

    -- Sort the color keys
    local colorKeys = {}
    for k, _ in pairs(data.colors) do
        table.insert(colorKeys, k)
    end
    table.sort(colorKeys)

    for _, colorName in ipairs(colorKeys) do
        uiConfigData.colors[colorName] = {}
        uiConfigData.colors[colorName].colorEffects = {}

        local colorLabel = "\nUIConfig.colors['"..colorName.."'] = {"
        file:write(colorLabel)

        local colorEffectsLabel = "\n    colorEffects = {"
        file:write(colorEffectsLabel)

        for k, v in ipairs(data.colors[colorName].colorEffects) do
            local colorEffectIndexLabel = "\n        ["..k.."] = {"
            file:write(colorEffectIndexLabel)

            -- sort the values as well inside color effects
            local colorEffect = data.colors[colorName].colorEffects[k]
            local colorEffectkeys = {}
            for scekey, _ in pairs(colorEffect) do
                table.insert(colorEffectkeys, scekey)
            end
            table.sort(colorEffectkeys)

            table.insert(uiConfigData.colors[colorName].colorEffects, colorEffect)

            for _, CEKey in ipairs(colorEffectkeys) do
                local str
                if type(colorEffect[CEKey]) == "string" then
                    str = ("\n            %s = '%s',"):format(CEKey, colorEffect[CEKey])
                else
                    str = ("\n            %s = %s,"):format(CEKey, colorEffect[CEKey])
                end
                file:write(str)
            end
            file:write("\n        },")
        end
        file:write("\n    },")
        file:write("\n}\n")
    end

    file:close()

    UIConfig = uiConfigData

    -- -1 to send to all players
    TriggerClientEvent('hud:client:UpdateUISettings', 1, uiConfigData)
end)

ESX.RegisterServerCallback('hud:server:getMenu', function(source, cb)
    cb(Config.Menu)
end) 


ESX.RegisterServerCallback('hud:server:getRank', function(source, cb)
    local player = ESX.GetPlayerFromId(source)

    if player then
        local playerGroup = player.getGroup()

        if playerGroup then 
            cb(true)
        else
            cb(true)
        end
    else
        cb(true)
    end
end)

-- Commented Block needs to be translated to your preferred inventory system. 
--[[
ESX.RegisterUsableItem("harness", function(source, item)
    local src = source
    local Player = ESX.GetPlayerFromId(src)
    TriggerClientEvent('seatbelt:client:UseHarness', src, item)
end)

RegisterNetEvent('equip:harness', function(item)
    local src = source
    local Player = ESX.GetPlayerFromId(src)
    if Player.PlayerData.items[item.slot].info.uses - 1 == 0 then
        TriggerClientEvent("inventory:client:ItemBox", src, QBCore.Shared.Items['harness'], "remove")
        xPlayer.removeInventoryItem('harness', 1)
    else
        Player.PlayerData.items[item.slot].info.uses = Player.PlayerData.items[item.slot].info.uses - 1
        Player.Functions.SetInventory(Player.PlayerData.items)
    end
end)

RegisterNetEvent('seatbelt:DoHarnessDamage', function(hp, data)
    local src = source
    local Player = ESX.GetPlayerFromId(src)

    if hp == 0 then
        xPlayer.removeInventoryItem('harness', 1, data.slot)
    else
        Player.PlayerData.items[data.slot].info.uses = Player.PlayerData.items[data.slot].info.uses - 1
        Player.Functions.SetInventory(Player.PlayerData.items)
    end
end)
]]

