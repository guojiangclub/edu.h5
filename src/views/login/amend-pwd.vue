<template>
    <div id="user-amend-password">
        <Header title="修改密码" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="inputWrap mx-1px-bottom">
                <div class="name">当前密码</div>
                <input type="password" placeholder="当前密码" v-model="old_password">
            </div>
            <div class="inputWrap mx-1px-bottom">
                <div class="name">新密码</div>
                <input type="password" placeholder="新密码" v-model="password">
            </div>
            <div class="inputWrap mx-1px-bottom">
                <div class="name">确认密码</div>
                <input type="password" placeholder="确认密码" v-model="password_confirmation">
            </div>

            <div class="submit" @click="submit">
                保存
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	import { Cache, cache_keys, is } from '../../utils/util';
	import { logout } from '../../utils/oauth';
    export default {
    	name: 'amend-pwd',
        data() {
    		return {
			    old_password: '',
			    password: '',
			    password_confirmation: ''
            }
        },
        created() {
    		EventBus.$on('amend', this.pwdData)
        },
	    beforeDestroy() {
    		EventBus.$off('amend')
        },
        methods: {
    		pwdData(res) {
    			if (res.status) {
				    this.$Modal.confirm({body: '修改成功'});
                    var that = this;
				    setTimeout(function(){
//					    Cache.remove(cache_keys.token);
					    that.$router.push({name: 'fit'});
				    }, 1000);

                } else {
				    this.$Modal.confirm({body: res.message});
                }
            },
    		submit() {
			    const data = {
				    old_password: this.old_password,
				    password: this.password,
				    password_confirmation: this.password_confirmation
			    }

    			var message = null;
			    if (!is.has(this.old_password)) {
			    	message = '请输当前密码'
                } else if (!is.has(this.password))  {
    				message = '请输入新密码'
                } else if (!is.has(this.password_confirmation)) {
    				message = '请输入确认密码'
                } else if (!is.password(this.password)) {
    				message = '密码不能少于六位，请重新输入'
                } else if (!is.password(this.password_confirmation)) {
				    message = '确认密码不能少于六位，请重新输入'
                } else if (this.password != this.password_confirmation) {
    				message = '两次密码不一致, 请重新输入'
                }
                if (message) {
	                this.$Modal.confirm({body: message});
                } else {
	                this.$store.dispatch('amendPwd', data);
                }
            }
        }
    }

</script>

<style rel="stylesheet/less" lang="less">
    #user-amend-password{
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
        .contents{
            height: 100%;
            overflow: auto;

            .inputWrap{
                height: 50px;
                line-height: 50px;
                position: relative;
                font-size: 16px;
                color: #101010;

                .name{
                    position: absolute;
                    width: 80px;
                    left: 12px;
                    top: 0;
                }
                input{
                    display: block;
                    border: none;
                    width: 100%;
                    height: 50px;
                    padding-left: 92px;
                    padding-right: 12px;
                    box-sizing: border-box;
                }

                .verify-code{
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    margin-top: -16.5px;
                    font-size: 12px;
                    color: #008cee;
                    border: 1px solid #008cee;
                    height: 33px;
                    line-height: 33px;
                    width: 80px;
                    border-radius: 6px;
                    text-align: center;
                }
            }
            .submit{
                margin: 40px 12px 0 12px;
                text-align: center;
                background: #0894ec;
                color: #ffffff;
                height: 40px;
                line-height: 40px;
                border-radius: 5px;
            }
        }
    }
</style>
