function ShowNotification(source, msg, type)
    TriggerClientEvent("QBCore:Notify", source, msg, type)
end