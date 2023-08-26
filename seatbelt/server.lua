if GetResourceState(Config.smallresources) ~= 'missing' then return end

RegisterNetEvent('equip:harness', function(item)
    local src = source
    local Player = Framework.GetPlayer(src)

    if not Player then return end

    if GetResourceState('ox_inventory') ~= 'missing' then
        if item.metadata.harnessuses == nil then
            item.metadata.harnessuses = 19
            exports.ox_inventory:SetMetadata(src, item.slot, item.metadata)
        elseif item.metadata.harnessuses == 1 then
            exports.ox_inventory:RemoveItem(src, 'harness', 1)
        else
            item.metadata.harnessuses -= 1
            exports.ox_inventory:SetMetadata(src, item.slot, item.metadata)
        end
        
        return
    end

    if not Player.PlayerData.items[item.slot].info.uses then
        Player.PlayerData.items[item.slot].info.uses = Config.HarnessUses - 1
        Player.Functions.SetInventory(Player.PlayerData.items)
    elseif Player.PlayerData.items[item.slot].info.uses == 1 then
        TriggerClientEvent("inventory:client:ItemBox", src, QBCore.Shared.Items['harness'], "remove")
        Player.Functions.RemoveItem('harness', 1)
    else
        Player.PlayerData.items[item.slot].info.uses -= 1
        Player.Functions.SetInventory(Player.PlayerData.items)
    end
end)

RegisterNetEvent('seatbelt:DoHarnessDamage', function(hp, data)
    local src = source
    local Player = Framework.GetPlayer(src)

    local harness = exports.ox_inventory:Search(src, 1, 'harness')

    if not Player then return end

    if GetResourceState('ox_inventory') ~= 'missing' then
        if hp == 0 then
            exports.ox_inventory:RemoveItem(src, 'harness', 1, data.metadata, data.slot)
        else
            harness.metadata.harnessuses -= 1
            exports.ox_inventory:SetMetadata(src, harness.slot, harness.metadata)
        end

        return
    end

    if hp == 0 then
        Player.Functions.RemoveItem('harness', 1, data.slot)
    else
        Player.PlayerData.items[data.slot].info.uses -= 1
        Player.Functions.SetInventory(Player.PlayerData.items)
    end
end)
