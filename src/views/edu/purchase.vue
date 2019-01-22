<template>
    <div id="purchase">
        <Header :title="title" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="contents">
            <div class="show">
                <div class="show-top">
                    <div class="item-box">
                        <div class="item-title">
                            课程信息
                        </div>
                        <div class="course-info">
                            <div class="img">
                                <img :src="detail.data.picture" alt="">
                            </div>
                            <div class="info">
                                <div class="name">
                                    {{detail.data.title}}
                                </div>
                                <div class="noney">
                                    ￥{{detail.data.svip_price}}
                                </div>
                            </div>
                        </div>
                        <div class="svip-tips mx-1px-top" v-if="detail.meta.isSvip">
                            温情提示：SVIP可免费学习8套课程，您还可免费学习 <span>{{detail.meta.remainCourseCount}}</span> 套
                        </div>
                    </div>
                    <!--<div class="name item">-->
                    <!--名称：{{detail.data.title}}-->
                    <!--</div>-->
                    <!--<div class="money item">-->
                    <!--价格：{{detail.data.price}}元-->
                    <!--</div>-->

                    <div class="item-box" v-if="detail.data.svip_price != 0">
                        <div class="item-title">
                            支付方式
                        </div>
                        <!--<div class="pay-info" @click="opt">
                            &lt;!&ndash;<div class="pay">&ndash;&gt;
                                &lt;!&ndash;<div class="yue">&ndash;&gt;
                                    &lt;!&ndash;<div v-show="type == 'balance'" class="orange">&ndash;&gt;
                                        &lt;!&ndash;<i class="iconfont icon-yue"></i>&ndash;&gt;
                                        &lt;!&ndash;<span class="txt">余额支付</span>&ndash;&gt;
                                    &lt;!&ndash;</div>&ndash;&gt;
                                    &lt;!&ndash;<div v-show="type == 'point'" class="pink">&ndash;&gt;
                                        &lt;!&ndash;<i class="iconfont icon-jifen"></i>&ndash;&gt;
                                        &lt;!&ndash;<span class="txt">积分支付</span>&ndash;&gt;
                                    &lt;!&ndash;</div>&ndash;&gt;
                                    &lt;!&ndash;<div v-show="type == 'wx_pub'" class="green">&ndash;&gt;
                                        &lt;!&ndash;<i class="iconfont icon-weixin"></i>&ndash;&gt;
                                        &lt;!&ndash;<span class="txt">微信支付</span>&ndash;&gt;
                                    &lt;!&ndash;</div>&ndash;&gt;
                                    &lt;!&ndash;<div v-show="type == 'alipay_wap'" class="blue">&ndash;&gt;
                                        &lt;!&ndash;<i class="iconfont icon-zhifubao"></i>&ndash;&gt;
                                        &lt;!&ndash;<span class="txt">支付宝支付</span>&ndash;&gt;
                                    &lt;!&ndash;</div>&ndash;&gt;
                                    &lt;!&ndash;<div v-show="type == 'number'">&ndash;&gt;
                                        &lt;!&ndash;<img src="../../static/img/number.png" alt="">&ndash;&gt;
                                    &lt;!&ndash;</div>&ndash;&gt;
                                &lt;!&ndash;</div>&ndash;&gt;
                                &lt;!&ndash;<div class="enter iconfont icon-fanhui-1"></div>&ndash;&gt;
                            &lt;!&ndash;</div>&ndash;&gt;


                        </div>-->
                        <Radio-group v-model="type" >
                            <!--<Radio label="alipay_wap" v-if="!is_wechat"><img src="../../static/img/alipay.png" alt=""></Radio>-->
                            <!--<Radio label="wx_pub" v-else><img src="../../static/img/WeChat.png" class="wx_pub" alt=""></Radio>-->
                            <div class="payment mx-1px-bottom" v-if="!is_wechat">
                                <!--微信环境没有支付宝支付-->
                                <div class="payment-box alipay_wap">
                                    <i class="iconfont icon-zhifubao"></i>
                                    <span class="txt">支付宝支付</span>
                                </div>

                                <Radio label="alipay_wap"></Radio>

                            </div>
                            <div class="payment mx-1px-bottom">
                                <div class="payment-box com">
                                    <span>
                                        <i class="iconfont icon-jifen"></i>
                                        <span class="txt">积分支付</span>
                                    </span>
                                    <!--</br>-->
                                    <div class="num" v-show="type == 'point'">购买该课程需： {{detail.data.point}} 积分，当前可用 {{detail.meta.userPoint}} 积分</div>


                                </div>

                                <Radio :disable="disable" label="point"></Radio>
                                <!--<Radio :disable="detail.data.point = 0 ? false : true" label="point"></Radio>-->
                                <!--<Radio label="point"></Radio>-->

                            </div>
                            <div class="payment mx-1px-bottom">
                                <div class="payment-box fcon">
                                    <div>
                                        <i class="iconfont icon-yue"></i>
                                        <span class="txt">余额支付</span>
                                    </div>

                                    <div class="num" v-show="type == 'balance'">当前可用 {{detail.meta.balance / 100}} 余额</div>
                                </div>

                                <Radio label="balance"></Radio>

                            </div>
                            <div class="payment mx-1px-bottom" v-if="is_wechat">
                                <!--只在微信环境有微信支付-->
                                <div class="payment-box wx_pub">
                                    <i class="iconfont icon-weixin"></i>
                                    <span class="txt">微信支付</span>
                                </div>

                                <Radio label="wx_pub"></Radio>

                            </div>

                            <div class="payment mx-1px-bottom">
                                <img src="../../static/img/number.png" alt="">

                                <Radio label="number"></Radio>

                            </div>
                        </Radio-group>

                    </div>

                    <div class="item-box">
                        <div class="item-title">
                            用户信息
                        </div>
                        <div class="user-info mx-1px-bottom">
                            <div class="item  mx-1px-bottom" v-show="type == 'number'">
                                <div class="name">
                                    学籍号：<span>*</span>
                                </div>
                                <div class="text">
                                    <input type="text" placeholder="请输入学籍号" v-model="user.xjh">
                                </div>
                            </div>
                            <div class="item  mx-1px-bottom" >
                                <div class="name">
                                    真实姓名：<span>*</span>
                                </div>
                                <div class="text">
                                    <input type="text" placeholder="请输入姓名" v-model="user.name">
                                </div>
                            </div>
                            <div class="item mx-1px-bottom">
                                <div class="name">
                                    手机号码：<span>*</span>
                                </div>
                                <div class="text">
                                    <input type="text" placeholder="请输入手机" v-model="user.phone">
                                </div>
                            </div>
                            <div class="item mx-1px-bottom">
                                <div class="name">
                                    微信账号：<span>*</span>
                                </div>
                                <div class="text">
                                    <input type="text" placeholder="请输入微信" v-model="user.WeChat">
                                </div>
                            </div>
                            <div class="item mx-1px-bottom">
                                <div class="name">
                                    所在公司：<span>*</span>
                                </div>
                                <div class="text">
                                    <input type="text" placeholder="请输入公司名称" v-model="user.firm">
                                </div>
                            </div>
                            <div class="item mx-1px-bottom">
                                <div class="name">
                                    职位：<span>*</span>
                                </div>
                                <div class="text">
                                    <input type="text" placeholder="请输入职位" v-model="user.post">
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    备注：
                                </div>
                                <div class="text">
                                <textarea placeholder="请填写备注" v-model="user.remark">

                                </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="insufficient" v-show="appear">
            <div class="intermediate">
                <div class="iconrigth">
                    <i class="iconfont icon-quxiao- cancel" @click="hide"></i>
                </div>
                <div class="intermediate-text">可用积分不足！</div>
                <div class="intermediate-a" @click="jump('task')">去完成任务赚取积分</div>
            </div>
        </div>
        <div class="insufficient" v-show="leap">
            <div class="intermediate">
                <div class="iconrigth">
                    <i class="iconfont icon-quxiao- cancel" @click="showskip"></i>
                </div>
                <div class="intermediate-text">可用余额不足！</div>
                <div class="intermediate-a" @click="skip">去充值</div>
            </div>
        </div>

       <!-- <popup v-model="showEdu">

            <div class="back mx-1px-bottom" @click="disappear">返回</div>


        </popup>-->

        <div class="button-box mx-1px-top">
            <v-button :loading='retreatLoading' height='50px' @click="retreat">返回</v-button>
            <v-button :loading='submitLoading' height='50px' @click="submit">立即付款</v-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	import Countdown from '../../components/Countdown.vue';
	import {Cache, cache_keys, is, env, setPageTitle} from '../../utils/util';
	import pingpp from 'pingpp-js';

    export default {
    	name: 'purchase',
	    components: {
		    Countdown
	    },
    	data() {
    		return {
                disable: false,
    			showEdu: false,
			    lessons: [],
			    dataList: [],
			    reviews: {
	                init: false,
	                page: 1,
	                hasMore: true
                },
			    height: '100%',
			    id: '',
			    tabIndex: 0,
			    type: 'alipay_wap',
                title:'',
                is_wechat: false,
                user: {
    				xjh: '',
    				name: '',
                    phone: '',
	                WeChat: '',
	                firm: '',   // 公司
	                post: '',   // 职位
	                remark:''
                },
			    showSubSet: false,
                retreatLoading: false,
                submitLoading: false,
                appear: false,
                leap: false,
            }
        },
        created() {
//            console.log(this.detail.data.point);
            if (this.detail.data.point != 0){
                this.disable = false;
            } else{
                this.disable = true;
            }
    		if (env.isWechat) {
    			this.is_wechat =true;
    			this.type = 'wx_pub';
            }
    		this.extra();
	        this.id = this.$route.params.id;
            this.$Indicator.blade();
            const rfData = {
                id: this.id,
                rf: this.$route.query.rf || Cache.get(cache_keys.agent_code) || ''
            };
    		this.$store.dispatch('queryEduDetail', rfData);

    		EventBus.$on('eduDetailPay', this.getTitle);
    		EventBus.$on('charge', this.charge);
        },
	    beforeDestroy() {
            EventBus.$off('eduDetailPay');
            EventBus.$off('charge');
        },
        computed: {
    		detail() {
    			return this.$store.getters.getEduCourse;
            }

        },
        methods: {
    	    skip() {
    	      //跳转充值余额
                window.location.href = window.location.origin + '/store/#!/recharge/index';
            },
    	    showskip() {
                this.leap = false;
            },
    	    hide() {
    	       this.appear =  false;
            },
            jump(name) {
                this.$router.push({name: name});
            },
	        extra() {
                var pathname = window.location.pathname;
                var url = '#/edu/edu-success';
                var success_url = window.location.origin + pathname + url;
                var cancel_url = window.location.href;
                // 定义成功和失败的处理URL
                return {success_url, cancel_url};

            },

            retreat() {
    			this.$router.push({name:'edu-course'});
            },

            disappear(){
                this.showEdu = false;
            },
            opt(){
                this.showEdu = true;
            },
            submit() {
	            var extra = this.extra();
	            var rf = Cache.get(cache_keys.agent_code) || '';

    			var data = {
				    number: this.user.xjh,
				    truename: this.user.name,
				    mobile: this.user.phone,
				    weixin: this.user.WeChat,
				    company: this.user.firm,
				    job: this.user.post,
				    note: this.user.remark,
				    channel: this.type,
				    price: this.detail.data.svip_price,
                    id: this.$route.params.id,
				    rf: rf
                }

    			var message = null;

    			if (this.type == 'number' && !is.has(this.user.xjh)) {
				    message = '请输入学籍号'
                } else if (!is.has(this.user.name)) {
		            message = '请输入姓名'
	            } else if (!is.has(this.user.phone)) {
		            message = '请输入手机号'
	            } else if (!is.mobile(this.user.phone)) {
		            message = '手机号格式不正确，请重新输入';
	            } else if (!is.has(this.user.WeChat)) {
		            message = '请输入微信号'
	            } else if (!is.has(this.user.firm)) {
		            message = '请输入公司名称'
	            } else if (!is.has(this.user.post)) {
		            message = '请输入职位'
	            }

			    if (message) {
				    this.$Modal.confirm({body: message})
                } else {
    			    this.submitLoading = true;

				    data = Object.assign(data, {extra});
				    this.$store.dispatch('submitCourseInfo',data);
                }
            },
//            支付成功
	        charge(success, res, data) {
                this.submitLoading = false;
                Cache.set(cache_keys.edu_detail, this.detail.data, '30n');
	        	if (success) {
//	        	    支付宝
	        	    if (data.channel == 'alipay_wap' && data.price)  {
                        pingpp.createPayment(res.data.charge, (result, err) => {
                            if (result == "success") {
                                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                            } else if (result == "fail") {
                                // charge 不正确或者微信公众账号支付失败时会在此处返回
                            } else if (result == "cancel") {
                                // 微信公众账号支付取消支付
                            }
                        })
                    } else if(data.channel == 'point'){
                        this.$router.replace({name: 'edu-success', query: {result: 'success',point: 'true'}})
                    } else if (data.channel == 'balance' || data.channel == 'number' || data.price == 0 ) {
                        this.$router.replace({name: 'edu-success', query: {result: 'success',point: 'false'}})
                    }
//                    微信
                    if (data.channel == 'wx_pub') {
                        window.location.href = res.data.url;

                    }

                } else {
	        	    if(res == "积分不够") {
                        this.appear =  true;
                    } else if (res == "余额不够") {
                        this.leap = true;
                    } else {
                        this.$Modal.confirm({body: res});
                    }

                }
            },
	       /* wxCharge(data) {
	        	window.location.href = data.url;
            },
//            购买
	        xjhCharge(res) {
	        	if (res.status) {
			        this.$Modal.confirm({body: '购买成功', onOk: function () {
				        window.location.reload();
			        }});
                } else {
			        this.$Modal.confirm({body: '购买失败', onOk: function () {
				        window.location.reload();
			        }});
                }
            },*/

            getTitle(res) {
	        	var profile = res.meta.profile
    			this.title = res.data.title;
                EventBus.$Indicator.remove();
	            this.setTitle();
	            if (profile) {
	            	this.user.name = profile.truename;
	            	this.user.phone = profile.mobile;
	            	this.user.WeChat = profile.weixin;
	            	this.user.firm = profile.company;
	            	this.user.post = profile.job;
	            	this.user.remark = profile.signature;
                }

            },
           setTitle() {
    			setPageTitle(this.title);
            },
            /* eduTime(res) {
	        	this.lessons = res.data;
            },*/
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #purchase{
        background: #efeff4;
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
            background: #efeff4;
            height: 100%;
            overflow: auto;
            padding-bottom: 50px;
            .show{

                .show-top{
                    font-size: 14px;
                    color: #3d4145;

                    .item-box{
                        .vlc-radioBoxGroup{

                            /*display: flex;
                            flex: 1;
                            flex-wrap: wrap;
                            flex-direction: row;*/
                            background: #ffffff;
                            .payment{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 10px 15px;
                                img{
                                    width: 62px;
                                    height: 20px;
                                }
                                .payment-box{
                                    color: #f8b62d;
                                    /*text-align: center;*/
                                    /*text-align: left !important;*/

                                    .num{
                                        font-size: 12px;
                                        color: #9b9b9b;
                                    }
                                    &.fcon{
                                        /*flex-direction: column;*/
                                    }
                                    &.com{
                                        /*flex-direction: column;*/
                                        color: #eb7073;
                                    }
                                    &.wx_pub{
                                        color: #59b64c;
                                        i{
                                            font-size: 16px;
                                        }
                                    }
                                    &.alipay_wap{
                                        color: #008cee;
                                    }
                                    i{
                                        margin-right: 12px;
                                        font-size: 20px;
                                    }
                                    .txt{
                                        font-size: 16px;
                                    }
                                }
                                .vlc-radiobox{
                                    span{
                                        &:nth-of-type(2){
                                            display: none;
                                        }
                                    }


                                }


                            }
                            .vlc-radiobox {
                                display: flex;
                                align-items: center;
                                margin-bottom: 5px;

                                /*&:last-child {*/
                                /*margin-bottom: 0;*/
                                /*}*/
                                .vlc-radiobox-wrapper{
                                    display: block;
                                }
                            }
                        }

                        .item-title{
                            padding: 15px;
                            color: #9b9b9b;
                            padding-bottom: 5px;
                        }
                        .course-info{
                            display: flex;
                            justify-content: space-between;
                            color: #000000;
                            padding: 10px;
                            background: #FFFFFF;


                            .img{
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
                            .info{
                                display: flex;
                                flex-direction: column;
                                justify-content: inherit;
                                flex: 1;

                                .name{
                                    display: -webkit-box;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    font-size: 12px;
                                }
                                .noney{
                                    color: red;
                                }
                            }
                        }
                        .svip-tips {
                            padding: 10px;
                            color: #666666;
                            font-size: 12px;
                            background: #FFFFFF;

                            span {
                                color: red;
                            }
                        }
                        /*.pay-info{
                            padding: 10px 16px;
                            display: flex;
                            background: #FFFFFF;
                            .pay{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                width: 100%;
                                .yue{
                                    display: flex;
                                    align-items: center;
                                    color: #f8b62d;

                                    .orange{
                                        color: #f8b62d;
                                    }
                                    .pink{
                                        color: #eb7073;
                                    }
                                    .green{
                                        color: #59b64c;
                                    }
                                    .blue{
                                        color: #008cee;
                                    }
                                    img{
                                        width: 62px;
                                        height: 20px;
                                    }
                                }
                            }

                        }*/
                        .user-info {
                            background: #FFFFFF;

                            .item{
                                display: flex;
                                padding: 15px;

                                .name{
                                    width: 100px;
                                }
                                .text{
                                    flex: 1;

                                    input{
                                        padding-left: 10px;
                                        width: 100%;
                                    }
                                    textarea {
                                        /*height: 80px;*/
                                        padding-left: 10px;
                                        width: 100%;
                                    }
                                }
                            }
                        }

                    }
                    .type{
                        display: flex;
                        img{
                            display: block;
                            width: 60px;
                            margin-left: 5px;
                        }
                        .wx_pub{
                            width: 70px;
                            height: 25px;
                        }
                        .vlc-radioBoxGroup{
                            display: flex;
                            flex: 1;
                            flex-wrap: wrap;
                            .vlc-radiobox {
                                display: flex;
                                align-items: center;
                                margin-bottom: 5px;

                                &:last-child {
                                    margin-bottom: 0;
                                }
                                .vlc-radiobox-wrapper{
                                    display: block;
                                }
                            }
                        }
                    }
                }

            }
        }

        .vlc-popup{
            .vlc-popup-mask{
                z-index: 99;
            }
            .back{
                padding: 17px 15px;
                font-size: 14px;
                color: #9b9b9b;
            }
            .vlc-popup-bottom{
                height: 51% !important;
            }
        }
        /*积分不足弹窗*/
        .insufficient{
            position: fixed;
            background: rgba(0,0,0,.5);
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 99;
            .intermediate{
                width: 60%;
                height: 25%;
                background: #ffffff;
                border-radius: 10px;
                position:absolute;
                padding: 10px 15px 20px 15px;
                top:50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                text-align: center;
                .iconrigth{
                    text-align: right;
                    .cancel{

                    }
                }
                .intermediate-text{
                    padding: 5px 15px 15px 15px;
                }
                .intermediate-a{
                    font-size: 14px;
                    color: #008cee;
                    /*margin-top: 50px;*/
                }
            }
        }

        .button-box{
            display: flex;
            justify-content: space-around;
            z-index: 55;
            align-items: center;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .vlc-button{
                &:first-child{
                    .vlc-button-normal{
                        background-color: #ffffff;
                        border-color: #ffffff;
                        border-radius: 0px;
                        color: #008cee;
                    }
                }
                &:last-child{
                    .vlc-button-normal{
                        background-color: #008cee;
                        border-color: #008cee;
                        border-radius: 0px;
                    }
                }
            }

            /*.btn{*/
            /*flex: 1;*/
            /*width: 0%;*/
            /*height: 50px;*/
            /*line-height: 50px;*/
            /*text-align: center;*/
            /*color: #ffffff;*/

            /*&.cancel{*/
            /*color: #9b9b9b;*/
            /*background: #FFFFFF;*/
            /*}*/
            /*&.ok{*/
            /*background: #008cee;*/
            /*}*/
            /*}*/
        }
        .mx-1px-top:before{
            height: 0px;
        }
    }
</style>
