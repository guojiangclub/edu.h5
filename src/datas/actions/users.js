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
            EventBus.$emit('modifycodeData',res);
        } else {
            EventBus.$dialog.alert({message: res.message||'请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })

}
//请求登录接口
export const queryLoginNew = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + "api/oauth/sms",{
            mobile:data.mobile,
            code:data.code,
            open_id:data.open_id,
            app: 'edu'
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
//获取我的课程分页列表
export const queryMycourseList = function ({commit,state},data) {
    let oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/my/courses',{
            params:{
                page:data.page
            },
            headers:{
                Authorization:oauth.access_token
            }

        })
        .then(res =>{
            res = res.data;
            if (res.status){
                if(res.meta && res.meta.pagination){
                    EventBus.$emit('myCourseList',res)
                }
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
//获取我的通知公告分页列表
export const queryMynoteList = function ({commit,state},data) {
    let oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/my/courses/announcement',{
            params:{
                page:data.page
            },
            headers:{
                Authorization:oauth.access_token
            }

        })
        .then(res =>{
            res = res.data;
            if (res.status){
                if(res.meta && res.meta.pagination){
                    EventBus.$emit('mynoteList',res)
                }
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
//获取个人中心页面的个人信息
export const queryMyinfo = function ({commit,state}) {
    let oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/me',{
            headers:{
                Authorization:oauth.access_token
            }

        })
        .then(res =>{
            res = res.data;
            if (res.status){
                EventBus.$emit('myUserInfo',res)
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
//微信环境下获取openid
export const queryWxOpenId = function ({commit,state},data) {
    let oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/oauth/official-account/get-redirect-url',{
            params:{
                redirect_url:data.redirect_url,
                app: 'edu'
            }
        })
        .then(res =>{
            res = res.data;
            if (res.status){
                EventBus.$emit('redirectUrl',res)
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
//微信环境下快捷登录
export const queryquicklogin = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/oauth/official-account/quick-login',{
            open_id:data.open_id,
            app: 'edu'
        })
        .then(res =>{
            res = res.data;
            if (res.status){
                EventBus.$emit('quickLoginData',res)
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
//请求绑定绑定老用户的接口
export const queryOldAccount = function ({commit,state},data) {
    let oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/oauth/bindOldAccount',{
            username:data.username,
            password:data.password
        },{
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res =>{
            res = res.data;
            if (res.status){
                EventBus.$emit('oldAccountDate',res)
            }else {
                EventBus.$dialog.alert({message: res.message||'请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
//请求修改手机号的接口
export const queryUpdatemobile = function ({commit,state},data) {
    let oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/edu/users/update/mobile',{
            mobile:data.mobile,
            code:data.code
        },{
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res =>{
            res = res.data;
            if (res.status){
                EventBus.$emit('updateMobileData',res)
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
