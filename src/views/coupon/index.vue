<template>
    <div id="coupon-index">
        <div class="navbar mx-1px-bottom">

                <div class="navbar-item activity">
                    <div class="navbar-title">已失效</div>
                </div>
            <!--<div class="navbar-slider" style="width: {{width}}px; transform: translateX({{sliderOffset}}px); -webkit-transform: translateX({{sliderOffset}}px);"></div>-->
        </div>
        <div class="coupon-content">
            <div>
                <div class="li-list">
                    <div class="item">
                        <div class="left-info">
                            <div class="money">
                                <span>¥</span>
                                50
                            </div>
                           <!-- <div class="money" wx:if="{{item.discount.action_type.type == 'percentage'}}">
                                {{item.discount.action_type.value}}
                                <span>折</span>
                            </div>-->
                            <div class="label">满100-50</div>
                        </div>
                        <div class="right-info">
                            <div class="title">春节满减</div>
                            <div class="created-at">2018-2019</div>
                        </div>
                        <!--遮罩层-->
                        <!--<div class="mask">
                            <div class="cirles">
                                <span>已使用</span>
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="coupon-content">
            <div>
                <div class="li-list">
                    <div class="item">
                        <div class="left-info">
                            <div class="money">
                                <span>¥</span>
                                80
                            </div>
                            <!--<div class="money" wx:if="{{item.discount.action_type.type == 'percentage'}}">
                                {{item.discount.action_type.value}}
                                <span>折</span>
                            </div>-->
                            <div class="label">满200-80</div>
                        </div>
                        <div class="right-info">
                            <div class="title">春节大减</div>
                            <div class="created-at">2018-2019</div>
                        </div>
                        <!--遮罩层-->
                        <div class="mask">
                            <div class="cirles">
                                <span>已使用</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="coupon-content">
            <div>
                <div class="li-list">
                    <div class="item">
                        <div class="left-info">
                            <div class="money">
                                <span>¥</span>
                                100
                            </div>
                            <!--<div class="money" wx:if="{{item.discount.action_type.type == 'percentage'}}">
                                {{item.discount.action_type.value}}
                                <span>折</span>
                            </div>-->
                            <div class="label">满200-90</div>
                        </div>
                        <div class="right-info">
                            <div class="title">回家过年</div>
                            <div class="created-at">2018-2019</div>
                        </div>
                        <!--遮罩层-->
                        <div class="mask">
                            <div class="cirles">
                                <span>已失效</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-more">没有更多数据了</div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'coupon-index',
        data(){
            return {


            }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #coupon-index{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            display: flex;
            z-index: 20;
            height: 50px;
            line-height: 50px;
            background: #FFFFFF;
            font-size: 14px;
            color: #9B9B9B;

            .navbar-item {
                flex: 1;
                width: 0%;
                text-align: center;

                &.activity {
                    color:#004E9D;
                }
            }
            .navbar-slider {
                position: absolute;
                content: " ";
                left: 0;
                bottom: 0;
                width: 4em;
                height: 3px;
                background-color: #004E9D;
                transition: transform .3s;
            }
        }
        .coupon-content{
            padding:10px 15px 15px 15px;
            margin-top: 50px;
            .li-list{
                margin-bottom: 10px;
                .item{
                    position: relative;
                    display: flex;
                    background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-20/34961047.jpg");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    padding:10px 20px;
                    align-items: flex-end;
                    .left-info{
                        color: #FB5054;
                        .money{
                            font-size: 35px;
                            font-weight: 500;
                            span{
                                font-size: 14px;
                            }
                        }
                        .label{
                            font-size: 12px;
                            line-height: 17px;
                        }

                    }
                    .right-info{
                        padding-left:25px;
                        flex: 1;
                        .title{
                            color: #666666;
                            font-size: 12px;
                            line-height: 17px;
                            padding-bottom: 28px;
                        }
                        .created-at{
                            color: #9B9B9B;
                            font-size: 10px;
                            line-height: 14px;
                        }
                    }
                    .mask{
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-21/80738795.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        .cirles{
                            position: absolute;
                            right: 12px;
                            top: 12px;
                            width:58px;
                            height: 58px;
                            border:1px solid #FFFFFF;
                            border-radius: 50%;
                            span{
                                display: inline-block;
                                border:1px solid #FFFFFF;
                                border-radius: 50%;
                                width:45px;
                                height: 45px;
                                text-align: center;
                                line-height: 45px;
                                transform:rotate(-45deg);
                                font-size: 12px;
                                color: #FFFFFF;
                                position: relative;
                                left: 4px;
                                top: 4px;
                            }
                        }
                    }
                }
            }

        }
        .no-more{
            text-align: center;
            font-size: 12px;
            color: #9B9B9B;

        }
    }



</style>
