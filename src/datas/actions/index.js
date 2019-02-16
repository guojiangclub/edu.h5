/**
 * Created by Administrator on 2019/1/25.
 */
import { Cache, cache_keys } from '../../utils/util';

//首页banner区的，优惠券，分类等数据
export const queryHomeDate = function ({commit,state}) {
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/home/index')
        .then(res =>{
            res = res.data;
            //分发一个事件出去，将数据分发到页面中去
            EventBus.$emit('gethomeDate',res);

        },err =>{
            EventBus.$Modal.confirm({body: '服务端出错'});
    })


}
//获取推荐课程的课程列表
export const queryCourseList = function ({commit,state},data) {
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/edu/home/courses',{
            params:{
                page:data.page
            }
        })
        .then(res =>{
            res = res.data;
            if(res.meta && res.meta.pagination){
                EventBus.$emit('courseList',res);
            } else {
                EventBus.$Modal.confirm({body: '请求失败'});
            }
        },err =>{
            EventBus.$Modal.confirm({body: '服务端出错'});
        })

}
