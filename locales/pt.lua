local Translations = {
    notify = {
        ["hud_settings_loaded"] = "Definições Do HUD Carregadas!",
        ["hud_restart"] = "O HUD Está A Reiniciar!",
        ["hud_start"] = "O HUD Está Agora Iniciada!",
        ["hud_command_info"] = "Este comando reseta as definições do teu HUD!",
        ["load_square_map"] = "A Carregar Mapa Quadrado...",
        ["loaded_square_map"] = "Mapa Quadrado Carregado!",
        ["load_circle_map"] = "A Carregar Mapa Redondo...",
        ["loaded_circle_map"] = "Mapa Redondo Carregado!",
        ["cinematic_on"] = "Modo Cinematic Ativado!",
        ["cinematic_off"] = "Modo Cinematic Desativado!",
        ["engine_on"] = "Motor Ligado!",
        ["engine_off"] = "Motor Desligado!",
        ["low_fuel"] = "Nível Do Óleo Em Baixo!",
        ["access_denied"] = "Não Estás Autorizado!",
        ["stress_gain"] = "A Sentir-me Mais Stressado(a)!",
        ["stress_removed"] = "A Sentir-me Mais Calmo(a)!"
    }
}

if GetConvar('qb_locale', 'en') == 'pt' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
