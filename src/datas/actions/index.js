/**
 * Created by Administrator on 2019/1/25.
 */
import { Cache, cache_keys } from '../../utils/util';

//首页banner区的，优惠券，分类等数据
export const queryHomeDate = function ({commit,state}) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/home/index')
        .then(res =>{
            res = res.data;
            //分发一个事件出去，将数据分发到页面中去
            if(res.status){
                EventBus.$emit('gethomeDate',res);
                //分发事件，分类页面获取分类种类
                EventBus.$emit('getKinds',res);
            } else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()

        },err =>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
    })


}
//获取推荐课程的课程列表
export const queryCourseList = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/home/courses',{
            params:{
                page:data.page,
            }
        })
        .then(res =>{
            res = res.data;
            if(res.status){
                if(res.meta && res.meta.pagination){
                    EventBus.$emit('courseList',res);
                } else {
                    EventBus.$dialog.alert({message: '请求失败'});
                }
            } else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err =>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
//搜索页面的课程列表
export const querySearch = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/course/search',{
            params:{
                title:data.title,
                page:data.page
            }
        }).then(res =>{
            res = res.data;
            if(res.status){
                if(res.meta && res.meta.pagination){
                    EventBus.$emit('searchList',res);
                } else {
                    EventBus.$dialog.alert({message: '请求失败'});
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
//分类页面的课程列表
export const queryClassify = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/courses',{
            params:{
                type:data.type,
                category:data.category,
                page:data.page
            }
        }).then(res =>{
        res = res.data;
        if(res.status){
            if(res.meta && res.meta.pagination){
                EventBus.$emit('classifyList',res);
            } else {
                EventBus.$dialog.alert({message: '请求失败'});
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
//详情页数据
export const queryDetail = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/course/'+data.id,{
            headers:{
                Authorization: access_token
            }
        })
        .then(res =>{
        res = res.data;
            if (res.status){
                EventBus.$emit('detailDate',res)
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })

}
//获取课时列表页
export const queryClassList = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + "api/edu/course/"+data.id+"/lessons",{

        }).then(res =>{
        res = res.data;
        if(res.status){
            EventBus.$emit('classList',res);
        } else {
            EventBus.$dialog.alert({message: '请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })
}
//请求客服的数据
export const querySystem = function ({commit,state}) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/system/init')
        .then(res =>{
            res = res.data;
            //分发一个事件出去，将数据分发到页面中去
            if(res.status){
                EventBus.$emit('serviceinfo',res);
            } else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()

        },err =>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })


}
//请求教师详情页的接口
export const querytearch = function ({commit,state},data) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/teacher/'+data.id,{

        }).then(res =>{
        res = res.data;
        if(res.status){
            EventBus.$emit('tearcherdata',res);
        } else {
            EventBus.$dialog.alert({message: '请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })
}
//请求领取优惠券的接口
export const queryTakecoupon = function ({commit,state},data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/edu/coupon/take',{
            discount_id:data.discount_id
        },{
            headers:{
                Authorization: oauth.access_token
            }
        }).then(res =>{
        res = res.data;
        if(res.status){
            EventBus.$emit('takeCoupon',res);
            EventBus.$emit('reciveCoupon',res);

        } else {
            EventBus.$dialog.alert({message: '请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })
}
//购买课程，创建课程临时订单，必须登录后才可以请求该接口
export const queryOrder = function ({commit,state},data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/edu/course/order/create',{
            course_id:data.course_id
        },{
            headers:{
                Authorization: oauth.access_token
            }
        }).then(res =>{
        res = res.data;
        if(res.status){
            EventBus.$emit('createOrder',res);

        } else {
            EventBus.$dialog.alert({message: '请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })


}
//更新用户信息
export const queryUpateInfo = function ({commit,state},data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/edu/users/update/details',{
            name:data.name,
            mobile:data.mobile,
            weixin:data.weixin,
            company:data.company,
            job:data.job
        },{
            headers:{
                Authorization: oauth.access_token
            }
        }).then(res =>{
        res = res.data;
        if(res.status){
            EventBus.$emit('updateInfo',res);

        } else {
            EventBus.$dialog.alert({message: '请求失败'});
        }

        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })



}
//获取svip页面 svip套餐
export const querySvip = function ({commit,state}) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/vip/get/plans',{
            headers:{
                Authorization: access_token
            }
        })
        .then(res =>{
            res = res.data;
            if (res.status){
                EventBus.$emit('svipPlans',res)
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}
//获取svip页面 相关课程推广位
export const querySvipCourse = function ({commit,state}) {
    EventBus.$toast.loading({
        message: '加载中',
        mask:true
    });
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/advert/svip/course',{

        })
        .then(res =>{
            res = res.data;
            if (res.status){
                EventBus.$emit('svipCourse',res)
            }else {
                EventBus.$dialog.alert({message: '请求失败'});
            }
            EventBus.$toast.clear()
        },err=>{
            EventBus.$dialog.alert({message: '服务端出错'});
            EventBus.$toast.clear()
        })

}



