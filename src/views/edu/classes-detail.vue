<template>
    <div id="classes-detail">
        <Header :title="detail.classroom.title" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <img :src="detail.classroom.classroom_poster" alt="">
            <div class="time-box">
                <div class="money">
                    总价值{{detail.classroom.course_total_price}}元的套餐礼包现在只需花费{{detail.classroom.discount_price}}元
                </div>
                <div class="tiem" v-if="detail.classroom.is_discount == 1">
                    <countdown :value="detail.classroom.discount_end_time"></countdown>
                </div>
                <div class="pay-box">
                    <div class="num">
                        已有 <span>{{detail.classroom.student_count}}</span> 人购买
                    </div>
                    <div class="pay" @click="pay" v-if="!detail.isMember">
                        立即购买
                    </div>
                    <div class="pay" v-else>
                        您已购买该班级套餐
                    </div>
                </div>
            </div>
            <img class="img" :src="detail.classroom.classroom_crowd" alt="">
            <div class="free-box">
                <div class="title">
                    <span>该班级套餐包含以下课程</span>
                </div>
                <div class="edu-list">
                    <div class="edu-item" v-for="item in detail.courses" @click="jump(item.id)">
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
                                    <span v-if="item.price !=  0">￥{{item.price}}元</span>
                                    <span v-else>免费</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img class="img" src="../../static/img/img-2.png" alt="">
            <img class="img" src="../../static/img/img-3.png" alt="">
            <img class="img" src="../../static/img/img-4.png" alt="">
            <div class="time-box">
                <div class="one">
                    一次正确选择，大于百倍努力！
                </div>
                <div class="tiem" v-if="detail.classroom.is_discount == 1">
                    <countdown :value="detail.classroom.discount_end_time"></countdown>
                </div>
                <div class="pay-box">
                    <div class="num">
                        已有 <span>{{detail.classroom.student_count}}</span> 人购买
                    </div>
                    <div class="pay" @click="pay" v-if="!detail.isMember">
                        立即购买
                    </div>
                    <div class="pay" v-else>
                        您已购买该班级套餐
                    </div>
                </div>
            </div>
            <div class="question">
                <div class="title">
                    常见问题/Question & Answer
                </div>
                <div class="item-box">
                    <div class="item">
                        <p>Q：班级套餐如何使用？</p>
                        <div>A：班级套餐使用说明可查看：<a href="https://ask.hellobi.com/blog/tianshansoft/10223">https://ask.hellobi.com/blog/tianshansoft/10223</a></div>
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
                <div class="tabbar-item active" @click="go(1)">
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
               <!-- <div class="tabbar-item" @click="go(4)">
                    <img src="../../static/img/511.png" alt="">
                    <div class="text">双11</div>
                </div>-->
                <div class="tabbar-item" @click="go(4)">
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

        <popup v-model="showEdu">
            <div class="show">
                <div class="show-top">
                    <div class="item-box">
                        <div class="item-title mx-1px-bottom">
                            班级信息
                        </div>
                        <div class="course-info">
                            <div class="img">
                                <img :src="detail.classroom.picture" alt="">
                            </div>
                            <div class="info">
                                <div class="name">
                                    {{detail.classroom.title}}
                                </div>
                                <div class="noney">
                                    ￥{{detail.classroom.discount_price}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="name item">-->
                    <!--名称：{{detail.data.title}}-->
                    <!--</div>-->
                    <!--<div class="money item">-->
                    <!--价格：{{detail.data.price}}元-->
                    <!--</div>-->

                    <div class="item-box">
                        <div class="item-title mx-1px-bottom">
                            支付方式
                        </div>
                        <div class="pay-info">
                            <Radio-group v-model="type" >
                                <Radio label="alipay_wap" v-if="!is_wechat"><img src="../../static/img/alipay.png" alt=""></Radio>
                                <Radio label="wx_pub" v-else><img src="../../static/img/WeChat.png" class="wx_pub" alt=""></Radio>
                                <Radio label="number"><img src="../../static/img/number.png" alt=""></Radio>
                            </Radio-group>
                        </div>
                    </div>

                    <div class="item-box">
                        <div class="item-title mx-1px-bottom">
                            用户信息
                        </div>
                        <div class="user-info">
                            <div class="item" v-show="type == 'number'">
                                <div class="name">
                                    学籍号：<span>*</span>
                                </div>
                                <div class="text mx-1px-bottom">
                                    <input type="text" placeholder="请输入学籍号" v-model="user.xjh">
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    真实姓名：<span>*</span>
                                </div>
                                <div class="text mx-1px-bottom">
                                    <input type="text" placeholder="请输入姓名" v-model="user.name">
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    手机：<span>*</span>
                                </div>
                                <div class="text mx-1px-bottom">
                                    <input type="text" placeholder="请输入手机" v-model="user.phone">
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    微信：<span>*</span>
                                </div>
                                <div class="text mx-1px-bottom">
                                    <input type="text" placeholder="请输入微信" v-model="user.WeChat">
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    所在公司：<span>*</span>
                                </div>
                                <div class="text mx-1px-bottom">
                                    <input type="text" placeholder="请输入公司名称" v-model="user.firm">
                                </div>
                            </div>
                            <div class="item">
                                <div class="name">
                                    职位：<span>*</span>
                                </div>
                                <div class="text mx-1px-bottom">
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
                    <!--<div class="type" v-if="detail.data.price != 0">-->
                    <!--<div class="name">-->
                    <!--选择支付方式：-->
                    <!--</div>-->
                    <!--<Radio-group v-model="type" >-->
                    <!--<Radio label="alipay_wap" v-if="!is_wechat"><img src="../../static/img/alipay.png" alt=""></Radio>-->
                    <!--&lt;!&ndash;<Radio label="number"><img src="../../static/img/number.png" alt=""></Radio>&ndash;&gt;-->
                    <!--<Radio label="wx_pub" v-else><img src="../../static/img/WeChat.png" class="wx_pub" alt=""></Radio>-->
                    <!--</Radio-group>-->
                    <!--</div>-->
                    <!--<div class="tip item">-->
                    <!--温情提示：如果您的资料有变更，请在此修改，以便更好的为您服务！-->
                    <!--</div>-->
                </div>
                <div class="button-box mx-1px-top">
                    <div class="btn cancel" @click="cancel">
                        取消
                    </div>
                    <div class="btn ok" @click="submit">
                        立即付款
                    </div>
                </div>
            </div>
        </popup>
    </div>
</template>


<script type="text/ecmascript-6">
	import Countdown from '../../components/Countdown.vue';
	import {Cache, cache_keys,env, is, setPageTitle} from'../../utils/util';
	import pingpp from 'pingpp-js';
    export default {
    	name: 'classes-detail',
	    components: {
		    Countdown
        },
        data() {
    		return {
    			id: '',
			    showEdu: false,
			    type: 'alipay_wap',
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
                detail: {
	                classroom: {}
                },
			    showSubSet: false
            }
        },
        created() {
	        if (env.isWechat) {
		        this.is_wechat =true;
		        this.type = 'wx_pub';
	        }
    		this.id = this.$route.params.id;
	        this.$Indicator.blade();
	        this.$store.dispatch('classroomDetail', this.id);

	        EventBus.$on('classDetail', this.classDetailData);
	        EventBus.$on('classCharge', this.charge);
	        EventBus.$on('classWxCharge', this.wxCharge);
	        EventBus.$on('classXjhCharge', this.xjhCharge);
        },
        methods: {
	        classDetailData(data) {
		        var profile = data.profile;
	        	this.detail = data;
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
            jump(id) {
	            this.$router.push({name: 'edu-course', params:{id: id}})
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
				        this.$router.push({name: 'edu-svip-new'})
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
	        setTitle() {
		        setPageTitle(this.detail.classroom.title);
	        },
	        extra() {
		        // 定义成功和失败的处理URL
		        var success_url = window.location.href;
		        var cancel_url = window.location.href;
		        return {success_url, cancel_url};

	        },
            pay() {
	            var is_login = !!Cache.get(cache_keys.token);
	            if (!is_login) {
		            this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                } else {
		            this.showEdu = true;
                }
            },
	        goLogin() {
		        var source = this.$route.path;
		        this.$router.push({name: 'user-login', query: {source}});
	        },
	        cancel() {
		        this.showEdu = false;
	        },
            submit() {
	            var extra = this.extra();
	            var data = {
		            number: this.user.xjh,
		            truename: this.user.name,
		            mobile: this.user.phone,
		            weixin: this.user.WeChat,
		            company: this.user.firm,
		            job: this.user.post,
		            note: this.user.remark,
		            channel: this.type,
		            price: this.detail.classroom.price,
		            id: this.$route.params.id
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
		            data = Object.assign(data, {extra});
		            this.$store.dispatch('payclassroom',data);
	            }
            },
	        charge(success, charge) {
		        if (success) {
			        console.log(charge);

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
	        wxCharge(data) {
		        window.location.href = data.url;
	        },
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
	        },
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #classes-detail{
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
            }
            .img{
                margin-top: 20px;
            }
            .time-box{
                text-align: center;
                margin-top: 20px;
                .money{
                    font-size: 15px;
                }
                .one{
                    font-size: 19px;
                    color: #1d91d4;
                }
                .tiem{
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
                    margin: 10px 12px;
                    box-sizing: content-box;

                    &.pay-top{
                        margin: 40px 12px;
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
                    margin: 10px 12px;
                    background: #1d91d4;
                    color: #FFFFFF;

                    &.pay-top{
                        margin: 40px 12px;
                    }
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
                    margin-top: 2px;
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
        .vlc-popup-content{
            background: #F7F8F8;
            .show{
                height: 100%;
                overflow: auto;
                padding-bottom: 50px;
                .show-top{
                    font-size: 14px;
                    color: #3d4145;
                    padding: 0 12px;

                    .item-box{
                        margin-top: 20px;
                        background: #FFFFFF;
                        .item-title{
                            padding: 10px;
                            color: #74787B;
                        }
                        .course-info{
                            display: flex;
                            /*flex-direction: row;*/
                            /*flex-wrap: nowrap;*/
                            /*align-items: flex-start;*/
                            justify-content: space-between;
                            color: #000000;
                            padding: 10px;

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
                        .pay-info{
                            padding: 10px;
                            display: flex;
                            img{
                                display: block;
                                width: 60px;
                                margin-left: 5px;
                            }
                            .wx_pub{
                                width: 60px;
                                /*height: 30px;*/
                            }
                            .vlc-radioBoxGroup{
                                display: flex;
                                flex: 1;
                                flex-wrap: wrap;
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
                        }
                        .user-info {
                            .item{
                                display: flex;
                                padding: 12px;
                                span{
                                    color: red;
                                }

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
                                        height: 80px;
                                        padding-left: 10px;
                                        width: 100%;
                                    }
                                }
                            }
                        }

                    }
                    .item{
                        margin: 10px 0;
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
                .button-box{
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    justify-content: space-around;

                    .btn{
                        flex: 1;
                        width: 0%;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        color: #ffffff;

                        &.cancel{
                            color: #000000;
                            background: #FFFFFF;
                        }
                        &.ok{
                            background: #4cd964;
                        }
                    }
                }
            }
        }
    }
</style>
