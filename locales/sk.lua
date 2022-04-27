local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD nastavenia boli načítané!",
        ["hud_restart"] = "HUD sa reštartuje!",
        ["hud_start"] = "HUD je zapnutý!",
        ["hud_command_info"] = "Tento príkaz reštartuje tvoje aktuálne HUD nastavenia!",
        ["load_square_map"] = "Square Map sa načítava...",
        ["loaded_square_map"] = "Square Map sa načítala!",
        ["load_circle_map"] = "Circle Map sa načítava...",
        ["loaded_circle_map"] = "Circle Map sa načítala!",
        ["cinematic_on"] = "Filmový režim je zapnutý!",
        ["cinematic_off"] = "Filmový režim je vypnutý!",
        ["engine_on"] = "Motor je naštartovaný!",
        ["engine_off"] = "Motor je vypnutý!",
        ["low_fuel"] = "Nízka hladina paliva!",
        ["access_denied"] = "Nemáš oprávnenie!",
        ["stress_gain"] = "Pocituješ väčší stres!",
        ["stress_removed"] = "Pocituješ uvoľnenie!"
    }
}
Lang = Locale:new({phrases = Translations, warnOnMissing = true})
