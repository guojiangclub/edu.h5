/**
 * Created by Administrator on 2017/6/19.
 */

import {
	eduCourse
} from '../mutation-types';
import * as actions from '../actions/edu';
import * as getters from '../getters/edu';

const state = {
	detail: {
		data: {
			teacher: {

			},
			teacher_info:{

			}
		},
		meta: {}
	}
};
const mutations = {
	[eduCourse] (state, res) {
		state.detail = res
	}
};

export default {
	actions,
	getters,
	state,
	mutations
}
