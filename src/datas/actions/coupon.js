/**
 * Created by Administrator on 2019/2/21.
 */
import { Cache, cache_keys } from '../../utils/util';
export const queryCouponList = function ({commit,state},data) {
    var oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/users/coupons',{
            params:{
                type:data.type,
                page:data.page
            },
            headers:{
                Authorization:oauth.access_token
            }
        }).then(res =>{
        res = res.data;
        if(res.status){
            if(res.meta && res.meta.pagination){
                EventBus.$emit('couponList',res);
            } else {
                EventBus.$dialog.alert({message: res.message || '请求失败'});
            }
        } else {
            EventBus.$dialog.alert({message: '请求失败'});
        }
        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })

}
