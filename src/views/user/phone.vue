<template>
    <div id="phone">
        <Header title="修改手机">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="content">
            <div class="head">
                <div class="my" >当前手机号</div>
                <span v-if="!mobiles">未绑手机号</span>
                <span v-else>{{mobiles}}</span>
            </div>


            <div class="con">
                <div class="text">绑定手机号</div>
                <div class="mx-1px-bottom">
                    <input type="text" placeholder="请填写手机账号" v-model="mobile">
                </div>
                <div class="getCode mx-1px-bottom">
                    <input type="number" placeholder="验证码" v-model="code">
                    <verify label="获取验证码" title="短信发送中.." message="重新发送{counter}s" :account="mobile"></verify>
                </div>
            </div>
            <div class="bottom" >
                <div class="edit" @click="submit" >
                    确定
                </div>
            </div>
        </div>
    </div>



</template>

<script type="text/ecmascript-6">
    import Verify from '../../components/verify-code.vue';
    import {cache_keys, Cache, is } from '../../utils/util';


    export default {
        name: 'phone',
        components:{
            Verify
        },
        data() {
            return {
                mobile: '',
                code: '',
                sms_token: '',
                mobiles: ''
            }
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
                }

                if (message) {
                    this.$Modal.confirm({body: message});
                } else {
                    var data = {
                        mobile: this.mobile,
                        code:this.code,
                        access_token: this.sms_token
                    }
                    this.$store.dispatch('phoneNumber', data);
                }

            },
            Info(res) {
                this.mobiles = res.data.mobile;
            },
            phonenum() {
                this.$Modal.confirm({body: "修改成功", onOk: function () {
                    window.history.back();
                }})
                this.$store.dispatch('queryUserInfo');
            }

        },
        created() {
            var userInfo  = Cache.get(cache_keys.info);
            if (userInfo) {
                this.Info(userInfo)
            } else {
                this.$store.dispatch('queryUserInfo');
                EventBus.$on('userInfo',this.Info);
            }
            EventBus.$on('phonenum',this.phonenum);
        },
        beforeDestroy() {
            EventBus.$off('phonenum');
        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #phone{
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
                .text{
                    padding: 20px 15px;
                    padding-bottom: 5px;
                }
                input{
                    font-size: 12px;
                    padding: 14px 15px;
                    width: 100%;
                    background: #fff;
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
