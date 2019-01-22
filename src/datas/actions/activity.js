/**
 * Created by Administrator on 2017/6/6.
 */
import {
	activityDateil
} from '../mutation-types';
import { Cache, cache_keys } from '../../utils/util';

// 获取活动首页数据
export const queryActivityList = function ({commit, state}, data = {page: 1, cotegory: 'default'}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/activity/index', {
			params: {
				page: data.page,
				category: data.cotegory
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('activityList', res);
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}

// 获取活动详情页数据
export const queryActivityDetail = async function ({commit, state},id) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	await EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/activity/show/' + id, {
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;

			EventBus.$Indicator.remove();
			if (res.data && res.meta) {
				var isJoin = !!Cache.get(id);
				EventBus.$emit('activityDetail', res);
				commit(activityDateil, res);
				if (isJoin) {
					state.detail.meta.isJoin = true;
				}
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 活动报名
export const activityApply = function ({commit, state}, data) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	 EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/activity/join/' + data.id, {
			shipping_name: data.shipping_name,
			shipping_mobile: data.shipping_mobile,
			shipping_address: data.shipping_address,
			company: data.company,
			job: data.job
		}, {
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('EactivityApply', res);
				Cache.set(res.data.project_id, res, 0);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}

// 改变报名的状态
// export const changeActivity = function ({commit, state}) {
// 	state.detail.meta.isJoin = true;
// }