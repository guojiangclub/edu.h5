/**
 * Created by Administrator on 2017/5/26.
 */
export default [
    {
        path: '/news',
        name: 'news',
        component: resolve => require(['./index.vue'], resolve),
        meta: {
            title: '头条',
        }
    },
    {
        path: '/news/detail/:id',
        name: 'news-detail',
        component: resolve => require(['./detail.vue'], resolve),
        meta: {
            title: '头条详情',
        }
    },
]
