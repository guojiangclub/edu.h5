<template>
    <div id="edu-index">
        <!--<Header title="天善智能">-->
            <!--<div slot="right" class="right-item">-->
                <!--<i class="search iconfont icon-sousuo-"></i>-->
            <!--</div>-->
        <!--</Header>-->
        <div class="contens">

            <Swipe :list="index.banners" :multiple="false"></Swipe>
            <div class="gradient">
                <div class="rounded" @click="jump('search')">
                    <i class="iconfont icon-sousuo-"></i>
                    <input type="text" placeholder="搜索你想要的课程" readonly>
                </div>
            </div>

            <div class="classify clearfix">
                <div class="classify-item" @click="jump('edu-category-detail', 12)">
                    <div class="logo logo-4">
                        数据
                    </div>
                    <div class="text">
                        大数据
                    </div>
                </div>
                <div class="classify-item" @click="jump('edu-category-detail', 14)">
                    <div class="logo logo-5">
                        分析
                    </div>
                    <div class="text">
                        数据分析
                    </div>
                </div>
                <div class="classify-item" @click="jump('edu-category-detail', 27)">
                    <div class="logo logo-6">
                        挖掘
                    </div>
                    <div class="text">
                        数据挖掘
                    </div>
                </div>
                <div class="classify-item" @click="jump('edu-category-detail', 7)">
                    <div class="logo logo-1">
                       库
                    </div>
                    <div class="text">
                      数据库
                    </div>
                </div>
                <div class="classify-item" @click="jump('edu-category-detail', 39)">
                    <div class="logo logo-2">
                        学习
                    </div>
                    <div class="text">
                        机器学习
                    </div>
                </div>
                <div class="classify-item" @click="jump('edu-category-detail', 40)">
                    <div class="logo logo-3">
                        智能
                    </div>
                    <div class="text">
                        人工智能
                    </div>
                </div>
                <div class="classify-item" @click="jump('edu-category-detail', 30)">
                    <div class="logo logo-7">
                        公开
                    </div>
                    <div class="text">
                        公开课
                    </div>
                </div>
                <div class="classify-item" @click="jump('edu-category')">
                    <div class="logo logo-8">
                        更多
                    </div>
                    <div class="text">
                        更多子分类
                    </div>
                </div>
                <!--<div class="classify-item mx-1px-right-bottom" v-for="item in index.categories" @click="jump('edu-category-detail', item.id)">-->
                    <!--{{item.name}}-->
                <!--</div>-->
                <!--<div class="classify-item mx-1px-right-bottom" @click="jump('edu-category')">-->
                    <!--更多子分类-->
                <!--</div>-->
            </div>

            <div class="edu-list-box">
                <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" @on-change="change">
                    <div slot="slot-item-0" class="edu-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[0].hasMore" :refresh="refresh" ref="pulldown_0">
                            <div class="mx-1px-bottom edu-item" v-for="item in dataList[0]" @click="jump('edu-course',item.id)">
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
                        </LoadMore>
                    </div>
                    <div slot="slot-item-1" class="edu-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[1].hasMore" :refresh="refresh" ref="pulldown_1">
                            <div class="mx-1px-bottom edu-item" v-for="item in dataList[1]" @click="jump('edu-course',item.id)">
                                <div class="item-left">
                                    <img :src="item.picture" alt="">
                                    <div class="promotion" v-if="item.is_discount == 1">
                                        促销中...
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
                        </LoadMore>
                    </div>
                    <div slot="slot-item-2" class="edu-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[2].hasMore" :refresh="refresh" ref="pulldown_2">
                            <div class="mx-1px-bottom edu-item" v-for="item in dataList[2]" @click="jump('edu-course',item.id)">
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
                        </LoadMore>
                    </div>
                </Slide-bar>
            </div>
        </div>
        <!--<tab :items="items" :index="3">-->

        <!--</tab>-->
        <div class="tabbar-box">
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
                <!--<div class="tabbar-item" @click="go(4)">
                    <img src="../../static/img/511.png" alt="">
                    &lt;!&ndash;<div class="text">双11</div>&ndash;&gt;
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
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    	name: 'edu-index',
    	data() {
    		return {

                list: [
                    {
                        name: '最新',
                        init: false,
                        page: 1,
                        hasMore: true,
                    },
                    {
                        name: '最热',
                        init: false,
                        page: 1,
                        hasMore: true,
                    },
                    {
                        name: '推荐',
                        init: false,
                        page: 1,
                        hasMore: true,
                    }
                ],
                index: {
	                banners: [],
	                categories: []
                },
			    dataList: {
				    0: [],
				    1: [],
				    2: []
			    },
			    tabIndex: 0,
			    height: '100%',
			    showSubSet: false
            }
        },
        created() {
	        this.tabIndex = Number(this.$route.query.status) || 0;
	        this.$Indicator.blade();
	        const data = {
	        	page: 1,
		        type: this.tabIndex
            };
	        //
	        this.$store.dispatch('queryCoursesList', data);
    		this.$store.dispatch('queryEduIndex');
    		EventBus.$on('eduIndex', this.indexData);
	        EventBus.$on('coursesList', this.categoryDetail);
        },
	    beforeDestroy() {
		    EventBus.$off('eduIndex');
		    EventBus.$off('coursesList');
        },
        methods: {
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
//				        this.$router.push({name: 'blogs', params: '0'})
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
            indexData(res) {
    			this.index = res.data;
            },
//            加载更多
	        loadMore() {
		        const page = this.list[this.tabIndex].page + 1;
		        const data = {
			        page: page,
			        type: this.tabIndex
		        };
		        this.$store.dispatch('queryCoursesList', data);
            },
//            刷新数据
	        refresh() {
		        const data = {
			        page: 1,
			        type: this.tabIndex,
		        };
		        this.$store.dispatch('queryCoursesList', data);
            },
//            内容赋值
	        categoryDetail(res) {
		        var list,
			        page = res.meta.pagination,
			        current_page = page.current_page,
			        total_pages = page.total_pages;
		        if (current_page == 1) {
			        list = res.data;
		        } else {
			        list = this.dataList[this.tabIndex].concat(res.data);
		        }
		        this.dataList[this.tabIndex] = list;
		        this.list[this.tabIndex].init = true;
		        this.list[this.tabIndex].page = current_page;
		        this.list[this.tabIndex].hasMore = current_page < total_pages;

		        this.$refs['pulldown_' + this.tabIndex].onLoadOff();
            },
//            改变tabIndex
	        change(i) {
		        this.tabIndex = i;
		        var data = {
			        page: 1,
			        type: i,
		        };

		        this.$router.replace({name: 'edu', query: {status: i}});
		        if (!this.list[i].init) {
			        this.$Indicator.blade();
			        this.$store.dispatch('queryCoursesList', data);
		        }
	        }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #edu-index{
        .vlc-tab {
            border-top: 1px solid #ccc;
            height: 55px;

            ul {
                li {
                    a {
                        &.cur{
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
            line-height: 50px;
            .left {
                display: none;
            }
            .right {
                .right-item {
                    text-align: center;
                    width: 100%;
                    height: 100%;

                    i {
                        font-size: 30px;
                    }
                }
            }
        }
        .contens{
            height: 100%;
            overflow: auto;
            background: #F2F2F2;
            .gradient{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                padding: 10px 25px;
                background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0));
                .rounded{
                    /*text-align: center;*/
                    background: rgba(255,255,255,.8);
                    border-radius: 20px;
                    i{
                        font-size: 12px;
                        margin-left: 15px;
                    }
                    input{
                        margin-bottom: 5px;
                        font-size: 12px;
                    }
                }
            }
            .classify{
                background: #FFFFFF;
                padding-top: 15px;
                margin-bottom: 5px;
                .classify-item{
                    width: 25%;
                    /*height: 54px;*/
                    /*line-height: 54px;*/
                    text-align: center;
                    font-size: 14px;
                    color: #b3b3b3;
                    margin-bottom: 15px;
                    float: left;

                    .logo{
                        width: 42px;
                        height: 42px;
                        line-height: 42px;
                        border-radius: 100%;
                        margin: 0 auto;
                        color: #FFFFFF;

                        &.logo-1{
                            background: #68A8D4;
                        }
                        &.logo-2 {
                            background: #7EC9CE;
                        }
                        &.logo-3 {
                            background: #F599A0;
                        }
                        &.logo-4 {
                            background: #887974;
                        }
                        &.logo-5 {
                            background: #00B1D1;
                        }
                        &.logo-6 {
                            background: #F5A1C7;
                        }
                        &.logo-7 {
                            background: #C599D7;
                        }
                        &.logo-8 {
                            background: #33B4AD;
                        }
                    }
                    .text{
                        margin-top: 15px;
                    }


                    /*&:nth-child(4),&:nth-child(8) {*/
                        /*&:before{*/
                            /*display: none;*/
                        /*}*/
                    /*}*/
                }
            }
            .edu-list-box{
                height: 100%;
                .vlc-slideBar {
                    border: none;
                    height: 100%;

                    .vlc-slideBar-wrapper {
                        border-bottom: 1px solid #dddddd;

                        .vlc-slideBar-child {
                            &.active {
                                a {
                                    color: #005AAC;
                                }
                            }
                        }
                        a {
                            /*font-size: 18px;*/
                            color: #4C4C4C;
                        }
                    }
                }
                .vlc-slideBar-container {

                    .vlc-slideBar-content{
                        display: flex;
                    }
                    .edu-list {
                        flex: 1;
                        height: 100%;
                        overflow: auto;
                        padding-bottom: 100px;
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
