<template>
    <div id="user-attention">
        <Header title="关注">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false>
                <div slot="slot-item-0" class="ask-list list">
                    <div class="ask-item mx-1px-bottom" v-for="i in 10">
                        <div class="ask-top">
                            <div class="ask-name">
                                kettle链接sqlserver资源库时报错，创建资源库时测试链接已成功链接
                            </div>
                            <div class="ask-num">
                                10
                            </div>
                        </div>
                        <div class="ask-bottom">
                            <div class="tag-box">
                        <span class="tag-item" v-for="i in 3">
                            标签
                        </span>
                            </div>
                            <div class="time">
                                1 小时前
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="slot-item-1" class="topic-list list">
                    <div class="topic-item mx-1px-bottom" v-for="i in 10">
                        商业智能
                    </div>
                </div>
            </Slide-bar>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				tabIndex: 0,
				id: '',
				list: [
					{
						name: '问题',
						init: false,
						page: 1,
						hasMore: true,
					},
					{
						name: '话题',
						init: false,
						page: 1,
						hasMore: true,
					}
				],
				dataList: {
					0: [],
					1: []
				},
				height: '100%',
			}
		},
		created() {
			this.tabIndex = Number(this.$route.query.status) || 0;
			this.id = this.$route.params.id;
			const data = {
				page: 1,
				id: this.id
			}

			if (this.tabIndex === 0) {
				this.$store.dispatch('queryUserFocusQuestions', data);
			} else {
				this.$store.dispatch('queryUserFocusTopics', data);
			}

			EventBus.$on('focusQuestions', this.attentionData);
			EventBus.$on('focusTopics', this.attentionData)
		},
		methods: {
//        	加载更多
			loadMore() {
				const page = this.list[this.tabIndex].page + 1;
				const data = {
					page: page,
					id: this.id
				};
				if (this.tabIndex === 0) {
					this.$store.dispatch('queryUserFocusQuestions', data);
				} else {
					this.$store.dispatch('queryUserFocusTopics', data);
				}
			},
//            刷新数据
			refresh() {
				const data = {
					page: 1,
					id: this.id
				};
				if (this.tabIndex === 0) {
					this.$store.dispatch('queryUserFocusQuestions', data);
				} else {
					this.$store.dispatch('queryUserFocusTopics', data);
				}
			},
//            改变tanIndex值
            change(i) {
	            this.tabIndex = i;
	            const data = {
	            	page: 1,
                    id: this.id
                };
	            this.$router.replace({name: 'user-attention', params: {id: this.id}, query: {status: i}});
	            if (!this.list[i].init) {
	            	if (i === 0) {
			            this.$store.dispatch('queryUserFocusQuestions', data);
                    } else {
			            this.$store.dispatch('queryUserFocusTopics', data);
                    }
                }
            },
			attentionData(res, status) {
				if (status) {
					var list,
						page = res.meta.pagination,
						current_page = page.current_page,
						total_pages =page.total_pages;
					if (current_page == 1) {
						list = res.data;
					} else {
						list = this.dataList[this.tabIndex].concat(res.data);
					}
					this.dataList[this.tabIndex] = list;
					this.list[this.tabIndex].init = true;
					this.list[this.tabIndex].page = current_page;
					this.list[this.tabIndex].hasMore = current_page < total_pages;
                }
				this.$refs['pulldown_' + this.tabIndex].onLoadOff();
			}
		}
	}

</script>
<style rel="stylesheet/less" lang="less">
    #user-attention {
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                }
            }
            .title {
                text-align: center;
            }
            .right {
                font-size: 0;
            }
        }
        .contents {
            height: 100%;
            overflow: auto;

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
            .vlc-slideBar-container {
                .list {
                    flex: 1;
                    height: 100%;
                    overflow: auto;
                    padding-bottom: 50px;
                    &.ask-list {
                        .ask-item {
                            padding: 12px;
                            background: #ffffff;
                            .ask-top {
                                display: flex;
                                align-items: baseline;
                                justify-content: space-between;

                                .ask-name {
                                    flex: 1;
                                }
                                .ask-num {
                                    padding: 2px 5px;
                                    font-size: 12px;
                                    background: #008cee;
                                    color: #ffffff;
                                }
                            }
                            .ask-bottom {
                                display: flex;
                                align-items: baseline;
                                justify-content: space-between;
                                font-size: 12px;
                                color: #727272;
                                margin-top: 5px;
                                .tag-box {
                                    flex: 1;

                                    .tag-item {
                                        display: inline-block;
                                        color: #bbb;
                                        padding: 2px 5px;
                                        font-size: 12px;
                                        border: 1px solid #efefef;
                                        border-radius: 1px;
                                        margin: 0 5px 5px 0;

                                        &:last-child {
                                            margin-right: 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &.topic-list {

                        .topic-item {
                            padding: 12px;
                            color: #3d4145;
                            background: #ffffff;
                        }
                    }
                }
            }
        }
    }
</style>
