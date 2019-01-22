<template>
    <div id="news-detail">
        <Header title="资讯详情">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="info-top">
                <div class="title">
                    {{detail.data.title}}
                </div>
                <div class="info-tag">
                    <!--<div class="tag-box">-->
                        <!--<span class="tag-item" v-for="tag in detail.data.tags">-->
                            <!--{{tag.name}}-->
                        <!--</span>-->
                    <!--</div>-->
                    {{detail.data.created_at}}
                    <div class="time">

                    </div>
                </div>
                <img :src="detail.data.cover_photo" alt="">
            </div>
            <div class="info-middle" v-html="detail.data.body">

            </div>
            <div class="info-bottom">
                <div class="like">
                    <span>你可能感兴趣的文章</span>
                </div>
                <div class="like-item mx-1px-bottom" v-for="like in detail.meta.likes" @click="jump('news-detail',like.id)">
                    <div class="item-left">
                        <img :src="like.cover_photo" alt="">
                    </div>
                    <div class="item-right clearfix">
                        <div class="title">
                            {{like.title}}
                        </div>
                        <!--<span class="tag-box">-->
                            <!--<span class="tag-item" v-for="tag in like.tags">-->
                                <!--{{tag.name}}-->
                            <!--</span>-->
                        <!--</span>-->
                        <div class="time">
                            {{like.created_at}}
                        </div>
                        <!--<div class="item-meta">-->
                            <!--<div class="tag-box">-->
                                <!--<span class="tag-item" v-for="tag in like.tags">-->
                                    <!--{{tag.name}}-->
                                <!--</span>-->
                            <!--</div>-->
                            <!--<div class="time">-->
                                <!--{{like.created_at}}-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'news-detail',
		data() {
			return {
				detail: {
					data: {},
					meta: {}
				}
			}
		},
		methods: {
			jump(name, id) {
				this.$router.push({name: name, params: {id: id}})
			},
			newDetail(res) {
				this.detail = res;
			}
		},
		watch: {
			'$route.params.id': function (id) {
//				window.location.reload();
				this.$store.dispatch('queryNewsDetail', id);
				EventBus.$on('newDetail', this.newDetail);
			}
		},
		created() {
			var id = this.$route.params.id;
			this.$store.dispatch('queryNewsDetail', id);
			EventBus.$on('newDetail', this.newDetail)
		},
		beforeDestroy() {
			EventBus.$off('newDetail');
        }
	}
</script>

<style rel="stylesheet/less" lang="less">
    #news-detail {
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
            .info-top {
                padding: 0 12px;
                margin-top: 12px;
                .title {
                    color: #101010;
                    line-height: 25px;
                    text-align: left;
                    font-size: 18px;
                }
                .info-tag {

                    color: #999;
                    font-size: 14px;
                    text-align: right;
                    /*display: flex;*/
                    /*align-items: baseline;*/
                    /*justify-content: space-between;*/
                    /*margin-top: 10px;*/
                    .tag-box {
                        flex: 1;
                        .tag-item {
                            display: inline-block;
                            color: #bbb;
                            padding: 2px 5px;
                            font-size: 12px;
                            border: 1px solid #efefef;
                            border-radius: 1px;
                            margin-right: 5px;

                            &:last-child {
                                margin-right: 0;
                            }
                        }
                    }
                    .time {
                        color: #999;
                        font-size: 14px;
                    }
                }
                img {
                    margin: 10px 0;
                }
            }
            .info-middle {
                padding: 0 12px;
                font-size: 14px;
                color: #333333;
            }
            .info-bottom {
                padding: 0 12px;
                margin-bottom: 12px;
                .like {
                    text-align: center;
                    color: #3285ff;
                    font-size: 16px;
                    margin: 25px 0;

                    span {
                        background: url(https://m.hellobi.com/assets/m.news/line.jpg) no-repeat center;
                        width: 100%;
                        display: block;
                    }
                }
                .like-item {
                    display: flex;
                    padding: 10px 0;
                    .item-left {
                        min-width: 110px;
                        max-width: 130px;
                        padding-right: 12px;
                        overflow: hidden;
                        box-sizing: content-box;

                        img {
                            display: block;
                        }
                    }
                    .item-right {
                        flex: 1;

                        .title {
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            color: #333333;
                            font-size: 16px;
                            line-height: 18px;
                            height: 36px;
                            margin-bottom: 15px;
                        }
                        .tag-box {
                            font-size: 14px;
                            color: #999;
                            .tag-item {
                                display: inline-block;
                                color: #bbb;
                                padding: 2px 5px;
                                font-size: 12px;
                                border: 1px solid #efefef;
                                border-radius: 1px;
                                margin-right: 5px;

                                &:last-child {
                                    margin-right: 0;
                                }
                            }
                        }
                        .time{
                            margin-top: 4px;
                            font-size: 14px;
                            color: #999;
                            float: right;
                        }
                        /*.item-meta {*/
                            /*display: flex;*/
                            /*align-items: baseline;*/
                            /*justify-content: space-between;*/

                            /*.tag-box {*/
                                /*flex: 1;*/

                                /*.tag-item {*/
                                    /*display: inline-block;*/
                                    /*color: #bbb;*/
                                    /*padding: 2px 5px;*/
                                    /*font-size: 12px;*/
                                    /*border: 1px solid #efefef;*/
                                    /*border-radius: 1px;*/
                                    /*margin-right: 5px;*/
                                /*}*/
                            /*}*/
                            /*.time {*/
                                /*color: #999;*/
                                /*font-size: 14px;*/
                            /*}*/
                        /*}*/
                    }

                }
            }
        }
    }
</style>
