<template>
    <div id="user-find-pwd">
        <Header title="找回密码" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="content">
            <div class="inputWrap mx-1px-bottom">
                <div class="name">手机号</div>
                <input type="number" placeholder="请输入手机号" v-model="mobile">
            </div>
            <div class="getCode inputWrap mx-1px-bottom">
                <div class="name">验证码</div>
                <input type="number" placeholder="请输入验证码" v-model="code">
                <verify label="获取验证码" title="短信发送中.." message="重新发送{counter}s" :account="mobile"></verify>
            </div>
            <div class="inputWrap mx-1px-bottom">
                <div class="name">新密码</div>
                <input type="password" placeholder="请输入新密码" v-model="password">
            </div>
            <div class="inputWrap mx-1px-bottom bleft">
                <div class="name">确认密码</div>
                <input type="password" placeholder="请确认新密码" v-model="again_password">
            </div>
            <div class="btns" @click="submit">
                提 交
                <!--<submit v-ref:button class="blue" @submit="_submit">提交</submit>-->
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Verify from '../../components/verify-code.vue';
    import {cache_keys, Cache, is } from '../../utils/util';
    import {logout} from '../../utils/oauth';

    export default {
    	name: 'find-pwd',
        components: {
            Verify
        },
        data() {
        	return {
                sms_token: '',
                mobile: '',
                password: '',
                again_password: '',
                code: '',
            }
        },
	    created() {
    		EventBus.$on('find', this.findData);
        },
        beforeDestroy() {
            EventBus.$off('find');
        },
        methods: {
        	submit() {
                var message = null;

                if (!is.has(this.mobile)) {
                    message = '请输入您的手机号';
                } else if (!is.mobile(this.mobile)) {
                    message = '手机号格式不正确，请重新输入';
                } else if (!is.has(this.code)) {
                    if (!this.sms_token) {
                        message = '请获取验证码';
                    } else {
                        message = '请输入验证码';
                    }
                } else if (!this.sms_token) {
                    message = '请获取验证码并正确填写';
                } else if (!is.has(this.password)) {
                    message = '请输入密码';
                } else if (!is.password(this.password)) {
                    message = '密码不能少于六位，请重新输入';
                } else if (!is.equal(this.password, this.again_password)) {
                    message = '两次输入的密码不一致，请重新输入';
                }

                if (message) {
	                this.$Modal.confirm({body: message});
                } else {
                	var data = {
                        password:this.password,
                        password_confirmation: this.again_password,
                        mobile: this.mobile,
                        code:this.code,
                        access_token: this.sms_token
                    }
                    this.$Indicator.blade({text: '修改中...'});
                    this.$store.dispatch('findPwd', data);
                }
            },
            login() {
        		var is_login = !!Cache.get(cache_keys.token);
        		if (is_login) {
			        Cache.remove(cache_keys.token);
                }
	            this.$router.push({name: 'user-login'});
            },
            findData() {
	            this.$Modal.confirm({body: '修改成功', onOk: this.login});
            }
        }
    }

</script>

<style rel="stylesheet/less" lang="less">
    #user-find-pwd {
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
            .bleft:before{
                left: 0;
                width: 100%;
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

                .verify-code{
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    margin-top: -16.5px;
                    font-size: 12px;
                    color: #1d9dd4;
                    border-left: 1px solid #ccc;
                    height: 33px;
                    line-height: 33px;
                    width: 80px;
                    /*border-radius: 6px;*/
                    text-align: center;
                }
            }
            .btns {
                display: block;
                height: 44px;
                line-height: 44px;
                width: 90%;
                margin: 57px auto;
                font-size: 16px;
                color: #fff;
                border-radius: 5px;
                text-align: center;
                background: #008cee;
                outline: none;
                border: none;
            }
        }
    }
</style>
