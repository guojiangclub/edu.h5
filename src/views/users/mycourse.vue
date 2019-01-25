<template>

    <div id="my_course">
        <div class="navbar mx-1px-bottom">
                <div  class="navbar-item  activity">
                    <div class="navbar-title">学习课程</div>
                </div>
                <div  class="navbar-item">
                    <div class="navbar-title">通知公告</div>
                </div>
            <!--<div class="navbar-slider" style="width: {{width}}px; transform: translateX({{sliderOffset}}px); -webkit-transform: translateX({{sliderOffset}}px)"></div>-->
        </div>
        <div class="ul-content">
            <div>
                <div class="li-list">
                    <div class="item mx-1px-bottom">
                        <div class="left-info">
                            <img src="http://img4.imgtn.bdimg.com/it/u=957635406,1686445000&fm=26&gp=0.jpg">
                        </div>
                        <div class="right-info">
                            <div class="name">item.course.title</div>
                            <div class="tiem-box">
                                <div class="time">
                                    <span class="iconfont icon-keshi"></span>
                                    8课时
                                </div>
                                <div class="many">
                                    88人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    <span class="iconfont icon-laoshi"></span>
                                    在在老师
                                </div>
                                <div class="money">已加入</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="li-list">
                <div>
                    <div class="notice-item">
                        <!--<div class="title">课程配套课件下载链接：</div>
                        <div class="content">https://pan.baidu.com/share/init?surl=9os6Cxw1NkuqtF76yFvYyg </div>-->
                        <div class="content">
                           <!-- <wxparser rich-text="{{item.content}}" />-->
                        </div>
                        <div class="teacher-time mx-1px-bottom">
                            <div class="teacher">
                                <span class="iconfont icon-laoshi"></span>
                               老老师
                            </div>
                            <div class="time">item.created_at</div>
                        </div>
                        <div class="from">来自：item.course.title</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="black-mask"></div>
    </div>




</template>

<script type="text/ecmascript-6">
    export default {
        name: 'users-mycourse',
        data(){
            return {


            }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#f3f3f3;
    }
    #my_course{
        height: 100%;
        overflow: auto;
        background-color: #f3f3f3;
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
            margin-top: 10px;
            .li-list{
                .item{
                    padding: 20px 15px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    background-color: #FFFFFF;
                    .left-info{
                        width:135px;
                        height: 90px;
                        margin-right: 15px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .right-info{
                        flex: 1;
                        .name{
                            height: 44px;
                            color: #202020;
                            font-size: 15px;
                            line-height: 22px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            margin-bottom: 8px;
                        }
                        .tiem-box{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color:#909090;
                            font-size: 12px;
                            line-height: 14px;
                            padding-bottom: 10px;
                            .time{
                                span{
                                    font-size: 12px;
                                }
                            }
                        }
                        .teach-box{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color:#909090;
                            font-size: 12px;
                            line-height: 14px;
                            .teacher{
                                span{
                                    font-size: 12px;
                                }
                            }
                            .money{
                                color: #202020;
                            }
                        }
                    }
                }
                .notice-item{
                    background-color: #FFFFFF;
                    margin-bottom: 10px;
                    /* .title{
                       padding: 15px;
                       color: #202020;
                       font-size: 14px;
                       line-height: 20px;
                     }*/
                    .content{
                        padding: 15px 15px 0px 15px;
                        line-height: 20px;
                        color:#4A4A4A;
                        font-size: 13px;
                    }
                    .teacher-time{
                        padding:10px 15px 15px 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        color: #909090;
                        font-size: 12px;
                        .teacher{
                            span{
                                color: #909090;
                                flex: 12px;
                                display: inline-block;
                                padding-right: 8px;
                            }
                        }
                    }
                    .from{
                        padding: 12px 15px;
                        color: #004E9D;
                        font-size:12px;
                        line-height: 17px;
                    }
                }

            }
        }
        .black-mask{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: #000000;
            z-index: 100;
            display: none;
            &.cur{
                display: block;
            }
        }

    }



</style>
