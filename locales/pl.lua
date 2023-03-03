local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Ustawienia HUD załadowane!",
        ["hud_restart"] = "HUD jest restartowany!",
        ["hud_start"] = "HUD wystartował!",
        ["hud_command_info"] = "Ta komenda resetuje twoje ustawienia HUD!",
        ["load_square_map"] = "Ładowanie kwadratowej mapy...",
        ["loaded_square_map"] = "Załadowano kwadratową mapę!",
        ["load_circle_map"] = "Ładowanie okrągłej mapy...",
        ["loaded_circle_map"] = "Załadowano okrągłą mapę!",
        ["cinematic_on"] = "Tryb kinowy włączony!",
        ["cinematic_off"] = "Tryb kinowy wyłączony!",
        ["engine_on"] = "Silnik włączony!",
        ["engine_off"] = "Silnik wyłączony!",
        ["low_fuel"] = "Niski poziom paliwa!",
        ["access_denied"] = "Nie masz do tego uprawnień!",
        ["stress_gain"] = "Czujesz się bardziej zestresowany!",
        ["stress_removed"] = "Czujesz się bardziej zrelaksowany!"
    }
}

if GetConvar('qb_locale', 'en') == 'pl' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
