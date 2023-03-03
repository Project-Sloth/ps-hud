local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Tanzimat HUD Bargozari Shod!",
        ["hud_restart"] = "Dar Hale Bargozari Mojadad HUD!",
        ["hud_start"] = "HUD Bargozari Shod!",
        ["hud_command_info"] = "In Dastor Tanzimat HUD Feli Shoma Ra Taghir Midahad!",
        ["load_square_map"] = "Nagsheye Mostatili Bargozari Shod...",
        ["loaded_square_map"] = "Nagsheye Mostatili Bargozari Shod!",
        ["load_circle_map"] = "Nagsheye Daayerei Bargozari Shod...",
        ["loaded_circle_map"] = "Nagsheye Daayerei Bargozari Shod!",
        ["cinematic_on"] = "Halat Sinemayi Faal Shod!",
        ["cinematic_off"] = "Halat Sinemayi Gheyre Faal Shod!",
        ["engine_on"] = "Motor Roshan Shod!",
        ["engine_off"] = "Motor Khamosh Shod!",
        ["low_fuel"] = "Sokht Dar Hale Etmam Ast!",
        ["access_denied"] = "Shoma Mojaz Be In Kar Nistid!",
        ["stress_gain"] = "Mizan Estres Dar Hale Afzayesh Ast!",
        ["stress_removed"] = "Mizan Estres Dar Hale Kahesh Ast!"
    }
}

if GetConvar('qb_locale', 'en') == 'fa' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
