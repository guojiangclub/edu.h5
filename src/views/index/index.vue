<template>
    <div id="index">
        <div>
            <!--头部-->
            <div class="header">
                <!--搜索-->
                <div class="search">
                    <input type="text" placeholder="搜索你感兴趣的课程" disabled="true" >
                </div>
                <!--轮播图-->
                <div class="banner">
                    <img src="http://img0.imgtn.bdimg.com/it/u=92552686,2156973452&fm=26&gp=0.jpg" alt="">
                </div>
            </div>
            <!--svip的广告图-->
            <div class="svip-box">
                <img src="http://img4.imgtn.bdimg.com/it/u=1319548860,409888960&fm=26&gp=0.jpg">
            </div>
            <!--优惠券-->
            <div class="coupon-box">
                <div class="scroll-view">
                    <div class="pa-li">
                        <div class="li-item">
                            <!--<div class="left-info" wx:if="{{item.action_type.type == 'cash'}}">{{item.action_type.value}}元</div>-->
                            <div class="left-info">8折</div>
                            <div class="right-info">
                                <div class="label">春节使用</div>
                                <div class="soon">立即领取</div>
                            </div>
                        </div>
                    </div>
                    <div class="pa-li">
                        <div class="li-item">
                            <!--<div class="left-info" wx:if="{{item.action_type.type == 'cash'}}">{{item.action_type.value}}元</div>-->
                            <div class="left-info">8折</div>
                            <div class="right-info">
                                <div class="label">春节使用</div>
                                <div class="soon">立即领取</div>
                            </div>
                        </div>
                    </div>
                    <div class="pa-li">
                        <div class="li-item">
                            <!--<div class="left-info" wx:if="{{item.action_type.type == 'cash'}}">{{item.action_type.value}}元</div>-->
                            <div class="left-info">8折</div>
                            <div class="right-info">
                                <div class="label">春节使用</div>
                                <div class="soon">立即领取</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--课程分类的菜单-->
            <div class="menu-box">
                <div class="scroll-view">
                    <div class="pa-li">
                        <div class="li-item">
                            <div class="top-info">
                                数据
                            </div>
                            <div class="bottom-info">
                                大数据
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--推荐课程列表-->
            <div class="recommend-list">
                <div class="title mx-1px-bottom">推荐课程</div>
                <div class="ul-content">
                    <div class="li-item mx-1px-bottom">
                        <div class="left-info">
                            <img src="http://img1.imgtn.bdimg.com/it/u=653229645,1443777604&fm=26&gp=0.jpg">
                            <div class="limit-discount"></div>
                        </div>
                        <div class="right-info">
                            <div class="name">罗熙最可爱</div>
                            <div class="tiem-box">
                                <div class="time">
                                    <span class="iconfont icon-keshi"></span>
                                    33课时
                                </div>
                                <div class="many">
                                    99人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    <span class="iconfont icon-laoshi"></span>
                                    黔在在老师
                                </div>
                                <div class="money">¥ 99元</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="ibrand" bindtap="jumpWeb">
            <div class="iconfont icon-dibu logo"></div>
            <div class="txt">www.ibrand.cc</div>
        </div>
        <div class="black-mask {{is_black ? 'cur' : ''}}"></div>-->

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'index',
        data(){
            return {
                homeDate:''


            }
        },
        created(){
            //请求首页数据
            this.$store.dispatch('queryHomeDate');
            //监听从action js 里面的数据，拿到首页数据
            EventBus.$on('homeDate',this.homeDate);

        },
        methods:{

        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #index{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        padding-bottom:70px;
        .header{
            margin-bottom: 10px;
            .search{
                padding:8px 15px;
                background-color: #004E9D;
                input{
                    width: 100%;
                    border-radius:15px;
                    background-color: #fff;
                    padding: 0 13px;
                    height:30px;
                    line-height: 30px;
                }
                input::-webkit-input-placeholder {
                    color: #999999;
                    font-size: 12px;
                }
            }
            .banner{
                height: 212px;
                img{
                    height: 100%;
                    width: 100%;
                }


            }

        }
        .svip-box{
            padding:9px 15px;
            height:84px;
            background-color: #FFFFFF;
            margin-bottom:12px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .coupon-box{
            padding: 7px 10px;
            background-color: #fff;
            margin-bottom: 10px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .scroll-view{
                overflow-x: scroll;
                .pa-li{
                    display: inline-block;
                    width:175px;
                    padding:0 5px;
                    .li-item{
                        background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-19/90385913.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        display: flex;
                        padding:6px 10px;
                        align-items: center;
                        justify-content: space-between;
                        .left-info{
                            font-size:20px;
                            color: #202020;

                        }
                        .right-info{
                            .label{
                                font-size: 12px;
                                color: #fff;
                                line-height: 17px;
                                padding: 2px;
                            }
                            .soon{
                                padding: 4px 12px;
                                background-color: #fff;
                                color:#202020;
                                font-size: 10px;
                                display: inline-block;
                            }
                        }
                    }
                }

            }
        }
        .menu-box{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            background-color: #fff;
            padding: 18px 0;
            margin-bottom: 10px;
            .scroll-view{
                overflow-x: scroll;
                .pa-li{
                    display: inline-block;
                    text-align: center;
                    .li-item{
                        padding:0 20px;
                        .top-info{
                            display: inline-block;
                            width: 44px;
                            height: 44px;
                            border-radius: 50%;
                            background-color:#4F4F4F;
                            line-height: 44px;
                            text-align: center;
                            margin-bottom: 10px;
                            color: #FFFFFF;
                            box-sizing: border-box;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .bottom-info{
                            color: #909090;
                            font-size: 14px;
                            line-height: 20px;
                        }
                    }
                }

            }
        }
        .recommend-list{
            background-color: #fff;
            .title{
                padding:11px 15px;
                color:#4A4A4A;
                font-size: 16px;
                line-height: 22px;
            }
            .ul-content{
                .li-item{
                    padding: 20px 15px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .left-info{
                        position: relative;
                        width:135px;
                        height: 90px;
                        margin-right: 15px;
                        img{
                            width: 100%;
                            height: 100%;
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
