/**
 * Created by Administrator on 2019/1/24.
 */
export default [
    {
        path:'/coupon/center',
        name:'coupon-center',
        component: resolve => require(['./center.vue'],resolve),
        meta :{
            title:'可用优惠券',
            depth:10,
            authorization: true
        }

},
    {
        path:'/coupon/index',
        name:'coupon-index',
        component: resolve => require(['./index.vue'],resolve),
        meta :{
            title:'我的优惠券',
            authorization: true
        }

    }
]
