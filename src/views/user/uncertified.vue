<template>
    <div id="uncertified">
        <Header title="我的">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="go" v-if="!info">
                <div class="head">
                    <div class="my">未认证</div>
                    <span>您还未进行认证，请尽快认证。我们将严格保障您的信息安全</span>
                </div>
                <div class="follow-item" >
                    <img src="../../static/img/sfz.png" alt="">
                    <div class="text" @click="jump('identity')">去认证</div>
                </div>
            </div>
            <div class="auditing" v-else>
                <div class="not" v-if="info.status == 2">
                    <div class="head">
                        <div class="my">未认证</div>
                        <span>您还未进行认证，请尽快认证。我们将严格保障您的信息安全</span>
                    </div>
                    <div class="follow-item" >
                        <img src="../../static/img/sfz.png" alt="">
                        <div class="text" @click="jump('identity')">去认证</div>
                    </div>
                </div>
                <div class="head">
                    <div class="my" v-if="info.status == 0">审核中</div>
                    <span v-if="info.status == 0">我们将在2个工作日内完成审核工作，请耐心等待，谢谢！</span>
                    <div class="my" v-if="info.status == 1">已认证</div>
                    <span v-if="info.status == 1">您已进行身份认证，我们将保障您的信息安全</span>
                </div>
                <div class="con">
                    <div class="text ">真实姓名</div>
                    <input type="text" placeholder="请输入真实姓名" readonly v-model="info.name">

                    <div class="text">身份证号</div>
                    <input type="text" placeholder="请输入本人真实身份证号" readonly v-model="info.card">

                </div>
                <div class="bottom" v-if="info.status !== 2">
                    <div class="edit" @click="revert" >返回</div>
                </div>
            </div>

        </div>



    </div>



</template>

<script type="text/ecmascript-6">

    import {logout} from '../../utils/oauth';
    import { is } from '../../utils/util';

    export default {
        name: 'uncertified',
        data() {
            return {
                height: '100%',
                info: ''
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
            idcard(res) {
                this.info = res.data;
            },
            revert() {
                window.history.back();

                /*if (this.$route.query.type == 1) {
                    let url =window.location.origin + '/#/user/fit'
                    window.history.pushState('fit', '设置', url)
                } else {
                    let url = window.location.origin + '/#/user';
                    window.history.pushState('user', '我的', url);
                }*/
            }

        },
        created() {
	        this.$Indicator.blade();
            this.$store.dispatch('queryidCard');
            EventBus.$on('qIdCard', this.idcard);

        },
        beforeDestroy() {
            EventBus.$off('qIdCard');
        },
    }

</script>


<style rel="stylesheet/less" lang="less">

    #uncertified{
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
            .go{
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
                .follow-item{
                    text-align: center;
                    padding: 0px 15px;
                    img{
                        width: 115px;
                        height: 85px;
                        margin: 65px auto;
                    }
                    .text{
                        color: #fff;
                        background: #008cee;
                        padding: 13px 0px;
                    }

                }
            }

            .auditing{
                .not{
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
                    .follow-item{
                        text-align: center;
                        padding: 0px 15px;
                        img{
                            width: 115px;
                            height: 85px;
                            margin: 65px auto;
                        }
                        .text{
                            color: #fff;
                            background: #008cee;
                            padding: 13px 0px;
                        }

                    }
                }
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

    }


</style>
