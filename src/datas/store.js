/**
 * Created by admin on 2017/5/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import chub from './modules/chub';
import user from './modules/user';
import blogs from './modules/blogs';
import news from './modules/news';
import question from './modules/question';
import activity from './modules/activity';
import edu from './modules/edu';
import major from './modules/major';
import index from './modules/index';
import users from './modules/users';
import recharge from './modules/recharge';
import coupon from './modules/coupon';
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
	    index,
		chub,
		user,
		blogs,
		news,
		question,
		activity,
		edu,
        major,
        users,
        recharge,
        coupon
	}
})

