<template>
    <div id="information">
        <Header title="消息列表">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="edu-list-box">
                <Slide-bar :list="list" height="100%" scrollHeight="64px" :canDrag=false :index="tabIndex" @on-change="change">
                    <div slot="slot-item-0" class="information-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[0].hasMore" :refresh="refresh" ref="pulldown_0">
                            <div class="favoritesi-item" >

                                <div class="con" @click="" v-for="item in dataList[0]">
                                    <div class="type" v-if="item.type == 'Hellobi\\Notifications\\PostReward'">
                                        <img :src="item.data.user_avatar" alt="" @click.stop="jump('visitor', item.data.user_id)">
                                        <div class="favorites-left">
                                            <div class="favorites-con " style="margin-bottom: 3px;">
                                                <span class="house">{{item.data.user_name}}</span>
                                                <span class="follow">打赏了你的文章</span>
                                            </div>
                                            <div class="balance">
                                                <i class="iconfont icon-yue"></i>
                                                <span>￥ {{item.data.reward_amount}}</span>
                                            </div>
                                            <div class="favorites-name" @click="jump('blogs-detail', item.data.post_id)">
                                                {{item.data.post_title}}
                                            </div>

                                            <div class="time" v-html="showTime(item.created_at)"></div>

                                        </div>
                                    </div>
                                    <!--<div class="type" v-if="item.type == 'Hellobi\\Notifications\\PostReward'">
                                        <img :src="item.data.user_avatar" alt="">
                                        <div class="favorites-left">
                                            <div class="favorites-con ">
                                                <span class="house">{{item.data.user_name}}</span>
                                                <span class="follow">收藏了你的文章</span>
                                            </div>
                                            <div class="favorites-name">
                                                {{item.data.post_title}}
                                            </div>
                                            <div class="time" v-html="showTime(item.updated_at)"></div>

                                        </div>
                                    </div>-->
                                    <div class="type" v-if="item.type == 'Hellobi\\Notifications\\PostCommented'">
                                        <img :src="item.data.user_avatar" alt="" @click.stop="jump('visitor', item.data.user_id)">
                                        <div class="favorites-left">
                                            <div class="favorites-con">
                                                <span class="house">{{item.data.user_name}}</span>
                                                <span class="follow">评论了你的问题</span>
                                            </div>
                                            <div class="favorites-name" @click="jump('blogs-comments', item.data.post_id)">
                                                {{item.data.comment_message}}
                                            </div>
                                            <div class="favorites-substance">
                                                {{item.data.post_title}}
                                            </div>
                                            <div class="time" v-html="showTime(item.created_at)"></div>

                                        </div>
                                    </div>
                                </div>
                                <!--<div class="con" @click="">
                                    <div class="favorites-left">
                                        <div class="favorites-con">
                                            <span class="house" style="color: #222">绑定账号拿积分</span>
                                        </div>
                                        <div class="favorites-substance">
                                            这是内容这是内容这是内容这是内容这是内容这是内容
                                        </div>
                                        <div class="time">10:54</div>

                                    </div>


                                </div>-->

                                <!--<div class="fbox">-->
                                    <!--<div class="con" @click="">-->
                                        <!--<img src="../../static/img/kn.png" alt="">-->
                                        <!--<div class="favorites-left">-->
                                            <!--<div class="favorites-con">-->
                                                <!--<span class="house">魔王鸽王萝莉控</span>-->
                                                <!--<span class="follow">关注了你的问题</span>-->
                                            <!--</div>-->
                                            <!--<div class="favorites-name">-->
                                                <!--这是title这是title这是title这是title这是title-->
                                            <!--</div>-->
                                            <!--<div class="favorites-substance">-->
                                                <!--这是内容这是内容这是内容这是内容这是内容这是内容-->
                                            <!--</div>-->
                                            <!--<div class="time">10:54</div>-->

                                        <!--</div>-->


                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="fbox comment-list">

                                    <div class="con mx-1px-bottom" @click="" >
                                        <img src="../../static/img/kn.png" alt="">
                                        <div class="favorites-con">
                                            <span class="house">魔王鸽王萝莉控</span>
                                            <span class="comment-time">10:54</span>
                                            <div class="follow">我的回复我的回复我的回复我的回复我的回复我的回复</div>
                                        </div>
                                        <div class="favorites-title">
                                            文章title文章title文章title文章title文章title文章title文章title
                                        </div>

                                    </div>

                                </div>-->
                            </div>
                        </LoadMore>
                    </div>
                    <div slot="slot-item-1" class="information-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[1].hasMore" :refresh="refresh" ref="pulldown_1">
                            <div class="follow-item" >

                                <div class="con mx-1px-bottom" @click="jump('visitor', item.data.user_id)" v-for="item in dataList[1]">
                                    <div class="follow-con">
                                        <img :src="item.data.user_avatar" alt="">
                                        <div class="user">
                                            <div class="follow-name">{{item.data.user_name}}</div>
                                            <span class="house">点赞了你</span>
                                        </div>
                                    </div>
                                    <div class="hour" v-html="showTime(item.created_at)">
                                        <!--<span class="day">12/5</span>
                                        <span class="time">15:06</span>-->
                                    </div>

                                </div>

                            </div>
                        </LoadMore>
                    </div>
                    <div slot="slot-item-2" class="information-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[2].hasMore" :refresh="refresh" ref="pulldown_2">
                            <div class="follow-item" >

                                <div class="con mx-1px-bottom" @click="jump('visitor',item.data.user_id)" v-for="item in dataList[2]">
                                    <div class="follow-con">
                                        <img :src="item.data.user_avatar" alt="">
                                        <div class="user">
                                            <div class="follow-name">{{item.data.user_name}}</div>
                                            <span class="house">关注了你</span>
                                        </div>
                                    </div>
                                    <div class="hour" v-html="showTime(item.created_at)">
                                        <!--<span class="day">12/5</span>
                                        <span class="time">15:06</span>-->
                                    </div>

                                </div>
                                <!--<div class="con mx-1px-bottom" @click="">
                                    <div class="follow-con">
                                        <img src="../../static/img/kn.png" alt="">
                                        <div class="user">
                                            <div class="follow-name">魔王鸽王萝莉控</div>
                                            <span class="house">关注了你</span>
                                        </div>
                                    </div>
                                    <div class="hour">
                                        <span class="day">12/5</span>
                                        <span class="time">15:06</span>
                                    </div>

                                </div>
                                <div class="con mx-1px-bottom" @click="">
                                    <div class="follow-con">
                                        <img src="../../static/img/kn.png" alt="">
                                        <div class="user">
                                            <div class="follow-name">魔王鸽王萝莉控</div>
                                            <span class="house">关注了你</span>
                                        </div>
                                    </div>
                                    <div class="hour">
                                        <span class="day">12/5</span>
                                        <span class="time">15:06</span>
                                    </div>

                                </div>-->

                            </div>
                        </LoadMore>
                    </div>
                </Slide-bar>

            </div>



        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'information',
        data() {
            return {
                list: [
                    {
                        name: '通知',
                        init: false,
                        page: 1,
                        hasMore: true,
                        type: 'notice'
                    },
                    {
                        name: '点赞',
                        init: false,
                        page: 1,
                        hasMore: true,
                        type: 'vote'
                    },
                    {
                        name: '关注',
                        init: false,
                        page: 1,
                        hasMore: true,
                        type: 'follow'
                    }
                ],
                dataList: {
                    0: [],
                    1: [],
                    2: []
                },
                tabIndex: 0,
                height: '100%',
                id: ''
            }
        },
        methods: {
            jump(name, id) {
                this.$router.push({name: name, params: {id: id}});
            },
//            改变时间格式
            showTime(time) {
                return String(time).replace(/(\d+)\-(\d+)\-(\d+) (\d+)\:(\d+)\:(\d+)/,'<span>$2/$3</span>  <span>$4:$5</span>');
            },
//            加载更多
            loadMore() {
                const page = this.list[this.tabIndex].page + 1;
                const type = this.list[this.tabIndex].type;
                var data = {
                    page: page,
                    type: type
                }
                this.$store.dispatch('queryMessagecenter', data);
            },
//            刷新数据
            refresh() {
                const type = this.list[this.tabIndex].type;
                var data = {
                    page: 1,
                    type: type
                }
                this.$store.dispatch('queryMessagecenter', data);
            },
//            数据赋值
            messagecenterData(res) {
               /* this.list[this.tabIndex].hasMore = false;
                this.$refs['pulldown_' + this.tabIndex].onLoadOff();
                this.list[this.tabIndex].init = true;
                this.dataList[this.tabIndex] = res.data;*/
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

                this.$refs['pulldown_' + this.tabIndex].onLoadOff();
            },
            change(i) {
                this.tabIndex = i;
                const type = this.list[this.tabIndex].type;
                const data = {
                    id: this.id,
                    page: 1,
                    type: type
                };
                this.$router.replace({name: 'information', params: {id: this.id}, query: {status: i}});
                if (!this.list[i].init) {
                    this.$store.dispatch('queryMessagecenter', data);
                }
            }

        },
        created() {
            this.tabIndex = Number(this.$route.query.status) || 0;
            this.id = this.$route.params.id;
            const type = this.list[this.tabIndex].type;
            var data = {
                id: this.id,
                page: 1,
                type: type
            }
            this.$store.dispatch('queryMessagecenter', data);
            EventBus.$on('messagecenter', this.messagecenterData);
        },
        beforeDestroy() {
            EventBus.$off('messagecenter')
        },
    }
