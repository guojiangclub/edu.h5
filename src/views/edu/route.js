/**
 * Created by Administrator on 2017/5/24.
 */
export default [
    {
        path: '/edu',
        name: 'edu',
        component: resolve => require(['./index.vue'], resolve),
        meta: {
            title: '课程',
        }
    },
    {
        path: '/edu/category',
        name: 'edu-category',
        component: resolve => require(['./category.vue'], resolve),
        meta: {
            title: '分类',
        }
    },
    {
        path: '/edu/category/:id',
        name: 'edu-category-detail',
        component: resolve => require(['./category-detail.vue'], resolve),
        meta: {
            title: '课程',
        }
    },
    {
        path: '/edu/course/:id',
        name: 'edu-course',
        component: resolve => require(['./edu-detail.vue'], resolve),
        meta: {
            title: '课程',
        }
    },
    {
        path: '/edu/lesson/:courseId/:id',
        name: 'edu-lesson',
        component: resolve => require(['./lesson.vue'], resolve),
        meta: {
            title: '课程播放',
	        authorization: true
        }
    },
	{
		path: '/edu/comments/:id',
		name: 'edu-comments',
		component: resolve => require(['./comments.vue'], resolve),
		meta: {
			title: '评论'
		}
	},
	{
		path: '/edu/svip2017',
		name: 'edu-svip',
		component: resolve => require(['./svip.vue'], resolve),
		meta: {
			title: '天善智能年度SVIP会员募集计划热力来袭！'
		}
	},
    {
        path: '/edu/svip',
        name: 'edu-svip-new',
        component: resolve => require(['./svipnew.vue'], resolve),
        meta: {
            title: '天善智能SVIP为你的数据之路保驾护航！'
        }
    },
    {
        path: '/edu/1111',
        name: 'edu-double',
        component: resolve => require(['./double.vue'], resolve),
        meta: {
            title: '天善智能11.11狂欢'
        }
    },
	{
		path: '/edu/classes',
		name: 'edu-classes',
		component: resolve => require(['./classes.vue'], resolve),
		meta: {
			title: '班级套餐'
		}
	},
	{
		path: '/edu/classes/detail/:id',
		name: 'edu-classes-detail',
		component: resolve => require(['./classes-detail.vue'], resolve),
		meta: {
			title: ' '
		}
	},
    {
        path: '/edu/purchase/:id',
        name: 'purchase',
        component: resolve => require(['./purchase.vue'], resolve),
        meta: {
            title: '标题'
        }
    },
    {
        path: '/edu/edu-success',
        name: 'edu-success',
        component: resolve => require(['./edu-success.vue'], resolve),
        meta: {
            title: '标题'
        }
    },
    {
        path: '/data',
        name: 'data',
        component: resolve => require(['./data-analysis.vue'], resolve),
        meta: {
            title: '数据分析师八大能力培养'
        }
    }

]
