<template>
    <div id="classfication">
        <!--一级菜单-->
        <div class="classifical-menu">
            <div class="scroll-view">
                <div class="menu-item active">
                    数据分析
                </div>
                <div class="menu-item">
                    麻将
                </div>
                <div class="menu-item">
                    吃饭
                </div>
                <div class="menu-item">
                    逛街
                </div>
                <div class="menu-item">
                    唱歌
                </div>
                <div class="menu-item">
                    上厕所
                </div>
            </div>
        </div>
        <!--tabbar-->
        <div class="navbar mx-1px-bottom">
                <div  class="navbar-item activity">
                    <div class="navbar-title">推荐</div>
                </div>
                <div  class="navbar-item">
                    <div class="navbar-title">最热</div>
                </div>
            <!--<div class="navbar-slider" style="width: {{width}}px; transform: translateX({{sliderOffset}}px); -webkit-transform: translateX({{sliderOffset}}px);"></div>-->
        </div>
        <div class="ul-content">
            <div class="li-list">
                <div class="item mx-1px-bottom">
                    <div class="left-info">
                        <img src="http://img4.imgtn.bdimg.com/it/u=791348081,4225951845&fm=15&gp=0.jpg">
                        <div class="limit-discount"></div>
                    </div>
                    <div class="right-info">
                        <div class="name">要多回家看看</div>
                        <div class="tiem-box">
                            <div class="time">
                                <span class="iconfont icon-keshi"></span>
                                44课时
                            </div>
                            <div class="many">
                                444人学习
                            </div>
                        </div>
                        <div class="teach-box">
                            <div class="teacher">
                                <span iconfont icon-laoshi></span>
                                在在老师
                            </div>
                            <div class="money">¥ 895元</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'classification',
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
    #classfication{
        padding-bottom:20px;
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .classifical-menu{
            background-color: #FFFFFF;
            padding:20px 0px 10px 15px;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 10px;
            .scroll-view{
                overflow-x: auto;
                .menu-item{
                    padding-right: 30px;
                    display: inline-block;
                    color:#909090;
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: 400;
                    &.active{
                        color:#202020;
                        font-weight: 500;

                    }
                }
            }

        }
        .navbar {
            width: 100%;
            display: flex;
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
                    color: #004E9D;
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
        .ul-content{
            background-color: #FFFFFF;
            .li-list{
                .item{
                    padding: 20px 15px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .left-info{
                        width:135px;
                        height: 90px;
                        margin-right: 15px;
                        position: relative;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .right-info{
                        flex: 1;
                        .name{
                            color: #202020;
                            font-size: 15px;
                            line-height: 22px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            margin-bottom: 8px;
                            height:44px;
                        }
                        .tiem-box{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color:#909090;
                            font-size: 12px;
                            line-height: 14px;
                            padding-bottom: 10px;
                        }
                        .teach-box{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color:#909090;
                            font-size: 12px;
                            line-height: 14px;
                            .money{
                                color: #FF2741;
                            }
                        }
                    }
                    .limit-discount{
                        position: absolute;
                        width: 60px;
                        height: 26px;
                        background: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-28/15934896.jpg") no-repeat;
                        background-size: 100% 100%;
                        top:0;
                        right: 0;
                    }
                }

            }
        }

    }


</style>
