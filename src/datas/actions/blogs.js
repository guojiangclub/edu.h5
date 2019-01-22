/**
 * Created by Administrator on 2017/6/1.
 */
import { Cache, cache_keys } from '../../utils/util';

import {
	blogsDetail
} from '../mutation-types';

// 获取博客内容列表
export const queryBlogsList = function ({commit,state}, data = {page: 1, name: 'newest'}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/blog/posts', {
			params: {
				page: data.page,
				name: data.name
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('blogsList', res, data);
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取博客文章头部分类列表
export const quetyBlogsHeader = function ({commit, state}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/blog/header')
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('blogsHeader', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '系统错误'})
		})
}

// 获取博客文章详情
export const queryBlogsDetail = function ({commit, state},id) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/blog/post/' + id, {
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.status) {
				commit(blogsDetail, res);
				EventBus.$emit('blogsDetail', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 打赏
export const submitDetail = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/blog/post/'+ data.id +'/reward', data , {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                if (data.channel == 'wx_pub') {
                    EventBus.$emit('wxBlogsCharge', res.data)
                } else {
                    EventBus.$emit('blogsCharge', true, res.data.charge)
                }
            } else {
                EventBus.$emit('blgosCharge', false);
            }
        }, err => {
            EventBus.$emit('blogsCharge', false);
        })
}

//关注用户/取消关注用户
export const focusUser = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/follow/user',{
            user_id:data.id
        }, {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                if (res.data == 'follow') {
                    state.detail.followed = true;
                } else {
                    state.detail.followed = false;
                }
                EventBus.$emit('Focususer', res,data);
                EventBus.$emit('focusfollows', res, data);
                EventBus.$emit('focusfans', res, data);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

// 评论文章
export const commentEssay = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);
	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/blog/post/' + data.id + '/comment/add', { message: data.message }, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				state.detail.post.comment_count += 1;
				EventBus.$emit('commentInfo', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 喜欢文章
export const likeEsay = function ({commit, state},id) {
	const oauth = Cache.get(cache_keys.token);
	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/blog/post/' + id + '/like', {}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				state.detail.voted = true;
				state.detail.post.vote_count += 1;
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}
// 取消喜欢文章
export const cancelLikeEsay = function ({commit, state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/blog/post/' + id + '/like/cancel',{}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				state.detail.voted = false;
				state.detail.post.vote_count -= 1;
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 收藏文章
export const favoriteEsay = function ({commit,state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/blog/post/' + id + '/favorite', {}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				state.detail.faved = true;
				state.detail.post.favorite_count += 1;
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}

// 取消收藏文章
export const cancelFavoriteEsay = function ({commit,state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/blog/post/' + id + '/favorite/cancel', {}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				state.detail.faved = false;
				state.detail.post.favorite_count -= 1;
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}
// 文章评论列表
export const queryCommentList = function ({commit, state}, data) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/blog/post/' + data.id + '/comments', {
			params: {
				page: data.page
			}
		})
		.then(res => {
		    console.log(res.data)
			res = res.data;

			if (res.meta && res.meta.pagination) {
				EventBus.$emit('commentList', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}
