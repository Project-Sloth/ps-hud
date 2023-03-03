local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Configuración de HUD cargada",
        ["hud_restart"] = "El HUD se está reiniciando...",
        ["hud_start"] = "El HUD ya está funcionando",
        ["hud_command_info"] = "Este comando reestablece la configuración actual del HUD",
        ["load_square_map"] = "Cargando mapa cuadrado...",
        ["loaded_square_map"] = "El mapa cuadrado se cargó correctamente",
        ["load_circle_map"] = "Cargando mapa circular...",
        ["loaded_circle_map"] = "El mapa circular se cargó correctamente",
        ["cinematic_on"] = "Modo cinematográfico activado",
        ["cinematic_off"] = "Modo cinematográfico desactivado",
        ["engine_on"] = "Motor encedido",
        ["engine_off"] = "Motor apagado",
        ["low_fuel"] = "¡Nivel de gasolina bajo!",
        ["access_denied"] = "¡No estás autorizado!",
        ["stress_gain"] = "Te estás sintiéndo más estresado(o)",
        ["stress_removed"] = "Te estás sintiéndo más relajado(a)"
    },
    info = {
        ["toggle_engine"] = "Encender/apagar motor",
        ["open_menu"] = "Abrir menú",
        ["check_cash_balance"] = "Revisar balance de efectivo",
        ["check_bank_balance"] = "Revisar balance de banco",
        ["toggle_dev_mode"] = "Habilitar/deshabilitar modo desarrollador",
    }
}

if GetConvar('qb_locale', 'en') == 'es' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
