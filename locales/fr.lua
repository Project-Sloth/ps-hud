local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Paramètres du HUD chargés!",
        ["hud_restart"] = "L'HUD redémarre!",
        ["hud_start"] = "L'HUD a démarré!",
        ["hud_command_info"] = "Cette commande réinitialise vos paramètres d'HUD!",
        ["load_square_map"] = "Chargement de la minimap carrée...",
        ["loaded_square_map"] = "La minimap carrée a chargé!",
        ["load_circle_map"] = "Chargement de la minimap ronde...",
        ["loaded_circle_map"] = "La minimap ronde a chargé!",
        ["cinematic_on"] = "Mode cinématique activé!",
        ["cinematic_off"] = "Mode cinématique désactivé!",
        ["engine_on"] = "Moteur allumé!",
        ["engine_off"] = "Moteur éteint!",
        ["low_fuel"] = "Niveau d'essence bas!",
        ["access_denied"] = "Vous n'êtes pas autorisé!",
        ["stress_gain"] = "Vous stressez!",
        ["stress_removed"] = "Vous vous relaxez!"
    },
    info = {
        ["toggle_engine"] = "Activer/Désactiver le moteur",
        ["open_menu"] = "Ouvrir le menu",
        ["check_cash_balance"] = "Vérifier le montant en billets",
        ["check_bank_balance"] = "Vérifier le solde bancaire",
        ["toggle_dev_mode"] = "Activer/Désactiver le mode développeur",
    }
}

if GetConvar('qb_locale', 'en') == 'fr' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
