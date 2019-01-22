<template>
    <div id="question-index">
        <!--<Header title="天善智能" :wechat=true>-->
        <!--<div slot="right" class="right-item">-->
        <!--<i class="search iconfont icon-sousuo-"></i>-->
        <!--</div>-->
        <!--</Header>-->
        <div class="contents">
            <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" :flex=false @on-change="change">
                <div :slot="'slot-item-' + index " class="question-list" v-for="(item, index) in list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[index].hasMore" :refresh="refresh" ref="pulldown">
                        <div v-if="list[tabIndex].noList" class="noList">
                            暂无数据
                        </div>
                        <div class="mx-1px-bottom question-item" v-for="question in dataList[tabIndex]" @click="jump(question.question_id)">
                            <div class="item-left" v-if="question.best_answer == 0" :class="question.answer_count ? 'answer' : ''">
                                <div>{{question.answer_count}}</div>
                                <div>回答</div>
                            </div>
                            <div class="item-left solve" v-if="question.best_answer != 0">
                                <div>{{question.answer_count}}</div>
                                <div>解决</div>
                            </div>
                            <div class="item-right">
                                <div class="item-info">
                                    <div class="info-top">
                                        <div class="info-img">
                                            <div class="avatar" v-if="question.user.avatar_file">
                                                <img :src="question.user.avatar_file" alt="">
                                            </div>
                                            <div class="avatar" v-else>
                                                <img src="../../static/img/avatar.png" alt="">
                                            </div>
                                            <div class="text">&nbsp; {{question.user.user_name}}</div>
                                        </div>
                                        <div class="info-time">
                                            <div class="text">发表了问题 &nbsp;</div>
                                            <div class="text">&bull;</div>
                                            <div class="text">&nbsp;{{question.friendly_date}}</div>
                                        </div>
                                    </div>
                                    <div class="info-bottom">
                                        <div class="tag" v-for="tag in question.topics">{{tag.topic_title}}</div>
                                    </div>
                                </div>
                                <div class="item-content" v-html="question.question_content">

                                </div>
                            </div>
                        </div>
                    </LoadMore>
                </div>
            </Slide-bar>

            <div class="search" @click="search">
                <i class="iconfont icon-sousuo"></i>
            </div>
        </div>
        <!--<tab :items="items" :index="0">-->

        <!--</tab>-->
        <div class="tabbar-box">
            <div class="tabbar tab-title" :class="showSubSet ? 'cur' : ''">
                <div class="tabbar-item active" @click="go(1)">
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
                    <i class="iconfont icon-huodong"></i>
                    <div>活动</div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
	import {mapActions} from 'vuex';
	export default {
		name: 'question-index',
		data() {
			return {
				list: [],
				dataList: {},
				tabIndex: 0,
				tabName: 'newest',
				height: '100%',
                showSubSet: false
			}
		},
		created() {
			this.$Indicator.blade();

			EventBus.$on('questionList', this.questionData);
			EventBus.$on('questionHeader', this.questionHeader);
			this.$store.dispatch('queryQuestionHeader');
			this.$on('done', this.done);
		},
		beforeDestroy() {
			EventBus.$off('questionList');
			EventBus.$off('questionHeader');
//			this.$Indicator.remove();
		},
//	    computed: {
//            ...mapActions({
//            	aa: queryQuestionHeader
//            })
//        },
		methods: {
			jump(id) {
				this.$router.push({name: 'question-detail', params: {id}})
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
			done() {
				this.$nextTick(() => {
					this.$refs.pulldown[this.tabIndex].onLoadOff();
				})
			},
//            加载更多
			loadMore() {
				const page = this.list[this.tabIndex].page + 1;
				var data = {
					page: page,
					name: this.tabName
				}
				this.$store.dispatch('queryQuestionList', data);
			},
//            刷新数据
			refresh() {
				var data = {
					page: 1,
					name: this.tabName
				}
				this.$store.dispatch('queryQuestionList', data);
			},
//            问答内容赋值
			questionData(res) {
				var list,
					page = res.meta.pagination,
					current_page = page.current_page,
					total_pages = page.total_pages;
				if (current_page == 1) {
					list = res.data;
				} else {
					list = this.dataList[this.tabIndex].concat(res.data);
				}
				this.$set(this.dataList, this.tabIndex, list);  // Vue 不能检测到对象属性的添加或删除  https://vuefe.cn/v2/guide/reactivity.html#变化检测问题
				this.list[this.tabIndex].init = true;
				this.list[this.tabIndex].page = current_page;
				this.list[this.tabIndex].hasMore = current_page < total_pages;
				this.list[this.tabIndex].noList = !!!this.dataList[this.tabIndex].length;
				this.$emit('done');
			},
//            问答头部数据赋值
			questionHeader(res) {
				res.data.forEach(i => {
					i.name = i.value;
					i.init = false;
					i.page = 1;
					i.hasMore = true,
						i.noList = false
				})
				;
				this.list = res.data;
				var id = this.$route.params.id;
				this.tabIndex = id;
				this.tabName = this.list[this.tabIndex].key;
				this.list[id].init = true;

				this.refresh();

//				const key = this.list[id].key;
//				var data = {
//					page: 1,
//					name: key
//				}
//				this.$store.dispatch('queryQuestionList', data);

			},
//	        改变tabIndex
			change(i) {
				this.tabName = this.list[i].key;
				this.tabIndex = i;
				var data = {
					page: 1,
					name: this.tabName,
				};
				this.$router.replace({name: 'question', params: {id: this.tabIndex}});
				if (!this.list[i].init) {
					this.$Indicator.blade();
					this.$store.dispatch('queryQuestionList', data);
				}
//				this.list[i].init = true
			}
		}
	}
</script>

<style rel="stylesheet/less" lang="less">
    #question-index {

        .cls-1 {
            font-size: 18px;
            font-family: MicrosoftYaHei, Microsoft YaHei;
        }
        .cls-1, .cls-4 {
            fill: #4d4d4d;
        }
        .cls-2 {
            fill: #e6e6e6;
        }
        .cls-3 {
            fill: #f2f2f2;
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

        .contents {
            height: 100%;
            /*overflow: auto;*/
            box-sizing: border-box;

            .vlc-slideBar {
                border: none;
                height: 100%;
                position: relative;
                .vlc-slideBar-header {
                    border-bottom: 1px solid #dddddd;

                    .vlc-slideBar-wrapper {
                        box-sizing: content-box;
                        padding-right: 37px;
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
            }
            .noList {
                text-align: center;
                padding: 10px 0;
            }
            .question-list {
                flex: 1;
                height: 100%;
                /*overflow: auto;*/
                padding-bottom: 98px;

                /*.no-data{*/
                /*height: 40px;*/
                /*line-height: 40px;*/

                /*}*/
                .question-item {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: flex-start;
                    justify-content: center;
                    padding: 12px;
                    background: #ffffff;

                    .item-left {
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        display: flex;
                        flex-direction: column;
                        font-size: 14px;
                        color: #fff;
                        line-height: 20px;
                        text-align: center;
                        background: #ad3a37;

                        &.answer {
                            background: #75845c;
                        }
                        &.solve {
                            background: #38b836;
                        }
                    }
                    .item-right {
                        flex: 1;
                        padding-left: 12px;

                        .item-info {
                            font-size: 13px;
                            color: #666666;
                            line-height: 16px;

                            .info-top {
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                align-items: center;
                                justify-content: space-between;

                                .info-img {
                                    display: flex;
                                    align-items: center;
                                }
                                .info-time {
                                    display: flex;
                                    align-items: center;
                                }
                            }
                            .info-bottom {
                                .tag {
                                    display: inline-block;
                                    margin: 5px 5px 0 0;
                                    color: #101010;
                                    padding: 2px 3px;
                                    background: #e4e4e4;
                                }
                            }
                            /*> * {*/
                            /*margin: 0 0 3px 3px;*/
                            /*}*/

                            .avatar {
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                border-radius: 100%;
                                text-align: center;
                                overflow: hidden;

                                img {
                                    width: 100%;
                                    height: auto;
                                }
                            }
                            .text {
                                height: 18px;
                                line-height: 18px;
                            }
                        }
                        .item-content {
                            padding-top: 5px;
                            font-size: 14px;
                            color: #101010;
                            word-break: break-all;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                        }
                    }
                }
            }
            .search {
                position: absolute;
                top: 0;
                width: 44px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                right: 0;
                background: #FFFFFF;

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
