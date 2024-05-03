local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Configurações do HUD carregadas!",
        ["hud_restart"] = "Reiniciando o HUD!",
        ["hud_start"] = "O HUD foi iniciado!",
        ["hud_command_info"] = "Este comando reseta as configurações do seu HUD!",
        ["load_square_map"] = "Carregando Mapa quadrado...",
        ["loaded_square_map"] = "Mapa quadrado carregado!",
        ["load_circle_map"] = "Carregando Mapa redondo...",
        ["loaded_circle_map"] = "Mapa redondo carregado!",
        ["cinematic_on"] = "Modo cinematográfico ativado!",
        ["cinematic_off"] = "Modo cinematográfico desativado!",
        ["engine_on"] = "Motor ligado!",
        ["engine_off"] = "Motor desligado!",
        ["low_fuel"] = "Nível de combustível baixo!",
        ["access_denied"] = "Acesso negado!",
        ["stress_gain"] = "Se sentindo mais Stressado(a)!",
        ["stress_removed"] = "Se sentindo mais Calmo(a)!"
    },
    info = {
        ["toggle_engine"] = "Ligar/Desligar motor",
        ["open_menu"] = "Abrir Menu",
        ["check_cash_balance"] = "Checar dinheiro na carteira",
        ["check_bank_balance"] = "Checar conta bancária",
        ["toggle_dev_mode"] = "Ativar/Desativar modo desenvolvedor",
    }
}

if GetConvar('qb_locale', 'en') == 'pt-br' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