</script>

<style rel="stylesheet/less" lang="less">
    #information {
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
        .contents{
            height: 100%;
            overflow: auto;
            .edu-list-box{
                height: 100%;
                .vlc-slideBar{
                    background: #efeff4;
                    height: 100%;
                    border: none;
                    .vlc-slideBar-header{
                        box-shadow: 0px 1px 5px #222;
                        z-index: 50;
                    }
                    .vlc-slideBar-container{
                        .vlc-slideBar-content{
                            display: flex !important;
                            .vlc-slideBar-content-item{
                                .information-list{
                                    flex: 1;
                                    height: 100%;
                                    overflow: auto;
                                    padding-bottom: 70px;
                                }
                            }

                        }
                    }

                    .vlc-slideBar-wrapper-absolute{
                        height: 4px;
                        background-color: #fff !important;
                    }
                    .vlc-slideBar-child{
                        background: #008cee;

                        .content{
                            color: rgba(255,255,255,.6);
                        }
                        &.active{
                            .content{
                                color: #fff;
                            }
                        }
                    }
                    .vlc-loadmore-content{
                        background: #efeff4;
                    }
                    /*通知*/
                    .favoritesi-item{
                        margin-top: 10px;

                        .con{


                            .type{
                                margin-bottom: 22px;
                                background: #fff;
                                padding: 12px 15px;
                                display: flex;

                                img{
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    margin-right: 21px;
                                }

                                .favorites-name{
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;
                                    font-size: 14px;
                                    margin-bottom: 3px;
                                }
                                .favorites-substance{
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;
                                    font-size: 12px;
                                    color: #9b9b9b;
                                }
                                .time{
                                    text-align: left;
                                    margin-top: 5px;
                                    font-size: 12px;
                                    color: #9b9b9b;
                                }
                                .favorites-con{
                                    align-items: center;
                                    font-size: 14px;
                                    color: #9b9b9b;
                                    margin-bottom: 10px;
                                    .house{
                                        color: #008cee;
                                        margin-right: 5px;
                                    }
                                    .follow{
                                        font-size: 14px;
                                    }
                                }
                                .balance{
                                    color: #f7b532;
                                    .icon-yue{
                                        font-size: 20px;
                                    }
                                }
                            }

                        }
                        .dot{
                            margin-right: 10px;
                            .icon-renminbi{
                                display: inline-block;
                                font-size: 23px;
                                color: #ea4448;
                            }
                        }



                    }
                    /*评论*/
                    .comment-item{
                        background: #fff;

                        .fbox{
                            .con{
                                padding: 12px 15px;
                                display: flex;

                                img{
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    margin-right: 21px;
                                }
                                .favorites-con{
                                    flex: 4;
                                    font-size: 14px;
                                    .house{
                                        margin-right: 8px;
                                    }
                                    .follow{
                                        margin-top: 9px;
                                        color: #4a4a4a;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 2;
                                        overflow: hidden;
                                    }
                                }
                                .favorites-name{
                                    margin-left: 5px;
                                    flex: 2;
                                    font-size: 12px;
                                    color: #9b9b9b;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 3;
                                    overflow: hidden;
                                }
                            }
                        }

                    }


                    /*关注*/
                    .follow-item{
                        background: #fff;
                        .con{
                            padding: 7px 15px;
                            display: flex;
                            justify-content: space-between;
                            .follow-con{
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                img{
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    margin-right: 16px;
                                }
                                .user{
                                    .follow-name{
                                        font-size: 14px;
                                        color: #008cee;
                                    }
                                    .house{
                                        font-size: 12px;
                                        color: #9b9b9b;
                                    }
                                }
                            }
                            .hour{
                                font-size: 12px;
                                color: #9b9b9b;
                                .day{
                                    margin-right: 5px;
                                }
                            }

                        }
                    }
                }

            }


        }
        .bottom{

            background: #fff;
            padding: 14px 0;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .edit{
                text-align: center;
                color: #008cee;
            }
            .del{
                display: flex;
                .left{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    color: #9b9b9b;
                    border-right:1px solid #ccc;

                    .txt{
                        text-align: left;
                    }
                }
                .rigth{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    .txt{
                        color: #ea4448;
                        font-weight: normal;
                        text-align: left;
                    }

                }
            }
        }
    }
</style>
