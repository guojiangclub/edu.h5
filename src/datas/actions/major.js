/**
 * Created by Administrator on 2017/5/31.
 */
import { Cache, cache_keys, exif } from '../../utils/util';


// 获取年度SVIP首页数据
export const queryMajorIndex = function ({commit, state}) {
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/major', {
            headers:{
                Authorization: access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('MajorIndex', res)
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
            EventBus.$Indicator.remove();
        }, err => {
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}


// 子页面请求接口
export const queryMajorItem = function ({commit, state}, data) {
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/' + data.url, {
            headers:{
                Authorization: access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('major' + data.name, res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
            EventBus.$Indicator.remove();
        }, err => {
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}
