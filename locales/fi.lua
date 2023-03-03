local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Hudin asetukset ladattu!",
        ["hud_restart"] = "Hudi resettaantuu!",
        ["hud_start"] = "Hudi päällä!",
        ["hud_command_info"] = "Tämä komento vaihtaa hudisi asetukset!",
        ["load_square_map"] = "Neliökartta latautuu...",
        ["loaded_square_map"] = "Neliökartta ladattu!",
        ["load_circle_map"] = "Mappi ladattu...",
        ["loaded_circle_map"] = "Pyöreä mappi ladattu!",
        ["cinematic_on"] = "Elokuvamode päällä!",
        ["cinematic_off"] = "Elokuvamode suljettu!",
        ["engine_on"] = "Moottori käynnistetty!",
        ["engine_off"] = "Moottori sammutettu!",
        ["low_fuel"] = "Bensasi on lopussa!",
        ["access_denied"] = "Eipä ollut tarpeaksi oikeuksia!",
        ["stress_gain"] = "Stressisi nousee!",
        ["stress_removed"] = "Stressisi on nyt loppunut! Otathan ihan clillisti sit"
    }
}

if GetConvar('qb_locale', 'en') == 'fi' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
