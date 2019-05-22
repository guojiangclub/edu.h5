/**
 * Created by Administrator on 2019/1/24.
 */
export default [
    {
        path:'/user',
        name:'users-index',
        component: resolve => require(['./index.vue'],resolve),
        meta :{
            title:'个人中心',
            depth:10
        }
    },
    {
        path:'/about',
        name:'about',
        component: resolve => require(['./about.vue'],resolve),
        meta :{
            title:'技术支持',
            depth:40
        }
    },
    {
        path:'/register',
        name:'users-register',
        component: resolve => require(['./register.vue'],resolve),
        meta :{
            title:'手机号登录',
            depth:60
        }
    },
    {
        path:'/oldlogin',
        name:'users-oldlogin',
        component: resolve => require(['./oldlogin.vue'],resolve),
        meta :{
            title:'老用户登录',
            depth:61
        }
    },
    {
        path:'/mycourse',
        name:'users-mycourse',
        component: resolve => require(['./mycourse.vue'],resolve),
        meta :{
            title:'我的课程',
            depth:10
        }
    },
    {
        path:'/setting',
        name:'users-setting',
        component: resolve => require(['./setting.vue'],resolve),
        meta :{
            title:'设置',
            depth:20,
            authorization: true
        }
    },
    {
        path:'/modify',
        name:'users-modify',
        component: resolve => require(['./modify.vue'],resolve),
        meta :{
            title:'修改手机号',
            depth:30,
            authorization: true
        }
    }
]
