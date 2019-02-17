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
            EventBus.$emit('gethomeDate',res);
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
            if(res.meta && res.meta.pagination){
                EventBus.$emit('courseList',res);
            } else {
                EEventBus.$dialog.alert({message: '请求失败'});
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
        if(res.meta && res.meta.pagination){
            EventBus.$emit('searchList',res);
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
        if(res.meta && res.meta.pagination){
            EventBus.$emit('classifyList',res);
        } else {
            EventBus.$dialog.alert({message: '请求失败'});
        }
        EventBus.$toast.clear()
    },err=>{
        EventBus.$dialog.alert({message: '服务端出错'});
        EventBus.$toast.clear()
    })

}
