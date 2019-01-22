<template>
    <div id="private">
        <Header title="私信">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="head">
                <div class="inp">
                    <i class="iconfont icon-sousuo-"></i>
                    <input type="text" placeholder="搜索">
                </div>
            </div>
            <LoadMore :height='height' :auto=false :load-more="loadMore" :refresh="refresh" ref="pulldown">
                <div class="follow-item" >

                    <div class="con mx-1px-bottom" @click="">
                        <div class="follow-con">
                            <img src="../../static/img/2018SVIP-top.png" alt="">
                            <div class="user">
                                <div class="follow-name">魔王鸽王萝莉控</div>
                                <span class="house">敌军还有三秒到达战场</span>
                            </div>
                        </div>
                        <div class="hour">
                            <!--<span class="day">12/5</span>
                            <span class="time">15:06</span>-->
                            <span class="sky">昨天</span>
                        </div>

                    </div>
                    <div class="con mx-1px-bottom" @click="">
                        <div class="follow-con">
                            <img src="../../static/img/2018SVIP-top.png" alt="">
                            <div class="user">
                                <div class="follow-name">魔王鸽王萝莉控</div>
                                <span class="house">开始撤退</span>
                            </div>
                        </div>
                        <div class="hour">
                            <span class="day">12/5</span>
                            <span class="time">15:06</span>
                        </div>

                    </div>
                    <div class="con mx-1px-bottom" @click="">
                        <div class="follow-con">
                            <img src="../../static/img/2018SVIP-top.png" alt="">
                            <div class="user">
                                <div class="follow-name">魔王鸽王萝莉控</div>
                                <span class="house">来来来走一波</span>
                            </div>
                        </div>
                        <div class="hour">
                            <span class="day">12/5</span>
                            <span class="time">15:06</span>
                        </div>

                    </div>

                </div>
            </LoadMore>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">

    import {logout} from '../../utils/oauth';

    export default {
        name: 'private',
        data() {
            return {
                list: {
                    init: false,
                    page: 1,
                    hasMore: true
                },
                height: '100%',
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
            done() {
                this.$nextTick(() => {
                    this.$refs.pulldown.onLoadOff();
                })
            },
//    		加载更多
            loadMore() {

            },
//            刷新数据
            refresh() {

            },
//            数据赋值
            privateData(res) {

            }
        },
        created() {

        },
        beforeDestroy() {

        }

    }

</script>


<style rel="stylesheet/less" lang="less">

    #private{
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

            .head{
                background: #008cee;
                padding: 15px;
                .inp{
                    background: #fff;
                    padding: 5px 13px;
                    border-radius: 3px;
                    i{
                        font-size: 18px;
                        margin-right: 5px;
                    }
                }
            }
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


</style>
