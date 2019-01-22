<template>
    <div id="activity-detail">
        <Header title="活动" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="detail-top mx-1px-bottom">
                <div class="detail-img">
                    <img :src="detailData.data.cover_photo" alt="">
                </div>
                <div class="detail-info">
                    <div class="info-name">
                        {{detailData.data.title}}
                    </div>
                    <div class="info-item">
                        开始时间：{{detailData.data.friendly_start_time}}
                    </div>
                    <div class="info-item">
                        结束时间：{{detailData.data.friendly_end_time}}
                    </div>
                    <div class="info-item">
                        地点活动：{{detailData.data.address}}
                    </div>
                    <div class="info-item time" v-if="detailData.data.status_text == '立即报名' || detailData.data.status_text == '已报名'">
                        报名截止：
                        <activitytime :value="detailData.data.start_time" @over="isOver"></activitytime>
                        <!--<countdowns  message = '报名已结束' endTime='2017-08-23 13:15'></countdowns>-->
                    </div>
                </div>
            </div>
            <div class="detail-bottom">
                <div class="introduce mx-1px-bottom">
                    活动介绍
                </div>
                <div class="activity-text" v-html="detailData.data.description">

                </div>
                <span class="home" @click="jump('edu')">
                    <i class="iconfont icon-shouye"></i>
                </span>
            </div>
            <div class="apply mx-1px-top" v-if="detailData.data.status_text == '立即报名' || detailData.data.status_text == '已报名'">
                <div class="title">
                    报名参加
                </div>
                <!--没有报名-->
                <div class="no-apply" v-if="!detailData.meta.isJoin">
                    <div class="apply-info">
                        <div class="info-item mx-1px-top">
                            <div class="name">
                                姓名
                            </div>
                            <div class="input-box">
                                <input type="text" placeholder="真实姓名" v-model="shipping_name">
                            </div>
                        </div>
                        <div class="info-item mx-1px-top">
                            <div class="name">
                                手机号码
                            </div>
                            <div class="input-box">
                                <input type="text" placeholder="常用手机" v-model="shipping_mobile">
                            </div>
                        </div>
                        <div class="info-item mx-1px-top">
                            <div class="name">
                                邮箱
                            </div>
                            <div class="input-box">
                                <input type="text" placeholder="常用邮箱" v-model="shipping_address">
                            </div>
                        </div>
                        <div class="info-item mx-1px-top">
                            <div class="name">
                                公司
                            </div>
                            <div class="input-box">
                                <input type="text" placeholder="所在公司" v-model="company">
                            </div>
                        </div>
                        <div class="info-item mx-1px-top">
                            <div class="name">
                                职位
                            </div>
                            <div class="input-box">
                                <input type="text" placeholder="职位" v-model="job">
                            </div>
                        </div>
                    </div>
                    <div class="submit" @click="join">
                        提交
                    </div>
                </div>
                <!--已经报名-->
                <div class="already-apply" v-if="detailData.meta.isJoin">
                    <div class="text">
                        尊敬的天善智能社区用户，您的报名已经提交成功！活动主办方会在本次活动开幕前几天与您确认到会信息，真诚感谢您对本次活动的大力支持！如果您觉得这次活动的主题身边的朋友也在关注，请转发支持，谢谢！
                    </div>
                </div>

            </div>

            <div class="input-bottom" @click="goBottom" :class="detailData.data.status_text == '立即报名' ? 'apply' : ''">
                {{detailData.data.status_text}}
            </div>
        </div>
        <!--<div class="" v-if="!detailData.meta.isJoin && detailData.data.status_text == '立即报名'">-->
            <!--立即报名-->
        <!--</div>-->
        <!--<div class="input-bottom yet" v-if="detailData.meta.isJoin && detailData.data.status_text == '已报名'">-->
            <!--已报名-->
        <!--</div>-->
        <!--<div class="input-bottom yet" v-if="detailData.data.status_text == '报名已结束'">-->
            <!--报名已结束-->
        <!--</div>-->
        <!--<div class="input-bottom yet" v-if="detailData.data.status_text == '活动已结束'">-->
            <!--活动已结束-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import { Cache, cache_keys, is, setPageTitle} from '../../utils/util';
    import Countdowns from '../../components/Countdowns.vue';
    import activitytime from '../../components/activitytime.vue';
    export default {
    	name: 'activity-detail',
	    components: {
		    Countdowns,
            activitytime,
        },
        data() {
    		return {
    			data: '',
			    shipping_name: '',
			    shipping_mobile: '',
			    shipping_address: '',
			    company: '',
			    job: '',
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
	        isOver() {
		        window.location.reload();
            },
    		join() {
    			var id = this.$route.params.id;
    			var data = {
    				id: id,
				    shipping_name: this.shipping_name,
				    shipping_mobile: this.shipping_mobile,
				    shipping_address: this.shipping_address,
				    company: this.company,
				    job: this.job
                };
    			var message = null;
    			if (!is.has(this.shipping_name)) {
    				message = '请输入您的姓名';
                } else if (!is.has(this.shipping_mobile)) {
    				message = '请输入您的手机号';
                } else if (!is.mobile(this.shipping_mobile)) {
    				message = '手机号格式不正确，请重新输入';
                } else if (!is.has(this.shipping_address)) {
    				message = '请输入您的邮箱';
                } else if (!is.email(this.shipping_address)) {
    				message = '邮箱格式不正确，请重新输入';
                } else if (!is.has(this.company)) {
    				message = '请输入公司名称';
                } else if (!is.has(this.job)) {
    				message = '请输入职位'
                }

                if (message) {
                    this.$Modal.confirm({body: message})
                } else {
	                this.$store.dispatch('activityApply', data);
                }
            },
    		setTitle(res) {
	            var info = res.meta.profile
	           if (info) {

                   this.shipping_name = info.truename;
                   this.shipping_mobile = info.mobile;
                   this.company = info.company;
                   this.job = info.job;
               }

    			setPageTitle(res.data.title)
            },
            applyData(res) {
    			if (res.status) {
				    this.$Modal.confirm({body: '报名成功', onOk: function () {
					    window.location.reload();
				    }})
                } else {
				    this.$Modal.confirm({body:res.message})
                }
            },
	        goBottom() {
    			if (this.detailData.data.status_text == '立即报名') {
    				var height = document.querySelector('.contents').scrollHeight;
    				document.querySelector('.contents').scrollTop = height;
                }
            }
        },
        computed: {
    		detailData() {
    			return this.$store.getters.getActivityDateil;
            },
        },
	    async created() {

		    var id = this.$route.params.id;
//		    var isJoin = !!Cache.get(id);
		    this.$Indicator.blade();

		    await (() => {
			    this.$store.dispatch('queryActivityDetail',id);
			    EventBus.$on('activityDetail', this.setTitle);
//			    if (isJoin) {
//				    this.$store.dispatch('changeActivity');
//			    }
            })();

		    EventBus.$on('EactivityApply',this.applyData);

	    },
	    beforeDestroy() {
    		EventBus.$off('activityDetail');
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #activity-detail{
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
            box-sizing: border-box;
            .detail-top{

                .detail-img {
                    img{
                        display: block;
                    }
                }
                .detail-info{
                    padding: 12px;

                    .info-name{
                        font-size: 17px;
                        line-height: 25px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .info-item{
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        font-size: 13px;
                    }
                    .time{
                        .time-box{
                            .span{
                                color: #ea4448 !important;
                                .abox{
                                    color: #ffffff;
                                }
                            }
                        }
                    }
                }
            }
            .detail-bottom{
                .introduce{
                    padding: 12px;
                    font-weight: bold;
                }
                .activity-text{
                    padding: 12px;
                    padding-bottom: 50px;
                    white-space: pre-wrap;
                    word-wrap: break-word;

                    h1,h2,h3,h4,h5,h6{
                        margin: 12px 0px 3px 0px;
                    }
                    p{
                        margin: 5px 0;
                        font-size: 14px;
                    }
                }
                .home {
                    /*padding: 10px;*/
                    width: 44px;
                    height: 44px;
                    background: #fff;
                    border-radius: 50%;
                    position: fixed;
                    bottom: 100px;
                    right: 30px;
                    box-shadow: 0px 1px 10px #222;
                    text-align: center;
                    line-height: 44px;
                    i{
                        color: #008cee;
                        font-size: 23px;
                    }
                }

            }
            .apply{
                position: relative;
                z-index: 3;
                background: #ffffff;
                .title{
                    padding: 12px;
                    font-size: 16px;
                    font-weight: bold;
                }
                .no-apply{
                    .apply-info{
                        .info-item{
                            display: flex;
                            align-items: center;
                            padding: 12px;

                            .name{
                                width: 30%;
                            }

                            .input-box{
                                flex: 1;

                                input{
                                    font-size: 16px;
                                    width: 100%;
                                }
                            }
                        }
                    }
                    .submit{
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        color: #ffffff;
                        background: #008cee;
                    }
                }
                .already-apply{
                    padding: 20px 12px;
                    .text{
                        background: #dff0d8;
                        padding: 12px;
                    }
                    font-size: 13px;
                    color: #3d4145;
                    line-height: 1.6;
                }
            }

            .input-bottom{
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                z-index: 0;
                color: #ffffff;
                background: #999999;
                &.apply{
                    background: #6bbc0f;
                }
            }
        }
    }
</style>
