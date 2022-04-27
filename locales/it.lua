local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Impostazioni HUD Caricate!",
        ["hud_restart"] = "L\'HUD si sta restartando!",
        ["hud_start"] = "L\'HUD si sta avviando!",
        ["hud_command_info"] = "Questo comando resetta le impostazioni dell\'HUD!",
        ["load_square_map"] = "Caricando Mappa Quadrata...",
        ["loaded_square_map"] = "Mappa Quadrata Caricata!",
        ["load_circle_map"] = "Caricando Mappa Rotonda...",
        ["loaded_circle_map"] = "Mappa Rotonda Caricata!",
        ["cinematic_on"] = "Modalità Cinematica On!",
        ["cinematic_off"] = "Modalità Cinematica Off!",
        ["engine_on"] = "Motore Avviato!",
        ["engine_off"] = "Motore Spento!",
        ["low_fuel"] = "Livello Carburante Basso!",
        ["access_denied"] = "Non Sei Autorizzato!",
        ["stress_gain"] = "Ti Stai Stressando!",
        ["stress_removed"] = "Ti Stai Rilassando!"
    }
}
Lang = Locale:new({phrases = Translations, warnOnMissing = true})
