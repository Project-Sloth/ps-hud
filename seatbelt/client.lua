if GetResourceState(Config.smallresources) ~= 'missing' then return end

local seatbeltOn = false
local harnessOn = false
local harnessHp = 20
local handbrake = 0
local harnessData = {}
local newVehicleBodyHealth = 0
local currentVehicleBodyHealth = 0
local frameBodyChange = 0
local lastFrameVehiclespeed = 0
local thisFrameVehicleSpeed = 0
local tick = 0
local isDamaged = false
local lastVehicle = nil
local veloc

RegisterNetEvent('HUD:PlayerLoaded', function()
    if GetResourceState('ox_inventory'):match("start") then
        exports.ox_inventory:displayMetadata({
            harnessuses = "Uses",
        })
    end
end)

-- Functions

local function ejectFromVehicle()
    local coords = GetOffsetFromEntityInWorldCoords(cache.vehicle, 1.0, 0.0, 1.0)
    SetEntityCoords(cache.ped, coords.x, coords.y, coords.z)
    Wait(1)
    SetPedToRagdoll(cache.ped, 5511, 5511, 0, false, false, false)
    SetEntityVelocity(cache.ped, veloc.x*4,veloc.y*4,veloc.z*4)
    local ejectspeed = math.ceil(GetEntitySpeed(cache.ped) * 8)
    if GetEntityHealth(cache.ped) - ejectspeed > 0 then
        SetEntityHealth(cache.ped, GetEntityHealth(cache.ped) - ejectspeed)
    elseif GetEntityHealth(cache.ped) ~= 0 then
        SetEntityHealth(cache.ped, 0)
    end
end

local function toggleSeatbelt()
    seatbeltOn = not seatbeltOn
    TriggerEvent('seatbelt:client:ToggleSeatbelt')
    TriggerServerEvent('InteractSound_SV:PlayOnSource', seatbeltOn and 'carbuckle' or 'carunbuckle', 0.25)
end

local function toggleHarness()
    harnessOn = not harnessOn
    LocalPlayer.state:set('HasHarness', harnessOn, false)
    
    if not harnessOn then return end
    toggleSeatbelt()
end

local function resetHandBrake()
    if handbrake <= 0 then return end
    handbrake -= 1
end

local function seatbelt()
    while cache.vehicle do
        local sleep = 1000
        if seatbeltOn or harnessOn then
            sleep = 0
            DisableControlAction(0, 75, true)
            DisableControlAction(27, 75, true)
        end
        Wait(sleep)
    end
    seatbeltOn = false
    harnessOn = false
end

-- Main Thread

lib.onCache('vehicle', function()
    seatbelt()
end)

-- Ejection Logic

local function ejectOrDamageHarness()
    if not harnessOn then
        ejectFromVehicle()
    else
        harnessHp -= 1
        TriggerServerEvent('seatbelt:DoHarnessDamage', harnessHp, harnessData)
    end
end

local function checkForHeavyDamageEjection()
    if not seatbeltOn then
        if math.random(math.ceil(lastFrameVehiclespeed)) > 60 then
            ejectOrDamageHarness()
        end
    elseif (seatbeltOn or harnessOn) and lastFrameVehiclespeed > 150 and math.random(math.ceil(lastFrameVehiclespeed)) > 150 then
        ejectOrDamageHarness()
    end
end

local function checkForLightDamageEjection()
    if not seatbeltOn then
        if math.random(math.ceil(lastFrameVehiclespeed)) > 60 then
            ejectOrDamageHarness()
        end
    elseif (seatbeltOn or harnessOn) and lastFrameVehiclespeed > 120 and math.random(math.ceil(lastFrameVehiclespeed)) > 200 then
        ejectOrDamageHarness()
    end
end

local function isHighSpeedRapidDeacceleration()
    return lastFrameVehiclespeed > 110 and thisFrameVehicleSpeed < (lastFrameVehiclespeed * 0.75)
end

local function handleVehicleDamaged()
    if isDamaged then return end
    if isHighSpeedRapidDeacceleration() then
        if not IsThisModelABike(cache.vehicle) then
            if frameBodyChange > 18.0  then
                checkForHeavyDamageEjection()
            else
                checkForLightDamageEjection()
            end
        end
        isDamaged = true
        SetVehicleEngineOn(cache.vehicle, false, true, true)
    end
    if currentVehicleBodyHealth < 350.0 then
        isDamaged = true
        SetVehicleEngineOn(cache.vehicle, false, true, true)
        Wait(1000)
    end
end

