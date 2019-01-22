<template>
    <div id="user-fans">
        <Header title="粉丝">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <LoadMore :height='height' :load-more="loadMore" :has-more="list.hasMore" :refresh="refresh" ref="pulldown">
                <div class="follow-item">
                    <div class="con mx-1px-bottom" v-for="(item, index) in fans">
                        <div class="follow-con">
                            <img :src="item.avatar_file" alt="" @click="jump(item.id)" >
                            <div class="user">
                                <div class="follow-name">{{item.user_name}}</div>
                                <span class="house">文章{{item.article_count}}</span>
                                <span class="house fans">粉丝{{item.fans_count}}</span>
                            </div>
                        </div>
                        <div class="hour" @click="focus(item.id, index)" v-if="info && info.data.id != item.id">
                            <i class="iconfont icon-yiguanzhu" v-if="item.isFocus"></i>
                            <i class="iconfont icon-guanzhu" v-else></i>
                        </div>
                    </div>
                </div>
            </LoadMore>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Cache, cache_keys} from '../../utils/util';

    export default {
        name: 'user-fans',
        data() {
            return {
                list: {
                    init: false,
                    page: 1,
                    hasMore: true
                },
                height: '100%',
                id: '',
                info: {
                    data: {
                        id: ''
                    }
                },
                fans: [],
            }
        },
        created() {
            var info = Cache.get(cache_keys.info);
            if (info) {
                this.info = info
            }
            this.id = this.$route.params.id;
            EventBus.$on('myfans',this.fansData);
            EventBus.$on('focusfans',this.focusfans);
            this.$on('done', this.done);
        },
        beforeDestroy() {
            EventBus.$off('myfans');
            EventBus.$off('focusfans');
        },
        methods: {
            focus(id, index) {
                var data = {
                    id: id,
                    index: index
                }
                var is_login = !!Cache.get(cache_keys.token);
                if (is_login) {
                    this.$store.dispatch('focusUser',data)
                } else {
                    this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                }
            },
            goLogin() {
                var source = this.$route.path;
                this.$router.push({name: 'user-login', query: {source}});
            },
            jump(id) {
                this.$router.push({name: 'visitor', params: {id: id}});
            },
            focusfans(res, data) {
                /*if (data == 'follow') {
                    this.fans[data.index].isFocus = true;
                } else {
                    this.fans[data.index].isFocus = !this.fans[data.index].isFocus;
                }*/
                this.fans[data.index].isFocus = !this.fans[data.index].isFocus;

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
                this.$store.dispatch('MyFans', data);
            },
//            刷新数据
            refresh() {
                var data = {
                    page: 1,
                    id: this.id
                };
                this.$store.dispatch('MyFans',data);

            },
//            数据赋值
            fansData(res) {
                var list,
                    page = res.meta.pagination,
                    current_page = page.current_page,
                    total_pages = page.total_pages;
                if (current_page == 1) {
                    list = res.data;
                } else {
                    list = this.fans.concat(res.data);
                }
                this.fans = list;
                this.list.init = true;
                this.list.page = current_page;
                this.list.hasMore = current_page < total_pages;
                this.$emit('done');
            }
        },
    }
</script>

<style rel="stylesheet/less" lang="less">
    #user-fans {
        background: #efeff4;
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
            .follow-item{
                background: #fff;
                .con{
                    padding: 7px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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
                            }
                            .house{
                                font-size: 12px;
                                color: #9b9b9b;
                                &.fans{
                                    margin-left: 15px;
                                }
                            }
                        }
                    }
                    .hour{
                        font-size: 12px;
                        .icon-guanzhu{
                            color: #008cee;
                        }
                    }

                }
            }

        }
    }
</style>
