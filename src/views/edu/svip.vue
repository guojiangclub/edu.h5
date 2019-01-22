<template>
    <div id="edu-svip">
        <Header title="天善智能年度SVIP会员募集计划热力来袭！" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <img src="../../static/img/svip-top.png" alt="">

            <div class="time" v-if="vipData.svipPromotion">
                <countdown :value="vipData.svipPromotionEndTime"></countdown>
            </div>
            <div class="pay-box pay-top">
                <div class="num">
                    已有 <span>{{vipData.payCount}}</span> 人购买
                </div>
                <div class="pay" @click="submit" v-if="!vipData.isMember">
                    立即购买
                </div>
                <div class="pay" v-else>
                    您已是天善智能 SVIP 会员
                </div>
            </div>


            <img src="../../static/img/svip-q.png" alt="">
            <div class="free-box">
                <div class="title">
                    SVIP会员可<span>免费学习的10套课程</span>
                </div>
                <div class="edu-list">
                    <div class="edu-item" v-for="item in vipData.freeCourses" @click="jump('edu-course',item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
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
                                    <span v-if="item.price !=  0">{{item.price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="free-box">
                <div class="title">
                    SVIP会员<span>可半价购买其他课程</span>
                    <div>
                        以下为天善学院部分优质课程推荐！！
                    </div>
                </div>
                <div class="edu-list">
                    <div class="edu-item" v-for="item in vipData.halfCourses" @click="jump('edu-course',item.id)">
                        <div class="item-left">
                            <img :src="item.picture" alt="">
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
                                    <span v-if="item.price !=  0">{{item.price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="Off">-->
                    <!--查看更多半价课程-->
                <!--</div>-->
            </div>
            <img src="../../static/img/svip-p.png" alt="" class="svip-img">
            <img src="../../static/img/sip-i.png" alt="" class="svip-img">
            <img src="../../static/img/svip-c.png" alt="" class="svip-img">
            <div class="money-box">
                <div>一次正确选择，大于百倍努力！</div>
                <div class="money">现在购买天善智能2017年度SVIP只需3999元</div>
            </div>
            <div class="time" v-if="vipData.svipPromotion">
                <countdown :value="vipData.svipPromotionEndTime"></countdown>
            </div>
            <div class="pay-box">
                <div class="num">
                    已有 <span>{{vipData.payCount}}</span> 人购买
                </div>
                <div class="pay" @click="submit" v-if="!vipData.isMember">
                    立即购买
                </div>
                <div class="pay" v-else>
                    您已是天善智能 SVIP 会员
                </div>
            </div>
            <div class="question">
                <div class="title">
                    常见问题/Question & Answer
                </div>
                <div class="item-box">
                    <div class="item">
                        <p>Q：SVIP 会员如何使用？</p>
                        <div>A：SVIP 会员使用说明可查看： <a href="https://ask.hellobi.com/blog/team/5682">https://ask.hellobi.com/blog/team/5682</a></div>
                    </div>
                    <div class="item">
                        <p>Q：如果我有关于SVIP会员的问题，该如何咨询？</p>
                        <div><a href="tel:158-2133-9409">您可以直接拨打梁老师咨询电话：158-2133-9409</a></div>
                    </div>
                    <div class="item">
                        <p>Q：为什么使用视频教学？</p>
                        <div>A：学院课程都是属于理论+实操类培训课程，每个系列课程都有大量的操作课，通过视频观看老师的操作，反复学习实践才能更好的掌握。</div>
                    </div>
                    <div class="item">
                        <p>Q：每节课的时间多长？</p>
                        <div>A：每节课的时间一般控制在10-15分钟左右，有些课程为了保证教学连续性，大约30分钟左右</div>
                    </div>
                    <div class="item">
                        <p>Q：学习过程中遇到问题怎么办？</p>
                        <div>A：可以直接在课程中独享的答疑区进行提问，讲师会积极回答问题。凡参加课程的学员都会进入课程内容VIP群，讲师和社区专家会分享知识和答疑问题。</div>
                    </div>
                </div>
            </div>
            <!--<img src="../../static/img/svip-question.png" alt="">-->
            <div class="copyright">
                Copyright © 天善智能-上海拓善智能科技有限公司 2016
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
                <!--<div class="tabbar-item" @click="go(4)">
                    <img src="../../static/img/511.png" alt="">
                    &lt;!&ndash;<div class="text">双11</div>&ndash;&gt;
                </div>-->
                <div class="tabbar-item active" @click="go(4)">
                    <i class="iconfont icon-VIP"></i>
                    <div>SVIP</div>
                </div>
                <div class="tabbar-item" @click="go(5)">
                    <i class="iconfont icon-wode"></i>
                    <div>我的</div>
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
    	name: 'edu-svip',
	    components: {
		    Countdown
	    },
        data() {
    		return {
    			vipData: {
				    freeCourses: [],
				    halfCourses: [],
				    svipPrice: '',
				    isMember: false
                },
			    showSubSet: false
            }
        },
        created() {
//    		var result = this.$route.query.result;
//    		var no = this.$route.query.out_trade_no;
	        this.$Indicator.blade();
    		this.$store.dispatch('svipDataList');
//	        if (no && result) {
//		        this.$Modal.confirm({body: '购买成功'});
//	        }
    		EventBus.$on('svipData', this.dataSet);
    		EventBus.$on('svipCharge', this.svipCharge);
	        EventBus.$on('wxSvipCharge', this.wxSvipCharge);
        },
	    beforeDestroy() {
		    EventBus.$off('svipData');
		    EventBus.$off('svipCharge');
		    EventBus.$off('wxSvipCharge');
        },
        methods: {
    		dataSet(data) {
    			this.vipData = data;
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
				        this.$router.push({name: 'user-index'})
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
	        jump(name,id) {
		        if (id) {
			        this.$router.push({name: name, params:{id: id}})
		        } else {
			        this.$router.push({name: name});
		        }
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
			        extra:extra
                }
                if (!isLogin) {
	                this.$Modal.info({body: "请登录！", onOk: () => {
	                	this.$router.push({name: 'user-login'})
                    }})
                } else {
		        	this.$store.dispatch('submitSvip', data);
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
        }
    }
</script>


<style rel="stylesheet/less" lang="less">
    #edu-svip{
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

            .time{
                margin-top: 10px;
                span{
                    font-size: 20px;
                    color: #1e91d4;
                }
                #time-box{
                    justify-content: center;
                }
            }
            .pay-box{
                display: flex;
                align-items: center;
                border: 1px solid #1d91d4;
                text-align: center;
                height: 40px;
                line-height: 40px;
                margin: 20px 12px;
                box-sizing: content-box;

                &.pay-top{
                    margin: 20px 12px 40px 12px;
                }
                .num{
                    flex: 1;
                    width: 0%;
                    color: #1d91d4;

                    .span{
                        font-size: 18px;
                    }
                }
                .pay{
                    flex: 1;
                    width: 0%;
                    background: #1d91d4;
                    color: #FFFFFF;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: 0 5px;
                }

            }
            .is-pay{
                text-align: center;
                height: 40px;
                line-height: 40px;
                margin: 0 12px;
                background: #1d91d4;
                color: #FFFFFF;

                &.pay-top{
                    margin: 40px 12px;
                }
            }
            .free-box{
                margin-top: 50px;
                .title{

                    font-size: 19px;
                    text-align: center;
                    span{
                        color: #1d91d4;
                    }
                    div{
                        font-size: 13px;
                    }
                }
                .edu-list {
                    height: 100%;
                    overflow: auto;
                    .edu-item{
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: flex-start;
                        justify-content: space-between;
                        padding: 12px;

                        .item-left{
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
                                    i{
                                        font-size: 10px;
                                    }
                                }
                                .money{
                                    font-size: 12px;
                                    color: #005AAC;
                                }
                            }
                        }
                    }
                }
                .Off{
                    margin: 20px 12px 0 12px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    border: 1px solid #1d91d4;
                    color: #1d91d4;
                }
            }
            .svip-img{
                margin-top: 50px;
                padding: 0 12px;
            }
            .money-box{
                margin: 50px 0 20px 0;
                font-size: 22px;
                color: #1d91d4;
                text-align: center;

                .money{
                    font-size: 13px;
                    color: #000000;
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
