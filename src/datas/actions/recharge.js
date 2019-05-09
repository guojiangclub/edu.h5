/**
 * Created by Administrator on 2019/2/20.
 */
import { Cache, cache_keys } from '../../utils/util';
//请求支付的charge接口
export const queryOrderChare = function ({commit,state},data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/edu/course/order/charge',{
            order_no:data.order_no,
            coupon_id:data.coupon_id,
            channel:data.channel,
            note:data.note,
            extra:data.extra
        },{
            headers:{
                Authorization: oauth.access_token
            }
        }).then(res =>{
        res = res.data;
        if(res.status){
            EventBus.$emit('chargeOrder',res);

        } else {
            EventBus.$dialog.alert({message:res.message|| '请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })


}
//请求支付成功接口
export const queryOrderPaid = function ({commit,state},data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/edu/course/order/paid',{
            order_no:data.order_no,
            charge_id:data.charge_id
        },{
            headers:{
                Authorization: oauth.access_token
            }
        }).then(res =>{
        res = res.data;
        if(res.status){
            EventBus.$emit('paidOrder',res);
        } else {
            EventBus.$dialog.alert({message: res.message || '请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        console.log(7897987);
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })


}
