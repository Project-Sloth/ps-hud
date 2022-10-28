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
        ["cinematic_on"] = "Filmový mód aktivován", 
        ["cinematic_off"] = "Filmový mód deaktivován", 
        ["engine_on"] = "Motor nastartován!",
        ["engine_off"] = "Motor vypnut!",
        ["low_fuel"] = "Nedostatek paliva!",
        ["access_denied"] = "Na toto nemáš oprávnění!",
        ["stress_gain"] = "Cítíš se vystresovaně!",
        ["stress_removed"] = "Cítíš se volněji!"
    }
}
Lang = Locale:new({phrases = Translations, warnOnMissing = true})
