export default [
	{
		path: '/user/favorites/:id',
		name: 'user-favorites',
		component: resolve => require(['./favorites.vue'], resolve),
		meta: {
			title: '收藏',
			authorization: true
		}
	},
	{
		path: '/user/favorites-detail',
		name: 'favorites-detail',
		component: resolve => require(['./favorites-detail.vue'], resolve),
		meta: {
			title: '收藏',
		}
	},
	{
		path: '/user/favorites-add',
		name: 'favorites-add',
		component: resolve => require(['./favorites-add.vue'], resolve),
		meta: {
			title: '收藏',
		}
	},
]