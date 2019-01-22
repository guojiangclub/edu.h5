<template>
    <div id="user-register">
        <Header title="注册" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="content">
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
            <div class="btns">
                <!--<submit v-ref:button class="blue" @submit="register">注册</submit>-->
                <button class="login loginbg" @click="register">注册</button>
                <button class="login" @click="jump('user-login')">已有帐号？点击登录</button>
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
                rf: Cache.get(cache_keys.agent_code) || '',
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name : name, query: {source:this.query.source}});
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
                    register.call(this);
                    console.log(this);
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
            .inputWrap:before{
                left: 32px;
                width: 91%;
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
