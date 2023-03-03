local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Nastavení HUD načteno!",
        ["hud_restart"] = "HUD se restartuje!",
        ["hud_start"] = "HUD je nyní zapnutý!",
        ["hud_command_info"] = "Tento příkaz resetuje vaše momentální nastavení HUD!",
        ["load_square_map"] = "Načítání čtvercové mapy...",
        ["loaded_square_map"] = "Čtvercová mapa byla načtena!",
        ["load_circle_map"] = "Kruhová mapa se načítá...",
        ["loaded_circle_map"] = "Kruhová mapa byla načtena!",
        ["cinematic_on"] = "Cinematic Mode On!", -- Same as in English
        ["cinematic_off"] = "Cinematic Mode Off!", -- Same as in English
        ["engine_on"] = "Motor nastartován!",
        ["engine_off"] = "Motor vypnut!",
        ["low_fuel"] = "Nedostatek paliva!",
        ["access_denied"] = "Na toto nemáš oprávnění!",
        ["stress_gain"] = "Cítíš se být vystresovaná!",
        ["stress_removed"] = "Cítíš se volněj!"
    }
}

if GetConvar('qb_locale', 'en') == 'cs' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
