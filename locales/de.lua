local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD Einstellungen geladen!",
        ["hud_restart"] = "HUD wird neugestartet!",
        ["hud_start"] = "HUD ist nun gestartet!",
        ["hud_command_info"] = "Dieser Befehl setzt deine jetzigen Einstellungen zurück!",
        ["load_square_map"] = "Quadratische Map lädt..",
        ["loaded_square_map"] = "Quadratische Map wurde geladen!",
        ["load_circle_map"] = "Runde Map lädt...",
        ["loaded_circle_map"] = "Runde Map wurde geladen!",
        ["cinematic_on"] = "Kino Modus aktiviert!",
        ["cinematic_off"] = "Kino Modus deaktiviert!",
        ["engine_on"] = "Motor ist nun an!",
        ["engine_off"] = "Motor ist nun aus!",
        ["low_fuel"] = "Tank Status niedrig!",
        ["access_denied"] = "Du bist nicht autorisiert!",
        ["stress_gain"] = "Du stresst!",
        ["stress_removed"] = "Du relaxed!"
    }
}

if GetConvar('qb_locale', 'en') == 'de' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
