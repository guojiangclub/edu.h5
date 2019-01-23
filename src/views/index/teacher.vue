<template>
    <div id="teacher">
        <div class="header">
            <div class="avatar">
                <img src="http://img3.imgtn.bdimg.com/it/u=2468332981,2896209654&fm=11&gp=0.jpg">
            </div>
            <div class="introduce">
                <div class="nick-name">黔在在</div>
                <div class="label">
                    课程：3 丨 数据圈：2
                </div>
            </div>
        </div>
        <!--讲师介绍-->
        <div class="teacher-info">
            <div class="title mx-1px-bottom">讲师介绍</div>
            <div class="label">
                <div class="name">在在老师</div>
                <div class="txt">淘宝7年资深讲师 国家工信部高级电子商务师</div>
            </div>
        </div>
        <!--讲师圈子-->
        <div class="teacher-circle">
            <div class="title mx-1px-bottom">讲师数据圈</div>
            <div class="cirle-list">
                <div class="item">
                    <div class="logo">
                        <img src="https://wx3.sinaimg.cn/mw690/006ABCf7gy1fycfk2jk7sj30jx0kewq0.jpg">
                    </div>
                    <div class="text">
                        <div class="name">罗熙表情包</div>
                        <div class="owner">黔在在</div>
                    </div>
                    <div class="iconfont">i</div>
                </div>
                <div class="item mx-1px-bottom">
                    <div class="logo">
                        <img src="https://wx4.sinaimg.cn/mw690/006ABCf7gy1fycfk0sy7yj30jw0jxtim.jpg"></img>
                    </div>
                    <div class="text">
                        <div class="name">不要生气</div>
                        <div class="owner">黔在在</div>
                    </div>
                    <div class="iconfont icon-jiantou"></div>
                </div>
            </div>

        </div>
        <!--讲师课程-->
        <div class="teacher-course">
            <div class="title mx-1px-bottom">
                讲师课程
            </div>
            <div class="ul-content">
                <div class="li-list">
                    <div class="item mx-1px-bottom">
                        <div class="left-info">
                            <img src="http://img4.imgtn.bdimg.com/it/u=1939085593,103106475&fm=11&gp=0.jpg">
                        </div>
                        <div class="right-info">
                            <div class="name">春节回家</div>
                            <div class="tiem-box">
                                <div class="time">
                                    <span class="iconfont icon-keshi"></span>
                                    55课时
                                </div>
                                <div class="many">
                                    228人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    <span class="iconfont icon-laoshi"></span>
                                    在在老师
                                </div>
                                <div class="money">¥ 788元</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'teacher',
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
    #teacher{
        height: 100%;
        background-color:#F3F3F3;
        overflow: auto;
        .header{
            background-color:#004E9D;
            padding:30px 15px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .avatar{
                width: 60px;
                height: 60px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .introduce{
                padding-left: 22px;
                color: #FFFFFF;
                .nick-name{
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 22px;
                    padding-bottom: 10px;
                }
                .label{
                    font-size: 12px;
                    line-height: 17px;
                }
            }
        }
        .teacher-info{
            padding-left: 15px;
            background-color: #FFFFFF;
            margin-bottom: 10px;
            .title{
                height: 44px;
                line-height: 44px;
                color: #4A4A4A;
                font-size: 14px;
                font-weight: 500;
            }
            .label{
                padding: 15px 15px 20px 0;
                color: #909090;
                font-size: 12px;
                line-height: 17px;
                .name{
                    padding-bottom: 4px;
                }
            }
        }
        .teacher-circle{
            background-color:#fff;
            margin-bottom: 10px;
            .title{
                height: 44px;
                line-height: 44px;
                padding: 0 15px;
                color: #4A4A4A;
                font-size: 14px;
            }
            .cirle-list{
                padding: 0 0 0 15px;
                .item{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 15px 20px 15px 0;
                    .logo{
                        width: 40px;
                        height: 40px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .text{
                        flex: 1;
                        padding-left: 10px;
                        .name{
                            color: #202020;
                            font-size: 13px;
                            line-height: 18px;
                            padding-bottom: 5px;
                        }
                        .owner{
                            color: #909090;
                            font-size: 12px;
                            line-height: 17px;
                        }
                    }
                    .iconfont{
                        color: #909090;
                        font-size: 16px;
                    }
                }
            }

        }
        .teacher-course{
            background-color: #FFFFFF;
            .title{
                color: #4A4A4A;
                font-size: 14px;
                height:44px;
                line-height: 44px;
                font-weight: 500;
                padding: 0 15px;
            }
            .ul-content{
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
                                    color: #FF2741;
                                }
                            }
                        }
                    }
                }
            }
        }



    }

</style>
