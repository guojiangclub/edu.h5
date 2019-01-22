<template>
    <div id="blogs-index">
        <!--<Header title="天善智能" :wechat=true>-->
            <!--<div slot="right" class="right-item">-->
                <!--<i class="search iconfont icon-sousuo-"></i>-->
            <!--</div>-->
        <!--</Header>-->
        <div class="contents">
            <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" :flex=false @on-change="change">
                <div :slot="'slot-item-' + index " class="blogs-list" v-for="(item, index) in list" v-cloak>
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[index].hasMore" :refresh="refresh"  ref="pulldown">
                        <!--<div v-if="list[tabIndex].noList" class="noList">-->
                            <!--暂无数据-->
                        <!--</div>-->
                        <div class="blogs-item mx-1px-bottom" v-for="blogs in dataList[tabIndex]" @click="jump('blogs-detail',blogs.id)">
                            <div class="blogs-name">
                                {{blogs.title}}
                            </div>
                            <div class="blogs-text" v-html="blogs.message">

                            </div>
                            <div class="user-info">
                                <div class="view-num">
                                    <i class="iconfont icon-liulan-1"></i>
                                    <span>{{blogs.view_count}}人浏览过</span>
                                </div>
                                <div class="user-name">
                                    <i class="iconfont icon-renshu-"></i>
                                    <span>{{blogs.user.user_name}} • {{blogs.friendly_date}}</span>
                                </div>
                                <!--<div class="tags" v-html="blogs.topic" v-if="blogs.topic">-->

                                <!--</div>-->
                            </div>
                        </div>
                    </LoadMore>
                </div>
            </Slide-bar>


            <div class="search" @click="search">
                <i class="iconfont icon-sousuo"></i>
            </div>
        </div>
        <!--<tab :items="items" :index="1">-->

        <!--</tab>-->

        <div class="tabbar-box">
            <div class="tabbar tab-title" :class="showSubSet ? 'cur' : ''">
                <div class="tabbar-item" @click="go(1)">
                    <i class="iconfont icon-wenda"></i>
                    <div>问答</div>
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
                <div class="tabbar-item active" @click="go(4)">
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
                    <i class="iconfont icon-toutiao"></i>
                    <div>头条</div>
                </div>
                <div class="tabbar-item" @click="go(7)">
                    <i class="iconfont icon-huodong"></i>
                    <div>活动</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'blogs-index',
		data() {
			return {
				list: [],
				dataList: {},
				tabIndex: 0,
                tabName: 'newest',
				height: '100%',
				showSubSet: false
//				downEndText:`暂无更多数据`
			}
		},
		created() {
			this.$Indicator.blade();
			EventBus.$on('blogsList', this.blogsData);
			EventBus.$on('blogsHeader', this.blogsHeader);
			this.$store.dispatch('quetyBlogsHeader');
		},
		beforeDestroy() {
			EventBus.$off('blogsList');
			EventBus.$off('blogsHeader');
        },
		methods: {
			jump(name,id) {
				this.$router.push({name: name, params: {id: id} });
            },
			go(id) {
				switch (id) {
					case 1:
						this.$router.push({name: 'question', params: {id: 0}})
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
						this.$router.push({name: 'news'})
						break
					case 7:
						this.$router.push({name: 'activity'})
						break
				}
			},
			search() {
				this.$router.push({name: 'search'});
            },
//			加载更多
			loadMore() {
				const page = this.list[this.tabIndex].page + 1;
				var data = {
					page: page,
                    name: this.tabName
                }
				this.$store.dispatch('queryBlogsList',data);
            },
//            刷新数据
			refresh() {
				var data = {
					page: 1,
                    name: this.tabName
                }
				this.$store.dispatch('queryBlogsList',data);
            },
//        	博客内容数据赋值
			blogsData(res) {
				var list,
					page = res.meta.pagination,
					current_page = page.current_page,
					total_pages =page.total_pages;
				if (current_page == 1) {
					list = res.data;
                } else {
					list = this.dataList[this.tabIndex].concat(res.data);
                }
				this.$set(this.dataList, this.tabIndex, list);  // Vue 不能检测到对象属性的添加或删除  https://vuefe.cn/v2/guide/reactivity.html#变化检测问题
                this.list[this.tabIndex].init = true;
                this.list[this.tabIndex].page = current_page;
                this.list[this.tabIndex].hasMore = current_page < total_pages;
				this.list[this.tabIndex].noList =!!!this.dataList[this.tabIndex].length;
				this.$nextTick(()=>{
					this.$refs.pulldown[this.tabIndex].onLoadOff();
                })


			},
//            博客头部数据赋值
			blogsHeader(res) {
				res.data.forEach(i => {
					i.name = i.value;
					i.init = false;
					i.page = 1;
					i.hasMore = true,
                    i.noList = false
				});
				this.list = res.data;
				var id = this.$route.params.id;
				this.tabIndex = id;
				this.tabName = this.list[this.tabIndex].key;
//				this.list[id].init = true;
				const key = this.list[id].key;
				var data = {
					page: 1,
					name: key
				}
				this.$store.dispatch('queryBlogsList', data);
			},
//            改变tabIndex
			change(i) {
				this.tabName = this.list[i].key;
				this.tabIndex = i;
				var data = {
					page: 1,
					name: this.tabName,
				};
				this.$router.replace({name: 'blogs', params: {id: this.tabIndex}});
				if (!this.list[i].init) {
					this.$Indicator.blade();
					this.$store.dispatch('queryBlogsList', data);
				}
//				this.list[i].init = true
			}
		}
	}

</script>

<style rel="stylesheet/less" lang="less">

    #blogs-index {
        [v-cloak] {
            display: none;
        }


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

        .vlc-slideBar-content{
            display: flex;
            overflow: auto;
        }
        .contents {
            height: 100%;
            overflow: auto;
            box-sizing: border-box;

            .vlc-slideBar {
                border: none;
                height: 100%;
                .vlc-slideBar-header{
                    border-bottom: 1px solid #dddddd;
                    .vlc-slideBar-wrapper{
                        box-sizing: content-box;
                        padding-right: 37px;
                    }

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
            .noList{
                text-align: center;
                padding: 10px 0;
            }
            .blogs-list {
                flex: 1;
                height: 100%;
                overflow: auto;
                padding-bottom: 100px;
                .blogs-item {
                    padding: 12px;
                    background: #ffffff;

                    .blogs-name {
                        font-size: 18px;
                        line-height: 22px;
                    }
                    .blogs-text {
                        font-size: 14px;
                        color: #666666;
                        margin: 5px 0;
                        line-height: 20px;
                        word-break: break-all;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                    }
                    .user-info {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-items: center;
                        font-size: 12px;
                        color: #999999;
                        justify-content: space-between;

                        .view-num{
                            display: flex;
                            align-items: center;
                            span{
                                margin-left: 5px;
                                font-size: 10px;
                            }
                        }

                        .user-name{
                            display: flex;
                            align-items: center;

                            span{
                                font-size: 10px;
                                margin-left: 5px;
                            }
                        }
                        .tags {

                            i{
                                display: inline-block;
                                margin: 5px 5px 0 0;
                                color: #101010;
                                padding: 2px 3px;
                                background: #e4e4e4;
                            }
                        }
                    }
                }
            }
            .search {
                position: absolute;
                top: 0;
                width: 44px;
                height: 44px;
                line-height: 44px;
                text-align: center;
                right: 0;
                background: #fff;

                i {
                    font-size: 32px;
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
