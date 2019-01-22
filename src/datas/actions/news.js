/**
 * Created by Administrator on 2017/6/16.
 */
// 获取新闻轮播图
export const queryNewsBanner = function ({commit, state}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/news/index')
		.then(res => {
			res = res.data;
			res.data.forEach(i => {
				i.image = i.cover_photo
				i.link = i.origin_url
			})
			if (res.status) {
				EventBus.$emit('banner', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}

		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取新闻数据列表
export const queryNewsList = function ({commit, state}, page=1) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/news/articles', {
			params: {
				page
			}
		})
		.then(res => {
			res = res.data;
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('newsList', res);
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}

		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}
// 获取新闻详情
export const queryNewsDetail = function ({commit, state},id) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/news/article/' + id)
		.then(res => {
			res = res.data;
			if (res.data && res.meta) {
				EventBus.$emit('newDetail', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}

		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}
