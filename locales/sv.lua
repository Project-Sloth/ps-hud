local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD Inställningar laddade!",
        ["hud_restart"] = "HUD startar om!",
        ["hud_start"] = "HUD är startad!",
        ["hud_command_info"] = "Detta kommando nollställer dina nuvarande HUD-inställningar!",
        ["load_square_map"] = "Kvadratisk karta laddas!",
        ["loaded_square_map"] = "Kvadratisk karta har laddats!",
        ["load_circle_map"] = "Cirkelkartan laddas!",
        ["loaded_circle_map"] = "Cirkelkartan har laddats!",
        ["cinematic_on"] = "Bioläge på!",
        ["cinematic_off"] = "Bioläge av!",
        ["engine_on"] = "Motorn startade!",
        ["engine_off"] = "Motorn stängs av!",
        ["low_fuel"] = "Låg bränslenivå!",
        ["access_denied"] = "Du är inte behörighet att göra detta!",
        ["stress_gain"] = "Känner dig mer stressad!",
        ["stress_removed"] = "Känner dig mer avslappnad!"
    }
}

if GetConvar('qb_locale', 'en') == 'sv' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
