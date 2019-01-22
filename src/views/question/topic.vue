<template>
    <div id="question-topic">
        <Header title="话题">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contens">
            <div class="topic-top">
                <div class="title">
                    {{topic.topic_title}}
                </div>
                <div class="info">
                    {{topic.topic_description}}
                </div>
                <div class="attention-box">
                    <div class="attention" @click="focus">
                        <span v-if="topic.isFocus">已</span>关注
                    </div>
                    <div class="num">
                        共有{{topic.focus_count}}人关注
                    </div>
                </div>
            </div>
            <div class="topic-bottom">
                <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" @on-change="change">
                    <div slot="slot-item-0" class="topic-list issue-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[0].hasMore" :refresh="refresh" ref="pulldown_0">
                            <div v-if="list[0].noList" class="noList">
                                暂无数据
                            </div>
                            <div class="issue-item mx-1px-bottom" v-for="item in dataList[0]" @click="jump('question-detail',item.question_id)">
                                <div class="issue-item-top">
                                    <div class="info">
                                        {{item.question_content}}
                                    </div>
                                    <div class="num">
                                        {{item.answer_count}}
                                    </div>
                                </div>
                                <div class="issue-item-bottom">
                                    {{item.friendly_date}}
                                </div>
                            </div>
                        </LoadMore>
                    </div>
                    <div slot="slot-item-1" class="topic-list article-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[1].hasMore" :refresh="refresh" ref="pulldown_1">
                            <div v-if="list[1].noList" class="noList">
                                暂无数据
                            </div>
                            <div class="article-item mx-1px-bottom" v-for="item in dataList[1]" @click="jump('blogs-detail', item.id)">
                                <div class="article-top">
                                    <div class="user-info">
                                        <div class="img-box" v-if="item.user.avatar_file">
                                            <img :src="item.user.avatar_file" alt="">
                                        </div>
                                        <div class="img-box" v-if="!item.user.avatar_file">
                                            <img src="../../static/img/avatar.png" alt="">
                                        </div>
                                        <div>
                                            {{item.user.user_name}}
                                        </div>
                                    </div>
                                    <div class="article-name">
                                        {{item.title}}
                                    </div>
                                    <div class="article-text">
                                        {{item.message}}
                                    </div>
                                </div>
                                <div class="article-bottom">
                                    {{item.friendly_date}}
                                </div>
                            </div>
                        </LoadMore>
                    </div>
                </Slide-bar>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	import {Cache, cache_keys} from '../../utils/util';

	export default{
		name: 'question-topic',
		data() {
			return {
				tabIndex: 0,
                topicNmae: '',
				list: [
					{
						name: '问题(0)',
						init: false,
						page: 1,
						hasMore: true,
						noList: false
					},
					{
						name: '文章(0)',
						init: false,
						page: 1,
						hasMore: true,
						noList: false
					}
				],
				dataList: {
					0: [],
					1: []
				},
				height: '100%',
                id: '',
				totalList: {
					0: 0,
					1: 0,
				}
			}
		},
		beforeDestroy(){
            EventBus.$off('topicData');
			EventBus.$off('questionList');
			EventBus.$off('blogsList');
		},
		created() {
			this.tabIndex = Number(this.$route.query.status) || 0;
			this.$Indicator.blade();
			this.id = this.$route.params.id;
			this.$store.dispatch('queryTopic', this.id);
			EventBus.$on('topicData', this.dataDetail);
			EventBus.$on('questionList',this.topicQueData);
			EventBus.$on('blogsList', this.topicBlogsData);
		},
        computed: {
			topic() {
				return this.$store.getters.getTopicData;
            }
        },
		methods: {
			jump(name, id) {
				this.$router.push({name: name, params: {id: id}});
            },
			goLogin() {
				var source = this.$route.path;
				this.$router.push({name: 'user-login', query: {source}});
			},
			dataDetail(res) {
//				this.topic = res.data;
				this.topicNmae = res.data.topic_title;
				this.reset();
			},
//            第一次加载数据
			reset() {
				var data = {
					page: 1,
					name: this.topicNmae
				};
				this.$store.dispatch('queryQuestionList', data);
				this.$store.dispatch('queryBlogsList', data);
            },
//            加载更多
			loadMore() {
				const page = this.list[this.tabIndex].page + 1;
				const data = {
					page: page,
					name: this.topicNmae
                };
				if (this.tabIndex === 0) {
					this.$store.dispatch('queryQuestionList', data);
				} else {
					this.$store.dispatch('queryBlogsList', data);
				}
            },
//            刷新数据
			refresh() {
				var data = {
					page: 1,
					name: this.topicNmae
                };
				if (this.tabIndex === 0) {
					this.$store.dispatch('queryQuestionList', data);
                } else {
					this.$store.dispatch('queryBlogsList', data);
                }
            },
////            改变tabIndex值
            change(i) {
				this.tabIndex = i;
				var data = {
					page: 1,
					name: this.topicNmae
                };
	            this.$router.replace({name: 'question-topic', params: {id: this.id}, query: {status: i}});
	            if (!this.list[i].init) {
	            	if (i === 0) {
			            this.$store.dispatch('queryQuestionList', data);
                    } else {
			            this.$store.dispatch('queryBlogsList', data);
                    }
                }
            },
//            问题数据赋值
            topicQueData(res) {
				var list,
                    page = res.meta.pagination,
					current_page = page.current_page,
					total_pages =page.total_pages,
					total = res.meta.pagination.total;
				this.totalList[0] = total;
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
	            this.list[0].name = '问题(' + this.totalList[0] + ')';
	            this.$refs['pulldown_' + this.tabIndex].onLoadOff();
            },
//            博客数据赋值
			topicBlogsData(res) {
				var list,
					page = res.meta.pagination,
					current_page = page.current_page,
					total_pages =page.total_pages,
					total = res.meta.pagination.total;
				this.totalList[1] = total;
				if (current_page == 1) {
					list = res.data;
				} else {
					list = this.dataList[this.tabIndex].concat(res.data);
				}
				this.dataList[1] = list;
				this.list[this.tabIndex].init = true;
				this.list[this.tabIndex].page = current_page;
				this.list[this.tabIndex].hasMore = current_page < total_pages;
				this.list[this.tabIndex].noList = !!!this.dataList[this.tabIndex].length;
				this.list[1].name = '文章(' + this.totalList[1] + ')';
				this.$refs['pulldown_' + this.tabIndex].onLoadOff();
			},
//            关注||取消关注问题
			focus() {
				var is_login = !!Cache.get(cache_keys.token);
				if (is_login) {
					if (this.topic.isFocus) {
						this.$store.dispatch('UnFocusTopic', this.id);
                    } else {
						this.$store.dispatch('focusTopic', this.id);
                    }
                } else {
					this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                }
            }
		},

	}
