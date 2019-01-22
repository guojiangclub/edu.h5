/**
 * Created by Administrator on 2017/6/5.
 */
import {
	QuestionDetail,
	QuestionComments,
	changeComments,
	changeCommentsDetail,
	addLike,
	subLike,
	topicDetail
} from '../mutation-types';
import { Cache, cache_keys } from '../../utils/util';

// 获取问答头部分类列表
export const queryQuestionHeader = function ({commit, state}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/question/header')
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('questionHeader', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '系统错误'})
		})
};

// 获取问答内容列表
export const queryQuestionList = function ({commit, state}, data = { page: 1, name: 'newest'}) {

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/questions', {
			params: {
				page: data.page,
				name: data.name
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('questionList', res, data);
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取问答详情
export const queryQuestionDetail = function ({commit, state}, id) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/question/' + id, {
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.status) {
				EventBus.$emit('questionDetail',res);
				commit(QuestionDetail, res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 问答详情点赞
export const questionDetailLike = function ({commit, state},data) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/answer/' + data.id + '/vote/up', {}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('detailLike', res);
				commit(addLike, data.index);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 取消点赞
export const cancelDetailLike = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/answer/' + data.id + '/vote/up/cancel', {}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				commit(subLike, data.index);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}

// 评论下的评论数据
export const questionCommentList = function ({commit, state}, data) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/answer/' + data.id + '/comments')
		.then(res => {
			res = res.data;
			if (res.status) {
				let info = {
					data: res,
					index: data.index
				}
				commit(QuestionComments, info);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 回答评论下的评论
export const answerComment = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/answer/' + data.id + '/comment/add', {
			message: data.message
		}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				let info = {
					data: res.data,
					index: data.index
				}
				commit(changeComments, info);
				EventBus.$emit('commentList', info.index);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 重新编辑回答
export const editAnswer = function ({commit, state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/answer/' + id, {
			headers: {
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('editData', res.data);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};
// 提交重新编辑的回答
export const updateAnswer = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/answer/' + data.id + '/update', {
			answer_content: data.text
		}, {
			headers: {
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('updateAnswerText', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})

}
// 评论回答
export const answerQuestion = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/answer/store', {
			question_id: data.id,
			answer_content: data.message,
			auto_focus: data.focus
		}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				var infoData = {
					data: res.data,
					info: data
				}
				commit(changeCommentsDetail, infoData)
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}


// 关注问答
export const attentionQuestion = function ({commit, state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/question/' + id + '/focus', {}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				// EventBus.$emit('attention', res);
				state.detail.isFocus = true;
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};
// 取消关注问答
export const cancelAttentionQuestion = function ({commit, state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/question/' + id + '/focus/cancel', {}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				// EventBus.$emit('cancelAttention', res);
				state.detail.isFocus = false;
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 话题数据
export const queryTopic = function ({commit, state}, id) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/topic/' + id, {
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				commit(topicDetail, res.data);
				EventBus.$emit('topicData', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 关注话题
export const focusTopic = function ({commit, state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/topic/' + id + '/focus',{}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				state.topic.isFocus = true;
				state.topic.focus_count += 1;
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 取消关注话题
export const UnFocusTopic = function ({commit, state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/topic/' + id + '/focus/cancel',{}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				state.topic.isFocus = false;
				state.topic.focus_count -= 1;
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}