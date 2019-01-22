export default [
	{
		path: '/user/login',
		name: 'user-login',
		component: resolve => require(['./login.vue'], resolve),
		meta: {
			title: '登录',
			depth: 10
		}
	},
	{
		path: '/user/register',
		name: 'user-register',
		component: resolve => require(['./register.vue'], resolve),
		meta: {
			title: '注册',
		}
	},
	{
		path: '/user/find-password',
		name: 'user-find',
		component: resolve => require(['./find-pwd.vue'], resolve),
		meta: {
			title: '找回密码',
		}
	},
	{
		path: '/user/amend-password',
		name: 'user-amend',
		component: resolve => require(['./amend-pwd.vue'], resolve),
		meta: {
			title: '修改密码',
			authorization: true
		}
	},
]