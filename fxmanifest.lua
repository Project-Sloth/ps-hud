fx_version 'cerulean'
game 'gta5'

description 'qb-hud'
version '2.1.0'

shared_scripts {
	'@qb-core/shared/locale.lua',
	'locales/en.lua',
	'config.lua',
	'uiconfig.lua'
}

client_script 'client.lua'
server_script 'server.lua'
lua54 'yes'

ui_page 'html/index.html'

files {
	'html/index.html',
	'html/index.css',
	'html/index.js',
	'html/vendor.css',
	'html/vendor.js',
}
