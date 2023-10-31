local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD-innstillinger lastet!",
        ["hud_restart"] = "HUD starter på nytt!",
        ["hud_start"] = "HUD er nå startet opp!",
        ["hud_command_info"] = "Denne kommandoen tilbakestiller dine nåværende HUD-innstillinger!",
        ["load_square_map"] = "Firkantet kart lastes inn...",
        ["loaded_square_map"] = "Firkantet kart er lastet inn!",
        ["load_circle_map"] = "Rundt kart lastes inn..",
        ["loaded_circle_map"] = "Rundt kart er lastet inn!",
        ["cinematic_on"] = "Kinematisk modus på!",
        ["cinematic_off"] = "Kinematisk modus av!",
        ["engine_on"] = "Motor startet!",
        ["engine_off"] = "Motor er blitt avslått!",
        ["low_fuel"] = "lavt drivstoffnivå!",
        ["access_denied"] = "Du er ikke autorisert!",
        ["stress_gain"] = "Du føler deg stresset!",
        ["stress_removed"] = "Føler deg mer avslappet!"
    },
    info = {
        ["toggle_engine"] = "Skru på motoren",
        ["open_menu"] = "Åpne menyen",
        ["check_cash_balance"] = "Sjekk kontantsaldoen",
        ["check_bank_balance"] = "Sjekk banksaldo",
        ["toggle_dev_mode"] = "Aktiver/Deaktiver developer Modus",
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})