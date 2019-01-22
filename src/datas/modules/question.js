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

const state = {
	detail: {
		answers: [],
		isAnswer: false,
		isFocus: false,
		question: []
	},
	comments: {},
	topic: {
		isFocus: false,
		focus_count: 0
	}
};

const mutations = {
	[QuestionDetail] (state, detail) {
		state.detail = detail.data;
	},
	[QuestionComments] (state, data) {
		EventBus.$set(state.comments, data.index, data.data.data);
	},
	[changeComments] (state, info) {
		if (state.comments[info.index] == null || state.comments[info.index] == undefined) {
			EventBus.$set(state.comments, info.index, info.data)
		} else {
			state.comments[info.index].push(info.data);
		}
		state.detail.answers[info.index].comment_count += 1;
	},
	[changeCommentsDetail] (state, data) {
		state.detail.answers.push(data.data);
		state.detail.isFocus = data.info.focus;
		state.detail.isAnswer = true;
	},
	[addLike] (state, index) {
		state.detail.answers[index].agree_count += 1;
		state.detail.answers[index].isVoteUp = true;
	},
	[subLike] (state, index) {
		state.detail.answers[index].agree_count -= 1;
		state.detail.answers[index].isVoteUp = false;
	},
	[topicDetail] (state, data) {
		state.topic = data;
	}
};
import * as getters from '../getters/question';
import * as actions from '../actions/question';

export default {
	state,
	mutations,
	getters,
	actions
}