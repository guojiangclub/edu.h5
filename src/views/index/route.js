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
        path:'/index/detail/:id',
        name:'index-detail',
        component: resolve => require(['./detail.vue'],resolve),
        meta :{
            title:'课程详情页'
        }

    },
    {
        path:'/index/search',
        name:'index-search',
        component: resolve => require(['./search.vue'],resolve),
        meta :{
            title:'搜索页'
        }

    },
    {
        path:'/index/teacher/:id',
        name:'index-teacher',
        component: resolve => require(['./teacher.vue'],resolve),
        meta :{
            title:'教师详情页'
        }

    },
    {
        path:'/index/classification/:id',
        name:'index-classification',
        component: resolve => require(['./classification.vue'],resolve),
        meta :{
            title:'分类页面'
        }

    },
    {
        path:'/index/studentinfo',
        name:'index-studentinfo',
        component: resolve => require(['./studentinfo.vue'],resolve),
        meta :{
            title:'学员信息'
        }

    },
    {
        path:'/index/lessons/:course_id/:id',
        name:'index-lessons',
        component: resolve => require(['./lessons.vue'],resolve),
        meta :{
            title:'课时详情'
        }

    },
    {
        path:'/index/svip',
        name:'index-svip',
        component: resolve => require(['./svip.vue'],resolve),
        meta :{
            title:'svip页面'
        }

    }
]
