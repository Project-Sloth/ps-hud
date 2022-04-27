local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Configuración de HUD cargada.",
        ["hud_restart"] = "HUD se está reiniciando.",
        ["hud_start"] = "HUD funcionando.",
        ["hud_command_info"] = "Este comando restablece la configuración del HUD",
        ["load_square_map"] = "Cargando el mapa cuadrado.",
        ["loaded_square_map"] = "El mapa cuadrado se ha cargado.",
        ["load_circle_map"] = "Cargando el mapa circular.",
        ["loaded_circle_map"] = "El mapa circular se ha cargado.",
        ["cinematic_on"] = "Modo cinematográfico activado!",
        ["cinematic_off"] = "Modo cinematográfico desactivado.",
        ["engine_on"] = "¡Motor arrancado!",
        ["engine_off"] = "Motor apagado.",
        ["low_fuel"] = "¡Nivel de gasolina bajo!",
        ["access_denied"] = "¿Que haces? ¡No estas autorizado!",
        ["stress_gain"] = "Te estás sintiéndo más estresado/a.",
        ["stress_removed"] = "Te estás sintiéndo más relajado/a."
    }
}
Lang = Locale:new({phrases = Translations, warnOnMissing = true})
