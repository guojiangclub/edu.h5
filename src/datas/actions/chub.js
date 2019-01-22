/**
 * Created by admin on 2017/5/19.
 */

export const queryChubIndex = function ({commit}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/blog/posts')
		.then(res => {
			console.log(res);
		}, () => {
		});
};

