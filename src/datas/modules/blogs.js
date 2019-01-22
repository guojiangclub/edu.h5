/**
 * Created by Administrator on 2017/6/1.
 */
import {
	blogsDetail
} from '../mutation-types';

const state = {
	detail: {
		faved: false,
		voted: false,
        followed: false,
		post: {
			user: {}
		},
		topics: []
	}
};
const mutations = {
	[blogsDetail] (state, detail) {
		state.detail = detail.data;
	}
}

import * as actions from '../actions/blogs';
import * as getters from '../getters/blogs';

export default {
	state,
	mutations,
	actions,
	getters
}
