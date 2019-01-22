<template>
    <div id="trends">
        <Header title="动态">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <LoadMore :height='height' :load-more="loadMore" :has-more="list.hasMore" :refresh="refresh" ref="pulldown">
                <div class="dynamic-item" >
                    <div class="all" v-for="item in trend">
                        <div class="head">
                            <img :src="info.meta.user.avatar_file" alt="">
                            <div class="title">{{info.meta.user.user_name}}</div>
                            <div class="type" v-if="item.subject_type == 'iBrand\\Job\\Core\\Models\\ResumeSchool' || item.subject_type == 'iBrand\\Job\\Core\\Models\\ResumeProject' || item.subject_type == 'iBrand\\Job\\Core\\Models\\ResumeWork' || item.subject_type == 'iBrand\\Component\\Identity\\Identity'" >编辑了资料</div>

                            <div class="type" v-else>{{item.description}}</div>

                        </div>
                        <div class="full" v-if="item.subject_type == 'Hellobi\\Models\\UserFollow'">
                            <!--<div class="substance">{{info.meta.user.user_name}}{{item.description}}</div>-->
                            <div class="user-concern" @click="jump('visitor', item.properties.user_id)">
                                <img :src="item.properties.avatar" alt="">
                                <div class="left">
                                    <div class="name">{{item.properties.user_name}}</div>
                                    <span class="article">文章{{item.properties.post_count}}</span>
                                    <span>粉丝{{item.properties.fans_count}}</span>
                                </div>
                            </div>
                        </div>
                        <!--编辑资料-->
                        <div class="full" v-if="item.subject_type == 'iBrand\\Job\\Core\\Models\\ResumeSchool' || item.subject_type ==  'iBrand\\Job\\Core\\Models\\ResumeProject' || item.subject_type ==  'iBrand\\Job\\Core\\Models\\ResumeWork' || item.subject_type == 'iBrand\\Component\\Identity\\Identity'">
                            <div class="type">{{item.description}}</div>

                        </div>
                        <!--加入课程-->
                        <div class="full" v-if="item.subject_type == 'Hellobi\\Models\\Edu\\Course'">
                            <div class="full-content" @click="jump('edu-course', item.properties.id)">
                                <img :src="item.properties.picture" alt="">
                                <div class="con">
                                    <div class="txt">{{item.properties.title}}</div>
                                    <div class="money">￥<span>{{item.properties.price}}</span></div>
                                </div>
                            </div>
                        </div>
                        <!--评论文章-->
                        <div class="full" v-if="item.subject_type == 'Hellobi\\Models\\Blog\\Comment'">
                            <div class="full-content" @click="jump('blogs-detail', item.properties.post_id)">
                                <div class="con">
                                    <div class="txt">{{item.properties.comment_message}}</div>
                                    <div class="post-title">{{item.properties.post_title}}</div>
                                </div>
                            </div>
                        </div>
                        <!--打赏文章-->
                        <div class="full" v-if="item.subject_type == 'Hellobi\\Models\\Blog\\Reward'">
                            <div class="full-content">
                                <div class="con" @click="jump('blogs-detail', item.properties.post_id)">
                                    <div class="balance">
                                        <i class="iconfont icon-yue"></i>
                                        <span>￥ {{item.properties.reward_amount}}</span>
                                    </div>
                                    <div class="post-title">{{item.properties.post_title}}</div>
                                </div>
                            </div>
                        </div>
                        <!--回答问题-->
                        <div class="full" v-if="item.subject_type == 'Hellobi\\Models\\Ask\\Answer'">
                            <div class="full-content"  @click="jump('question-detail', item.properties.question_id, item.properties.answer_id)">
                                <div class="con">
                                    <div class="txt">{{item.properties.answer_content}}</div>
                                    <div class="post-title">{{item.properties.question_title}}</div>
                                </div>
                            </div>
                        </div>
                        <!--赞同文章-->
                        <div class="full" v-if="item.subject_type == 'Hellobi\\Models\\Blog\\Vote'">
                            <div class="full-content"  @click="jump('blogs-detail', item.properties.post_id)">
                                <div class="con">
                                    <!--<div class="txt">{{item.properties.answer_content}}</div>-->
                                    <div class="post-title">{{item.properties.post_title}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="time" v-html="showTime(item.created_at)"></div>
                    </div>

                </div>
            </LoadMore>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">


    export default {
        name: 'trends',
        data() {
            return {
                list: {
                    init: false,
                    page: 1,
                    hasMore: true
                },
                height: '100%',
                id: '',
                trend: [],
                info: {
                    data: '',
                    meta: {
                        user: '',
                    }
                }
            }
        },
        methods: {
            jump(name, id, answerId) {
                this.$router.push({name: name, params: {id:id}, query: {answerId: answerId}})
            },
            done() {
                this.$nextTick(() => {
                    this.$refs.pulldown.onLoadOff();
                })
            },
//            改变时间格式
            showTime(time) {
                return String(time).replace(/(\d+)\-(\d+)\-(\d+) (\d+)\:(\d+)\:(\d+)/,'<span>$2-$3</span>  <span>$4:$5</span>');
            },
//    		加载更多
            loadMore() {
                const page = this.list.page + 1;
                var data = {
                    page: page,
                    id: this.id
                };
                this.$store.dispatch('queryTrends', data);
            },
//            刷新数据
            refresh() {
                var data = {
                    page: 1,
                    id: this.id
                };
                this.$store.dispatch('queryTrends',data);

            },
//            数据赋值
            trendData(res) {
                this.info = res;

                var list,
                    page = res.meta.pagination,
                    current_page = page.current_page,
                    total_pages = page.total_pages;
                if (current_page == 1) {
                    list = res.data;
                } else {
                    list = this.trend.concat(res.data);
                }
                this.trend = list;
                this.list.init = true;
                this.list.page = current_page;
                this.list.hasMore = current_page < total_pages;
                this.$emit('done');
            }

        },
        created() {
            this.id = this.$route.params.id;
            EventBus.$on('trend',this.trendData);
            this.$on('done', this.done);

        },
        beforeDestroy() {
            EventBus.$off('trend');
        },
    }

</script>


<style rel="stylesheet/less" lang="less">

    #trends{
        background: #efeff4;
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
        .content {
            height: 100%;
            overflow: auto;
            .vlc-loadmore-content{
                background: #efeff4;

                .dynamic-item{
                    .all{
                        background: #fff;
                        padding: 12px 15px 9px 15px;
                        margin-top: 15px;
                        .head{
                            display: flex;
                            /*justify-content: space-between;*/
                            align-items: center;
                            img{
                                width: 33px;
                                height: 33px;
                                border-radius: 50%;
                            }
                            .title{
                                margin-left: 12px;
                                margin-right: 20px;
                                font-size: 14px;
                                /*font-weight: 600;*/
                                color: #008cee;
                            }
                            .type{
                                font-size: 12px;
                                color: #a7a7a7;
                            }
                        }

                        .full{
                            font-size: 14px;
                            /*font-weight: 600;*/
                            margin: 10px 0px;
                            color: #000;
                            /*display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;*/

                            .head{
                                display: flex;
                                /*justify-content: space-between;*/
                                align-items: center;
                                img{
                                    width: 33px;
                                    height: 33px;
                                    border-radius: 50%;
                                }
                                .title{
                                    margin-left: 12px;
                                    margin-right: 20px;
                                    font-size: 14px;
                                    /*font-weight: 600;*/
                                    color: #008cee;
                                }
                                .type{
                                    font-size: 12px;
                                    color: #a7a7a7;
                                }
                            }

                            .full-content{
                                font-size: 14px;
                                /*font-weight: 600;*/
                                margin: 10px 0px;
                                color: #000;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 3;
                                overflow: hidden;
                                display: flex;
                                img{
                                    width: 150px;
                                    height: 85px;
                                    margin-right: 14px;
                                }
                                .con{
                                    /*position: relative;*/
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    .txt{
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        overflow: hidden;
                                        font-size: 14px;
                                    }
                                    .money{
                                        /*position: absolute;
                                        bottom: 0;*/
                                        font-size: 17px;
                                        color: #ea4448;
                                    }
                                    .post-title{
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 3;
                                        overflow: hidden;
                                        font-size: 12px;
                                        color: #9b9b9b;
                                    }
                                    .balance{
                                        color: #f7b532;
                                        .icon-yue{
                                            font-size: 20px;
                                        }
                                    }
                                }
                            }
                            .user-concern{
                                display: flex;
                                align-items: center;
                                margin-top: 13px;
                                img{
                                    border-radius: 50%;
                                    width: 60px;
                                    height: 60px;

                                    margin-left: 60px;
                                    margin-right: 20px;
                                }
                                .left{
                                    .name{
                                        font-size: 14px;
                                        margin-bottom: 5px;
                                    }
                                    .article{
                                        margin-right: 10px;
                                    }
                                    span{
                                        font-size: 12px;
                                        color: #9a9a9a;
                                    }
                                }
                            }
                        }
                        .buy{
                            display: flex;
                            img{
                                width: 150px;
                                height: 85px;
                                margin-right: 14px;
                            }
                            .con{

                                .txt{
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 3;
                                    overflow: hidden;
                                    overflow: hidden;
                                    font-size: 14px;
                                }
                                .money{
                                    font-size: 17px;
                                    color: #ea4448;

                                }

                            }
                        }
                        .time{
                            font-size: 12px;
                            color: #a7a7a7;
                        }
                    }
                }
            }

        }
    }


</style>
