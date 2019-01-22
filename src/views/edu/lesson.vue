<template>
    <div id="edu-lesson">
        <Header :title="lessonDetail.title" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="box">
                <div class="videos-box" :class="isPhone ? '' : 'noPhone'">
                    <div class="video-box" id="videoElement" @click="hide"></div>
                    <div class="iconfont icon-webicon311 iconqp" v-show="controls" @click="videoShow"></div>
                </div>
                <div class="video-text mx-1px-bottom" v-if="videoLess">
                    视频加载中，请稍等~
                </div>
            </div>
            <!--<div class="collect">-->
            <!--加入收藏-->
            <!--</div>-->
            <div class="items">
                <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" @on-change="change">
                    <div slot="slot-item-0" class="summarize slide-item" v-html="detail.data.about">

                    </div>
                    <div slot="slot-item-1" class="list slide-item">
                        <div class="section-box">
                            <div class="section-item-box" v-for="item in lessons">
                                <div class="section-title" v-if="item.itemType == 'chapter'">
                                    {{item.title}}
                                </div>
                                <div class="section-knob-item mx-1px-bottom" :class="item.id == id ? 'active' : ''" v-else @click="jump(item.courseId, item.id, item.free)">
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
                            <!--<div class="section-title-box" v-for="items in course">-->
                            <!--<div class="section-title">-->
                            <!--{{items.title}}-->
                            <!--</div>-->
                            <!--<div class="section-knob-item mx-1px-bottom" v-for="item in items.item">-->
                            <!--<div class="item-left">-->
                            <!--<i class="iconfont icon-weibiaoti38"></i>-->
                            <!--<div class="name">-->
                            <!--{{item.title}}-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="item-right">-->
                            <!--{{item.time}}-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
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
                                            {{item.user.user_name}}  • 2016-12-07
                                        </div>
                                        <div class="grade">
                                            评分
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
    </div>
</template>

