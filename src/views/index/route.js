export default [
    {
        path:'/index/index',
        name:'index-index',
        component: resolve => require(['./index.vue'],resolve),
        meta :{
            title:'首页',
            depth:10
        }

    },
    {
        path:'/index/detail',
        name:'index-detail',
        component: resolve => require(['./detail.vue'],resolve),
        meta :{
            title:'课程详情页'
        }

    }
]
