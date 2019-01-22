/**
 * Created by Administrator on 2017/5/24.
 */
export default [
    {
        path: '/blogs/:id',
        name: 'blogs',
        component: resolve => require(['./index.vue'], resolve),
        meta: {
            title: '博客',
        }
    },
    {
        path: '/blogs/detail/:id',
        name: 'blogs-detail',
        component: resolve => require(['./detail.vue'], resolve),
        meta: {
            title: '博客详情',
        }
    },
    {
        path: '/blogs/comments/:id',
        name: 'blogs-comments',
        component: resolve => require(['./comments.vue'], resolve),
        meta: {
            title: '评论',
        }
    }
]
