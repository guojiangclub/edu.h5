<template>
    <div id="user-login">
        <Header title="登录" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="content">
            <div class="ts mx-1px-bottom">
                <img class="tsimg" src="../../static/img/ts.png" alt="">
            </div>
            <div class="inputWrap mx-1px-bottom bleft">
                <div class="name">账号</div>
                <input type="text" placeholder="手机/用户名/邮箱" v-model="username">
            </div>
            <div class="inputWrap mx-1px-bottom">
                <div class="name">密码</div>
                <input type="password" placeholder="请输入账号密码" v-model="password">
            </div>
            <p class="forget-password" @click="jump('user-find')">忘记密码</p>
            <div class="btns">
                <!--<submit v-ref:button class="blue" @submit="login">登录</submit>-->
                <button class="register login" @click="login">登 录</button>
                <button class="register" @click="jump('user-register')">没有帐号？ 点击注册</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { env, is, Cache, cache_keys, } from '../../utils/util';
    import { userLogin, openidLogin, getOpenid } from '../../utils/oauth';

    export default{
	    name: 'login',
        data(){
            return {
                username: '',
                password: '',
	            rf: Cache.get(cache_keys.agent_code) || '',
                query: this.$route.query
            }
        },
        methods: {
        	jump(name) {
        		this.$router.push({name : name, query: this.query});
            },
            login() {
                var message = null;

                if (!is.has(this.username)) {
                    message = '请输入用户名';
                } else if (!is.has(this.password)) {
                    message = '请输入密码';
                }

                if (message) {
//                    this.$refs.button.done();
//                    this.$Alert(message);
	                this.$Modal.confirm({body: message});
                } else {
                    this.$Indicator.blade({text: '登录中...'});

                    userLogin.call(this);
                }
            }

        },
	    created() {
//        	if (env.isWechat) {
//		        this.$Indicator.blade({text: '登录中...'});
//            }
        },
       /* created() {
	        if (env.isWechat) {
		        var type = this.$route.query.type;
		        var openid = this.$route.query.openid || this.$route.query['?openid'];

		        if (openid && type === 'oauth') {

			        // 查询该openid是否可以登录
			        openidLogin.call(this, {
				        onSuccess: null,
				        onError: function () {
					        this.$Modal.confirm({body: '未能自动登录，请手动登录'});
				        }
			        });
		        } else {

			        // 直接去取openid
			        getOpenid.call(this);
//				        next();
		        }
	        }
        },
	     beforeRouteEnter(to, from, next) {
        	if (env.isWechat) {
        		next(that => {
			        var type = that.$route.query.type;
			        var openid = that.$route.query.openid || that.$route.query['?openid'];

			        if (openid && type === 'oauth') {

				        // 查询该openid是否可以登录

					        openidLogin.call(that, {
						        onSuccess: function () {
							        that.$Indicator.remove();
						        },
						        onError: function () {
							        that.$Indicator.remove();
							        that.$Modal.confirm({body: '未能自动登录，请手动登录'});
							        return null
						        }
					        });

			        } else {
				        // 直接去取openid
				        getOpenid.call(that);
			        }
                })
            } else {
        		next();
            }
	    }*/
    }

</script>

<style rel="stylesheet/less" lang="less">
    #user-login {
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
        .content {
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

            input{
                outline: none;
            }
            .bleft:before{
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
                    padding-left: 101px;
                    padding-right: 12px;
                    box-sizing: border-box;
                    font-size: 14px;
                }
            }
            .forget-password{
                height: 44px;
                line-height: 44px;
                font-size: 14px;
                color: #1d9dd4;
                text-align: right;
                padding-right: 15px;
            }
            .btns{
                padding: 10px 12px 0;

                .register{
                    display: block;
                    height: 44px;
                    width: 100%;
                    margin: 12px 0;
                    font-size: 14px;
                    color: #1d9dd4;
                    border-radius: 5px;
                    text-align: center;
                    /*background: #ed0000;*/
                    outline: none;
                    border: none;

                    &.login{
                        background: #1d91d4;
                        color: #fff;
                        font-size: 16px;
                    }
                }
            }

        }
    }
</style>
