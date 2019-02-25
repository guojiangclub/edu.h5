<template>
    <div id="pay">
        <div class="header-detail" >
            <div class="item mx-1px-bottom"  v-if="info.course">
                <div class="left-info">
                    <img :src="info.course.picture">
                </div>
                <div class="right-info">
                    <div class="name">{{info.course.title}}</div>
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
                        <div class="money" v-if="info.course">¥ {{info.course.display_price}}元</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="li-item">
                <div class="title">学员信息</div>
                <div class="infomation" @click="perfectUser">
                    <div class="name" v-if="is_perfect && info.userDetails">{{info.userDetails.name}}</div>
                    <div class="name" v-else>请填写学员信息</div>
                    <div class="iconfont icon-jiantou"></div>
                </div>
            </div>
            <div class="li-item" v-if="info.order && info.order.total != 0">
                <div class="title">优惠信息</div>
                <div class="infomation" v-if="info && info.isVip">
                    <div class="name">SVIP优惠</div>
                    <div class="txt">优惠 {{svip_price}}元</div>
                    <div class="check">
                        <van-checkbox v-model="user_vip" checked-color="#004E9D" @change="changeVip"></van-checkbox>
                    </div>
                </div>
                <div class="introduce mx-1px-bottom" v-if="info && info.isVip">免费购买课程剩余可使用{{info.freeCourseCount}}门</div>
                <div class="infomation" v-if="info.isVip == false">
                    <div class="name">SVIP优惠</div>
                    <div class="txt">勾选加入</div>
                    <div class="check">
                        <van-checkbox v-model="buy_svip" checked-color="#004E9D"></van-checkbox>
                    </div>
                </div>
                <div class="introduce mx-1px-bottom" v-if="info && info.isVip == false">成为svip，所选课程可免费购买</div>
                <div class="infomation mx-1px-bottom" @click="changeCoupon">
                    <div class="name">优惠券：</div>
                    <div class="txt" v-if="select_coupon">{{select_coupon.discount.label}}</div>
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
                    <textarea name="" id="" v-model="note">

                    </textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="pay-btn">
            <div class="money" v-if="select_coupon || user_vip">
                应付：<span>¥ {{amount}}</span>
            </div>
            <div class="money" v-else>
                应付：<span v-if="info.course">¥ {{info.course.display_price}}</span>
            </div>
            <div class="go-pay" @click="goPay">
                去付款
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import { env, is,  Cache, cache_keys } from '../../utils/util';
    import { Checkbox, CheckboxGroup } from 'vant';
    export default {
        name: 'recharge-pay',
        component:{
            Checkbox,
            CheckboxGroup
        },
        data(){
            return {
                info:'',
                select_coupon:'',
                amount:'',//元
                penny:'',//分
                is_perfect:true,
                user_vip:false,
                svip_price:'',
                coupons:'',
                bestCouponID:'',
                buy_svip:false,
                note:''
            }
        },
        created(){
            if(Cache.get(cache_keys.order_info)){
                EventBus.$on('chargeOrder',this.getCharge)
            } else {
                this.$router.push({
                    name:'index-index'
                })
            }
        },
        beforeDestroy(){
            EventBus.$off('chargeOrder')
        },
        mounted(){
            //获取一开始存的订单信息的 优惠券和最优的优惠圈
            var old_order_info = Cache.get(cache_keys.old_order_info);
            this.coupons = old_order_info.coupons;
            this.bestCouponID = old_order_info.bestCouponID;
            //获取支付页面缓存的数据
            var order_info = Cache.get(cache_keys.order_info);
            //页面数据
            this.info = order_info
            //优惠券做处理
            var bestCouponID = order_info.bestCouponID;
            if(bestCouponID){
                var coupons = order_info.coupons;
                var old_money = order_info.course.price;
                var new_money='';
                //如果有默认最优 优惠圈id ，选出这张优惠券
                coupons.forEach((val)=>{
                    if (val.id == bestCouponID){
                    this.select_coupon = val
                }
            })
                if(this.user_vip){
                    let value_vip = this.info.vipMember.plan.actions.course_discount_percentage;
                    let off_money = old_money * (value_vip/100);
                    this.countMoney(new_money,off_money);

                } else {
                    this.countMoney(new_money,old_money);
                }
            }
            //完善信息
            var userDetail = order_info.userDetails;
            if (userDetail) {
                this.is_perfect=true
            } else {
                this.is_perfect=false
            }
            //判断用户是否是svip
            if(order_info.isVip){
                //算可以节省的钱
                //折数
                var value_vip = order_info.vipMember.plan.actions.course_discount_percentage;
                //如果没有剩余免费课程
                if(order_info.freeCourseCount == 0){
                    var s_money = order_info.course.price;
                    var off_money = s_money * [(100 - value_vip) /100];
                    this.svip_price = (off_money/100).toFixed(2)
                } else {
                    //如果剩余免费课程
                    this.svip_price = order_info.course.display_price
                }
            }

        },
        methods:{
            //处理charge数据接口
            getCharge(res){
                    if(res.data.redirectUrl){
                        window.location.href = res.data.redirectUrl;
                       /* Cache.clear(cache_keys.order_info);
                        Cache.clear(cache_keys.old_order_info);*/
                        window.close();
                    } else {
                        this.$dialog.alert({
                            message:res.message || '发起支付失败'
                        })
                    }

            },
            //去付款点击的事件
            goPay(){
                if(this.is_perfect){
                    //请求charege接口
                    let channel = '';
                    let origin = window.location.origin;
                    let pathname = window.location.pathname;
                    if(env.isWechat){
                        channel = 'wx_pub'
                    } else {
                        channel = 'alipay_wap'
                    }
                    let data = {
                        order_no:this.info.order.sn,
                        coupon_id:this.select_coupon.id,
                        channel:channel,
                        note:this.note,
                        extra:{
                            successUrl:origin + pathname + '#'+ '/recharge/success?order_no='+this.info.order.sn,
                            failUrl:origin + pathname + '#'+ '/recharge/success?order_no='+this.info.order.sn
                        }
                    }
                    this.$store.dispatch('queryOrderChare',data)
                } else {
                    this.$dialog.alert({
                        message:'请您先填写学员信息'
                    })
                }


            },
            //切换优惠券
            changeCoupon(){
                if(this.penny == 0 || this.info.coupons.length == 0){
                    this.$dialog.alert({
                        message:'暂无可用优惠券'
                    })
                } else {
                    this.$router.push({
                        name:'coupon-center'
                    })
                }

            },
            //是否选择了svip优惠,需要计算优惠券的钱，跟筛选可用优惠券
            changeVip(){
                //如果是svip
                if(this.info.isVip){
                    //并且使用了svip
                    if(this.user_vip){
                        if(this.info.freeCourseCount == 0){
                            //svip特权免费课程已经用完，则只享受打折
                            let value_vip = this.info.vipMember.plan.actions.course_discount_percentage;
                            let ol_money = this.info.course.price;
                            let of_money = ol_money * (value_vip/100);
                            let new_coupons = [];//用于装删选后的优惠券
                            let order_info = this.info;
                            //在这里需要删选可以用的优惠券
                            this.coupons.forEach((val,index)=>{
                                if (val.orderAmountLimit <= of_money){
                                    new_coupons.push(val)
                                }
                            })
                            order_info.coupons = new_coupons;
                            if(new_coupons.length){
                                order_info.bestCouponID = new_coupons[0].id;
                            }
                            Cache.set(cache_keys.order_info,order_info,0);
                            this.info = Cache.get(cache_keys.order_info);
                            //第一种，有优惠券并且可以使用优惠券的情况 或者 不可以使用优惠券的情况
                            if(this.select_coupon){
                                //可以使用优惠券的情况
                                let new_money = '';
                                if(of_money >= this.select_coupon.orderAmountLimit){
                                    //如果是满减，算出要付的钱
                                    this.countMoney(new_money,of_money);

                                } else {
                                    //不能使用优惠券
                                        this.amount = (of_money/100).toFixed(2);
                                        this.penny = of_money;
                                        this.select_coupon = ''
                                }
                            } else {
                                //第二种没有优惠券
                                    this.amount  =  (of_money/100).toFixed(2);
                                    this.penny = of_money
                            }
                        } else {
                            //svip有免费课程、
                                this.amount = '0.00';
                                this.penny = 0;
                                this.select_coupon = ''
                        }
                    } else {
                        //如果没有使用svip，但是有优惠券
                        if(this.bestCouponID){
                            let coupons = this.coupons;
                            var detail = this.info;
                                this.info.coupons = coupons
                            coupons.forEach(val=>{
                                if (val.id == this.bestCouponID){
                                    this.select_coupon = val
                                }
                            })
                            detail.coupons = coupons;
                            detail.bestCouponID = this.bestCouponID;
                            Cache.set(cache_keys.order_info,detail,0);
                        }
                        if(this.select_coupon){
                            let new_money = '';
                            let old_money = this.info.course.price;
                            this.countMoney(new_money,old_money);
                        }
                    }

                }

            },
            //跳到完善学员信息页面
            perfectUser(){
              this.$router.push({
                  name:'index-studentinfo'
              })
            },
            //封装优惠券算钱的方法
            countMoney(new_money,old_money){
                //如果是满减，算出要付的钱
                if(this.select_coupon.discount.action_type.type == 'cash'){
                    new_money = old_money + this.select_coupon.adjustmentTotal;
                    this.amount = (new_money/100).toFixed(2);
                    this.penny = new_money
                } else if(this.select_coupon.discount.action_type.type == 'percentage'){
                    //如果是打折，算出要付的钱
                    new_money = old_money * (this.select_coupon.discount.action_type.value/10);
                    this.amount = (new_money/100).toFixed(2);
                    this.penny = new_money
                }

            },

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
                        .van-checkbox{
                            color: #FB5559;
                            font-size: 13px;
                            line-height: 18px;
                            flex: 1;
                            padding-right: 10px;
                            text-align: right;
                            .van-checkbox__label{
                                color: #FB5559;
                            }
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
