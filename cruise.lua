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
            TriggerEvent('Notification',"Cruise Activated: " .. CruisedSpeedMph .." MP/H") -- Comment me for mp/h
            -- QBCore.Functions.Notify("Cruise Activated: " .. CruisedSpeedKm ..  " km/h") -- Uncomment me for km/h
            CreateThread(function()
                while CruisedSpeed > 0 and IsInVehicle() == Player do
                    Wait(0)
                    if not IsTurningOrHandBraking() and GetVehicleSpeed() <
                        (CruisedSpeed - 1.5) then
                        CruisedSpeed = 0
                        TriggerEvent('seatbelt:client:ToggleCruise')
                        TriggerEvent('Notification',"Cruise Deactivated", "error")
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
                        TriggerEvent('Notification',"Cruise Deactivated", "error")
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
            TriggerEvent('Notification',"Cruise control unavailable", "error")
        end
    end
end, false)


