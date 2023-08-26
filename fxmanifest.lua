fx_version 'cerulean'
game 'gta5'

description 'ps-hud'
version '2.2.0'

shared_scripts {
	'@ox_lib/init.lua',
	'framework/shared.lua',
	'config.lua',
	'uiconfig.lua'
}

client_scripts {
	'framework/**/client.lua',
	'seatbelt/client.lua',
	'client.lua'
}
server_scripts {
	'framework/**/server.lua',
	'seatbelt/server.lua',
	'server.lua'
}

lua54 'yes'
use_fxv2_oal 'yes'

ui_page 'html/index.html'

files {
	'html/*',
	'locales/*.json'
}

dependencies {
	'ox_lib'
}
