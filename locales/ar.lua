
local Translations = {
    notify = {
        ["hud_settings_loaded"] = "تم تحميل إعدادات الهود",
        ["hud_restart"] = "تم اعادة الهود للوضع الاصلي",
        ["hud_start"] = "تم تشغيل الهود",
        ["hud_command_info"] = "هذا الأمر يعيد ضبط إعدادات شاشة الهود الى الوضع الاصلي",
        ["load_square_map"] = "تحميل خريطة مربعة",
        ["loaded_square_map"] = "تم تحميل خريطة مربعة",
        ["load_circle_map"] = "تحميل خريطة الدائرة",
        ["loaded_circle_map"] = "تم تحميل خريطة الدائرة",
        ["cinematic_on"] = "الوضع السينمائي قيد التشغيل",
        ["cinematic_off"] = "الوضع السينمائي قيد الايقاف",
        ["engine_on"] = "بدأ المحرك",
        ["engine_off"] = "اغلاق المحرك",
        ["low_fuel"] = "مستوى الوقود منخفض",
        ["access_denied"] = "غير مسموح لك القيام بذالك",
        ["stress_gain"] = "الشعور بمزيد من التوتر",
        ["stress_removed"] = "الشعور براحة أكبر"
    }
}
Lang = Locale:new({phrases = Translations, warnOnMissing = true})
