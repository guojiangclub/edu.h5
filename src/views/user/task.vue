<template>
    <div id="task">
        <Header title="我的任务">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="head">
                <div class="my">我的任务</div>
                <span>完成任务可获取积分奖励，积分可用于购买课程或在积分商城兑换礼品。</span>
            </div>
                <div class="follow-item" >

                    <div class="con mx-1px-bottom" v-for="dutys in duty">
                        <div class="follow-con">
                            <div class="follow-name">{{dutys.name}}</div>
                            <span class="house">可获得 {{dutys.point}} 积分</span>
                        </div>
                        <div class="hour" :class="dutys.status == 1 ? 'completed' : '' ">
                            <span class="sky" v-if="dutys.status == 0" @click="jump(dutys.url)">去完成</span>
                            <span class="sky" v-if="dutys.status == 1" >已完成</span>
                        </div>

                    </div>

                </div>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">

    import {logout} from '../../utils/oauth';

    export default {
        name: 'task',
        data() {
            return {
                duty: ''
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
            ftask(res) {
                this.duty = res.data;
            }
        },
        created() {
            this.$store.dispatch('FinishTask');
            EventBus.$on('finishtask', this.ftask)
        },
        beforeDestroy() {
            EventBus.$off('finishtask');
        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #task{
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
                padding: 10px 15px;
                .my{
                    color: #fff;
                }
                span{
                    color: rgba(255,255,255,.6);
                    font-size: 12px;
                }

            }
            .follow-item{
                margin-top: 10px;
                background: #fff;
                .con{
                    padding: 7px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .follow-con{

                        .follow-name{
                            color: #008cee;
                        }
                        .house{
                            font-size: 12px;
                            color: #9b9b9b;
                        }
                    }
                    .hour{
                        font-size: 12px;
                        color: #fff;
                        padding: 5px 14px;
                        background: #008cee;
                        border-radius: 30px;
                    }
                    .completed{
                        background: #9b9b9b;
                    }

                }
            }

        }
    }


</style>
