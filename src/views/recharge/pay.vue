<template>
    <div id="pay">
        <div class="header-detail" >
            <div class="item mx-1px-bottom">
                <div class="left-info">
                    <img src="http://img0.imgtn.bdimg.com/it/u=2141622672,2388551296&fm=26&gp=0.jpg">
                </div>
                <div class="right-info">
                    <div class="name">没有想到吧</div>
                    <!--<div class="tiem-box">
                        <div class="time">
                            <span></span>
                            37课时
                        </div>
                        <div class="many">
                            96人学习
                        </div>
                    </div>-->
                    <div class="teach-box">
                        <!--<div class="teacher">
                            <span></span>
                            在在老师
                        </div>-->
                        <div class="money">¥ 888元</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="li-item">
                <div class="title">学员信息</div>
                <div class="infomation">
                    <!--<div class="name" wx:if="{{is_perfect}}">{{info.userDetails.name}}</div>-->
                    <div class="name">请填写学员信息</div>
                    <div class="iconfont icon-jiantou"></div>
                </div>
            </div>
            <div class="li-item">
                <div class="title">优惠信息</div>
                <div class="infomation">
                    <div class="name">SVIP优惠</div>
                    <div class="txt"></div>
                    <div class="check">
                        <!--<checkbox-group>
                            <label>
                                <checkbox color="#fff"></checkbox>
                            </label>
                        </checkbox-group>-->
                        <!--使用的vlc的组件-->
                        <CheckBox-group :vertical="vertical">
                            <CheckBox>
                                优惠 999元
                            </CheckBox>

                        </CheckBox-group>

                    </div>
                </div>
                <div class="introduce mx-1px-bottom">免费购买课程剩余可使用3门</div>
                <!--<div class="infomation" wx:if="{{info.isVip == false}}">
                    <div class="name">SVIP优惠</div>
                    <div class="txt">勾选加入</div>
                    <div class="check">
                        &lt;!&ndash;<checkbox-group>
                            <label>
                                <checkbox color="#fff"></checkbox>
                            </label>
                        </checkbox-group>&ndash;&gt;
                        <input type="checkbox">
                    </div>
                </div>-->
                <!--<div class="introduce mx-1px-bottom" wx:if="{{info.isVip == false}}">成为svip，所选课程可免费购买</div>-->
                <div class="infomation mx-1px-bottom">
                    <div class="name">优惠券：</div>
                    <div class="txt">满100-50</div>
                    <div class="iconfont icon-jiantou"></div>
                </div>
                <!-- <div class="infomation">
                     <div class="name">使用积分</div>
                     <div class="txt">使用2500积分，抵扣¥25</div>
                     <div class="check">
                         <checkbox-group>
                             <label>
                                 <checkbox color="#fff"></checkbox>
                             </label>
                         </checkbox-group>
                     </div>
                 </div>
                 <div class="introduce mx-1px-bottom">当前可用积分 2541 分</div>-->
            </div>
            <!--<div class="li-item">
                <div class="title">支付方式</div>
                <div class="infomation">
                    <div class="name"><span class="iconfont"></span>余额支付</div>
                    <div class="check">
                        <checkbox-group>
                            <label>
                                <checkbox color="#fff"></checkbox>
                            </label>
                        </checkbox-group>
                    </div>
                </div>
            </div>-->
            <div class="li-item">
                <div class="title">备注信息</div>
                <div class="note">
                    <div class="box mx-1px-top-bottom">
                    <textarea name="" id="">

                    </textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="pay-btn">
            <div class="money">
                应付：<span>¥ 899</span>
            </div>
            <!--<div class="money" wx:else>
                应付：<span>¥ {{info.course.display_price}}</span>
            </div>-->
            <div class="go-pay">
                去付款
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'recharge-pay',
        data(){
            return {
                data:[],
                vertical:true
            }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #pay{
        padding-bottom:120px;
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .header-detail{
            background-color: #FFFFFF;
            margin-top: 10px;
            .item{
                padding: 20px 15px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                .left-info{
                    width:135px;
                    height: 90px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .right-info{
                    flex: 1;
                    padding-left: 15px;
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
                    }
                    .teach-box{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        color:#909090;
                        font-size: 12px;
                        line-height: 14px;
                        padding-top:24px;
                        .money{
                            color: #4A4A4A;
                        }
                    }
                }
            }
        }
        .content{
            .li-item{
                margin-bottom: 10px;
                .title{
                    padding: 10px 15px;
                    line-height: 17px;
                    font-size: 12px;
                    color:#909090;
                }
                .infomation{
                    background-color: #FFFFFF;
                    display: flex;
                    padding:12px 20px 12px 15px;
                    align-items: center;
                    justify-content: space-between;
                    color:#4A4A4A;
                    .name{
                        color:#4A4A4A;
                        font-size: 14px;
                        line-height: 20px;
                    }
                    .txt{
                        color: #FB5559;
                        font-size: 13px;
                        line-height: 18px;
                        flex: 1;
                        padding-right: 10px;
                        text-align: right;

                    }
                    .iconfont{
                        color: #909090;
                        font-size: 12px;
                    }
                    .check{
                        .vlc-checkbox{
                            color: #FB5559;
                            font-size: 13px;
                            line-height: 18px;
                            flex: 1;
                            padding-right: 10px;
                            text-align: right;
                        }


                    }

                }
                .introduce{
                    padding: 3px 15px 10px 15px;
                    background-color: #FFFFFF;
                    color: #909090;
                    font-size:12px;

                }
            }
            .note{
                background-color: #FFFFFF;
                padding: 15px;
                .box{
                    textarea{
                        padding: 5px;
                        width: 100%;
                        height: 38px;
                        font-size: 12px;
                        line-height: 17px;
                    }
                }
            }

        }
        .pay-btn{
            position: fixed;
            right: 0;
            left: 0;
            bottom: 0;
            height: 70px;
            box-shadow:0px 2px 4px 2px rgba(0,0,0,0.15);
            background-color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px 0 20px;
            .money{
                flex: 1;
                color: #4A4A4A;
                font-size: 14px;
                line-height: 20px;
                span{
                    color: #FB5054;
                }
            }
            .go-pay{
                flex: 1;
                height:44px;
                background: #FB5054;
                border-radius:4px;
                line-height: 44px;
                text-align: center;
                color: #FFFFFF;

            }
        }

    }



</style>
