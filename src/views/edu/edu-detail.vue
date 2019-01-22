<template>
    <div id="edu-course">
        <Header :title="title" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="course-top mx-1px-bottom">
                <img :src="detail.data.picture" alt="">
                <div class="promotion" v-if="detail.data.is_discount == 1 && !detail.meta.is_member">
                    <!--<div class="txt">
                        <span class="size">限时促销</span>
                        <span>抢购中</span>
                    </div>-->
                    <countdown :value="detail.data.discount_end_time"></countdown>
                </div>
                <div class="course-info">
                    <div class="title">
                        {{detail.data.title}}
                    </div>
                    <div class="teacher info-item">
                        <div class="teachermes">
                            <div>
                                讲师： {{detail.data.teacher_info.user_name}}
                            </div>
                            <div>
                                {{detail.data.studentNum}} 人学习
                            </div>
                        </div>

                        <p v-if="detail.data.hasFreeLesson && !detail.meta.is_member">可免费试看</p>
                    </div>

                </div>
            </div>
            <div class="course-bottom">
                <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" @on-change="change">
                    <div slot="slot-item-0" class="summarize slide-item" v-html="detail.data.about">

                    </div>
                    <!--跳课程-->
                    <div slot="slot-item-1" class="list slide-item">
                        <div class="section-box">
                            <div class="section-item-box" v-for="item in lessons">
                                <div class="section-title" v-if="item.itemType == 'chapter' ">
                                    {{item.title}}
                                </div>
                                <div class="section-knob-item mx-1px-bottom" v-else  @click="jump(item.courseId, item.id, item.free)">
                                    <div class="item-left">
                                        <i class="iconfont icon-weibiaoti38"></i>
                                        <div class="name">
                                           课时{{item.number}}:{{item.title}}
                                            <span v-if="item.free == 1 && !detail.meta.is_member" class="free">免费</span>
                                        </div>
                                    </div>
                                    <div class="item-right">
                                        {{item.length_min}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="slot-item-2" class="comment slide-item">

                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="reviews.hasMore" :refresh="refresh" ref="pulldown_2">
                            <div class="comment-item mx-1px-bottom" v-for="item in dataList">
                                <div class="item-left">
                                    <div class="img-box">
                                        <img :src="item.user.avatar_file" alt="">
                                    </div>
                                </div>
                                <div class="item-right">
                                    <div class='comment-info'>
                                        <div class="user-name">
                                            {{item.user.user_name}}  • {{item.created_at}}
                                        </div>
                                        <div class="grade">
                                            <Rater :size="15" :value="item.rating" disabled></Rater>
                                        </div>
                                    </div>
                                    <div>
                                        {{item.content}}
                                    </div>
                                </div>
                            </div>
                        </LoadMore>
                    </div>
                    <div slot="slot-item-3" class="announcement slide-item">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="announcement.hasMore" :refresh="refresh" ref="pulldown_3" v-if="detail.meta.is_member">
                            <!--<LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="announcement.hasMore" :refresh="refresh" ref="pulldown">-->
                            <div class="announcement-item mx-1px-bottom " v-for="item in announcementList">
                                <div class="announcement-writing" v-html="item.content">
                                     <!--{{item.content}}-->
                                </div>
                                <div class="announcement-personal">
                                    <span class="name">{{item.user.user_name}}</span>
                                    <span class="time">{{item.created_at}}</span>
                                </div>
                            </div>
                        </LoadMore>
                        <!--未购买-->
                        <div class="purchase" v-else>
                            只有课程学员才能查看课程公告
                        </div>
                    </div>
                </Slide-bar>
            </div>
        </div>



        <div class="bottom mx-1px-top">
            <div class="bottom-svip" @click="go(4)" v-if="detail && !detail.meta.is_member && detail.data.svip_price !=0 ">
                <div class="svip-left">
                    <div class="vip">SVIP</div>
                    <p>优享会员价 <span>￥{{detail.meta.memberPrice}}</span> 可省 <span>￥{{save}}</span></p>
                </div>
               <div class="svip-right" >
                   戳此成为SVIP <span> > </span>
               </div>
            </div>
            <div class="bottom-box mx-1px-top">
                <div class="money flex" :class="detail.meta.is_member ? 'clarity' : '' " >
                    <div>

                        <!--如果价格为0，显示免费-->
                        <span v-if="detail.data.price == 0" class="svip_price">免费</span>

                        <!--如果价格大于0并且svip等于0，显示svip免费，并且显示原价-->
                        <span v-if="detail.data.price > 0 && detail.data.svip_price == 0 && detail.meta.isSvip" class="svip_price">SVIP￥0  <span class="price" v-if="detail.data.is_discount != 1">￥{{detail.data.price}}</span></span>

                        <span v-if="detail.data.price > 0 && detail.data.svip_price == 0 && !detail.meta.isSvip" class="svip_price">￥0</span>
                        <!--如果价格大于0并且svip大于0，并且不是svip，显示svip_price-->
                        <span v-if="detail.data.svip_price != 0 && detail.data.price > 0 && !detail.meta.is_svip" class="svip_price">￥{{detail.data.svip_price}}</span>
                        <!--如果价格大于0并且svip大于0，并且是svip，显示svip_price-->
                        <span v-if="detail.data.svip_price != 0 && detail.data.price > 0 && detail.meta.is_svip" class="svip_price">SVIP ￥{{detail.data.svip_price}}</span>

                        <!--<span class="price" v-if="detail.data.is_discount == 1">￥{{detail.data.price}}</span>-->
                        <span class="price" v-if="detail.data.is_discount == 1">￥{{detail.data.price}}</span>
                        <span class="all">解锁全部课时</span>
                    </div>
                    <!--
                                    <div class="time-box" v-if="detail.data.is_discount == 1">
                                            <div>特价仅</div>
                                            <countdown :value="detail.data.discount_end_time"></countdown>

                                    </div>-->

                </div>
                <div class="more flex" @click="go(2)">更多课程</div>
                <div class="btn-box flex" :class="detail.meta.is_member ? 'start': '' ">

                    <div class="study btn" @click="show" v-if="!detail.meta.is_member">
                        <span v-if="detail.data.svip_price != 0">立即购买</span>
                        <span v-else>免费听课</span>
                    </div>
                    <div class="btn" v-else @click="learn()" >开始学习</div>
                    <!--<div class="collect btn">加入收藏</div>-->
                </div>
                <div v-show="tabIndex == 2 && detail.meta.is_member" class="comment" @click="comments"><i class="iconfont icon-caidan"></i></div>

            </div>

        </div>
        <!--<div class="tabbar-box" v-show="!showEdu">
            <div class="tabbar tab-title" :class="showSubSet ? 'cur' : ''">
                <div class="tabbar-item active" @click="go(2)">
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
                &lt;!&ndash;<div class="tabbar-item" @click="go(4)">
                    <img src="../../static/img/511.png" alt="">
                    &lt;!&ndash;<div class="text">双11</div>&ndash;&gt;
                </div>&ndash;&gt;
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
        </div>-->
    </div>
</template>

<script type="text/ecmascript-6">
	import Countdown from '../../components/Countdown.vue';
	import {Cache, cache_keys, is, env, setPageTitle} from '../../utils/util';
	import pingpp from 'pingpp-js';

    export default {
    	name: 'edu-detail',
	    components: {
		    Countdown
	    },
    	data() {
    		return {
    			showEdu: false,
                list: [
                    {
                        name: '概述'
                    },
                    {
                        name: '列表'
                    },
                    {
                        name: '评论',
                        type: 'reviews'
                    },
                    {
                        name: '公告',
                        type: 'announcement'
                    }
                ],
			    lessons: [],
			    dataList: [],
                announcementList: [],
			    reviews: {
	                init: false,
	                page: 1,
	                hasMore: true
                },
                announcement: {
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
                status: '',
                save: '',
            }
        },
        created() {
    		if (env.isWechat) {
    			this.is_wechat =true;
    			this.type = 'wx_pub';
            }
    		this.extra();
	        this.id = this.$route.params.id;
	        this.tabIndex = Number(this.$route.query.status) || 0;
	        this.$Indicator.blade();
	        const data = {
		        page: 1,
		        id: this.id
	        };
	        const rfData = {
	            id: this.id,
                rf: this.$route.query.rf || Cache.get(cache_keys.agent_code) || ''
            }
	        this.$store.dispatch('queryEduReviews', data);
    		this.$store.dispatch('queryEduDetail', rfData);
            this.$store.dispatch('queryEduTime', this.id);

    		EventBus.$on('eduDetail', this.getTitle);
    		EventBus.$on('eduTime', this.eduTime);

            EventBus.$on('eduReviews', this.eduReviewsData);
            EventBus.$on('eduannouncement', this.eduannouncement);
    		this.$on('done', this.done)

            this.status = this.$route.query.status;


        },
	    beforeDestroy() {
    		EventBus.$off('eduDetail');
		    EventBus.$off('eduTime');
            EventBus.$off('eduReviews');
            EventBus.$off('eduannouncement');
        },
        computed: {
    		detail() {
    			return this.$store.getters.getEduCourse;
            }
        },
        methods: {
	        extra() {
		        // 定义成功和失败的处理URL
		        var success_url = window.location.href;
		        var cancel_url = window.location.href;
		        return {success_url, cancel_url};

            },
    		show() {
			    var is_login = !!Cache.get(cache_keys.token);
			    if (is_login) {
				    this.showEdu = true;
                    this.$router.push({name: 'purchase'})
                } else {
				    this.$Modal.info({body: '请先登录', onOk: this.goLogin})
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
	        cancel() {
    			this.showEdu = false;
            },
            jumpItem(url) {
                this.$router.push({name: 'edu-lesson'})
            },
            jump(courseId, id, free) {

                var is_login = !!Cache.get(cache_keys.token);
    			var data = this.detail;
    			if (!is_login) {
				    this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                } else if (free == 1 ){
                    this.$router.push({name: 'edu-lesson', params: {courseId: courseId, id: id}, query: {status: 1}})

                } else if (!data.meta.is_member) {
                    this.show()
                } else {
				    this.$router.push({name: 'edu-lesson', params: {courseId: courseId, id: id}, query: {status: 1}})
                }
            },
            learn(){
	            let id;
	            for (let i = 0; i <= this.lessons.length; i++) {
	                if (this.lessons[i].itemType == 'lesson') {
	                    id = this.lessons[i].id;
	                    break;
                    }
                }
                this.jump(this.id,id);
            },
	        comments() {
    			this.$router.push({name: 'edu-comments', params: {id: this.id}});
            },
          /*  submit() {
	            var extra = this.extra();

//	            if (process.env.NODE_ENV === 'development') {
//		            extra = {};
//	            }

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
				    this.$store.dispatch('submitCourseInfo',data);
                    this.$router.push({name: 'edu-success'});
                }
            },*/
	       /* charge(success, charge) {
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
            },*/
	       /* wxCharge(data) {
	        	window.location.href = data.url;
            },*/
	       /* xjhCharge(res) {
	        	if (res.status) {
			        this.$router.push({name:'edu-success'})
                } else {
			        this.$Modal.confirm({body: '购买失败', onOk: function () {
				        window.location.reload();
			        }});
                }
            },*/
	        goLogin() {
		        var source = this.$route.path;
		        this.$router.push({name: 'user-login', query: {source}});
	        },
    		done() {
                this.$nextTick(() =>{
				    this.$refs['pulldown_' + this.tabIndex].onLoadOff();
                })
            },
            getTitle(res) {
                if (res.meta.is_member) {
                    const data = {
                        page: 1,
                        id: this.id
                    };
                    this.$store.dispatch('queryEduAnnouncement', data);
                }
	        	var profile = res.meta.profile
    			this.title = res.data.title;

	            this.setTitle();
	            if (profile) {
	            	this.user.name = profile.truename;
	            	this.user.phone = profile.mobile;
	            	this.user.WeChat = profile.weixin;
	            	this.user.firm = profile.company;
	            	this.user.post = profile.job;
	            	this.user.remark = profile.signature;
                }
                var num = Number(this.detail.data.svip_price - this.detail.meta.memberPrice);
                this.save = num.toFixed(2);
            },
            setTitle() {
    			setPageTitle(this.title);
            },
            eduTime(res) {
	        	this.lessons = res.data;
            },
//            加载更多
	        loadMore() {
                if (this.$route.query.status == '2') {
                    const page = this.reviews.page + 1;
                    var data = {
                        page: page,
                        id: this.id
                    };
                    this.$store.dispatch('queryEduReviews', data);
                } else if (this.$route.query.status == '3') {
                    const page = this.announcement.page + 1;
                    var data = {
                        page: page,
                        id: this.id
                    };
                    this.$store.dispatch('queryEduAnnouncement', data);
                };
            },
//            刷新数据
	        refresh() {
                /*var data = {
			        page: 1,
			        id: this.id
		        };*/
		        if (this.$route.query.status == '2') {
                    var data = {
                        page: 1,
                        id: this.id
                    };
                    this.$store.dispatch('queryEduReviews', data);
                } else if (this.$route.query.status == '3') {
                    var data = {
                        page: 1,
                        id: this.id
                    };
		            this.$store.dispatch('queryEduAnnouncement', data);
                }
            },
//            数据赋值
	        eduReviewsData(res) {
		        var list,
			        page = res.meta.pagination,
			        current_page = page.current_page,
			        total_pages = page.total_pages;
		        if (current_page == 1) {
                    list = res.data;
                } else {
                    list = this.dataList.concat(res.data);
                }
		        this.dataList = list;
		        this.reviews.init = true;
		        this.reviews.page = current_page;
		        this.reviews.hasMore = current_page < total_pages;
//		        this.$refs.pulldown.onLoadOff();
		        this.$emit('done');

            },
            eduannouncement(res) {
                var list,
                    page = res.meta.pagination,
                    current_page = page.current_page,
                    total_pages = page.total_pages;
                if (current_page == 1) {
                    list = res.data;
                } else {
                    list = this.announcementList.concat(res.data);
                }
                this.announcementList = list;
                this.announcement.init = true;
                this.announcement.page = current_page;
                this.announcement.hasMore = current_page < total_pages;
//		        this.$refs.pulldown.onLoadOff();
                this.$emit('done');
            },
//            改变tabIndex
	        change(i) {
	        	this.tabIndex = i;
		        this.$router.replace({name: 'edu-course', query: {status: i}});
		        this.setTitle();
//		        if (i == 2 && !this.reviews.init) {
//			        const data = {
//				        page: 1,
//				        id: this.id
//			        };
//			        this.$store.dispatch('queryEduReviews', data);
//                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #edu-course{
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
            .course-top{
                position: relative;
                img{
                    display: block;
                }
                .promotion{
                    position: absolute;
                    left: 0px;
                    right: 0px;
                    bottom: 85px;
                    background: rgba(255,0,0,.6);
                    padding: 6px 0px 6px 13px ;
                    display: flex;
                    /*justify-content: space-between;*/
                    align-items: center;

                    span{
                        font-size: 15px;
                        color: #fff;
                    }
                    .txt{
                        flex: 1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding-right: 5px;
                        .size{
                            font-size: 16px;
                            font-weight: 600;
                            margin-right: 5px;
                        }
                    }
                }
                .course-info{
                    padding: 12px;
                    font-size: 14px;
                    color: #666666;

                    .title{
                        font-size: 17px;
                        font-weight: bold;
                        color: #000;
                    }
                    .teacher{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .teachermes{
                            display: flex;
                            align-items: center;
                            flex:1;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            div{
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                &:first-child{
                                    border-right: 1px solid;
                                    padding-right: 10px;
                                    margin-right: 10px;
                                }
                            }
                        }
                        p{

                            border: 1px solid #008cee;
                            border-radius: 2px;
                            padding: 2px;
                            margin-left: 5px;
                            font-size: 12px;
                            color: #008cee;
                        }

                    }
                    .money{

                        .svip_price{
                            color: red;
                            font-size: 16px;
                        }
                        .price{
                            margin-left: 5px;
                            text-decoration: line-through;
                        }
                        .time-box{
                            display: flex;
                            align-items: center;
                            color: red;
                            .time{

                                span{
                                    color: red;
                                }
                            }
                        }

                    }
                    .btn-box{
                        display: flex;
                        align-items: center;
                        .btn{
                            padding: 5px 10px;
                            border-radius: 3px;

                            &.study{
                                background: #6bbc0f;
                                color: #ffffff;
                                border: 1px solid #6bbc0f;
                                margin-right: 15px;
                            }
                            &.collect{
                                background: #ffffff;
                                color: #6bbc0f;
                                border: 1px solid #6bbc0f;
                            }
                        }

                    }
                    .comment{
                        position: fixed;
                        bottom: 50px;
                        right: 20px;
                        z-index: 2;
                        background: #6bbc0f;
                        width: 45px;
                        height: 45px;
                        text-align: center;
                        border-radius: 100%;
                        opacity: .8;

                        i{
                            font-size: 30px;
                            color: #ffffff;
                        }
                    }
                    .info-item{
                        padding-top: 12px;
                    }
                }
            }
            .course-bottom{
                height: 100%;
                .vlc-slideBar {
                    border: none;
                    height: 100%;

                    .vlc-slideBar-wrapper {
                        border-bottom: 1px solid #dddddd;

                        .vlc-slideBar-child {
                            &.active {
                                a {
                                    color: #008cee;
                                }
                            }
                        }
                        a {
                            color: #666;
                        }
                    }
                }
                .vlc-slideBar-content{
                    display: flex;
                    /*background: #000000;*/
                    /*overflow: visible;*/
                }
                .vlc-slideBar-content-item{
                    /*overflow: auto;*/
                }
                .vlc-slideBar-container{
                    .slide-item{
                        flex: 1;
                        height: 100%;
                        overflow: auto;
                        padding-bottom: 50px;
                        /*background: red;*/
                    }
                    .summarize{
                        padding: 12px 12px 50px 12px;
                    }
                    .list{
                        .section-box{
                            padding: 0 12px 12px 12px;

                            .section-item-box{
                                margin-top: 12px;
                                .section-title{
                                    font-size: 16px;
                                    color: #000;
                                    background-color: #f3f3f3;
                                    padding: 10px;
                                }
                                .section-knob-item{
                                    padding: 10px 0;
                                    display: flex;
                                    justify-content: space-between;
                                    font-size: 14px;

                                    .item-left{
                                        display: flex;
                                        flex: 1;
                                        padding-right: 5px;

                                        i{
                                            display: block;
                                            font-size: 14px;
                                        }

                                        .name{
                                            padding-left: 5px;

                                            .free{
                                                display: inline-block;
                                                border: 1px solid #008cee;
                                                border-radius: 2px;
                                                padding: 2px;
                                                margin-left: 5px;
                                                font-size: 12px;
                                                color: #008cee;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .comment{
                        font-size: 14px;
                        color: #6d6d72;
                        .comment-item{
                            display: flex;
                            justify-content: space-between;
                            padding: 12px;

                            .item-left{

                                .img-box{
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 100%;
                                    overflow: hidden;
                                }
                                .comment-info{
                                    margin-left: 10px;
                                }
                            }
                            .item-right{
                                padding-left: 15px;
                                flex: 1;
                                .comment-info{
                                    display: flex;
                                    justify-content: space-between;

                                    .user-name{
                                        width: 135px;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    }
                                }

                            }
                        }
                    }
                    .announcement{
                        font-size: 14px;
                        .announcement-item{
                            padding: 15px;
                            .announcement-writing{

                            }
                            .announcement-personal{
                                color: #9a9a9a;
                                margin-top: 8px;
                                .name{
                                    margin-right: 15px;
                                }
                            }
                        }
                    }
                    .purchase{
                        /*margin-top: 15px;*/
                        padding: 15px;
                        text-align: center;
                        background: #fcf8e3;
                    }
                }
            }
        }

        .vlc-popup-content{
            background: #F7F8F8;
            z-index: 50;
            .show{
                height: 100%;
                overflow: auto;
                /*padding-bottom: 50px;*/
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
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    justify-content: space-around;
                    z-index: 55;

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
        .mx-1px-top:before{
            height: 0px;
        }
        .bottom{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .bottom-svip{
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 12px;
                background: #f5f2e3;
                padding: 10px;
                .svip-left{
                    display: flex;
                    align-items: center;
                    .vip {
                        font-weight: bold;
                        background: #000;
                        color: #e4c88b;
                        padding: 2px 5px;
                        margin-right: 10px;
                        border-radius: 5px;
                    }
                    p{
                        span{
                            color: #b09c61;
                        }
                    }

                }
                .svip-right {
                    color: #b09c61;
                }
            }
            .bottom-box{
                background: #fff;
                padding: 0 13px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                .flex{
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    padding: 6px 0px;

                }
                .money{
                    flex: 3;
                    justify-content: flex-start;
                    position: relative;
                    &.clarity{
                        opacity: 0;
                    }
                    .svip_price{
                        display: block;
                        font-weight: 700;
                        color: #ea4448;
                        font-size: 16px;
                        text-align: left;
                        /*height: 16px;*/
                    }
                    .price{
                        margin-left: 5px;
                        font-size: 12px;
                        text-decoration: line-through;
                        position: absolute;
                        bottom: 32px;
                        left: 80px;
                        color: #9b9b9b;
                    }
                    .time-box{
                        display: flex;
                        align-items: center;
                        color: red;
                        .time{
                            span{
                                color: red;
                            }
                        }
                    }
                    .all{
                        font-size: 12px;
                        color: #9b9b9b;
                    }
                }
                .more{
                    flex: 2;
                    margin-right: 15px;
                    border-radius: 5px;
                    border: 1px solid #008cee;
                    color: #008cee;
                }
                .btn-box{
                    flex: 2;
                    border-radius: 5px;
                    border: 1px solid #ea4448;
                    background: #ea4448;
                    color: #fff;

                }
                .start{
                    background: #008cee;
                    border: 1px solid #008cee;
                }
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
                z-index: 0;
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
