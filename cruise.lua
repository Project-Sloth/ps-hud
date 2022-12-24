local Player = nil
local CruisedSpeed, CruisedSpeedKm, VehicleVectorY = 0, 0, 0
local vehicleClasses = {
    [0] = true,
    [1] = true,
    [2] = true,
    [3] = true,
    [4] = true,
    [5] = true,
    [6] = true,
    [7] = true,
    [8] = true,
    [9] = true,
    [10] = true,
    [11] = true,
    [12] = true,
    [13] = false,
    [14] = false,
    [15] = false,
    [16] = false,
    [17] = true,
    [18] = true,
    [19] = true,
    [20] = true,
    [21] = false
}

local function IsTurningOrHandBraking() return IsControlPressed(2, 76) or IsControlPressed(2, 63) or IsControlPressed(2, 64) end
local function IsDriving() return IsPedInAnyVehicle(Player, false) end
local function GetVehicle() return GetVehiclePedIsIn(Player, false) end
local function IsInVehicle() return GetPedInVehicleSeat(GetVehicle(), -1) end
local function IsDriver() return GetPedInVehicleSeat(GetVehiclePedIsIn(PlayerPedId(), false), -1) == PlayerPedId() end
local function GetVehicleSpeed() return GetEntitySpeed(GetVehicle()) end
--local function TransformToKm(speed) return math.floor(speed * 3.6 + 0.5) end -- Uncomment me for km/h
local function TransformToMph(speed) return math.floor(speed * 2.2369 + 0.5) end -- Comment me for mp/h

local function TriggerCruiseControl()
    if CruisedSpeed == 0 and IsDriving() then
        if GetVehicleSpeed() > 0 and GetVehicleCurrentGear(GetVehicle()) > 0 then
            CruisedSpeed = GetVehicleSpeed()
            CruisedSpeedMph = TransformToMph(CruisedSpeed) -- Comment me for mp/h
            -- CruisedSpeedKm = TransformToKm(CruisedSpeed) -- Uncomment me for km/h
            TriggerEvent('seatbelt:client:ToggleCruise')
            if Config.NotificationType == "ESX" then
                ESX.ShowNotification("Cruise Activated: " .. CruisedSpeedMph .." MP/H", "info", 3000)
            elseif Config.NotificationType == "ox_lib" then
                lib.notify({
                    description = "Cruise Activated: " .. CruisedSpeedMph .." MP/H",
                    type = "info",
                    duration = 3000,
                })
            end
            CreateThread(function()
                while CruisedSpeed > 0 and IsInVehicle() == Player do
                    Wait(0)
                    if not IsTurningOrHandBraking() and GetVehicleSpeed() <
                        (CruisedSpeed - 3.7) then
                        CruisedSpeed = 0
                        TriggerEvent('seatbelt:client:ToggleCruise')
                        if Config.NotificationType == "ESX" then
                            ESX.ShowNotification("Cruise Deactivated", "error", 3000)
                        elseif Config.NotificationType == "ox_lib" then
                            lib.notify({
                                description = "Cruise Deactivated",
                                type = "error",
                                duration = 3000,
                            })
                        end
                        Wait(2000)
                        break
                    end
                    if not IsTurningOrHandBraking() and
                        IsVehicleOnAllWheels(GetVehicle()) and
                        GetVehicleSpeed() < CruisedSpeed then
                        SetVehicleForwardSpeed(GetVehicle(), CruisedSpeed)
                    end
                    if IsControlJustPressed(1, 246) then
                        TriggerEvent('seatbelt:client:ToggleCruise')
                        CruisedSpeed = GetVehicleSpeed() -- Comment me for mp/h
                        --CruisedSpeedKm = TransformToKm(CruisedSpeed) -- Uncomment me for km/h
                    end
                    if IsControlJustPressed(2, 72) then
                        CruisedSpeed = 0
                        TriggerEvent('seatbelt:client:ToggleCruise')
                        if Config.NotificationType == "ESX" then
                            ESX.ShowNotification("Cruise Deactivated", "error", 3000)
                        elseif Config.NotificationType == "ox_lib" then
                            lib.notify({
                                description = "Cruise Deactivated",
                                type = "error",
                                duration = 3000,
                            })
                        end
                        Wait(2000)
                        break
                    end
                end
            end)
        end
    end
end

RegisterCommand('togglecruise', function()
    local veh = GetVehiclePedIsIn(PlayerPedId())
    local vehClass = GetVehicleClass(veh)
    if IsDriver() then
        if vehicleClasses[vehClass] then
            Player = PlayerPedId()
            TriggerCruiseControl()
        else
            if Config.NotificationType == "ESX" then
                ESX.ShowNotification("Cruise control unavailable", "error", 3000)
            elseif Config.NotificationType == "ox_lib" then
                lib.notify({
                    description = "Cruise control unavailable",
                    type = "error",
                    duration = 3000,
                })
            end
        end
    end
end, false)

RegisterKeyMapping('togglecruise', 'Toggle Cruise Control', 'keyboard', Config.CruiseControl)