/**
 * Created by admin on 2017/5/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules/index';
import users from './modules/users';
import recharge from './modules/recharge';
import coupon from './modules/coupon';
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
	    index,
        users,
        recharge,
        coupon
	}
})