<script type="text/ecmascript-6">
    import {Cache, cache_keys, setPageTitle ,env} from '../../utils/util';
    import 'dplayer/dist/DPlayer.min.css';
    import DPlayer from 'dplayer';
    export default {
        name:'edu-lesson',
        data() {
            return {
                list: [
                    {
                        name: '概述'
                    },
                    {
                        name: '列表'
                    },
                    {
                        name: '评论'
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
	            courseId: '',
	            id:'',
	            tabIndex: 0,
                title: '',
	            lessonDetail: '',
                dplayer: '',
                controls: true,
                display: false,
                isPhone: env.isIphone,
                videoLess: true
            }
        },
	    created() {

            this.courseId = this.$route.params.courseId;
		    this.id = this.$route.params.id;
		    this.tabIndex = Number(this.$route.query.status) || 0;
		    this.$Indicator.blade();
		    const data = {
			    page: 1,
			    id: this.courseId
		    };
		    const rfData = {
                id: this.courseId,
                rf: this.$route.query.rf || Cache.get(cache_keys.agent_code) || ''
            };
		    this.$store.dispatch('queryEduReviews', data);
		    this.$store.dispatch('queryEduDetail', rfData);
		    this.$store.dispatch('queryEduTime', this.courseId);
		    this.$store.dispatch('queryLesson', this.id);

		    EventBus.$on('edudetailAnnoun', this.getContent);
		    EventBus.$on('eduTimeLesson', this.eduTime);
		    EventBus.$on('eduReviewsLesson', this.eduReviewsData);
		    EventBus.$on('lessonData', this.lessonData);
            EventBus.$on('eduLessonAnnouncement', this.eduannouncement);
            this.$on('done', this.done);
	    },
	    beforeDestroy() {
//		    EventBus.$off('eduDetail');
		    EventBus.$off('eduTimeLesson');
		    EventBus.$off('eduReviewsLesson');
            EventBus.$off('eduLessonAnnouncement');
            EventBus.$off('edudetailAnnoun');
        },
	    watch: {
    		'$route.params.id': function (id) {
			    window.location.reload();
		    }
        },
	    computed: {
		    detail() {
			    return this.$store.getters.getEduCourse;
		    }
	    },
        methods: {
            videoShow() {
                var video = document.querySelector('.dplayer-video-current');
                var attribute = video.getAttributeNode('x5-video-orientation');
                if (attribute) {
                    if (attribute.nodeValue == 'landscape') {
                        // 取消全屏
                        video.setAttribute('x5-video-orientation', 'portrait');
                    } else {
                        // 全屏
                        video.setAttribute('x5-video-orientation', 'landscape');
                    }
                } else {
                    // 全屏
                    video.setAttribute('x5-video-orientation', 'landscape');
                }

                this.dplayer.play();
            },
            hide() {
                var elements=document.getElementsByClassName('dplayer-hide-controller');
                console.log(elements.length);
                if (elements.length) {
                    this.controls = false
                } else {
                    this.controls = true
                }
            },
	        done() {
		        this.$nextTick(() =>{
                    this.$refs['pulldown_' + this.tabIndex].onLoadOff();
                })
	        },
            getContent(res) {
                if (res.meta.is_member) {
                    const data = {
                        page: 1,
                        id: this.courseId
                    };
//                    debugger
                    this.$store.dispatch('queryEduAnnouncement', data);
                }
            },
            show() {
                this.$router.push({name: 'purchase', params: {id: this.courseId}})
            },
	        jump(courseId, id, free) {
	            var data = this.detail;
                if (free == 1 ){
                    this.$router.push({name: 'edu-lesson', params: {courseId: courseId, id: id}, query: {status: 1}})
                } else if (!data.meta.is_member) {
                    this.$Modal.info({body: '请先购买课程', onOk: this.show})
                } else {
                    this.$router.push({name: 'edu-lesson', params: {courseId: courseId, id: id}, query: {status: 1}})
                }
	        },
	        eduTime(res) {
		        this.lessons = res.data;
	        },
            lessJump(){
                var lessons = this.lessons;
                var index = '';
                var that = this;
                var id = this.id;
                lessons.forEach((v,i) => {
                    if (v.itemType == 'lesson') {
                        if(v.id == that.id) {
                            index = i;
                        }
                    }
                })
                //获取课程列表id如果是最后一课就不跳
                console.log(lessons.length - 1);
                if (lessons.length-1 != index) {
                    id = lessons[index+1].id;
                    this.$router.push({name:'edu-lesson',params: {courseId: this.courseId, id: id}, query: {status: 1}})
                }
                console.log(id,'id');
            },
	        lessonData(res) {
	        	this.lessonDetail = res;
	        	this.title = res.title
		        setPageTitle(this.lessonDetail.title);
                this.$nextTick(() => {
                    this.dplayer = new DPlayer({
                    container: document.querySelector('#videoElement'),
                    video: {
                        url: res.mediaUri,
                        pic: this.detail.data.picture,
                        defaultQuality: 0
                    }
                });
                var that = this;
                    this.dplayer.on('ended', function () {
                    that.lessJump();
                });
                    this.dplayer.on('error', function (res) {
                        console.log(res,'error');
                    });
                var video = document.querySelector('.dplayer-video');
                if (video.nodeName == 'VIDEO') {
                    video.setAttribute('x5-video-player-type', 'h5');
                    video.setAttribute('x5-video-player-fullscreen', 'true');
                }
                this.videoLess = false;
                /*var full = document.querySelector('.dplayer-full-icon');
                 full.addEventListener("click", () => {
                 this.videoShow();
                 }, false)*/

            })
            },
//            加载更多
	        loadMore() {
                if (this.$route.query.status == '2') {
                    const page = this.reviews.page + 1;
                    var data = {
                        page: page,
                        id: this.courseId
                    };
                    this.$store.dispatch('queryEduReviews', data);
                } else if (this.$route.query.status == '3') {
                    const page = this.announcement.page + 1;
                    var data = {
                        page: page,
                        id: this.courseId
                    };
                    this.$store.dispatch('queryEduAnnouncement', data);
                };
	        },
//            刷新数据
	        refresh() {
		        /*var data = {
			        page: 1,
			        id: this.courseId
		        };
		        this.$store.dispatch('queryEduReviews', data);*/
                if (this.$route.query.status == '2') {
                    var data = {
                        page: 1,
                        id: this.courseId
                    };
                    this.$store.dispatch('queryEduReviews', data);
                } else if (this.$route.query.status == '3') {
                    var data = {
                        page: 1,
                        id: this.courseId
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
		        this.$router.replace({name: 'edu-lesson', params: {courseId: this.courseId, id: this.id}, query: {status: i}});
		        this.setTitle();
	        },
	        setTitle() {
		        setPageTitle(this.title);
	        },
           /* end() {
                this.$nextTick(() =>{
                    var vid = document.getElementById("myVideo");
                    console.log(vid.buffered);
                    vid.onended = () => {
                        window.location.href = 'http://fanyi.baidu.com/#en/zh'
    //		            	window.location.href = 'http://192.168.0.103:8081/#/edu/transfer/106/1517?number=2'
    //			            this.$router.push({name: 'edu-transfer',params: {courseId: this.courseId, id: this.id}, query: {number: this.lessonDetail.number}})
                    };

                })
            },*/


        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #edu-lesson {
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                    font-size: px;
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
            .box{
                text-align: center;
                .videos-box{
                    position: relative;
                    video{
                        width: 100%;
                    }

                    .iconqp{
                        display: none;
                        position: absolute;
                        bottom: 0;
                        right: 30px;
                        font-size: 20px;
                        margin-bottom: 3px;
                        color: #ffffff;
                    }

                    .dplayer-controller{
                        .dplayer-icons-right{
                            .dplayer-setting{
                                /*padding-right: 30px;*/
                                .dplayer-setting-box{
                                    .dplayer-setting-origin-panel{
                                        .dplayer-setting-loop{
                                            display: none !important;
                                        }
                                    }
                                    .dplayer-setting-speed-panel{
                                        .dplayer-setting-speed-item{
                                            &:nth-child(1){
                                                display: none !important;
                                            }
                                            &:nth-child(2){
                                                display: none !important;
                                            }
                                        }

                                    }
                                }
                                .dplayer-setting-box-narrow{
                                    height: 115px;
                                }
                            }
                            .dplayer-full-in-icon{
                                display: none !important;
                            }
                        }
                    }
                    &.noPhone {
                        .dplayer-controller {
                            .dplayer-icons-right{
                                .dplayer-setting{
                                    padding-right: 30px;
                                    .dplayer-setting-icon{
                                        margin-bottom: 27px;
                                    }
                                    .dplayer-setting-box{
                                        .dplayer-setting-origin-panel{
                                            .dplayer-setting-loop{
                                                display: none !important;
                                            }
                                        }
                                        .dplayer-setting-speed-panel{
                                            .dplayer-setting-speed-item{
                                                &:nth-child(1){
                                                    display: none !important;
                                                }
                                                &:nth-child(2){
                                                    display: none !important;
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                            .dplayer-full-icon{
                                display: none !important;
                            }
                        }
                        .iconqp{
                            display: block;
                        }
                    }
                }
                .video-text{
                    padding: 30px;
                }

            }
            .collect{
                margin: 12px;
                display: inline-block;
                padding: 5px 12px;
                color: #fff;
                border-radius: 2px;
                font-size: 14px;
                background: #008cee;
            }
            .items{
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
                .vlc-slideBar-container{
                    .vlc-slideBar-content{
                        display: flex;
                    }
                    .slide-item{
                        flex: 1;
                        height: 100%;
                        overflow: auto;
                        padding-bottom: 50px;
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

                                    &.active{
                                        color: #008cee;
                                    }
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
                                }

                            }
                        }
                    }
                }
            }
        }
    }
</style>
