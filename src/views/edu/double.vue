<template>
    <div id="edu-double">
        <Header title="天善智能11.11狂欢！" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="contents">
            <img src="../../static/img/25191434_cdR2.png" alt="">
            <div class="time-box" >
                <!--<div class="text">优惠仅</div>-->
                <countdown :value="data.expireDate"></countdown>
                <div>
                    原价1999元的SVIP，现在购 买SVIP只需998元，即可全学院课程任选8门，限量50个
                </div>

                <div class="buy" @click="submit">
                    <span v-if="!data.isMember">立即购买SVIP</span>
                    <span v-if="data.isMember">您已是 SVIP 会员</span>
                </div>


            </div>

            <div class="edu-warp" v-if="data.discountCourse">
                <div class="edu-item" @click="jump('edu-course', data.discountCourse.id)">
                    <div class="item-left">
                        <img :src="data.discountCourse.picture" alt="">
                        <div class="promotion" v-if="data.discountCourse.is_discount == 1">
                            11.11限时优惠中
                        </div>
                    </div>
                    <div class="item-right">
                        <div class="edu-name">
                            {{data.discountCourse.title}}
                        </div>
                        <div class="edu-middle">
                            <div class="tiem">
                                <i class="iconfont icon-liulan-"></i>
                                <div>{{data.discountCourse.lessonNum}}课时</div>
                            </div>
                            <div class="people">
                                {{data.discountCourse.studentNum}}人学习
                            </div>
                        </div>
                        <div class="edu-bottom">
                            <div class="teacher">
                                <i class="iconfont icon-renshu-"></i>
                                <span>{{data.discountCourse.teacher_info.user_name}}</span>
                            </div>
                            <div class="money">
                                <span class="price" v-if="data.discountCourse.is_discount == 1">{{data.discountCourse.price}}元</span>
                                <span v-if="data.discountCourse.svip_price !=  1">{{data.discountCourse.svip_price}}元</span>
                                <span v-else>免费</span>
                            </div>
                        </div>
                    </div>


                    <img class="img-44" src="https://www.hellobi.com/images/20181111/discount-tag.png" alt="">
                </div>

            </div>

            <div class="edu-warp">
                <div class="title">
                    人工智能与机器学习
                </div>
                <div class="info">
                    镀金前沿技术，激活自我，赋能企业，破冰人工智能时代。
                </div>

                <div class="edu-list">
                    <div class="edu-item" v-for="item in data.machineCourses " @click="jump('edu-course',item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
                            <div class="promotion" v-if="item.is_discount == 1">
                                11.11限时优惠中
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
                                    <span v-if="item.svip_price !=  1">{{item.svip_price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="edu-warp">
                <div class="title">
                    大数据分析与挖掘
                </div>
                <div class="info">
                    拥抱大数据平台，提升数据能力，辅助企业践行‘用数据说话”的数据文化，利用数据分析来辅助运营和决策。
                </div>

                <div class="edu-list">
                    <div class="edu-item" v-for="item in data.bigdataCourses " @click="jump('edu-course',item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
                            <div class="promotion" v-if="item.is_discount == 1">
                                11.11限时优惠中
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
                                    <span v-if="item.svip_price !=  1">{{item.svip_price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="edu-warp">
                <div class="title">
                    R语言&Python
                </div>
                <div class="info">
                    广向拓展企业数据源，深度挖掘企业数据金矿，提升企业智慧运营能力。
                </div>

                <div class="edu-list">
                    <div class="edu-item" v-for="item in data.pythonCourses " @click="jump('edu-course',item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
                            <div class="promotion" v-if="item.is_discount == 1">
                                11.11限时优惠中
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
                                    <span v-if="item.svip_price !=  1">{{item.svip_price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="edu-warp">
                <div class="title">
                    基础&业务&求职
                </div>
                <div class="info">
                    掌握数据科学，洞悉业务艺术，聆听专家职场案例，科学避坑，掌握面试技巧，全面提升竞争力。
                </div>

                <div class="edu-list">
                    <div class="edu-item" v-for="item in data.businessCourses " @click="jump('edu-course',item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
                            <div class="promotion" v-if="item.is_discount == 1">
                                11.11限时优惠中
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
                                    <span v-if="item.svip_price !=  1">{{item.svip_price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="edu-warp">
                <div class="title">
                    商业智能BI
                </div>
                <div class="info">
                    经典流传，支撑企业精细化管理、数据化运营之利器，成就业务与技术结合复合型人才之绝招。
                </div>

                <div class="edu-list">
                    <div class="edu-item" v-for="item in data.biCourses " @click="jump('edu-course',item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
                            <div class="promotion" v-if="item.is_discount == 1">
                                11.11限时优惠中
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
                                    <span v-if="item.svip_price !=  1">{{item.svip_price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







            <!--<div class="edu-warp">
                <div class="title">
                    精选微课
                </div>
                <div class="info">
                    一个微课就是一个主题，真实的、具体的、典型案例化的教与学让你收获满满！
                </div>

                <div class="edu-list">
                    <div class="edu-item" v-for="item in data.weikesCourses " @click="jump('edu-course',item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
                            <div class="promotion" v-if="item.is_discount == 1">
                                6.18限时优惠中
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
                                    <span v-if="item.svip_price !=  1">{{item.svip_price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->

            <div class="question">
                <div class="title">
                    常见问题/Question & Answer
                </div>
                <div class="item-box">
                    <div class="item">
                        <p>Q：双十一活动时间安排？</p>
                        <div>A：活动从11月1号开始，持续到11月14号，请大家及时购买心仪的课程。</div>
                    </div>
                    <div class="item">
                        <p>Q：如果我有关于此次活动的问题，该如何咨询？</p>
                        <div>A：您可以添加客服微信：tianshansoft08或天善一号，也可拨打咨询电话：158-2133-9409，联系梁老师QQ：744711023。</div>
                    </div>
                    <div class="item">
                        <p>Q：课程购买可以开发票吗？</p>
                        <div>A：可以，双十一期间购买课程500元以上开具正规增值税普通发票，500元以下需承担6%的税点。</div>
                    </div>
                    <div class="item">
                        <p>Q：课程有效期多久，可以下载吗？</p>
                        <div>A：课程有效期2年，暂时不支持下载学习。可在手机端直接打开 <a href="www.hellobi.com">www.hellobi.com</a> 观看课程！</div>
                    </div>
                    <div class="item">
                        <p>Q：学习过程中遇到问题怎么办？</p>
                        <div>A：可以直接在课程中独享的答疑区进行提问，讲师会积极回答问题。此外，凡参加课程的学员都会进入课程内容VIP群，讲师和社区专家会分享知识和答疑问题。</div>
                    </div>
                </div>
            </div>
            <div class="copyright">
                Copyright © 天善智能-上海拓善智能科技有限公司 2018
            </div>
        </div>

        <div class="tabbar-box">
            <div class="tabbar tab-title" :class="showSubSet ? 'cur' : ''">
                <div class="tabbar-item" @click="go(2)">
                    <i class="iconfont icon-kecheng"></i>
                    <div>课程</div>

                </div>
                <div class="tabbar-item" @click="go(1)">
                    <i class="iconfont icon-banji"></i>
                    <div>班级</div>
                </div>
                <div class="tabbar-item" @click="go(3)">
                    <div v-show="!showSubSet">
                        <i class="iconfont icon-faxian"></i>
                        <div>发现</div>
                    </div>
                    <div class="x" v-show="showSubSet">
                        <i class="iconfont icon-quxiao-"></i>
                    </div>
                </div>
                <div class="tabbar-item" @click="go(4)">
                    <img src="../../static/img/25191505_dSek.png" alt="">
                    <!--<div class="text">双11</div>-->
                </div>
                <div class="tabbar-item" @click="go(5)">
                    <i class="iconfont icon-VIP"></i>
                    <div>SVIP</div>
                </div>
            </div>

            <div class="subset tab-title" :class="showSubSet ? 'active' : ''">
                <div class="tabbar-item" @click="go(6)">
                    <i class="iconfont icon-toutiao"></i>
                    <div>头条</div>
                </div>
                <div class="tabbar-item" @click="go(7)">
                    <i class="iconfont icon-wenda"></i>
                    <div>问答</div>
                </div>
                <div class="tabbar-item" @click="go(8)">
                    <i class="iconfont icon-huodong"></i>
                    <div>活动</div>
                </div>
                <div class="tabbar-item" @click="go(9)">
                    <i class="iconfont icon-boke"></i>
                    <div>博客</div>
                </div>
                <div class="tabbar-item" @click="go(10)">
                    <i class="iconfont icon-wode"></i>
                    <div>我的</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Countdown from '../../components/Countdown.vue';
    import {Cache, cache_keys,env} from'../../utils/util';
    import pingpp from 'pingpp-js';
    export default {
        name: 'edu-double',
        components: {
            Countdown
        },
        data() {
            return {
                data: {
                    biCourses: [],
                    bigdataCourses: [],
                    businessCourses: [],
                    machineCourses:[],
                    pythonCourses: [],
                    weikesCourses: [],
                    expireDate: '',
                    isMember: ''
                },
	            showSubSet: false
            }
        },
        created() {
            this.$Indicator.blade();
            this.$store.dispatch('queryDoubleData');

            EventBus.$on('doubleData', this.dataSet);
            EventBus.$on('svipNewCharge', this.svipCharge);
            EventBus.$on('wxSvipNewCharge', this.wxSvipCharge);
        },
        beforeDestroy() {
            EventBus.$off('doubleData');
        },
        methods: {
            submit() {
                if (this.data.isMember) {
                    return
                }
                this.$router.push({name: 'edu-svip-new'});

                /*var isLogin = !!Cache.get(cache_keys.token);
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
                }*/
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
            },
            dataSet(data) {
                this.data = data;
            },

            jump(name,id) {
                if (id) {
                    this.$router.push({name: name, params:{id: id}})
                } else {
                    this.$router.push({name: name});
                }
            },
	        go(id) {
		        switch (id) {
			        case 1:
				        this.$router.push({name: 'edu-classes'})
				        break
			        case 2:
				        this.$router.push({name: 'edu'})
				        break
			        case 3:
				        this.showSubSet = !this.showSubSet;
				        break
			        case 4:
//				        this.$router.push({name: 'edu-double'})
				        break
			        case 5:
				        this.$router.push({name: 'edu-svip-new'})
				        break
			        case 6:
				        this.$router.push({name: 'news'})
				        break
			        case 7:
				        this.$router.push({name: 'question', params: {id: 0}})
				        break
			        case 8:
				        this.$router.push({name: 'activity'})
				        break
			        case 9:
				        this.$router.push({name: 'blogs', params: {id: 0}})
				        break
			        case 10:
				        this.$router.push({name: 'user-index'})
				        break
		        }
	        },
        }
    }
</script>


<style rel="stylesheet/less"  lang="less">
    #edu-double{
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
        .contents{
            height: 100%;
            overflow: auto;
            padding-bottom: 50px;
            img{
                width: 100%;
                display: block;
            }


            .time-box{
                background: #efb205;
                color: #FFFFFF;
                padding: 10px;
                font-size: 12px;
                text-align: center;
                /*display: flex;
                align-content: center;
                justify-content: center;*/
                span{
                    font-size: 16px;
                }
                #time-box{
                    justify-content: center;
                }
                .buy {
                    font-size: 16px;
                    display: inline-block;
                    background: red;
                    padding: 10px 20px;
                    margin: 5px auto;
                }
            }


            .edu-warp{
                .title{
                    text-align: center;
                    font-size: 20px;
                    color: #1e91d4;
                    margin-top: 30px;
                }
                .info{
                    text-align: center;
                    font-size: 10px;
                    color: #666666;
                    padding: 0 10px;
                }

                .edu-item{
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: flex-start;
                    justify-content: space-between;
                    padding: 12px;

                    .img-44 {
                        position: absolute;
                        top: 10px;
                        width: 24%;
                        right: 20px;
                    }
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
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
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
            }

            .question{
                .title{
                    margin: 20px 0 10px 0;
                    text-align: center;
                    font-size: 16px;
                    color: #1d91d4;
                }
                .item-box{
                    padding: 0 10px;
                    .item{
                        font-size: 10px;
                        margin-bottom: 10px;
                        div{
                            color: #666666;
                        }
                    }
                }

            }
            .copyright{
                font-size: 12px;
                height: 30px;
                line-height: 30px;
                background: #233140;
                color: #FFFFFF;
                text-align: center;
            }
        }
        /*底部导航*/
        .tabbar-box {

            .tab-title {
                position: fixed;
                /*background: #e6e6e6;*/
                display: flex;
                justify-content: space-between;
                align-content: center;
            }
            .tabbar {
                bottom: 0;
                width: 100%;
                height: 50px;
                background: #F2F2F2;

                &.cur{
                    background: #e6e6e6;
                }
            }
            .tabbar-item {
                position: relative;
                display: block;
                text-align: center;
                flex: 1;
                width: 0%;
                font-size: 14px;
                color: #4C4C4C;
                padding-top: 3px;

                i {
                    display: block;
                    font-size: 35px;
                    line-height: 25px;
                }
                img{
                    margin-top: 15px;
                    width: 50%;
                }
                .text{
                    color: #f37119;
                }

                .x{
                    i{
                        font-size: 20px;
                        line-height: 50px;
                    }
                }
                &.active {
                    color: #005AAC;

                    i {
                        color: #005AAC;
                    }
                }

            }

            .subset{

                bottom: -55px;
                width: 100%;
                height: 65px;
                opacity: 0;
                background: #F2F2F2;
                transition:all .3s linear;
                .tabbar-item{
                    padding-top: 10px;
                }
                &.active{

                    bottom:50px;
                    opacity: 1;
                }
            }
        }
    }
</style>
