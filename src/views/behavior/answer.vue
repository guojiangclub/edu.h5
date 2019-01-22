<template>
    <div id="user-answer">
        <Header title="回答">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <LoadMore :height='height' :load-more="loadMore" :has-more="list.hasMore" :refresh="refresh" ref="pulldown">
                <div class="answer-item mx-1px-bottom" v-for="item in answer" @click="jump(item.question.question_id)">
                    <div class="answer-name">
                        {{item.question.question_content}}
                    </div>
                    <div class="answer-text">
                        {{item.answer_content}}
                    </div>
                    <div class="answer-info">
                        <div class="tag-box">
                            <!--<span class="tag-item" v-for="i in 3">-->
                            <!--标签-->
                            <!--</span>-->
                        </div>
                        <div class="time">
                            回答于 {{item.friendly_date}}
                        </div>
                    </div>
                </div>
            </LoadMore>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'user-answer',
		data() {
			return {
				answer: [],
				list: {
					init: false,
					page: 1,
					hasMore: true
				},
				height: '100%',
				id: ''
			}
		},
		created() {
			this.id = this.$route.params.id;
//			var data = {
//				page: 1,
//				id: this.id
//			}
//			this.$store.dispatch('queryUserAnswer', data);
			EventBus.$on('answer', this.answerData);
			this.$on('done', this.done);
		},
		beforeDestroy() {
			EventBus.$off('answer')
        },
		methods: {
			jump(id) {
				this.$router.push({name: 'question-detail', params: {id: id}});
			},
            done() {
				this.$nextTick(() => {
					this.$refs.pulldown.onLoadOff();
                })
            },
//    		加载更多
			loadMore() {
				const page = this.list.page + 1;
				var data = {
					page: page,
					id: this.id
				};
				this.$store.dispatch('queryUserAnswer', data);
			},
//            刷新数据
			refresh() {
				var data = {
					page: 1,
					id: this.id
				};
				this.$store.dispatch('queryUserAnswer', data);
			},
//            数据赋值
			answerData(res) {
				var list,
					page = res.meta.pagination,
					current_page = page.current_page,
					total_pages = page.total_pages;
				if (current_page == 1) {
					list = res.data;
				} else {
					list = this.answer.concat(res.data);
				}
				this.answer = list;
				this.list.init = true;
				this.list.page = current_page;
				this.list.hasMore = current_page < total_pages;
				this.$emit('done');
			}
		},
	}
</script>

<style rel="stylesheet/less" lang="less">
    #user-answer {
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
        .contents {
            height: 100%;
            overflow: auto;

            .answer-item {
                padding: 12px;
                background: #ffffff;
                .answer-name {

                }
                .answer-text {
                    font-size: 12px;
                    color: #727272;
                    margin: 5px 0;
                }
                .answer-info {
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #727272;
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
    }
</style>
