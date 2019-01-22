/**
 * Created by Administrator on 2017/6/6.
 */

import {
	activityDateil
} from '../mutation-types';
import * as actions from '../actions/activity';
import * as getters from '../getters/activity';

const state = {
	detail: {
		data: {},
		meta: {
			isJoin: false
		}
	}
}
const mutations = {
	[activityDateil] (state, res) {
		state.detail = res;
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}