<template>
    <div id="news-index">
        <!--<Header title="天善智能" :wechat=true>-->
            <!--<div slot="right" class="right-item">-->
                <!--<i class="search iconfont icon-sousuo-"></i>-->
            <!--</div>-->
        <!--</Header>-->
        <div class="contents">
            <Swipe :list="banner" :speed="4">
                <template scope="props">
                    <img :src="props.item.image">
                    <span class="banner-title">{{props.item.title}}</span>
                </template>
            </Swipe>

            <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list.hasMore" ref="pulldown">
                <div class="news-box">
                    <div class="news-item" v-for="(item, index) in dataList" @click="jump(item.id)">
                        <div class="type-one mx-1px-bottom" v-if="index ==0 || index % 3 != 0">
                            <div class="item-left">
                                <img :src="item.cover_photo" alt="">
                            </div>
                            <div class="item-right clearfix">
                                <div class="title">
                                    {{item.title}}
                                </div>
                                <div class="time-box">
                                    <div class="view-box">
                                        <i class="iconfont icon-liulan-1"></i>
                                        <span>{{item.view_count}}人浏览</span>
                                    </div>
                                    <div class="time">
                                        {{item.created_at}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="type-two mx-1px-bottom" v-if="index !=0 && index % 3 == 0">
                            <div class="title">
                                {{item.title}}
                            </div>
                            <div class="img-box">
                                <div class="item-box">
                                    <img :src="item.cover_photo" alt="">
                                </div>
                                <!--<div class="item-box">-->
                                <!--<img :src="item.cover_photo" alt="">-->
                                <!--</div>-->
                                <!--<div class="item-box">-->
                                <!--<img :src="item.cover_photo" alt="">-->
                                <!--</div>-->
                            </div>
                            <div class="info">
                                <div class="view-box">
                                    <i class="iconfont icon-liulan-1"></i>
                                    <span>{{item.view_count}}人浏览</span>
                                </div>
                                <div class="time">
                                    {{item.created_at}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadMore>
        </div>
        <!--<tab :items="items" :index="4">-->

        <!--</tab>-->

        <div class="tabbar-box">
            <div class="tabbar tab-title" :class="showSubSet ? 'cur' : ''">
                <div class="tabbar-item active" @click="go(1)">
                    <i class="iconfont icon-toutiao"></i>
                    <div>头条</div>
                </div>
                <div class="tabbar-item" @click="go(2)">
                    <i class="iconfont icon-kecheng"></i>
                    <div>课程</div>
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
                    <i class="iconfont icon-boke"></i>
                    <div>博客</div>
                </div>
                <div class="tabbar-item" @click="go(5)">
                    <i class="iconfont icon-wode"></i>
                    <div>我的</div>
                </div>
            </div>

            <div class="subset tab-title" :class="showSubSet ? 'active' : ''">
                <div class="tabbar-item" @click="go(6)">
                    <i class="iconfont icon-huodong"></i>
                    <div>活动</div>
                </div>
                <div class="tabbar-item" @click="go(7)">
                    <i class="iconfont icon-wenda"></i>
                    <div>问答</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
    	name: 'news-index',
        data() {
            return {
	            banner: [],
                list: {
	                init: false,
	                page: 1,
	                hasMore: true
                },
	            height: '100%',
                dataList: [],
	            showSubSet: false,
            }
        },
	    created() {

		    this.$store.dispatch('queryNewsBanner');
		    this.$store.dispatch('queryNewsList');
		    EventBus.$on('newsList', this.newsList)
		    EventBus.$on('banner', this.bannerData);
		    this.$on('finish',() => {
	            this.$nextTick(()=>{
			    this.$refs.pulldown.onLoadOff();
            })
	    })
	    },
	    beforeDestroy() {
    		EventBus.$off('newsList');
    		EventBus.$off('banner');
        },
        mounted(){

        },
        methods: {
    		jump(id) {
    			this.$router.push({name: 'news-detail', params: {id: id}});
            },
	        go(id) {
		        switch (id) {
			        case 1:
//				        this.$router.push({name: 'question', params: '0'})
				        break
			        case 2:
				        this.$router.push({name: 'edu'})
				        break
			        case 3:
				        this.showSubSet = !this.showSubSet;
				        break
			        case 4:
				        this.$router.push({name: 'blogs', params: {id: 0}})
				        break
			        case 5:
				        this.$router.push({name: 'user-index'})
                        break
                    case 6:
	                    this.$router.push({name: 'activity'})
	                    break
                    case 7:
	                    this.$router.push({name: 'question', params: {id: 0}})
		        }
	        },
	        bannerData(res) {
    			this.banner = res.data;
            },
//            加载更多
	        loadMore() {
    			const page = this.list.page + 1;
		        this.$store.dispatch('queryNewsList', page);
            },
//            刷新数据
	        refresh() {
		        this.$store.dispatch('queryNewsList');
            },
//            数据赋值
            newsList(res) {
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
	            this.list.init = true;
	            this.list.page = current_page;
	            this.list.hasMore = current_page < total_pages;
                this.$emit('finish')
            }
        }
    }
</script>


<style rel="stylesheet/less" lang="less">
    #news-index {
        .vlc-tab {
            border-top: 1px solid #ccc;
            height: 55px;

            ul {
                li {
                    a {
                        &.cur {
                            color: #008cee;
                        }
                        i {
                            font-size: 28px;
                        }
                    }
                }
            }
        }
        .vlc-header {
            header {
                background: #393a3f;
            }
            line-height: 50px;
            .left {
                display: none;
            }
            .title {
                text-align: center;
                width: 100%;
                height: 100%;
                text-align: left;

            }
            .right {
                i {
                    font-size: 30px;
                }
            }
        }

        .contents {
            height: 100%;
            overflow: auto;
            padding-bottom: 50px;

            .vlc-swipe{

                .vlc-swipe-dots{
                    bottom: 30px;
                    .active{
                        background: #007aff;
                    }
                }
                .vlc-swipe-item{
                    position: relative;
                    .banner-title{
                        position: absolute;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        bottom: 0;
                        background: rgba(0,0,0,0.5);
                        color: #fff;
                        padding: 2px 10px;
                        box-sizing: border-box;
                    }
                }
            }
            .news-box {
                .news-item {

                    background: #ffffff;
                    .type-one{
                        display: flex;
                        padding: 12px;
                        .item-left {
                            min-width: 110px;
                            max-width: 130px;
                            padding-right: 12px;
                            overflow: hidden;
                            box-sizing: content-box;

                            img {
                                display: block;
                            }
                        }
                        .item-right {
                            flex: 1;
                            .title {
                                display: -webkit-box;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                color: #333333;
                                font-size: 16px;
                                line-height: 18px;
                                height: 36px;
                                margin-bottom: 24px;
                            }

                            .tag-box {
                                font-size: 14px;
                                color: #999;
                                .tag-item {
                                    display: inline-block;
                                    color: #bbb;
                                    padding: 2px 5px;
                                    font-size: 12px;
                                    border: 1px solid #efefef;
                                    border-radius: 1px;
                                    margin-right: 5px;

                                    &:last-child {
                                        margin-right: 0;
                                    }
                                }
                            }
                            .time-box {
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                align-items: center;
                                font-size: 10px;
                                color: #999999;
                                justify-content: space-between;
                                line-height: 15px;

                                .view-box{
                                    display: flex;
                                    align-items: center;

                                    span{
                                        margin-left: 5px;
                                    }
                                }
                                .time{
                                    /*margin-top: 4px;*/
                                }
                            }

                        }
                    }
                    .type-two{
                        padding: 12px;
                        .title{
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            color: #333333;
                            font-size: 16px;
                            line-height: 18px;
                            margin-bottom: 5px;
                        }

                        .img-box{
                            display: flex;

                            .item-box{
                                flex: 1;
                                width: 0%;
                                margin-right: 4px;
                                img{
                                    display: block;
                                }
                                &:last-child{
                                    margin-right: 0;
                                }
                            }
                        }

                        .info{
                            display: flex;
                            flex-direction: row;
                            flex-wrap: wrap;
                            align-items: center;
                            font-size: 10px;
                            color: #999999;
                            justify-content: space-between;
                            line-height: 15px;
                            margin-top: 5px;
                            .view-box{
                                display: flex;
                                align-items: center;

                                span{
                                    margin-left: 5px;
                                }
                            }
                            .time{
                                /*margin-top: 4px;*/
                            }
                        }
                        .item{
                            /*padding: 12px;*/


                        }
                    }
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

                bottom: -65px;
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
