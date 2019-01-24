/**
 * Created by Administrator on 2019/1/24.
 */
export default [
    {
        path:'/users/index',
        name:'users-index',
        component: resolve => require(['./index.vue'],resolve),
        meta :{
            title:'个人中心',
            depth:10
        }
    },
    {
        path:'/users/register',
        name:'users-register',
        component: resolve => require(['./register.vue'],resolve),
        meta :{
            title:'手机号登录'
        }
    },
    {
        path:'/users/oldlogin',
        name:'users-oldlogin',
        component: resolve => require(['./oldlogin.vue'],resolve),
        meta :{
            title:'老用户登录'
        }
    }
]
