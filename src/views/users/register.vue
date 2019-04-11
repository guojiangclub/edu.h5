<template>
    <div id="user-register">
        <van-nav-bar
            title='登录页面'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
       <div class="content">
           <div class="tips" v-if="message">{{message}}</div>
           <div class="phone__warning">
               <img src="http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-29/45704537.jpg">
               <!--<i class="iconfont icon-anquanjinggao"></i>-->
           </div>
           <!--<div class="register_header iconfont icon-youhuiquan"></div>-->
           <div class="register_input">
               <div class="tellphone">
                   <input type="text" placeholder="手机号码" v-model="mobile" />
               </div>
               <div class="code">
                   <div class="writecode">
                       <input type="text" placeholder="验证码" v-model="identifyingcode" />
                   </div>

                   <div class="getCode" @click="getCode">{{codes.codeText}}</div>
               </div>
           </div>
           <div class="submit">
               <button class="check" @click="submit">确认</button>
               <!-- <button type="default" wx:if="{{!checked}}" catchtap="submit" disabled="{{showLoading}}" loading="{{showLoading}}">确认</button>-->
           </div>
           <!--<div class="select">
               &lt;!&ndash;<checkbox-group bindchange="changeChecked">&ndash;&gt;
               <checkbox bindtap="changeChecked" color="#fff" checked="{{checked}}" />
               <text> 同意本小程序用户协议</text>
               &lt;!&ndash;</checkbox-group>&ndash;&gt;
           </div>-->
           <!--弹出是否绑定老用户框框-->
           <div class="bind_old" :class="is_new_user ? 'cur' : ''">
               <div class="paney">
                   <div class="title">绑定老用户</div>
                   <div class="content mx-1px-bottom">是否绑定已有老用户</div>
                   <div class="btn-box">
                       <div class="cancle btn" @click="cancleBind">取消</div>
                       <div class="sure btn" @click="sureBind">确定</div>
                   </div>
               </div>
           </div>
       </div>
    </div>


</template>

