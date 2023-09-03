if not Framework.esx() then return end

local ESX = exports.es_extended:getSharedObject()

Framework.PlayerData = function ()
    return ESX.GetPlayerData()
end

Framework.PlayerMoney = function ( cB )
    local cash, bank = 0, 0
    local plyMoney = Framework.PlayerData().accounts

    for i=1, #plyMoney do
        if plyMoney[i].name == 'money' then
            cash = plyMoney[i].money
        elseif plyMoney[i].name == 'bank' then
            bank = plyMoney[i].money
        end
    end

    if cB then cB(cash, bank) else return cash, bank end
end

Framework.PlayerDead = function ()
    return IsEntityDead(cache.ped)
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

--- Turn this off if you have added it in esx_status or esx_basicneeds
---@param status any
AddEventHandler('esx_status:loaded', function(status)

	TriggerEvent('esx_status:registerStatus', 'stress', 0, '#0C98F1', function(status)
		return true
	end, function(status)
		status.remove(0)
	end)

end)

--- Status Tick
---@param data table
AddEventHandler('esx_status:onTick', function(data)
	local hunger, thirst, stress
	for i = 1, #data do
		if data[i].name == 'thirst' then thirst = math.floor(data[i].percent) end
		if data[i].name == 'hunger' then hunger = math.floor(data[i].percent) end
		if data[i].name == 'stress' then stress = math.floor(data[i].percent) end
	end
	TriggerEvent("hud:client:UpdateNeeds", hunger, thirst)
	TriggerEvent("hud:client:UpdateStress", stress)
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(playerData)
    if not LocalPlayer.state.isLoggedIn then LocalPlayer.state:set('isLoggedIn', true, false) end
    TriggerEvent('HUD:PlayerLoaded')
end)
