local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Paramètres du HUD chargés!",
        ["hud_restart"] = "L'HUD redémarre!",
        ["hud_start"] = "L'HUD a demarré!",
        ["hud_command_info"] = "Cette commande réinitialise vos paramètre d'HUD!",
        ["load_square_map"] = "Chargement de la minimap carré...",
        ["loaded_square_map"] = "La minimap carré a chargé!",
        ["load_circle_map"] = "Chargement de la minimap ronde...",
        ["loaded_circle_map"] = "La minimap ronde a chargé!",
        ["cinematic_on"] = "Mode cinématique activé!",
        ["cinematic_off"] = "Mode cinématique désactivé!",
        ["engine_on"] = "Moteur allumé!",
        ["engine_off"] = "Moteur éteint!",
        ["low_fuel"] = "Niveau d'essence bas!",
        ["access_denied"] = "Vous n'êtes pas autorisé!",
        ["stress_gain"] = "Vous stressez!",
        ["stress_removed"] = "Vous-vous relaxez!"
    }
}

if GetConvar('qb_locale', 'en') == 'fr' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
