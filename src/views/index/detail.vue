<template>
    <div id="detail">
        <div class="header">
            <div class="share-home">
                <div class="home">
                    <span class="iconfont icon-shouye"></span>
                    首页
                </div>
                <div class="share">
                    <span class="iconfont icon-fenxiang"></span>
                    分享课程
                </div>
            </div>
            <div class="banner">
                <img src="http://img4.imgtn.bdimg.com/it/u=3470668402,1358978254&fm=26&gp=0.jpg">
            </div>
            <div class="course-intro">
                <div class="title">罗熙真可爱</div>
                <div class="text">
                    大哥我错了原谅我好嘛
                </div>
                <div class="teach-student mx-1px-top">
                    <div class="teacher">
                        <span class="iconfont icon-laoshi"></span>
                        黔老师
                    </div>
                    <div class="student">
                        45人学习
                    </div>
                </div>
            </div>
        </div>
        <!--促销详情-->
        <div class="sales-promotion">
            <div class="preferential">特价优惠中</div>
            <div class="count-down">
                仅剩 14 天 13时 38分 35秒
            </div>
            <div class="origin-price">原价：¥88</div>
        </div>
        <div class="current-coupon">
            <div class="txt">当前课程有3张优惠券可用</div>
            <div class="pick-up">去领取 <span class="iconfont icon-jiantou"></span></div>
        </div>
        <!--课程介绍-->
        <div class="navbar mx-1px-bottom">
            <div class="block-box">
                <div  class="navbar-item activity">
                    <div class="navbar-title">课程介绍</div>
                </div>
                <div  class="navbar-item">
                    <div class="navbar-title">课程目录</div>
                </div>
                <div  class="navbar-item">
                    <div class="navbar-title">通知公告</div>
                </div>

            </div>
            <!--<div class="navbar-slider" style="width: {{width}}px; transform: translateX({{sliderOffset}}px); -webkit-transform: translateX({{sliderOffset}}px);"></div>-->
        </div>
        <div class="tab-content">
            <!--当activeindex == 0 课程概述-->
            <div class="li-content">
                <div class="teacher-to mx-1px-bottom">
                    <div class="title">师资介绍</div>
                    <div class="teacher-detail">
                        <div class="avatar">
                            <img src="http://img3.imgtn.bdimg.com/it/u=483936151,891738374&fm=26&gp=0.jpg">
                        </div>
                        <div class="text">
                            <div class="name">在在老师</div>
                            <div class="label">淘宝7年资深讲师淘宝7年资深讲师 国家工信淘宝7年资深讲师 国家工信 国家工信部高级电子商务师</div>
                            <div class="circle mx-1px-top">
                                <div class="cirle-name">相关数据圈</div>
                                <div class="cirle-detail">
                                    糖醋水蜜桃
                                    <span class="iconfont icon-jiantou"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="course-to">
                    <div class="title">课程介绍</div>
                    <!--副文本-->
                    <div class="content-to">

                    </div>
                </div>
            </div>
            <!--当activeindex== 1 课程目录-->
            <div class="li-content">
                <div class="title">
                    课程目录
                    <span>（共68节课）</span>
                </div>
                <div class="item-list">
                    <div class="topic mx-1px-bottom">数据结构分析</div>
                    <div class="course-list">
                        <div class="item mx-1px-bottom">
                            <div class="txt">
                                <span class="iconfont icon-shipinbofang"></span>
                                课时1： 数据结构是什么样子的
                            </div>
                            <div class="free-btn" v-if="true">免费试看</div>
                            <!--<div class="the-length" >{{item.length_min}}</div>-->
                        </div>
                    </div>
                </div>
            </div>
            <!--当activeindex== 3 时 通知公告-->
            <div class="li-content">
                <div>
                    <div class="notice-item">
                        <!--<div class="title">课程配套课件下载链接：</div>
                        <div class="content">https://pan.baidu.com/share/init?surl=9os6Cxw1NkuqtF76yFvYyg </div>-->
                        <div class="content">

                        </div>
                        <div class="teacher-time mx-1px-bottom">
                            <div class="teacher">
                                <span class="iconfont icon-laoshi"></span>
                                在在老师
                            </div>
                            <div class="time">2019年8月21号</div>
                        </div>
                        <div class="from">来自：数据分析</div>
                    </div>
                </div>
                <!--<div class="only-see" wx:if="{{!announcement.length}}">只有课程学员才能查看课程公告</div>-->
            </div>

        </div>
        <!--svip  加 免费试看-->
        <div class="svip-buy">
            <div class="svip">
                <image src="http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-19/61152215.jpg"></image>
                <div class="goodness">
                    成为svip，所选课程可省 ¥299
                </div>
                <div class="soon-go">
                    立即省钱
                    <span class="iconfont icon-jiantou"></span>
                </div>
            </div>
            <div class="buy-box">
                <div class="how-much">
                    <!--如果价格为0，显示免费-->
                    <div class="money">免费</div>
                    <!--如果不是免费课程，非svip 无促销，显示原价-->
                   <!-- <div class="money" wx:if="{{detail.display_price != 0 && detail_meta.isVip == false && detail.is_discount == 0}}">{{detail.display_price}}</div>
                    &lt;!&ndash;如果不是免费课程，非svip 有促销&ndash;&gt;
                    <div class="money"  wx:if="{{detail.display_price != 0 && detail_meta.isVip == false && detail.is_discount == 1}}">
                        ¥ {{detail.display_discount_price}}
                        <span class="origin">{{detail.display_price}}</span>
                    </div>-->
                    <!-- 非免费课程，已经是 SVIP，同时免费课程未使用完，则显示0元。原价删除线显示。-->
                    <div class="unlock">解锁全部课时</div>
                </div>
                <!-- <div class="free-btn">免费试看</div>-->
                <div class="buy-course">购买课程</div>
            </div>
        </div>
        <!--已经买了  查看更多课程 立即学习-->
       <!-- <div class="see-study" wx:if="{{detail_meta.isMember}}">
            <div class="see-more btn" bindtap="jumpIndex">查看更多课程</div>
            <div class="study-soon btn" bindtap="jumpStudy">立即学习</div>
        </div>-->
        <!--联系客服-->
        <div class="customer-service">
            <div class="iconfont icon-lianxikefu"></div>
            <div class="text">联系
                <div>客服</div></div>
        </div>
        <!--新人优惠券-->
        <!-- <div class="couple-conpon">
             <div class="paney-body">
                 <div class="close">
                     <span class="iconfont icon-yiquxiao"></span>
                 </div>
                <div class="paney-content">
                    <div class="title">新人礼已到账</div>
                    <div class="text">
                        <div class="friend">Hi，亲爱的朋友</div>
                        <div>这是我送给你的优惠券，快去使用吧！</div>
                    </div>
                    <div class="img-coupon">
                        <div class="gift-box">
                            <span class="iconfont icon-gift"></span>
                        </div>
                        <div class="gift-text">
                            <div class="label">满28元减4元</div>
                            <div class="topic">支持余额支付使用</div>
                        </div>
                        <div class="money">
                            <span>¥</span>
                            4
                        </div>
                    </div>
                    <div class="see">优惠券请到“我的优惠券”查看</div>
                    &lt;!&ndash;<div class="sure-btn">登录领取优惠券</div>&ndash;&gt;
                    <div class="sure-btn">知道了</div>
                </div>
             </div>
         </div>-->
        <!--查看选择优惠券部分-->
        <div class="maks">
        </div>

        <div class="popup-box">
            <div class="popup">
                <div class="popup-top">
                    <div class="title">
                        优惠券
                        <div class="close">
                            X
                        </div>
                    </div>
                </div>
                <div class="popup-bottom coupon">
                    <div class="title">
                        可领优惠券
                    </div>
                    <div class="coupon-box" >
                        <div class="item active">
                            <div class="left-info">
                                <div class="money">
                                    <span>¥</span>
                                    999
                                </div>
                               <!-- <div class="money" wx:if="{{item.action_type.type == 'percentage'}}">
                                    {{item.action_type.value}}
                                    <span>折</span>
                                </div>-->
                                <div class="label">春节大礼</div>
                            </div>
                            <div class="right-info">
                                <div class="title">满100元</div>
                                <div class="created-at">
                                    2018.01.10-2018.10.15
                                    <span class="already">已领取</span>
                                    <!--<span wx:else>点击领取</span>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--弹出客服-->
        <div class="maks">

        </div>

        <div class="attention-WeChat">
            <div class="service-box">
                <div class="code item">
                    <img src="http://img0.imgtn.bdimg.com/it/u=826856843,2196130321&fm=26&gp=0.jpg" alt="">
                    <div class="text">
                        保存二维码用微信识别添加
                    </div>
                </div>

                <div class="item phone">
                    <div class="phone-text">
                        <img  src="" alt="" />
                        <div class="phone-warp">
                            <i class="iconfont icon-dianhua"></i>
                            <div class="phone-num">service_info.online_service_self.phone}}</div>
                            <div>点击电话，咨询客服</div>
                        </div>
                    </div>
                    <div>
                        service_info.online_service_self.time
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'detail',
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


</style>
