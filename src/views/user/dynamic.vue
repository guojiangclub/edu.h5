<template>
    <div id="dynamic">
        <Header title="最新动态">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="data" >
                <div class="all">
                    <div class="head">
                        <img src="../../static/img/kn.png" alt="">
                        <div class="title">魔王鸽王萝莉控</div>
                        <div class="type">发表文章</div>
                        <!--<div class="type">提出问题</div>-->
                        <!--<div class="type">购买课程</div>-->
                    </div>
                    <div class="full">浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟</div>
                    <div class="time">1分钟前</div>
                </div>
                <div class="all">
                    <div class="head">
                        <img src="../../static/img/kn.png" alt="">
                        <div class="title">魔王鸽王萝莉控</div>
                        <!--<div class="type">发表文章</div>-->
                        <div class="type">提出问题</div>
                        <!--<div class="type">购买课程</div>-->
                    </div>
                    <div class="full">浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟</div>
                    <div class="time">2分钟前</div>
                </div>
                <div class="all">
                    <div class="head">
                        <img src="../../static/img/kn.png" alt="">
                        <div class="title">魔王鸽王萝莉控</div>
                        <!--<div class="type">发表文章</div>-->
                        <!--<div class="type">提出问题</div>-->
                        <div class="type">购买课程</div>
                    </div>
                    <div class="full buy">
                        <img src="../../static/img/2018SVIP-top.png" alt="">
                        <div class="con">
                            <div class="txt">浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟浪的飞起哟浪的飞</div>
                            <div class="money">￥<span>69.00</span></div>
                        </div>
                    </div>
                    <div class="time">5分钟前</div>
                </div>
            </div>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">


    export default {
        name: 'dynamic',
        data() {
            return {

            }
        },
        methods: {


        },
        created() {

        },
        beforeDestroy() {

        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #dynamic{
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

            .data{
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
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
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


</style>
