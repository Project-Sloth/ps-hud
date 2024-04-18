local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD Ayarları Yüklendi!",
        ["hud_restart"] = "HUD Yeniden Başlatılıyor!",
        ["hud_start"] = "HUD Başlatıldı!",
        ["hud_command_info"] = "Mevcut HUD ayarlarınızı sıfırlar!",
        ["load_square_map"] = "Kare Harita Yükleniyor...",
        ["loaded_square_map"] = "Kare Harita Yüklendi!",
        ["load_circle_map"] = "Daire Harita Yükleniyor...",
        ["loaded_circle_map"] = "Daire Harita Yüklendi!",
        ["cinematic_on"] = "Sinema Modu Açık!",
        ["cinematic_off"] = "Sinema Modu Kapalı!",
        ["engine_on"] = "Motor Çalıştırıldı!",
        ["engine_off"] = "Motor Kapatıldı!",
        ["low_fuel"] = "Yakıt Seviyesi Düşük!",
        ["access_denied"] = "Erişim Reddedildi!",
        ["stress_gain"] = "Daha Stresli Hissediyorsunuz!",
        ["stress_removed"] = "Daha Rahatlamış Hissediyorsunuz!"
    }
}

if GetConvar('qb_locale', 'en') == 'tr' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
