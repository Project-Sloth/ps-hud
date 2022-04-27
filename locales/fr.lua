local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Paramètres du HUD chargés!",
        ["hud_restart"] = "L'HUD redémarre!",
        ["hud_start"] = "L'HUD a demarré!",
        ["hud_command_info"] = "Cette commande réinitialise vos paramètre d'HUD!",
        ["load_square_map"] = "Chargement de la carte carrée...",
        ["loaded_square_map"] = "La carte carrée à chargée!",
        ["load_circle_map"] = "Chargement de la carte ronde...",
        ["loaded_circle_map"] = "La carte ronde à chargée!",
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
Lang = Locale:new({phrases = Translations, warnOnMissing = true})
