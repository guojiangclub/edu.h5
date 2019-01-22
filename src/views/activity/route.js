/**
 * Created by Administrator on 2017/5/25.
 */
export default [
    {
        path: '/activity',
        name: 'activity',
        component: resolve => require(['./index.vue'], resolve),
        meta: {
            title: '活动',
        }
    },
    {
        path: '/activity/detail/:id',
        name: 'activity-detail',
        component: resolve => require(['./detail.vue'], resolve),
        meta: {
            title: '活动详情',
        }
    }
]
