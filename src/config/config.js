/**
 * Created by lcfevr on 16/7/18.
 */


let config = {

    env:process.env.NODE_ENV,
    PROJECT: 'hellobi',
    VERSION: '1.0.0',
    doc_title: '',
    baseUrl: process.env.NODE_ENV != "production" ? globalConfigs.GLOBAL.baseUrl : window.globalConfigs.GLOBAL.baseUrl,
    isIPad: /ipad/i.test(window.navigator.userAgent),
    isIphone: /iphone|ipad|ipod/i.test(window.navigator.userAgent),
    isWechat: /MicroMessenger/i.test(window.navigator.userAgent),
    isUCBrowser: /UCWEB|UCBrowser/i.test(window.navigator.userAgent)
};
export default config;
