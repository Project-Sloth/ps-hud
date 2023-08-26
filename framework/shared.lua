Framework = {}

Framework.qb = function ()
    return GetResourceState('qb-core') ~= 'missing'
end

Framework.esx = function ()
    return GetResourceState('es_extended') ~= 'missing'
end