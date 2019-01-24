<template>
    <div id="personal-center">
            <div class="top-bg">
                <div class="header">
                    <div class="avatar">
                        <img src="http://img5.imgtn.bdimg.com/it/u=2987747399,99299574&fm=11&gp=0.jpg" alt="">
                    </div>
                    <div class="info">
                        <div class="nick-name">
                            可爱的我
                        </div>
                    </div>
                    <!--<button wx:if="{{!info.user.user_info_filled && token && init}}" class="user-btn" open-type="getUserInfo" bindgetuserinfo="bindUserInfo">
                        <div class="phone-text">点击完善个人信息</div>
                    </button>-->
                    <div class="svip">
                        <div class="gift">
                            <span class="iconfont icon-gift"></span>
                        </div>
                        <div class="text">
                            <div class="s-txt">SVIP</div>
                            <div class="t-txt">限时优惠中</div>
                        </div>
                    </div>
                </div>
               <!-- <div class="header" data-url="pages/user/index/main" bindtap="jumpPath" wx:else>
                    <div class="txt">注册/登录</div>
                </div>-->
            </div>
            <div class="contnet">
                <!--<div class="balance-point">
                    <div class="item">
                        <div class="iconfont icon-wodeyue"></div>
                        <div class="txt">我的余额</div>
                        <div class="iconfont icon-i">i</div>
                    </div>
                    <div class="item">
                        <div class="iconfont icon-wodeyue"></div>
                        <div class="txt">我的积分</div>
                        <div class="iconfont icon-i">i</div>
                    </div>
                </div>-->
                <div class="balance-point">
                    <div class="item">
                        <div class="iconfont icon-youhuiquan"></div>
                        <div class="txt">我的优惠券</div>
                        <div class="iconfont icon-jiantou"></div>
                    </div>
                </div>
                <div class="balance-point">
                    <div class="item">
                        <div class="iconfont icon-jiangshi"></div>
                        <div class="txt">成为讲师</div>
                        <div class="iconfont icon-jiantou"></div>
                    </div>
                </div>
                <div class="balance-point">
                    <div class="item">
                        <div class="iconfont icon-lianxiwomen"></div>
                        <div class="txt">联系我们</div>
                        <div class="iconfont icon-jiantou"></div>
                    </div>
                    <div class="item">
                        <div class="iconfont icon-shezhi"></div>
                        <div class="txt">设置</div>
                        <div class="iconfont icon-jiantou"></div>
                    </div>
                </div>
            </div>
            <!--弹出客服-->
            <div class="maks">

            </div>

            <div class="attention-WeChat">
                <div class="service-box">
                    <div class="code item">
                        <img src="http://img1.imgtn.bdimg.com/it/u=3358168381,4074144718&fm=26&gp=0.jpg" alt="" />
                        <div class="text">
                            保存二维码用微信识别添加
                        </div>
                    </div>

                    <div class="item phone">
                        <div class="phone-text">
                            <img src="" alt="" />
                            <div class="phone-warp">
                                <i class="iconfont icon-dianhua"></i>
                                <div class="phone-num">45700742947</div>
                                <div>点击电话，咨询客服</div>
                            </div>
                        </div>
                        <div>
                            2018年
                        </div>
                    </div>
                </div>
            </div>
      <!--  <div class="ibrand" bindtap="jumpWeb">
            <div class="iconfont icon-dibu logo"></div>
            <div class="txt">www.ibrand.cc</div>
        </div>
        <div class="black-mask {{is_black ? 'cur' : ''}}"></div>-->
    </div>


</template>

<script type="text/ecmascript-6">
    export default {
        name: 'users-index',
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
    #personal-center{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .top-bg {
            background-color: #004E9D;

            .header{
                padding: 30px 0px 30px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .txt{
                    font-size: 24px;
                    width: 100%;
                    color: #FFFFFF;
                    height: 72px;
                    text-align: center;
                    line-height: 72px;
                }
                .avatar{
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    border: 2px solid #ffffff;
                    margin-right: 20px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .info{

                }
                .nick-name{
                    color: #ffffff;
                    font-size:16px;
                    line-height: 22px;
                    font-weight: bold;
                    flex: 1;
                }
                .phone {
                    color: #ffffff;
                    font-size:13px;
                }
                .svip{
                    padding: 6px;
                    background:linear-gradient(180deg,rgba(101,101,101,1) 0%,rgba(69,69,69,1) 100%);
                    border-radius:100px 0px 0px 100px;
                    display: flex;
                    align-items: center;
                    .gift{
                        width:30px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 50%;
                        background:rgba(0,0,0,.15);
                        span{
                            color: #E6B980;
                            font-size: 16px;
                        }
                    }
                    .text{
                        padding-left: 6px;
                        .s-txt{
                            font-size:14px;
                            color:#E6B980;
                            font-weight: 600;
                        }
                        .t-txt{
                            color: #E7BF8B;
                            font-size: 10px;
                        }
                    }
                }
                .user-btn {
                    margin: 0;
                    padding: 0;
                    background: transparent;
                    color: #fff;
                    font-size:16px;
                    &:after {
                        border: none;
                    }
                }
            }

        }
        .contnet{
            padding:10px 0 14px 0;
            .balance-point{
                background-color: #FFFFFF;
                margin-bottom: 10px;
            }
            .coupon{
                background-color: #FFFFFF;
                margin-bottom: 10px;
            }
            .item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                color:#4A4A4A;
                font-size: 14px;
                height: 60px;
                line-height: 60px;
                padding:0 15px;
                .iconfont{
                    color:#004E9D;
                    font-size: 20px;
                    &.icon-jiantou{
                        color: #D7D7D7;
                        font-size: 12px;
                    }
                }
                .txt{
                    flex: 1;
                    font-weight: 500;
                    padding-left: 10px;
                }
                .icon-i{
                    color: #D7D7D7;
                    font-size: 12px;
                }

            }
        }
        //客服部分
        .attention-WeChat{
            position:fixed;
            bottom:0;
            width:100%;
            height:0;
            z-index:50;
            //transition:all .3s linear;
            color: #ffffff;

            text-align: center;
            overflow: hidden;
            &.cur {
                height: 40%;
            }
            .service-box {
                display: flex;
                align-content: center;
                background: #ffffff;
                height: 100%;
                font-size: 12px;


                .item {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: #000;
                    align-items: center;
                    justify-content: space-around;
                    image {
                        width: 72%;
                    }
                    &.phone {
                        background: #4B8AF2;
                        color: #ffffff;

                        &:before {
                            content: '';
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            background: #ffffff;
                            width: 20px;
                            height: 20px;
                            border-radius: 100%;
                        }
                        .phone-text {
                            width: 100%;
                            position: relative;
                            img{
                                //width: 72%;
                                opacity: 0;
                            }

                            font-size: 12px;

                            .phone-warp {
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                width: 100%;
                            }
                            i{
                                color: #FFFFFF;
                                font-size: 50px;
                            }

                            .phone-num {
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
            .vmc-popup{
                background: none;
            }
        }
        .maks{
            display: none;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.4);
            z-index: 50;
            &.cur{
                display: block;
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