<script type="text/ecmascript-6">
    import { env, is,  Cache, cache_keys } from '../../utils/util';
    import { userLogin, openidLogin, getOpenid } from '../../utils/oauth';
    import { List, NavBar } from 'vant';
    export default {
        component:{
            List,
            NavBar
        },
        name: 'users-register',
        data(){
            return {
                is_navbar:true,
                query: this.$route.query,
                mobile:'',//手机号码
                identifyingcode:'',//验证码
                message:'',//弹出信息提示
                codes:{
                    total:60,
                    codeText:"获取验证码"
                },
                sending:false,
                is_new_user:'',//是否为新用户
                form:'',//跳到那个页面去
                source:'',//从哪个页面进来
                redirectUrl:''
            }
        },
        created() {
            if(env.isWechat){
                this.is_navbar = false
            }
            var oauth = Cache.get(cache_keys.token);
            if(oauth){
                this.$router.push({name: 'users-index'})
            }
            EventBus.$on('codeData',this.verifyCode);
            EventBus.$on('loginDate',this.getToken);
            this.form = this.$route.query.from;
            this.source = this.$route.query.source;
            if (env.isWechat) {
                var openid = this.$route.query.openid || this.$route.query['?openid'];

                if (openid) {
                    // 查询该openid是否可以登录
                   /* openidLogin.call(this, {
                        onSuccess: null,
                        onError: function () {
                            this.$dialog.alert({message: '未能自动登录，请手动登录'});
                        }
                    });*/
                } else {

                    // 直接去取openid
                   /* getOpenid.call(this);*/
                    //				        next();
                }
            }
        },
        mounted(){

        },
        methods:{
            onClickLeft(){
              window.history.back(-1)
            },
            //取消绑定老用户
            cancleBind(){
                if(this.from){
                    window.location.href = this.from
                } else if(this.source){
                    this.$router.replace(this.source)
                } else {
                    this.$router.push({name: 'users-index'})
                }
                this.is_new_user = false

            },
            //点击确认按钮
            sureBind(){
                this.$router.push({name: 'users-oldlogin'});
                this.is_new_user = false
            },
            getUrl() {
                let url = window.location.href;
                if (url.indexOf('?') != -1) {
                    url = url + '&'
                }
//                url = this.$global.baseUrl + 'oauth/wxlogin?redirect_url=' + encodeURIComponent(window.location.origin + pathname + url + '&');

                return url
            },

            //获取到快捷登录的数据
            getLoginData(res){
                console.log('数据呀',res);
                if(res.data.access_token){
                    var result=res.data;
                    result.access_token =result.token_type + ' ' + result.access_token;
                    result.expires_in = result.expires_in || 315360000;  // token不过期
                    result.expires = Date.now() + (result.expires_in - 300) * 1000;
                    Cache.set(cache_keys.token,result,0,null);
                    if(result.is_new_user){
                        this.is_new_user=res.data.is_new_user
                    } else {
                        if (this.from) {
                            window.location.href = this.from;
                        } else if (this.source) {
                            this.$router.replace(this.source);
                        } else {
                            this.$router.push({name: 'users-index'})
                        }

                    }
                } else {
                    // this.$dialog.alert({message: '未能自动登录，请手动登录'});
                }

            },
            //获取到openid的时候数据处理
            getOpenId(res){
                //微信环境会跳到这个页面去，然后后端拿到openid会跳回来
                window.location.href = res.data.url
            },
            //点击确认按钮
            submit(){
                var message = '';
                if(!is.has(this.mobile)){
                    message = "请输入您的手机号";
                } else if(!is.mobile(this.mobile)){
                    message = '手机号格式不正确，请重新输入';
                } else if(!is.has(this.identifyingcode)){
                    message="请填写验证码";
                }
                if(message){
                    this.message = message;
                    setTimeout(()=>{
                        this.message = ''
                    },3000)
                    return
                } else {
                    var openid = this.$route.query.openid || this.$route.query['?openid'];
                    let data = {
                        mobile:this.mobile,
                        code:this.identifyingcode,
                        open_id:openid || ''
                    }
                    this.$store.dispatch('queryLoginNew',data)
                }

            },
            getToken(res){
                var result=res.data;
                if(result.access_token){
                    result.access_token =result.token_type + ' ' + result.access_token;
                    result.expires_in = result.expires_in || 315360000;  // token不过期
                    result.expires = Date.now() + (result.expires_in - 300) * 1000;
                    Cache.set(cache_keys.token,result,0,null);
                    if(result.is_new_user){
                        this.is_new_user=res.data.is_new_user
                    } else {
                        if (this.from) {
                            window.location.href = from;
                        } else if (this.source) {
                            this.$router.replace(this.source);
                        } else {
                            this.$router.push({name: 'users-index'})
                        }

                    }
                } else {
                    this.$dialog.alert({message: '验证码不正确'});
                }

            },
            //随机获取一串字符串
            randomStr(){
                return  Math.random().toString(36).substr(2,24);
            },
            getCode(){
                //如果已经点击了按钮，则将sending变为true，不能继续点击
                if(this.sending){
                    return
                }
                var message = '';
                if(!is.has(this.mobile)){
                    message = '请输入您的手机号'
                } else if(!is.mobile(this.mobile)){
                    message = '手机号格式不正确，请重新输入'
                }
                if(message){
                    this.message = message;
                    setTimeout(()=>{
                        this.message = ''
                    },3000)
                    return
                } else {
                    var randoms = this.randomStr();
                    this.codes.codeText = '短信发送中';
                    this.sending = true
                    let data = {
                        mobile:this.mobile,
                        access_token:randoms
                    }
                    this.$store.dispatch('queryCode',data)
                }


            },
            verifyCode(res){
                //成功请求到数据之后
                var total = this.codes.total;//秒数，倒计时
                this.codes.codeText = total + '秒后再发送';
                //需要手动做一个倒计时
                var timer = setInterval(()=>{
                    total--;
                    this.codes.codeText = total + '秒后再发送';
                    if(total<1){
                        this.sending = false;
                        this.codes.codeText = '获取验证码';
                        clearInterval(timer)
                    }
                },1000)

            }
        },
        beforeRouteEnter(to, from, next) {
            if (env.isWechat) {
                next(vm => { //vm 为当前vue实例
                    // 查询该openid是否可以登录
                    var openid = vm.$route.query.openid || vm.$route.query['?openid'];
                    if (openid) {
                        let data = {
                            open_id:openid
                        }
                        console.log(window.location.href);
                        vm.$store.dispatch('queryquicklogin',data)
                        EventBus.$on('quickLoginData',vm.getLoginData)

                    } else {
                        console.log("没有自动");
                        //如果没有openid，去拿openid
                        let data = {
                            //当前H5页面url
                            redirect_url:vm.getUrl()
                        }
                        vm.$store.dispatch('queryWxOpenId',data)
                        EventBus.$on('redirectUrl',vm.getOpenId)
                    }
                })
            } else {
                next();
            }
        },
        beforeDestroy(){
            EventBus.$off('codeData');
            EventBus.$off('loginDate');
            EventBus.$off('redirectUrl');
            EventBus.$off('quickLoginData')
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#ffffff;
    }
    #user-register{
        font-size: 16px;
        background-color: #ffffff;
        height: 100%;
        overflow: auto;
        .content{
            padding: 0 15px;
        }

        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }

        .tips{
            position: fixed;
            top: 46px;
            left: 0;
            right: 0;
            text-align: center;
            line-height: 35px;
            background-color: #e64340;
            height: 35px;
            color: #FFFFFF;
        }
        .register_header{
            padding: 36px 0 56px 0;
            text-align: center;
            color: #004E9D;
            font-size:30px;
        }
        .phone__warning{
            text-align:center;
            width:170px;
            margin:49px auto 88px auto;
            overflow:hidden;

            image{
                width: 100%;
            }
            i{

                color: #FFBE00;
                font-size: 50px;
            }
        }
        .register_input{
            margin-bottom: 60px;
            .tellphone{
                background:rgba(155,155,155,.3);
                margin-bottom: 20px;
                border-radius: 4px;
                input{
                    padding:15px 0 15px 15px ;
                    border-radius: 4px;
                }
                .input-placeholder{
                    color: #9B9B9B;
                    font-size: 14px;
                }

            }
            .code{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .writecode{
                    width: 60%;
                    background:rgba(155,155,155,.3);
                    border-radius: 4px;
                    input{
                        padding:15px 0 15px 15px ;
                    }
                    .input-placeholder{
                        color: #9B9B9B;
                        font-size: 14px;
                    }
                }
                .getCode{
                    padding: 15px 0;
                    flex: 1;
                    margin-left: 17px;
                    background-color: #004E9D;
                    text-align: center;
                    color: #FFFFFF;
                    border-radius: 4px;
                    font-size: 14px;
                }
            }
        }
        .select{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
            color: #4A4A4A;
            font-size: 12px;

            //重置按钮样式
           /* checkbox .wx-checkbox-input{
                background-color: #fff;
                border: 1px solid #c1caca;
                box-shadow: 0 1px 2px rgba(0,0,0,.05), inset 0 -15px 10px -12px rgba(0,0,0,.05);
                height: 14px;
                width: 14px;
            }
            checkbox .wx-checkbox-input.wx-checkbox-input-checked{
                background-color: #004E9D;
                border: 1px solid #004E9D;
            }*/
        }
        .submit{

            button{
                width: 100%;
                color: #ffffff;
                padding:10px 0;
                border: none;
                border-radius: 4px;
                background-color: #C9C8C8;
                font-size: 16px;
                &.check {
                    background: #004E9D;
                }
                &:after {
                    border: none;
                }
            }
        }
        //弹出绑定老用户框框
        .bind_old{
            display:none;
            z-index: 50;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color:rgba(0,0,0,.7);
            .paney{
                width: 80%;
                background-color:#FFFFFF;
                position: absolute;
                left: 50%;
                top: 28%;
                margin-left: -40%;
                color: #4A4A4A;
                border-radius:2px;
                .title{
                    padding: 25px 0;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 25px;
                }
                .content{
                    font-size: 13px;
                    line-height: 18px;
                    padding-bottom: 38px;
                    text-align: center;
                }
                .btn-box{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 50px;
                    line-height: 50px;
                    font-size:16px;
                    .btn{
                        flex: 1;
                        text-align: center;
                    }
                    .sure{
                        background-color: #004E9D;
                        color: #FFFFFF;

                    }
                }
            }
            &.cur{
                display: block;
            }
        }

    }


</style>
