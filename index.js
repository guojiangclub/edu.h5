/**
 * Created by Administrator on 2017/7/5.
 */
//https://swoole-hellobi-beta-admin.ibrand.cc/  天善学院
//    https://guojiang-xueyuan-demo.ibrand.cc/

var globalConfigs = {

	'GLOBAL': {
		'baseUrl': process.env.NODE_ENV !== '"production"' ? '"https://guojiang-xueyuan-demo.ibrand.cc/"' : '"{!API_URL}"', // 运行时自动替换变量
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