local function handlePedInVehicle()
    SetPedHelmet(cache.ped, false)
    lastVehicle = cache.vehicle
    if GetVehicleEngineHealth(cache.vehicle) < 0.0 then
        SetVehicleEngineHealth(cache.vehicle, 0.0)
    end

    --- apply handbrake on high degree turn
    if (GetVehicleHandbrake(cache.vehicle) or (GetVehicleSteeringAngle(cache.vehicle)) > 25.0 or (GetVehicleSteeringAngle(cache.vehicle)) < -25.0) then
        if handbrake == 0 then
            handbrake = 100
            resetHandBrake()
        else
            handbrake = 100
        end
    end

    thisFrameVehicleSpeed = GetEntitySpeed(cache.vehicle) * 3.6
    currentVehicleBodyHealth = GetVehicleBodyHealth(cache.vehicle)
    if currentVehicleBodyHealth == 1000 and frameBodyChange ~= 0 then
        frameBodyChange = 0
    end
    if frameBodyChange ~= 0 then
       handleVehicleDamaged()
    end
    if lastFrameVehiclespeed < 100 then
        Wait(100)
        tick = 0
    end
    frameBodyChange = newVehicleBodyHealth - currentVehicleBodyHealth
    if tick > 0 then
        tick -= 1
        if tick == 1 then
            lastFrameVehiclespeed = GetEntitySpeed(cache.vehicle) * 3.6
        end
    else
        if isDamaged then
            isDamaged = false
            frameBodyChange = 0
            lastFrameVehiclespeed = GetEntitySpeed(cache.vehicle) * 3.6
        end
        local currentSpeed = GetEntitySpeed(cache.vehicle) * 3.6
        if currentSpeed > lastFrameVehiclespeed then
            lastFrameVehiclespeed = GetEntitySpeed(cache.vehicle) * 3.6
        end
        if currentSpeed < lastFrameVehiclespeed then
            tick = 25
        end

    end
    if tick < 0 then
        tick = 0
    end
    newVehicleBodyHealth = GetVehicleBodyHealth(cache.vehicle)
    veloc = GetEntityVelocity(cache.vehicle)
end

local function handlePedNotInVehicle()
    if lastVehicle then
        SetPedHelmet(cache.ped, true)
        Wait(200)
        newVehicleBodyHealth = GetVehicleBodyHealth(lastVehicle)
        if not isDamaged and newVehicleBodyHealth < currentVehicleBodyHealth then
            isDamaged = true
            SetVehicleEngineOn(lastVehicle, false, true, true)
            Wait(1000)
        end
        lastVehicle = nil
    end
    lastFrameVehiclespeed = 0
    newVehicleBodyHealth = 0
    currentVehicleBodyHealth = 0
    frameBodyChange = 0
    Wait(2000)
end

CreateThread(function()
    while true do
        Wait(0)
        if cache.vehicle and cache.vehicle ~= false and cache.vehicle ~= 0 then
            handlePedInVehicle()
        else
            handlePedNotInVehicle()
        end
    end
end)

-- Events
RegisterNetEvent('seatbelt:client:UseHarness', function(ItemData)
    local class = GetVehicleClass(cache.vehicle)
    if not cache.vehicle or class == 8 or class == 13 or class == 14 then
        Framework.Notify(locale('seatbelt_not_incar'), 'error')
        return
    end
    if not harnessOn then
        LocalPlayer.state:set('invBusy', true, true)
        if lib.progressCircle({
            duration = 5000,
            label = locale('seatbelt_attaching_harness'),
            position = 'bottom',
            useWhileDead = false,
            canCancel = true,
            disable = {
                combat = true
            }
        }) then
            LocalPlayer.state:set('invBusy', false, true)
            toggleHarness()
            TriggerServerEvent('equip:harness', ItemData)
        end
        harnessHp = GetResourceState('ox_inventory'):match("start") and ItemData.metadata.harnessuses or ItemData.info.uses
        harnessData = ItemData
        TriggerEvent('hud:client:UpdateHarness', harnessHp)
    else
        LocalPlayer.state:set('invBusy', true, true)
        if lib.progressCircle({
            duration = 5000,
            label = locale('seatbelt_removing_harness'),
            position = 'bottom',
            useWhileDead = false,
            canCancel = true,
            disable = {
                combat = true
            }
        }) then
            LocalPlayer.state:set('invBusy', false, true)
            toggleHarness()
        end
    end
end)

-- Register Key
local KeySeatBelt = lib.addKeybind({
    name = 'toggleseatbelt',
    description = locale('seatbelt_toggle'),
    defaultKey = 'B',
    onPressed = function(self)
        if not cache.vehicle or IsPauseMenuActive() then return end
        local class = GetVehicleClass(cache.vehicle)
        if class == 8 or class == 13 or class == 14 then return end
        toggleSeatbelt()
    end
})

--- exports to use item harness if you use ox_inventory
---@param harnessData table
exports('useharnes', function ( harnessData )
    TriggerEvent('seatbelt:client:UseHarness', harnessData)
end)