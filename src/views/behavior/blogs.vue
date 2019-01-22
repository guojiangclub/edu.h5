<template>
    <div id="user-blogs">
        <Header title="文章">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <LoadMore :height='height' :load-more="loadMore" :has-more="list.hasMore" :refresh="refresh" ref="pulldown">
                <div class="blogs-item mx-1px-bottom" v-for="item in blogs" @click="jump(item.id)">
                    <div class="blogs-name">
                        {{item.title}}
                    </div>
                    <div class="blogs-text" v-html="item.message">

                    </div>
                    <div class="blogs-info">
                        <div class="tag-box">
                                 <span class="tag-item" v-for="tag in item.topics">
                                     {{tag.topic_title}}
                                 </span>
                        </div>
                        <div class="time">
                            {{item.created_at}}
                        </div>
                    </div>
                </div>
            </LoadMore>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'user-blogs',
		data() {
			return {
				blogs: [],
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
//			this.$store.dispatch('queryUserBlog', data);
			EventBus.$on('blog', this.blogsData);
		},
		beforeDestroy() {
			EventBus.$off('blog');
        },
		methods: {
			jump(id) {
				this.$router.push({name: 'blogs-detail', params: {id: id}});
			},
//            加载更多
			loadMore() {
				const page = this.list.page + 1;
				var data = {
					page: page,
					id: this.id
				};
				this.$store.dispatch('queryUserBlog', data);
			},
//            刷新数据
			refresh() {
				var data = {
					page: 1,
					id: this.id
				};
				this.$store.dispatch('queryUserBlog', data);
			},
//            数据赋值
			blogsData(res) {
				var list,
					page = res.meta.pagination,
					current_page = page.current_page,
					total_pages = page.total_pages;
				if (current_page == 1) {
					list = res.data;
				} else {
					list = this.blogs.concat(res.data);
				}
				this.blogs = list;
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
    #user-blogs {
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

            .blogs-item {
                padding: 12px;
                background: #ffffff;
                .blogs-name {

                }
                .blogs-text {
                    font-size: 12px;
                    color: #727272;
                    margin: 5px 0;
                }
                .blogs-info {
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