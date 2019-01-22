<template>
    <div id="postbox">
        <Header title="修改邮箱">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="content">
            <div class="head">
                <div class="my" >当前邮箱</div>
                <span v-if="!emails">未绑定邮箱账号</span>
                <span>{{emails}}</span>
            </div>

            <div class="con">
                <!--<div class="text">添加邮箱</div>-->
                <div class="text ">更改邮箱</div>
                <div class="bgcolor">
                    <div class="mx-1px-bottom">
                        <input type="text" placeholder="邮箱账号" v-model="email" >
                    </div>
                    <div class="email mx-1px-bottom">
                        <input type="number" placeholder="验证码" v-model="code">
                        <span v-show="show" class="count" @click="getEmail">获取验证码</span>
                        <span v-show="!show" class="count">重新发送{{count}}s</span>
                    </div>
                </div>

            </div>
            <div class="bottom" >
                <div class="edit" @click="submit" >
                    确定
                    <!--<span>更改</span>-->
                </div>
            </div>
        </div>
    </div>



</template>

<script type="text/ecmascript-6">
    import {cache_keys, Cache, is } from '../../utils/util';

    export default {
        name: 'postbox',
        data() {
            return {
                email: '',
                code: '',
                show: true,
                count: '',
                timer: null,
                emails: '',
            }
        },
        methods: {

            submit() {
                var message = null;

                if (!is.has(this.email)) {
                    message = '请输入您的邮箱账号';
                } else if (!is.email(this.email)) {
                    message = '邮箱格式不正确，请重新输入';
                } else if (!is.has(this.code)) {
                    message = '请输入验证码';
                }

                if (message) {
                    this.$Modal.confirm({body: message});
                } else {
                    var data = {
                        email: this.email,
                        code:this.code,
                    }
                    this.$store.dispatch('modifyEmail', data);
                }
            },
            getEmail(){
                var message = null;

                if (!is.has(this.email)) {
                    message = '请输入您的邮箱账号';
                } else if (!is.email(this.email)) {
                    message = '邮箱格式不正确，请重新输入';
                }

                if (message) {
                    this.$Modal.confirm({body: message});
                } else {
                    this.$store.dispatch('userEmail', this.email)
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                }

            },
            Info(res) {
                this.emails = res.data.email;
            },
            modifyemail() {
                this.$Modal.confirm({body: "修改成功", onOk: function () {
                    window.history.back();
                }})
                this.$store.dispatch('queryUserInfo');
            },
            useremail() {
                this.$Modal.confirm({body: "验证码已发送到邮箱"})
            },

        },
        created() {
            EventBus.$on('modifyemail', this.modifyemail);
            EventBus.$on('useremail', this.useremail);

            var userInfo  = Cache.get(cache_keys.info);
            if (userInfo) {
                this.Info(userInfo)
            } else {
                this.$store.dispatch('queryUserInfo');
                EventBus.$on('userInfo',this.Info);
            }
        },
        beforeDestroy() {
            EventBus.$off('modifyemail');
            EventBus.$off('useremail');
            EventBus.$off('userInfo');
        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #postbox{
        background: #efeff4;
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


            .head{
                background: #008cee;
                padding: 10px 15px;
                .my{
                    color: #fff;
                }
                span{
                    color: rgba(255,255,255,.6);
                    font-size: 12px;
                }

            }
            .con{
                margin-top: 10px;
                width: 100%;
                .text{
                    padding: 20px 15px;
                    padding-bottom: 5px;
                }
                .bgcolor{
                    background: #ffffff;
                }
                input{
                    font-size: 12px;
                    padding: 14px 15px;
                    width: 100%;
                    background: #fff;
                }
                .email{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .count{
                        font-size: 12px;
                        border-left: 1px solid #ccc;
                        color: #008cee;
                        width: 100px;
                        padding: 5px 10px;

                        &.send{
                            color: #9a9a9a;
                        }
                    }
                }

            }
            .bottom {

                background: #008cee;
                padding: 14px 0;
                justify-content: center;
                align-items: center;
                text-align: center;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                .edit {
                    text-align: center;
                    color: #fff;
                }
            }


        }

    }


</style>
