export default [
	{
		path: '/user/answer/:id',
		name: 'user-answer',
		component: resolve => require(['./answer.vue'], resolve),
		meta: {
			title: '回答',
			// authorization: true
		}
	},
	{
		path: '/user/ask/:id',
		name: 'user-ask',
		component: resolve => require(['./ask.vue'], resolve),
		meta: {
			title: '提问',
			// authorization: true
		}
	},
	{
		path: '/user/course/:id',
		name: 'user-course',
		component: resolve => require(['./course.vue'], resolve),
		meta: {
			title: '课程',
			// authorization: true
		}
	},
	{
		path: '/user/attention/:id',
		name: 'user-attention',
		component: resolve => require(['./attention.vue'], resolve),
		meta: {
			title: '关注',
			// authorization: true
		}
	},
	{
		path: '/user/blogs/:id',
		name: 'user-blogs',
		component: resolve => require(['./blogs.vue'], resolve),
		meta: {
			title: '文章',
			// authorization: true
		}
	},
	{
		path: '/user/follow/:id',
		name: 'user-follow',
		component: resolve => require(['./follow.vue'], resolve),
		meta: {
			title:'关注'
		}
	},
	{
		path: '/user/fans/:id',
		name: 'user-fans',
		component: resolve => require(['./fans.vue'], resolve),
		meta: {
			title:'粉丝'
		}
	},
    {
        path: '/user/works',
        name: 'works',
        component: resolve => require(['./works.vue'], resolve),
        meta: {
            title: '编辑工作经历',
            authorization: true
        }
    },
    {
        path: '/user/projects',
        name: 'projects',
        component: resolve => require(['./projects.vue'], resolve),
        meta: {
            title: '编辑项目',
            authorization: true
        }
    },
    {
        path: '/user/schools',
        name: 'schools',
        component: resolve => require(['./schools.vue'], resolve),
        meta: {
            title: '编辑教育',
            authorization: true
        }
    },
    {
        path: '/visitor/:id',
        name: 'visitor',
        component: resolve => require(['./visitor.vue'], resolve),
        meta: {
            title: '用户资料',
        }
    },
]
