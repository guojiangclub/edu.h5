/**
 * Created by lcfevr on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vant from 'vant';
import App from './components/app.vue';
import Routers from './router';
import Config from './config/config'
import Axios from 'axios'
import * as filters from './filters/filters'
import {setPageTitle, Cache, cache_keys, loadJs} from './utils/util';
import Request from './utils/request';
import Vlc from 'vlc-ui';
import store from './datas/store';
import wechat from './utils/wechat';

Vue.use(VueRouter);
Vue.use(Vant);
Vue.use(Vlc);


// 开启debug模式
Vue.config.debug = true;

if (process.env.NODE_ENV === 'development') {
    var log = console.log;
    console.log = function () {
        var args = Array.from(arguments);
        args = args.map(arg => {
            try {
                return JSON.parse(JSON.stringify(arg));
            } catch (e) {
                return arg;
            }
        });

        log.apply(console, args);
    };

    window.vConsole = require('./static/js/vconsole.min');
    require('./static/js/vconsole-resources.min');
    require('./static/js/vconsole-sources.min');
}

var global;
Vue.prototype.$Config = Config;
Vue.prototype.$Request = Request;
Vue.prototype.$http = Axios;

Axios.defaults.headers.post["Content-type"] = "application/json"

Object.keys(filters).forEach(name => {
    Vue.filter(name, filters[name]);
});
// console.log(Routers)

// 路由配置
let router = new VueRouter({
    history: process.env.NODE_ENV != 'production',
    routes: Routers
});

router.beforeEach((to, from, next) => {
    let title = to.meta.title || Config.doc_title;
    let subTitle = '';
    let image = '';
    let systemInfo = Cache.get(cache_keys.system_info);
    if (systemInfo && systemInfo.wechat_share) {
        title = systemInfo.wechat_share.wechat_share_name;
        subTitle = systemInfo.wechat_share.wechat_share_title;
        image = systemInfo.wechat_share.wechat_share_img
    }

    var agent_code = to.query.rf;
    if (agent_code) {
        Cache.set(cache_keys.agent_code, agent_code, 0)
    }


    setPageTitle(title);
    var link = window.location.origin + '/#' + to.path;
    var info = Cache.get(cache_keys.info);
    if (info && info.meta && info.meta.agentCode) {
	    if (link.indexOf('?') != -1) {
		    link = link + '&rf=' + info.meta.agentCode;
    } else {
		    link = link + '?rf=' + info.meta.agentCode;
    }
    }
    console.log(link);
    wechat.update_share({
        title:title,
        desc:subTitle,
        link: link,
        imgUrl: image
    });
    global = global || globalConfigs.GLOBAL.ea
    if (to) {
        if (window.ea && global.analytics) {
            let args = {
                url: to.fullPath || window.location.href.split('#')[1],
                title: [globalConfigs.GLOBAL.brand.name, window.document.title || to.meta.title || to.name].join('/'),

            };

            var user = Cache.get(cache_keys.token);

            if (user) {
                args.user = {
                    uid: user.id,                                   // 用户ID
                    name: user.name,                                // 用户名
                    avatar: user.avatar,                            // 头像地址
                    gender: user.sex === '男' ? 'Male' : 'Female',
                    type: user.employee ? 'employee' : 'user',       // 会员类型
                    age: user.birthday || 0
                };


                if (user.group) {
                    args.user.level = String(user.group.grade || 0);// 会员等级

                }
            }


            if (global.analytics) {

                args.config = {
                    accounts: global.analytics.accounts,
                    cookieDomain: global.analytics.cookieDomain
                };

            }

            console.log(args)

            ea('send', args)
        }
    }

    // if (EventBus.wxShare && EventBus.wxShare.appId) {
    //    wechat.wechat_init({
    //       appId:EventBus.wxShare.appId,
    //       timestamp:EventBus.wxShare.timestamp,
    //       nonceStr:EventBus.wxShare.nonceStr,
    //       signature:EventBus.wxShare.signature
    //    });
    // }
    // window.scrollTo(0, 0);

    console.log('这个是什么', to, to.path);
    if (to.meta.authorization) {
        var target = {name: to.meta.login || 'users-register', query: {source: to.fullPath}};
        var oauth = Cache.get(cache_keys.token);
        oauth ? next() : next(target);
    } else {
        next();
    }
});

router.afterEach(() => {

});


window.EventBus = new Vue();




if (process.env.NODE_ENV == 'production') {



    global = global || globalConfigs.GLOBAL.ea
    if (global) {
        let fun_name = 'ea';


        window['JackWolfTrackingObject'] = fun_name;
        window[fun_name] = window[fun_name] ||
            function () {
                window[fun_name].q.push(arguments);
            };

        window[fun_name].q = window[fun_name].q || [];


    }


    loadJs(process.env.NODE_ENV === 'production' ? '/js/ea.min.js' : '/src/static/js/ea.min.js', () => {


        global.analytics.accounts.baidu = '2d2777148aa1618ef79baf55c005df84'
        global.analytics.accounts.google = 'UA-42396300-5'
        global.analytics.cookieDomain = 'auto'



       /* new Vue({
            el: '#app',
            router: router,
            render: h => h(App),
            store: store
        })*/
        EventBus.$http.get(EventBus.$Config.baseUrl + 'api/edu/system/init')
            .then(res => {
                res = res.data;
                if (res.status) {
                    Cache.set(cache_keys.system_info, res.data, 0, null)
                }
                wechat.wechat_getInfo(EventBus.$Config.baseUrl+"api/wechat/jssdkconfig",{url: encodeURIComponent(location.href.replace(/#.*$/, ""))},function(data){
                    new Vue({
                        el: '#app',
                        store,
                        router: router,
                        render: h => h(App)
                    });
                    EventBus.wxShare=data;
                    wechat.wechat_init(data);
                });
            }, err => {
                wechat.wechat_getInfo(EventBus.$Config.baseUrl+"api/wechat/jssdkconfig",{url: encodeURIComponent(location.href.replace(/#.*$/, ""))},function(data){
                    new Vue({
                        el: '#app',
                        store,
                        router: router,
                        render: h => h(App)
                    });
                    EventBus.wxShare=data;
                    wechat.wechat_init(data);
                });
            })




    })
} else {
	/*wechat.wechat_getInfo(EventBus.$Config.baseUrl+"api/wechat/jssdkconfig",{url: encodeURIComponent(location.href.replace(/#.*$/, ""))},function(data){
		new Vue({
			el: '#app',
			store,
			router: router,
			render: h => h(App)
		});
		EventBus.wxShare=data;
		wechat.wechat_init(data);
	});*/
    new Vue({
        el: '#app',
        router: router,
        render: h => h(App),
        store: store
    })
}


