local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD Settings Loaded!",
        ["hud_restart"] = "HUD Is Restarting!",
        ["hud_start"] = "HUD Is Now Started!",
        ["hud_command_info"] = "This command resets your current HUD settings!",
        ["load_square_map"] = "Square Map Loading...",
        ["loaded_square_map"] = "Square Map Has Loaded!",
        ["load_circle_map"] = "Circle Map Loading...",
        ["loaded_circle_map"] = "Circle Map Has Loaded!",
        ["cinematic_on"] = "Cinematic Mode On!",
        ["cinematic_off"] = "Cinematic Mode Off!",
        ["engine_on"] = "Engine Started!",
        ["engine_off"] = "Engine Shut Down!",
        ["low_fuel"] = "Fuel Level Low!",
        ["access_denied"] = "You Are Not Authorized!",
        ["stress_gain"] = "Feeling More Stressed!",
        ["stress_removed"] = "Feeling More Relaxed!"
    }
}
Lang = Locale:new({phrases = Translations, warnOnMissing = true})
