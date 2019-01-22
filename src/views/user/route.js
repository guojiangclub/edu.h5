/**
 * Created by Administrator on 2017/5/22.
 */
export default [
    {
        path: '/user',
        name: 'user-index',
        component: resolve => require(['./index.vue'], resolve),
        meta: {
            title: '我的',
            authorization: true
        }
    },
	{
		path: '/user/profile',
		name: 'user-profile',
		component: resolve => require(['./profile.vue'], resolve),
		meta: {
			title: '个人资料',
			authorization: true
		}
	},
    {
        path: '/user/my-files/:id',
        name: 'myfiles',
        component: resolve => require(['./my-files.vue'], resolve),
        meta: {
            title: '档案',
        }
    },
    {
        path: '/user/edit',
        name: 'edit',
        component: resolve => require(['./edit.vue'], resolve),
        meta: {
            title: '编辑资料',
            authorization: true
        }
    },
    {
        path: '/user/fit',
        name: 'fit',
        component: resolve => require(['./fit.vue'], resolve),
        meta: {
            title: '设置',
        }
    },
    {
        path: '/user/dynamic',
        name: 'dynamic',
        component: resolve => require(['./dynamic.vue'], resolve),
        meta: {
            title: '最新动态',
            authorization: true
        }
    },
    {
        path: '/user/trends/:id',
        name: 'trends',
        component: resolve => require(['./trends.vue'], resolve),
        meta: {
            title: '动态'
        }
    },
    {
        path: '/user/information',
        name: 'information',
        component: resolve => require(['./information.vue'], resolve),
        meta: {
            title: '消息列表',
            authorization: true
        }
    },
    {
        path: '/user/private',
        name: 'private',
        component: resolve => require(['./private.vue'], resolve),
        meta: {
            title: '私信',
        }
    },
    {
        path: '/user/task',
        name: 'task',
        component: resolve => require(['./task.vue'], resolve),
        meta: {
            title: '我的任务',
            authorization: true
        }
    },
    {
        path: '/user/uncertified',
        name: 'uncertified',
        component: resolve => require(['./uncertified.vue'], resolve),
        meta: {
            title: '我的',
        }
    },
    {
        path: '/user/identity',
        name: 'identity',
        component: resolve => require(['./identity.vue'], resolve),
        meta: {
            title: '我的',
        }
    },
    {
        path: '/user/upload',
        name: 'upload',
        component: resolve => require(['./upload.vue'], resolve),
        meta: {
            title: '我的',
        }
    },
    {
        path: '/user/success',
        name: 'success',
        component: resolve => require(['./success.vue'], resolve),
        meta: {
            title: '我的',
        }
    },
    {
        path: '/user/postbox',
        name: 'postbox',
        component: resolve => require(['./postbox.vue'], resolve),
        meta: {
            title: '邮箱',
        }
    },
    {
        path: '/user/phone',
        name: 'phone',
        component: resolve => require(['./phone.vue'], resolve),
        meta: {
            title: '修改手机号',
        }
    },
    {
        path: '/user/recruitment',
        name: 'recruitment',
        component: resolve => require(['./recruitment.vue'], resolve),
        meta: {
            title: '招聘',
        }
    },
    {
        path: '/user/particular',
        name: 'particular',
        component: resolve => require(['./particular.vue'], resolve),
        meta: {
            title: '招聘',
        }
    },
    {
        path: '/user/extension',
        name: 'extension',
        component: resolve => require(['./extension.vue'], resolve),
        meta: {
            title: '我的推广',
        }
    },
    {
        path: '/user/contactus',
        name: 'contactus',
        component: resolve => require(['./contactus.vue'], resolve),
        meta: {
            title: '联系我们',
        }
    },
   /* {
        path: '/user/slide-time',
        name: 'time',
        component: resolve => require(['./slide-time.vue'], resolve),
        meta: {
            title: '进度条',
        }
    },
    {
        path: '/user/video-player',
        name: 'player',
        component: resolve => require(['./video-player.vue'], resolve),
        meta: {
            title: '视频插件',
        }
    }*/
]
