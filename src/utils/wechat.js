/**
 * Created by admin on 2017/8/14.
 */
import Axios from 'axios'
let shareConf ={
   title:"首页",
   desc:"首页",
   link:window.location.href,
   imgUrl:'https://mobile.hellobi.com/img/logo.png',
   success:function(){

   },
  cancel:function(){

  }
};
let setings = "onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone startRecord stopRecord onVoiceRecordEnd playVoice pauseVoice stopVoice onVoicePlayEnd uploadVoice downloadVoice chooseImage previewImage uploadImage downloadImage translateVoice getNetworkType openLocation getLocation hideOptionMenu showOptionMenu hideMenuItems showMenuItems hideAllNonBaseMenuItem showAllNonBaseMenuItem closeWindow scanQRCode chooseWXPay openProductSpecificView addCard chooseCard openCard";
var wechat ={
    // 初始化init方法
    wechat_init(wxconf){
        wx.config({
            debug:0,
            appId:wxconf.appId,
            timestamp:wxconf.timestamp,
            nonceStr:wxconf.nonceStr,
            signature:wxconf.signature,
            jsApiList:setings.split(" ")
        });
    },
    update_share(wxobj){
        wx.ready(function(){
            updateShare(wxobj)
        });
        function updateShare(conf){
            var setings = "onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone",
                thisConf = shareConf,
                obj = {},
                Conf = conf || {};
            // for (var k in thisConf) {
            //   if (Conf.hasOwnProperty(k)) {
            //     obj[k] = Conf[k];
            //   } else {
            //     obj[k] = thisConf[k];
            //   }
            // }
            Object.assign(obj,shareConf,Conf);
            console.log(conf);
            setings.split(" ").forEach(function (e) {
                if (e == 'onMenuShareTimeline') {
                    wx[e]({
                        title: obj['desc'],
                        link: obj['link'],
                        imgUrl: obj['imgUrl'],
                        fun_name: 'onMenuShareTimeline',
                        success: obj['success'],
                        cancel: obj['cancel']
                    });
                    console.warn(obj)
                } else if (e == 'onMenuShareAppMessage') {
                    wx[e]({
                        title: obj['title'],
                        link: obj['link'],
                        desc: obj['desc'],
                        imgUrl: obj['imgUrl'],
                        fun_name: 'onMenuShareAppMessage',
                        success: obj['success'],
                        cancel: obj['cancel']
                    });
                } else {
                    obj['fun_name'] = e;
                    wx[e](obj);
                }
            });


        }
    },
    async wechat_getInfo(url,obj,callback){
        if (!wx || wx === undefined) return false;
        await Axios.get(url,{params:obj}).then((res)=>{
            if(res.data.appId ===''){
                return false;
            }
            else{
                // commit(ShareAuth,res.data);
                callback && callback(res.data);
            }
        },(err)=>{

            callback && callback();

        })
    }
}



export default  wechat
