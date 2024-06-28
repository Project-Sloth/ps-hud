fx_version 'cerulean'
game 'gta5'

description 'Ultra customizable hud featuring a unique and robust settings menu. Change eveything about your experience!'
author 'Project-Sloth & GFive'
version 'VERSION_IDENTIFIER'

shared_scripts {
    '@qb-core/shared/locale.lua',
	'locales/en.lua',
	'locales/*.lua',
	'shared/*.lua',
}

client_scripts {
    'client/*.lua'
}
server_scripts {
    'server/*.lua'
}

lua54 'yes'
use_fxv2_oal 'yes'

ui_page 'html/index.html'

files {
	'html/*',
}
