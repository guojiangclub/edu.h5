/**
 * Created by Administrator on 2017/7/5.
 */

var globalConfigs = {

	'GLOBAL': {
		'baseUrl': process.env.NODE_ENV !== '"production"' ? '"https://swoole-hellobi-beta-admin.ibrand.cc/"' : '"{!API_URL}"', // 运行时自动替换变量
        'ea': {
            'analytics':{
                'accounts':{
                    'baidu':'""',
                    'google':'""'
                },
                'cookieDomain':'"auto"'
            }
        },
        'brand':'"hellobi"'
	},

};

module.exports = globalConfigs
