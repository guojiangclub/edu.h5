<template>
    <div id="index">
        <Header title="天善智能年度SVIP计划">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="contents">
            <img src="../../static/img/major_02.png" alt="">

            <div class="edu-list-box">
                <div class="title">
                    为你定制十大提升方案

                    <div class="desc">
                        分析工具深度覆盖，实操项目经验加分，VIP群答疑解惑
                    </div>
                </div>
                <div class="edu-item-box">
                    <div class="edu-item" @click="jump('junior')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-01.png" alt="">
                            <div class="text">
                                从零开始一站开启最Hot岗位，破冰数据分析师！
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('senior')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-02.png" alt="">
                            <div class="text">
                                业务思维，点金赋能； Python+R，如虎添翼； 游刃数据职场！
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('python')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-03.png" alt="">
                            <div class="text">
                                大千万象，“爬”我所需！ 最专业的爬虫课程双子星！
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('datamining')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-04.png" alt="">
                            <div class="text">
                                左手Python右手R，切磋共 进，吃透数据挖掘！
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('bigdata')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-05.png" alt="">
                            <div class="text">
                                小白必备，从大数据工程师 到架构师的必修之路!
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('bi')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-06.png" alt="">
                            <div class="text">
                                业务+架构精华经验，经典 王者工具合集，最专业的商 业智能案头手册！
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('datascientist')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-07.png" alt="">
                            <div class="text">
                                全网畅销，名师经典！数据 科学自我养成秘籍！
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('ai')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-08.png" alt="">
                            <div class="text">
                                从零开始，洞悉产品，上手 开发！最友好的人工最能破 冰课程！
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('nlp')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-09.png" alt="">
                            <div class="text">
                                循序渐进、挑战自我！人工 智能高级实战系列！
                            </div>
                        </div>
                    </div>
                    <div class="edu-item" @click="jump('finance')">
                        <div class="con">
                            <img src="https://www.hellobi.com/major/img/bi/uploads-10.png" alt="">
                            <div class="text">
                                来自一线，金融实战，高薪 在望！最具价值的人工智能  X 金融领域课程！
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tips">
                    <div class="title">我是老司机，我要自己选择SVIP课程来提升自己</div>
                    <div class="info">性价比超高，2018svip会员可从SVIP课程中免费学习其中的8套</div>
                    <div class="choose" @click="jump('edu-svip-new')">立即前往选择SVIP课程</div>
                </div>
                <img src="../../static/img/SVIP-1015.png" alt="">
                <img src="../../static/img/finance_08.png" alt="">
                <div class="time-box">
                    <div class="left">
                        <div class="text">
                            <div><span>￥</span>{{info.svipPrice}}</div>
                            <div class="doc-top">原价：￥1999</div>
                        </div>
                        <div class="time">
                            <div class="pay-time"><countdown :value="info.svipPromotionEndTime"></countdown></div>
                        </div>
                    </div>
                    <div class="right" :class="info.isMember ? 'active' : ''">
                        <span v-if="!info.isMember" @click="submit">立即购买SVIP</span>
                        <span v-if="info.isMember">您已购买SVIP</span>
                    </div>
                </div>
                <div class="back" @click="jump('edu')">
                    <i class="iconfont icon-shouye"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<script type="text/ecmascript-6">
    import Countdown from '../../components/Countdown-vip.vue';
    import {Cache, cache_keys,env} from'../../utils/util';
    import pingpp from 'pingpp-js';

    export default {
        name: 'python',
        components: {
            Countdown
        },
        data() {
            return {
                info: ''
            }
        },
        created() {
            this.$Indicator.blade();
          this.$store.dispatch('queryMajorIndex');


            EventBus.$on('svipNewCharge', this.svipCharge);
            EventBus.$on('wxSvipNewCharge', this.wxSvipCharge);
          EventBus.$on('MajorIndex', this.MajorIndexData)
        },
        methods: {
            jump(path) {
                this.$router.push({name: path});

            },
            MajorIndexData(res) {
                this.info = res.data
            },
            submit() {
                var isLogin = !!Cache.get(cache_keys.token);
                var channel = 'alipay_wap';
                var extra = {
                    success_url: window.location.href,
                    cancel_url: window.location.href
                };
                if (env.isWechat) {
                    channel = 'wx_pub'
                }
                var data = {
                    channel: channel,
                    extra:extra,
                    rf: this.$route.query.rf || Cache.get(cache_keys.agent_code) || ''
                }
                if (!isLogin) {
                    this.$Modal.info({body: "请登录！", onOk: () => {
                        this.$router.push({name: 'user-login'})
                    }})
                } else {
                    this.$store.dispatch('submitSvipNew', data);
                }
            },
            svipCharge(success, charge) {
                if (success) {
                    pingpp.createPayment(charge, (result, err) => {
                        if (result == "success") {
                            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                        } else if (result == "fail") {
                            // charge 不正确或者微信公众账号支付失败时会在此处返回
                        } else if (result == "cancel") {
                            // 微信公众账号支付取消支付
                        }
                    })
                } else {
                    this.$Modal.confirm({body: '请求支付失败, 请重试!'});
                }
            },
            wxSvipCharge(data) {
                window.location.href = data.url;
            }
        },
        beforeDestroy() {
            EventBus.$off('MajorIndex');
            EventBus.$off('svipNewCharge');
            EventBus.$off('wxSvipNewCharge');
        }
    }
