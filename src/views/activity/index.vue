<template>
    <div id="activity-index">
        <!--<Header title="天善智能" :wechat=true>-->
            <!--<div slot="right" class="right-item">-->
                <!--<i class="search iconfont icon-sousuo-"></i>-->
            <!--</div>-->
        <!--</Header>-->
        <div class="contents">
            <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" @on-change="change">
                <div slot="slot-item-0" class="activity-list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[0].hasMore" :refresh="refresh" ref="pulldown_0">
                        <div v-if="list[0].noList" class="noList">
                            暂无数据
                        </div>
                        <div class="mx-1px-bottom activity-item" v-for="news in dataList[0]" @click="jump('activity-detail',news.id)">
                            <div class="item-left">
                                <img :src="news.cover_photo" alt="">
                            </div>
                            <div class="item-right">
                                <div class="activity-name">
                                    {{news.title}}
                                </div>
                                <div class="activity-time">
                                    {{news.friendly_start_time}}
                                </div>
                                <div class="activity-type">
                                    <div class="activity-address">
                                        {{news.category_name}}

                                        <span v-if="news.category_name == '线下活动'">{{news.artivity_numbers}}人已报名</span>
                                    </div>
                                    <div class="activity-status" :class="news.status_text == '立即报名' ? 'apply' : ''">
                                        {{news.status_text}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LoadMore>
                </div>
                <div slot="slot-item-1" class="activity-list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[1].hasMore" :refresh="refresh" ref="pulldown_1">
                        <div v-if="list[1].noList" class="noList">
                            暂无数据
                        </div>
                        <div class="mx-1px-bottom activity-item" v-for="offline in dataList[1]" @click="jump('activity-detail',offline.id)">
                            <div class="item-left">
                                <img :src="offline.cover_photo" alt="">
                            </div>
                            <div class="item-right">
                                <div class="activity-name">
                                    {{offline.title}}
                                </div>
                                <div class="activity-time">
                                    {{offline.friendly_start_time}}
                                </div>
                                <div class="activity-type">
                                    <div class="activity-address">
                                        {{offline.category_name}}
                                        <span v-if="offline.category_name == '线下活动'">{{offline.artivity_numbers}}人已报名</span>
                                    </div>
                                    <div class="activity-status" :class="offline.status_text == '立即报名' ? 'apply' : ''">
                                        {{offline.status_text}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LoadMore>
                </div>
                <div slot="slot-item-2" class="activity-list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[2].hasMore" :refresh="refresh" ref="pulldown_2">
                        <div v-if="list[2].noList" class="noList">
                            暂无数据
                        </div>
                        <div class="mx-1px-bottom activity-item" v-for="online in dataList[2]" @click="jump('activity-detail',online.id)">
                            <div class="item-left">
                                <img :src="online.cover_photo" alt="">
                            </div>
                            <div class="item-right">
                                <div class="activity-name">
                                    {{online.title}}
                                </div>
                                <div class="activity-time">

                                    {{online.friendly_start_time}}
                                </div>
                                <div class="activity-type">
                                    <div class="activity-address">
                                        {{online.category_name}}
                                        <span v-if="online.category_name == '线下活动'">{{online.artivity_numbers}}人已报名</span>
                                    </div>
                                    <div class="activity-status" :class="online.status_text == '立即报名' ? 'apply' : ''">
                                        {{online.status_text}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LoadMore>
                </div>
            </Slide-bar>
        </div>
        <!--<tab :items="items" :index="2">-->

        <!--</tab>-->
        <div class="tabbar-box">
            <div class="tabbar tab-title" :class="showSubSet ? 'cur' : ''">
                <div class="tabbar-item active" @click="go(1)">
                    <i class="iconfont icon-huodong"></i>
                    <div>活动</div>
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
                    <i class="iconfont icon-toutiao"></i>
                    <div>头条</div>
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
		name: 'activiyt-index',
		data() {
			return {
				tabIndex: 0,
				list: [
					{
						name: '最新',
						init: false,
						page: 1,
						hasMore: true,
						cotegory: 'default',
                        noList: false
					},
					{
						name: '线下活动',
						init: false,
						page: 1,
						hasMore: true,
						cotegory: 'offline',
						noList: false
					},
					{
						name: '线上活动',
						init: false,
						page: 1,
						hasMore: true,
						cotegory: 'online',
						noList: false
					}
				],
				dataList: {
					0: [],
					1: [],
					2: []
				},
				height: '100%',
				showSubSet: false
			}
		},
		created() {

			this.tabIndex = Number(this.$route.query.status) || 0;


			this.$Indicator.blade();

			const cotegory = this.list[this.tabIndex].cotegory;

			var data = {
				page: 1,
				cotegory: cotegory
			}
			this.$store.dispatch('queryActivityList', data);

			EventBus.$on('activityList', this.activityData);
		},
		beforeDestroy() {
			EventBus.$off('activityList');
		},
		methods: {
			jump(name, id) {
				this.$router.push({name: name, params: {id: id}});
			},
			go(id) {
				switch (id) {
					case 1:
//						this.$router.push({name: 'activity'})
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
						this.$router.push({name: 'question', params: {id: 0}})
						break
				}
			},
//            加载更多
			loadMore() {
				const page = this.list[this.tabIndex].page + 1;
				const cotegory = this.list[this.tabIndex].cotegory;
				const data = {
					page: page,
					cotegory: cotegory
				}
				this.$store.dispatch('queryActivityList', data);
			},
//            刷新数据
			refresh() {
				const cotegory = this.list[this.tabIndex].cotegory;
				var data = {
					page: 1,
					cotegory: cotegory
				}
				this.$store.dispatch('queryActivityList', data);
			},
//            内容赋值
			activityData(res) {
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
				this.list[this.tabIndex].noList = !!!this.dataList[this.tabIndex].length;
				this.$refs['pulldown_' + this.tabIndex].onLoadOff();

			},
//            改变tabIndex
			change(i) {
				this.tabIndex = i;
				const cotegory = this.list[this.tabIndex].cotegory;
				var data = {
					page: 1,
					cotegory: cotegory
				};

				this.$router.replace({name: 'activity', query: {status: i}});
				if (!this.list[i].init) {
					this.$Indicator.blade();
					this.$store.dispatch('queryActivityList', data);
				}
			}
		},
	}

</script>

<style rel="stylesheet/less" lang="less">
    #activity-index {
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
            box-sizing: border-box;

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
                        font-size: 18px;
                        color: #4C4C4C;
                    }
                }
            }
            .activity-list {
                flex: 1;
                height: 100%;
                overflow: auto;
                padding-bottom: 88px;
                .activity-item {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: flex-start;
                    justify-content: space-between;
                    padding: 12px;
                    background: #ffffff;

                    .item-left {
                        /*width: 35%;*/
                        min-width: 110px;
                        max-width: 130px;
                        padding-right: 12px;
                        overflow: hidden;
                        box-sizing: content-box;

                        img {
                            display: block;
                            width: 100%;
                        }
                    }
                    .item-right {
                        flex: 1;
                        overflow: hidden;
                        line-height: 17px;

                        .activity-name {
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            font-size: 15px;
                            height: 35px;
                        }
                        .activity-time {
                            font-size: 12px;
                            color: #666;
                        }
                        .activity-type {
                            color: #666666;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            .activity-address {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                flex: 1;
                            }
                            .activity-status {
                                padding: 2px 5px;
                                border-radius: 3px;
                                border: 1px solid #666666;

                                &.apply {
                                    color: #6bbc0f;
                                    border-color: #6bbc0f;
                                }
                            }
                        }
                    }
                }
            }
            .noList {
                text-align: center;
                padding: 10px 0;
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
