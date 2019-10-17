<template>
    <div id="oldlogin">
        <van-nav-bar
            title='老用户登录'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <div class="header">
            <div class="logo">
                <img src="https://cdn.ibrand.cc/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191015170325.jpg">
            </div>
            <div class="text">最用心的商业智能果酱学院</div>
        </div>
        <div class="content">
            <div class="item mx-1px-bottom">
                <span class="iconfont icon-laoshi"></span>
                <input type="text" placeholder="手机/用户名/邮箱" v-model="username">
            </div>
            <div class="item mx-1px-bottom">
                <span class="iconfont icon-suo"></span>
                <input type="password" placeholder="请输入账号密码" v-model="password">
            </div>
        </div>
        <div class="binding-btn" @click="bindBtn">绑定</div>

    </div>



</template>

<script type="text/ecmascript-6">
    import { env, is,  Cache, cache_keys } from '../../utils/util';
    import { userLogin, openidLogin, getOpenid } from '../../utils/oauth';
    import { List,NavBar } from 'vant';
    export default {
        component:{
            List,
            NavBar
        },
        name: 'users-oldlogin',
        data(){
            return {
                username:'',
                password:'',
                is_navbar:true
            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
            EventBus.$on('oldAccountDate',this.getOldAccount)

        },
        beforeDestroy(){
            EventBus.$off('oldAccountDate')
        },
        mounted(){

        },
        methods:{
            onClickLeft(){
                window.history.back(-1)
            },
            //点击绑定按钮
            bindBtn(){
                var message = ''  ;
                if(!is.has(this.username)){
                    message = '账号不能为空'
                } else if(!is.has(this.password)){
                    message = '密码不能为空'
                }
                if(message){
                    this.$dialog.alert({
                        message:message
                    })
                } else {
                    let data ={
                        username:this.username,
                        password:this.password
                    }
                    this.$store.dispatch('queryOldAccount',data)
                }

            },
            getOldAccount(res){
                if(res.data.access_token){
                    var result=res.data;
                    result.access_token =result.token_type + ' ' + result.access_token;
                    result.expires_in = result.expires_in || 315360000;  // token不过期
                    result.expires = Date.now() + (result.expires_in - 300) * 1000;
                    Cache.set(cache_keys.token,result,0,null);
                    this.$router.push({name: 'users-index'})
                } else {
                    this.$dialog.alert({
                        message:res.message || '请求失败，请重试'
                    })
                }

            }

        }


    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#ffffff;
    }
    #oldlogin{
        height: 100%;
        overflow: auto;
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        .van-nav-bar+div{
            padding-top: 90px !important;
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
        .header{
            padding:44px 0 33px 0;
            .logo{
                width: 170px;
                margin:0 auto;
                img{
                    width: 100%;
                }
            }
            .text{
                padding-top: 15px;
                text-align: center;
                color: #909090;
                font-size: 12px;
                line-height: 17px;
            }
        }
        .content{
            margin:0 15px 27px 15px;
            padding: 0 12px 20px 12px;
            background-color:#F3F3F3;
            border-radius: 4px;
            .item{
                display: flex;
                height: 50px;
                line-height: 50px;
                font-size: 12px;
                span{
                    color:#909090;
                    padding:0 15px;
                }
                input{
                    height: 100%;
                    line-height: 50px;
                }
            }


        }
        .binding-btn{
            margin:  0 15px;
            background-color: #004E9D;
            height: 50px;
            line-height: 50px;
            border-radius: 4px;
            color: #FFFFFF;
            font-size: 15px;
            text-align: center;
        }

    }


</style>
