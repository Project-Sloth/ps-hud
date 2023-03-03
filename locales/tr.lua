local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD Ayarları Yüklendi!",
        ["hud_restart"] = "HUD Yeniden Başlatılıyor!",
        ["hud_start"] = "HUD Şimdi Başladı!",
        ["hud_command_info"] = "Bu komut, mevcut HUD ayarlarınızı sıfırlar!",
        ["load_square_map"] = "Kare Harita Yükleniyor...",
        ["loaded_square_map"] = "Kare Harita Yüklendi!",
        ["load_circle_map"] = "Çember Haritası Yükleniyor...",
        ["loaded_circle_map"] = "Daire Haritası Yüklendi!",
        ["cinematic_on"] = "Sinema Modu Açık!",
        ["cinematic_off"] = "Sinema Modu Kapalı!",
        ["engine_on"] = "Motor Çalıştırıldı!",
        ["engine_off"] = "Motor Kapatıldı!",
        ["low_fuel"] = "Yakıt Seviyesi Düşük!",
        ["access_denied"] = "You Are Not Authorized!",
        ["stress_gain"] = "Daha Stresli Hissediyorum!",
        ["stress_removed"] = "Daha Rahatlamış Hissediyorum!"
    }
}

if GetConvar('qb_locale', 'en') == 'tr' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
