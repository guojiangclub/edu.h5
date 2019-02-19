/**
 * Created by Administrator on 2019/1/25.
 */
import { Cache, cache_keys } from '../../utils/util';
//获取短信验证码
export const queryCode = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/sms/verify-code',{
                mobile:data.mobile,
                access_token:data.access_token

        }).then(res =>{
        res = res.data;
        if(res.success){
            EventBus.$emit('codeData',res);
        } else {
            EventBus.$dialog.alert({message: '请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })

}
//请求登录接口
export const queryLogin = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + "api/oauth/sms",{
            mobile:data.mobile,
            code:data.code,
            open_id:data.open_id

        }).then(res =>{
        res = res.data;
        if(res.data.access_token){
            EventBus.$emit('loginDate',res);
        } else {
            EventBus.$dialog.alert({message: '验证码不正确'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })

}
