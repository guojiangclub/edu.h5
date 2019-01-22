/**
 * Created by Administrator on 2017/5/19.
 */
export default [
    {
        path: '/question/:id',
        name: 'question',
        component: resolve => require(['./index.vue'], resolve),
        meta: {
            title: '问答',
            // authorization: true
        }
    },
    {
        path: '/question/detail/:id',
        name: 'question-detail',
        component: resolve => require(['./detail.vue'], resolve),
        meta: {
            title: '问答详情',
        }
    },
    {
        path: '/question/topic/:id',
        name: 'question-topic',
        component: resolve => require(['./topic.vue'], resolve),
        meta: {
            title: '话题',
        }
    },
	{
		path: '/question/edit/:id',
		name: 'edit-question',
		component: resolve => require(['./edit-question'], resolve),
		meta: {
			title: '编辑回答',
			authorization: true
		}
	}
]
