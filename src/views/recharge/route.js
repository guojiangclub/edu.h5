/**
 * Created by Administrator on 2019/1/24.
 */
export default [
    {
        path:'/pay/:id',
        name:'recharge-pay',
        component: resolve => require(['./pay.vue'],resolve),
        meta :{
            title:'支付页面',
            depth:40,
            authorization: true
        }
    },
    {
        path:'/success',
        name:'recharge-success',
        component: resolve => require(['./success.vue'],resolve),
        meta :{
            title:'支付结果',
            depth:10,
            depth:50,
            authorization: true
        }
    }
]
