<template>
    <div id="user-ask">
        <Header title="提问">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <LoadMore :height='height' :load-more="loadMore" :has-more="list.hasMore" :refresh="refresh" ref="pulldown">
                <div class="ask-item mx-1px-bottom" v-for="item in ask" @click="jump(item.question_id)">
                    <div class="ask-top">
                        <div class="ask-name">
                            {{item.question_content}}
                        </div>
                        <div class="ask-num">
                            {{item.answer_count}}
                        </div>
                    </div>
                    <div class="ask-bottom">
                        <div class="tag-box">
                        <span class="tag-item" v-for="tag in item.topics">
                            {{tag.topic_title}}
                        </span>
                        </div>
                        <div class="time">
                            {{item.friendly_date}}
                        </div>
                    </div>
                </div>
            </LoadMore>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    	name: 'user-ask',
        data() {
    		return {
    			ask: [],
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
//		    var data = {
//		    	page: 1,
//                id: this.id
//            }
//		    this.$store.dispatch('queryUserAsk', data);
		    EventBus.$on('ask', this.askData);
	    },
	    beforeDestroy() {
    		EventBus.$off('ask');
        },
        methods: {
	        jump(id) {
		        this.$router.push({name: 'question-detail', params: {id: id}});
	        },
//    		加载更多
            loadMore() {
	            const page = this.list.page + 1;
	            var data = {
		            page: page,
		            id: this.id
	            };
	            this.$store.dispatch('queryUserAsk', data);
            },
//            刷新数据
	        refresh() {
		        var data = {
			        page: 1,
			        id: this.id
		        };
		        this.$store.dispatch('queryUserAsk', data);
            },
//            数据赋值
    		askData(res) {
			    var list,
				    page = res.meta.pagination,
				    current_page = page.current_page,
				    total_pages = page.total_pages;
			    if (current_page == 1) {
				    list = res.data;
			    } else {
				    list = this.ask.concat(res.data);
			    }
			    this.ask = list;
			    this.list.init = true;
			    this.list.page = current_page;
			    this.list.hasMore = current_page < total_pages;
			    this.$nextTick(() => {
				    this.$refs.pulldown.onLoadOff();
                })
            }
        }
    }

</script>

<style rel="stylesheet/less" lang="less">
    #user-ask {
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

            .ask-item{
                padding: 12px;
                background: #ffffff;

                .ask-top{
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
                        min-width: 25px;
                        text-align: center;
                    }
                }
                .ask-bottom{
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #727272;
                    margin-top: 5px;
                    .tag-box {
                        flex: 1;

                        .tag-item{
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
