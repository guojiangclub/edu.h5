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
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/course/'+data.id)
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

