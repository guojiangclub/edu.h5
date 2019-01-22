<template>
    <div id="user-register">
        <Header title="注册" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="content">
            <div class="ts mx-1px-bottom">
                <img class="tsimg" src="../../static/img/ts.png" alt="">
            </div>
            <div class="inputWrap mx-1px-bottom">
                <div class="name">用户名</div>
                <input type="text" placeholder="用户名" v-model="username">
            </div>
            <div class="inputWrap mx-1px-bottom">
                <div class="name">手机号</div>
                <input type="number" placeholder="手机号" v-model="mobile">
            </div>
            <div class="inputWrap mx-1px-bottom">
                <div class="name">密码</div>
                <input type="password" placeholder="密码" v-model="password">
            </div>
            <div class="getCode inputWrap mx-1px-bottom">
                <div class="name">验证码</div>
                <input type="number" placeholder="验证码" v-model="code">
                <verify label="获取验证码" title="短信发送中.." message="重新发送{counter}s" :account="mobile"></verify>
            </div>
            <div class="international" @click="international">
                国际用户注册
            </div>
            <div class="btns">
                <!--<submit v-ref:button class="blue" @submit="register">注册</submit>-->
                <button class="login loginbg" @click="register">注册</button>
                <button class="login" @click="jump('user-login')">已有帐号？点击登录</button>
            </div>

            <!--国际用户注册-->
            <div class="insufficient" v-show="show">
                <div class="intermediate">
                    <div class="iconrigth">
                        <i class="iconfont icon-quxiao- cancel" @click="international"></i>
                    </div>
                    <div class="intermediate-text">国际用户注册方式：</div>
                    <!--<div class="intermediate-p intermediate-bm1">1、国际用户可在PC端浏览器打开：www.hellobi.com       用邮箱进行注册</div>-->
                    <div class="intermediate-p intermediate-bm3">长按下方二维码添加天善小助手微信：hellobibook01（备注你自己常用的邮箱，以便开通账号）</div>
                    <img src="../../static/img/register_code.png" alt="">
                    <div class="intermediate-code">立即扫码添加天善小助手微信</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import Verify from '../../components/verify-code.vue';
    import { is,  Cache, cache_keys } from '../../utils/util';
    import { register, openidLogin, getOpenid } from '../../utils/oauth';

    export default{
        components:{
            Verify
        },
        data() {
            return{
                query: this.$route.query,
                username: '',
                mobile: '',
                password: '',
                code: '',
                sms_token: '',
                show: false,
                rf: Cache.get(cache_keys.agent_code) || '',
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name : name, query: this.query});
            },
            //国际用户注册
            international() {
                this.show = !this.show
            },
            register() {
                var message = null;

                if (!is.has(this.username)) {
                    message = '请输入用户名';
                } else if (!is.name(this.username)) {
                    message = '用户名格式不正确，请输入2-24位不含特殊符号的中英文';
                } else if (!is.has(this.mobile)) {
                    message = '请输入您的手机号';
                } else if (!is.mobile(this.mobile)) {
                    message = '手机号格式不正确，请重新输入';
                } else if (!is.has(this.password)) {
                    message = '请输入密码';
                } else if (!is.password(this.password)) {
                    message = '密码不能少于六位，请重新输入';
                } else if (!is.has(this.code)) {
                    if (!this.sms_token) {
                        message = '请获取验证码';
                    } else {
                        message = '请输入验证码';
                    }
                } else if (!this.sms_token) {
                    message = '请获取验证码并正确填写';
                }

                if (message) {
//                    this.$refs.button.done();
//                    this.$Alert(message);
                    this.$Modal.confirm({body: message});
                } else {
                    this.$Indicator.blade({text: '注册中...'});

                    register.call(this);
//                    console.log(this);
                }
            }
        }
    }

</script>

<style rel="stylesheet/less" lang="less">
    #user-register{
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                }
            }
            .title {
                text-align: center;
            }
            .right {
                font-size: 0;
            }
        }
        .content{
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            background: #efeff4;
            /*padding-top: 25px;*/
            .ts{
                width: 100%;
                height: 96px;
                text-align: center;
                .tsimg{
                    margin-top: 23px;
                    width: 173px;
                    height: 45px;
                }
            }
            .inputWrap:before{
                left: 32px;
                width: 91%;
            }
            /*国际用户*/
            .international{
                font-size: 12px;
                color: #008cee;
                text-align: right;
                padding: 8px 20px;
            }
            .insufficient{
                position: fixed;
                background: rgba(0,0,0,.5);
                width: 100%;
                height: 100%;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                z-index: 99;
                .intermediate{
                    width: 80%;
                    /*height: 62%;*/
                    background: #ffffff;
                    border-radius: 5px;
                    position:absolute;
                    padding: 10px 15px 25px 15px;
                    top:50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    text-align: center;
                    .iconrigth{
                        text-align: right;
                        .cancel{

                        }
                    }
                    .intermediate-text{
                        padding: 0px 0px 20px 0px;
                        font-size: 15px;
                        color: #1d91d4;
                    }
                    .intermediate-p{
                        text-align: left;
                        font-size: 12px;
                        color: #666;
                        word-break:break-all;
                        &.intermediate-bm1{
                            padding-bottom: 15px;
                        }
                        &.intermediate-bm3{
                            padding-bottom: 35px;
                        }
                    }
                    .intermediate-code{
                        font-size: 12px;
                        color: #999;
                    }
                    img{
                        width: 50%;
                    }
                }
            }

            .inputWrap{
                height: 50px;
                line-height: 50px;
                position: relative;
                font-size: 16px;
                color: #101010;
                background: #fff;

                .name{
                    position: absolute;
                    width: 80px;
                    left: 32px;
                    top: 0;
                }
                input{
                    display: block;
                    border: none;
                    width: 100%;
                    height: 50px;
                    padding-left: 140px;
                    padding-right: 12px;
                    box-sizing: border-box;
                    font-size: 14px;
                }
            }
            .getCode:before{
                left: 0;
                width: 100% !important;
            }
            .getCode{
                .verify-code{
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    margin-top: -16.5px;
                    font-size: 12px;
                    color: #008cee;
                    border-left: 1px solid #ccc;
                    height: 33px;
                    line-height: 33px;
                    width: 80px;
                    /*border-radius: 6px;*/
                    text-align: center;
                    background: #ffffff;
                }
                input{
                    padding-right: 104px;
                }
            }
            .btns{
                padding: 57px 12px 0;

                .login{
                    /*background: #1d91d4;*/
                    display: block;
                    height: 44px;
                    width: 100%;
                    margin: 12px 0;
                    font-size: 14px;
                    color: #1d9dd4;
                    border-radius: 5px;
                    text-align: center;
                }
                .loginbg{
                    background: #1d91d4;
                    color: #fff;
                    font-size: 16px;
                }
            }
        }
    }
</style>