</script>


<style rel="stylesheet/less" lang="less">
    #index {
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                    font-size: 15px;
                }
            }
            .title {
                text-align: center;
            }
            .right {
                font-size: 0;
            }
        }
        .contents {
            height: 100%;
            overflow: auto;
            padding-bottom: 60px;
            img {
                display: block;
                width: 100%;
            }

            .edu-list-box {
                background: #ffffff;
                .title {
                    padding: 0 15px;
                    margin-top: 50px;
                    color: #001d32;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
                    .desc {
                        font-weight: normal;
                        font-size: 12px;
                        color: #666666;
                    }
                }
                .edu-item-box {
                    font-size: 0;
                    padding: 0 7px;
                    margin-top: 10px;
                    .edu-item {
                        display: inline-block;
                        width: 33.33%;
                        background-color: #fff;
                        height: auto;
                        font-size: 12px;
                        padding:0 7px;
                        vertical-align: top;

                        margin-bottom: 10px;
                        .con {
                            height: 170px;
                            border-radius: 4px;
                            /*min-height: 130px;*/
                            box-shadow: 0px 3px 3px 1px #ebeaea;;
                            overflow: hidden;
                        }
                        img {
                            width: 100%;
                        }
                        .text {
                            padding: 5px;
                        }
                    }
                }
            }

            .tips {
                padding: 5px;
                text-align: center;
                .title {
                    font-size: 14px;
                    color: #101010;
                    margin-bottom: 5px;
                }
                .info {
                    font-size: 12px;
                    color: #666666;
                }
                .choose {
                    margin: 15px 0;
                    display: inline-block;
                    border-radius: 4px;
                    border: 1px solid #4B8AF2;
                    color: #4B8AF2;
                    padding: 6px 7px;
                    font-size: 10px;
                    text-decoration: none;
                }
            }
            .time-box {
                position: fixed;
                bottom: 0;
                width: 100%;
                display: flex;
                background: #f3f3f3;
                height: 50px;
                .left {
                    font-size: 10px;
                    flex: 3;
                    display: flex;
                    flex-direction: column;
                    padding: 0 5px;
                    overflow: hidden;
                    .text {
                        display: flex;
                        align-items: flex-end;
                        font-size: 18px;
                        color: #e62d21;
                        .doc-top{
                            font-size: 12px;
                            text-decoration: line-through;
                            color: #666666;
                            margin-bottom: 5px;
                            margin-left: 5px;
                        }
                    }
                    .time {
                        .pay-time {
                            background: #999999;
                            color: #ffffff;


                            .timevip {
                                color: #ffffff !important;
                                span {
                                    color: #ffffff !important;

                                }
                            }
                        }
                    }
                }
                .right{
                    text-align: center;
                    line-height: 50px;
                    font-size: 17px;
                    background: #e62d21;
                    color: #ffffff;
                    flex: 2;

                    &.active {
                        padding: 0 3px;
                        font-size: 10px;
                        background: #005AAC;
                    }
                }
            }
            .back {
                position: fixed;
                right: 20px;
                background: #ffffff;
                border-radius: 50%;
                bottom: 100px;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                i {
                    font-size: 20px;
                    color: #005AAC;
                }
            }
        }
    }
</style>
