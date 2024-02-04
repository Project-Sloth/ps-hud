local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD設定を読み込みました!",
        ["hud_restart"] = "HUDを再起動しています!",
        ["hud_start"] = "HUDを起動しました!",
        ["hud_command_info"] = "このコマンドを実行するとHUD設定を初期化します!",
        ["load_square_map"] = "スクエアマップを読み込み中...",
        ["loaded_square_map"] = "スクエアマップを読み込みました!",
        ["load_circle_map"] = "サークルマップを読み込み中...",
        ["loaded_circle_map"] = "サークルマップを読み込みました!",
        ["cinematic_on"] = "シネマティックモードを有効にしました!",
        ["cinematic_off"] = "シネマティックモードを無効にしました!",
        ["engine_on"] = "エンジンを始動しました!",
        ["engine_off"] = "エンジンを停止しました!",
        ["low_fuel"] = "燃料が残りわずかです!",
        ["access_denied"] = "許可されていません!",
        ["stress_gain"] = "ストレスを感じた!",
        ["stress_removed"] = "気分がリラックスした!"
    },
    info = {
        ["toggle_engine"] = "エンジン切り替え",
        ["open_menu"] = "メニューを開く",
        ["check_cash_balance"] = "所持金を確認",
        ["check_bank_balance"] = "銀行残高を確認",
        ["toggle_dev_mode"] = "開発者モードを切り替え",
    }
}

if GetConvar('qb_locale', 'en') == 'ja' then
    Lang = Locale:new({
        phrases = Translations,
        warnOnMissing = true,
        fallbackLang = Lang,
    })
end
