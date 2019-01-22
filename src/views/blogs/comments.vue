<template>
    <div id="blogs-comments">
        <Header title="评论" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="no-comments" v-if="!dataList.length">
                暂无评论
            </div>
            <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list.hasMore" :refresh="refresh"  ref="pulldown">
                <div class="comments-item mx-1px-bottom" :class="'item_' + item.id" v-for="item in dataList" v-if="dataList.length">
                    <div class="img-box" v-if="item.user.avatar_file">
                        <img :src="item.user.avatar_file" alt="">
                    </div>
                    <div class="img-box" v-else>
                        <img src="../../static/img/avatar.png" alt="">
                    </div>
                    <div class="comments-info">
                        <div class="user-info">
                            <span class="name">{{item.user.user_name}}</span>
                            <span>{{item.add_time}}</span>
                        </div>
                        <div class="comments-text">
                            {{item.message}}
                        </div>
                    </div>
                </div>
            </LoadMore>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { setPageTitle } from '../../utils/util';
    export default {
    	name: 'blogs-comments',
    	data() {
    		return {
    			dataList: [],
    			list: {
    				init: false,
                    page: 1,
                    hasMore: true
                },
			    height: '100%',
                id: this.$route.query.id
            }
        },
    	created() {
    		var data = {
    			id: this.$route.params.id,
                page: 1
            }
    		this.$store.dispatch('queryCommentList',data);
    		EventBus.$on('commentList', this.commentList);

        },
	    beforeDestroy() {
    		EventBus.$off('commentList');
        },
        methods: {
//	        加载更多
	        loadMore() {
	        	const page = this.list.page + 1;
	        	var data = {
	        		page: page,
                    id: this.$route.params.id
                }
		        this.$store.dispatch('queryCommentList',data);
	        },
//            刷新数据
	        refresh() {
	        	var data = {
	        		page: 1,
			        id: this.$route.params.id
                }
		        this.$store.dispatch('queryCommentList',data);
            },
	        commentList(res) {
                var list,
                    page = res.meta.pagination,
			        current_page = page.current_page,
			        total_pages =page.total_pages;
	        	if (current_page == 1) {
	        		list = res.data;
                } else {
	        		list = this.dataList.concat(res.data);
                }
                this.dataList = list;

//	        	定位到第一条
		        /*if (!this.list.init && this.id) {
			        this.dataList.forEach(item => {
				        if (item.id == this.id) {
                            this.$nextTick(() =>{
                                this.$el.querySelector('.item_' + this.id).scrollIntoView(true);
                            })
                        }
                    })
		        }*/

	        	this.list.init = true;
	        	this.list.page = current_page;
	        	this.list.hasMore = current_page < total_pages;
	        	this.$refs.pulldown.onLoadOff();

            }

        }
    }

</script>

<style rel="stylesheet/less" lang="less">
    #blogs-comments{
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
            .no-comments{
                text-align: center;
                margin-top: 10px;
            }
            .comments-item{
                padding: 12px;
                display: flex;
                align-items: flex-start;
                background: #ffffff;
                .img-box{
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    overflow: hidden;

                    img{
                        width: 100%;
                        height: auto;
                    }
                }
                .comments-info{
                    flex: 1;
                    margin-left: 15px;
                    font-size: 14px;
                    color: #5f646e;

                    .user-info{
                        font-size: 12px;

                        .name{
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
</style>
