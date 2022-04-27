local Translations = {
    notify = {
        ["hud_settings_loaded"] = "HUD პარამეტრების ჩატვირთვა!",
        ["hud_restart"] = "HUD -ი რესტარტდება!",
        ["hud_start"] = "HUD -ი ჩართულია!",
        ["hud_command_info"] = "ეს ბრძანება დაარესეტებს ასებულ მონაცმებს!",
        ["load_square_map"] = "რუკა იტვირთება...",
        ["loaded_square_map"] = "რუკა ჩაიტვირთა!",
        ["load_circle_map"] = "რგვალი რუკა იტვირთება...",
        ["loaded_circle_map"] = "მრგვალი რუკა ჩაიტვირთა!",
        ["cinematic_on"] = "Cinematic რეჯიმის ჩართვა!",
        ["cinematic_off"] = "Cinematic რეჟიმის გათიშვა!",
        ["engine_on"] = "ავტომობილის დაქოქვა!",
        ["engine_off"] = "ავტომობილის ჩაქრობა!",
        ["low_fuel"] = "საწვავის ავზის მაჩვენებელი მინიმუმზე!",
        ["access_denied"] = "არ ხარ ავტორიზირებული!",
        ["stress_gain"] = "თავს გრძნობ მეტი სტრესის ქვეშ!",
        ["stress_removed"] = "თავს გრძნობ რელაქსირებულად!"
    }
}
Lang = Locale:new({phrases = Translations, warnOnMissing = true})
