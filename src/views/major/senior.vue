<template>
    <div id="senior">
        <Header title="数据分析师（高级）">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="contents">
            <img src="../../static/img/senior_02.png" alt="">
            <img src="../../static/img/senior_03.png" alt="">
            <img src="../../static/img/senior_04.png" alt="">
            <div class="container">
                <div class="container-item">
                    <div class="title">
                        <div class="text">
                            必修课1：八大数据分析能力课程大纲
                        </div>
                        <div @click="jump(info.courseItems1[0].courseId)">
                            立即学习
                        </div>
                    </div>
                    <div class="list">
                        <div class="item" v-for="(item, index) in info.courseItems1">
                            <div class="text" v-if="item.itemType != 'chapter'">
                                课时{{item.number}}：{{item.title}}
                            </div>
                            <div class="lock" v-if="item.itemType != 'chapter' && index == 1" @click="jump(info.courseItems1[0].courseId)">
                                查看详细大纲
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-item">
                    <div class="title">
                        <div class="text">
                            必修课2：Python数据分析挖掘课程大纲
                        </div>
                        <div @click="jump(info.courseItems2[0].courseId)">
                            立即学习
                        </div>
                    </div>
                    <div class="list">
                        <div class="item" v-for="(item, index) in info.courseItems2">
                            <div class="text" v-if="item.itemType != 'chapter'">
                                课时{{item.number}}：{{item.title}}
                            </div>
                            <div class="lock" v-if="item.itemType != 'chapter' && index == 1" @click="jump(info.courseItems2[0].courseId)">
                                查看详细大纲
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-item">
                    <div class="title">
                        <div class="text">
                            必修课3：R语言商务图表课程大纲
                        </div>
                        <div @click="jump(info.courseItems3[0].courseId)">
                            立即学习
                        </div>
                    </div>
                    <div class="list">
                        <div class="item" v-for="(item, index) in info.courseItems3">
                            <div class="text" v-if="item.itemType != 'chapter'">
                                课时{{item.number}}：{{item.title}}
                            </div>
                            <div class="lock" v-if="item.itemType != 'chapter' && index == 1" @click="jump(info.courseItems3[0].courseId)">
                                查看详细大纲
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="edu-list-box">
                <div class="title">
                    可从以下课程中任选5门选修课，强化能力

                    <div class="desc">
                        学院涵盖数据系列的课程：从基础的数据库知识，到商业智能解决方案，到数据挖掘，大数据， 数据分析与统计， 人工智能，深度学习，机器学习等系列！以下为天善学院部分优质课程推荐
                    </div>
                </div>

                <div class="edu-list">
                    <div class="mx-1px-bottom edu-item" v-for="item in info.courses" @click="jump(item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
                            <div class="promotion" v-if="item.is_discount == 1">
                                限时优惠中
                            </div>
                        </div>
                        <div class="item-right">
                            <div class="edu-name">
                                {{item.title}}
                            </div>
                            <div class="edu-middle">
                                <div class="tiem">
                                    <i class="iconfont icon-liulan-"></i>
                                    <div>{{item.lessonNum}}课时</div>
                                </div>
                                <div class="people">
                                    {{item.studentNum}}人学习
                                </div>
                            </div>
                            <div class="edu-bottom">
                                <div class="teacher">
                                    <i class="iconfont icon-renshu-"></i>
                                    <span>{{item.teacher_info.user_name}}</span>
                                </div>
                                <div class="money">
                                    <span class="price" v-if="item.is_discount == 1">{{item.price}}元</span>
                                    <span v-if="item.price !=  0">{{item.svip_price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="more" @click="jumpPage('edu')">
                        查看更多优质课程
                    </div>
                </div>

                <img src="../../static/img/senior_06.png" alt="">
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
                <div class="back" @click="jumpPage('edu')">
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
        name: 'senior',
        components: {
            Countdown
        },
        data() {
            return {
                info: ''
            }
        },
        created() {
            var data = {
                url: 'major/analyst/senior',
                name: 'Senior'
            }
            this.$Indicator.blade();
            this.$store.dispatch('queryMajorItem', data);

            EventBus.$on('majorSenior', this.majorSeniorData);
            EventBus.$on('svipNewCharge', this.svipCharge);
            EventBus.$on('wxSvipNewCharge', this.wxSvipCharge);
        },
        methods:{
            jump(id) {
                this.$router.push({name: 'edu-course', params: {id: id}, query: {status: 1}});
            },
            jumpPage(path) {
                this.$router.push({name: path});
            },
            majorSeniorData(res) {
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
            EventBus.$off('majorSenior');
            EventBus.$off('svipNewCharge');
            EventBus.$off('wxSvipNewCharge');
        }
    }
</script>


<style rel="stylesheet/less" lang="less">
    #senior {
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

            .container {
                background: #142843;
                .container-item {
                    padding: 0 15px 20px 15px;
                    .title {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        color: #4986c5;
                        padding-bottom: 5px;
                        border-bottom: 1px solid #ffffff;

                        .text {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            flex: 1;
                            color: #f29111;
                            .doc-top{
                                text-decoration: line-through;
                            }
                        }
                    }
                    .list {
                        padding: 10px;
                        background: #393b43;
                        margin-top: 10px;
                        overflow: auto;
                        height: 250px;
                        color: #ffffff;
                        font-size: 12px;
                        border-radius: 8px;

                        .item {
                            display: flex;
                            align-items: center;
                            line-height: 25px;
                            .text {
                                flex: 1;
                            }
                            .lock {
                                color: #4986c5;
                            }
                        }
                    }
                }
            }
            .edu-list-box {
                background: #ffffff;
                .title {
                    padding: 0 15px;
                    margin-top: 50px;
                    color: #001d32;
                    font-size: 14px;
                    text-align: center;
                    .desc {
                        font-size: 12px;
                    }
                }
                .edu-item{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: flex-start;
                    justify-content: space-between;
                    padding: 12px;

                    .item-left{

                        position: relative;
                        /*width: 35%;*/
                        min-width: 110px;
                        max-width: 130px;
                        padding-right: 12px;
                        overflow: hidden;
                        box-sizing: content-box;

                        img{
                            display: block;
                            width: 100%;
                        }

                        .promotion{
                            font-size: 12px;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 12px;
                            height: 20px;
                            line-height: 20px;
                            color: #FFFFFF;
                            padding-left: 10px;
                            background: rgba(255,0,0,.5);
                        }
                    }
                    .item-right{
                        flex: 1;
                        overflow: hidden;
                        line-height: 17px;

                        .edu-name{
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            font-size: 14px;
                            height: 33px;
                        }
                        .edu-middle{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 10px;
                            color: #999999;
                            margin: 3px 0;
                            .tiem{
                                display: flex;
                                align-items: center;
                                font-size: 10px;

                                i{
                                    margin-right: 5px;
                                    font-size: 10px;
                                    display: block;
                                }
                            }
                            .people{

                            }
                        }
                        .edu-bottom{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 10px;
                            color: #999999;
                            .teacher{
                                flex: 1;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                i{
                                    font-size: 10px;
                                }
                            }
                            .money{
                                font-size: 12px;
                                color: #005AAC;

                                .price{
                                    color: #999999;
                                    text-decoration: line-through;
                                    margin-right: 5px;
                                }
                            }
                        }
                    }
                }

                .more {
                    border-radius: 4px;
                    text-align: center;
                    padding: 10px;
                    color: #4986c5;
                    border: 1px solid #4986c5;
                    margin: 15px 12px 50px 12px;
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
