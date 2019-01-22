import { Cache, cache_keys, env } from './util';

export const login = async function(data, url, type, callback) {
    var callType = typeof callback;

    try {
        var res = await (() => {
            if (env.isWechat) {
                data.open_type = 'wechat';
                var openid = this.$route.query.openid || this.$route.query['?openid'];
                if (openid) {
                    data.open_id = openid;
                }
            }
            return EventBus.$http.post(url, data);
        })();

        var result = res.data;

        if (result.access_token) {
            result.access_token = result.token_type + ' ' + result.access_token;
            result.expires_in = result.expires_in || 315360000;  // token不过期
            result.expires = Date.now() + (result.expires_in - 300) * 1000;

            Cache.set(cache_keys.token, result, 0, null);
            EventBus.$http
                .get(EventBus.$Config.baseUrl + 'api/me', {
	                headers: {
		                Authorization: Cache.get(cache_keys.token).access_token
                    }
                })
                .then(res => {
                    res = res.data;
                    if (res.data && res.meta) {
	                    Cache.set(cache_keys.info, res, 0);
                    }
                })

            // this.$refs.button && this.$refs.button.done();

            if (callback) {
                if (callType === 'function') {
                    callback.call(this, result);
                    return null;
                } else if (callType === 'object') {
                    if (callback.onSuccess && typeof callback.onSuccess === 'function') {
                        callback.onSuccess.call(this, result);
                    }
                }
            }

            if (type === 0) {
                // alert('注册成功')
                // this.$Success('注册成功');
	            this.$Modal.confirm({body:'注册成功'})
            } else if (type === 1) {
                // alert('登录成功')
                // this.$Success('登录成功');
                // this.$Modal.confirm({body:'登录成功'})
            }

            var from = this.$route.query.from;
            var source = this.$route.query.source;
            if (from) {
                window.location.href = from;
            } else if (source) {
                this.$router.replace(source);
            } else {
                this.$router.push({name: 'user-index'})
            }
        } else {

            // this.$refs.button && this.$refs.button.done();

            if (callback) {
                if (callType === 'function') {
                    callback.call(this, result);
                    return null;
                } else if (callType === 'object') {
                    if (callback.onError && typeof callback.onError === 'function') {
                        callback.onError.call(this, result);
                        return null;
                    }
                }
            }

            if (!result.status) {
	            this.$Modal.confirm({body:result.message || '加载错误'})
                // alert(result.message || '加载错误');
                // this.$Error(result.message || '加载错误');
                return;
            }
        }
    } catch (e) {

        // this.$refs.button && this.$refs.button.done();

        if (callback && typeof callback === 'function') {
            callback.call(this, {
                status: false
            });
            return null;
        }

        if (type === 0) {
            // alert('未知错误')
            // this.$Error('未知错误');
	        this.$Modal.confirm({body:'未知错误'})
        } else if (type === 1) {
	        this.$Modal.confirm({body:'用户名或密码错误'})
            // alert('用户名或密码错误')
            // this.$Error('用户名或密码错误');
        }
    }
};

export const register = async function (callback) {
    var data = {
        access_token: this.sms_token,
        mobile: this.mobile,
        code: this.code,
        type: 'register',
        user_name: this.username,
        password: this.password,
        rf: this.rf
    };

    var url = this.$Config.baseUrl + 'api/oauth/sms';

    await login.call(this, data, url, 0, callback);
    EventBus.$Indicator.remove();
};

export const userLogin = async function(callback) {
    var data = {
        username: this.username,
        password: this.password,
        rf: this.rf
    };

    var url = this.$Config.baseUrl + 'api/oauth/token';

    await login.call(this, data, url, 1, callback);
    EventBus.$Indicator.remove();
};

export const openidLogin = async function (callback) {
    var data = {};

    var url = this.$Config.baseUrl + 'api/oauth/quicklogin';


    await login.call(this, data, url, 2, callback);
};

export const getOpenid = function () {
    var from = this.$route.query.from;
    var source = this.$route.query.source;
    var pathname = window.location.pathname;
    // var query = { type: 'oauth' };
    // if (from) {
    //     query.from = from;
    // } else if (source) {
    //     query.source = source;
    // }

    // let url = this.$router.stringifyPath({ name: this.$route.name, query });

	let url = this.$route.path;

    if ( this.$router.mode === 'hash' ) url = '#' + url;

	url += '?type=oauth';

	if (from) {
		url+='&from='+from;
	} else if (source){
		url+='&source='+source;
	}

    url = decodeURIComponent(url);

    url = this.$Config.baseUrl + 'oauth/wxlogin?redirect_url=' + encodeURIComponent(window.location.origin + pathname + url + '&');


    window.location.href = url;


};

export const logout = function () {
    // alert('注销成功')
    // this.$Success('注销成功', 1);
    var that = this;
    setTimeout(function(){
        Cache.remove(cache_keys.token);
        Cache.remove(cache_keys.info);
	    that.$router.push({name: 'question', params: {id: 0}});
    }, 1000);
};