</script>


<style rel="stylesheet/less" lang="less">
    #question-topic {
        .clearfix:after {
            content: " ";
            display: block;
            clear: both;
            height: 0;
        }
        .clearfix {
            zoom: 1;
        }

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

        .contens {
            height: 100%;
            overflow: auto;
            .topic-top {
                color: #fff;
                background-color: #008cee;
                padding: 12px;

                .title {
                    font-size: 24px;
                }
                .info {
                    margin: 10px 0;
                    font-size: 12px;
                    word-break: break-all;
                }
                .attention-box {
                    display: flex;
                    align-items: center;
                    font-size: 12px;

                    .attention {
                        padding: 3px 5px;
                        background: #ffffff;
                        color: #33acfe;
                        margin-right: 5px;
                    }
                }
            }
            .topic-bottom {
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
                    .topic-list {
                        flex: 1;
                        height: 100%;
                        overflow: auto;
                        padding-bottom: 50px;
                    }
                    .issue-list {
                        .issue-item {
                            padding: 12px;
                            background: #ffffff;

                            .issue-item-top {
                                display: flex;
                                align-items: flex-start;

                                .info {
                                    flex: 1;
                                    margin-right: 10px;
                                }
                                .num {
                                    font-size: 12px;
                                    color: #ffffff;
                                    background: #008cee;
                                    padding: 3px 7px;
                                }
                            }
                            .issue-item-bottom {
                                font-size: 12px;
                                text-align: right;
                                margin-top: 5px;
                            }
                        }
                    }
                    .article-list {
                        .article-item {
                            padding: 12px;
                            background: #ffffff;
                            .article-top {

                                .user-info {
                                    display: flex;
                                    align-items: center;
                                    font-size: 12px;
                                    .img-box {
                                        width: 20px;
                                        height: 20px;
                                        border-radius: 100%;
                                        overflow: hidden;
                                        margin-right: 5px;
                                    }
                                }
                                .article-name {
                                    margin: 10px 0;
                                }
                                .article-text {
                                    font-size: 12px;
                                    color: #727272;
                                    word-break: break-all;
                                }
                            }
                            .article-bottom {
                                text-align: right;
                                font-size: 12px;
                                color: #b2b2b2;
                            }
                        }
                    }
                }
            }
            .noList{
                text-align: center;
                padding: 10px 0;
            }
        }
    }
</style>
