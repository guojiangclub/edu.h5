<template>
    <div id="success">
           <van-nav-bar
               title='付款结果'
               left-arrow
               @click-left="onClickLeft"
               v-if="is_navbar"
           />
           <div v-if="init && isSuccess">
               <div class="header">
                   <div class="title">支付成功</div>
                   <!--<div class="topic">本次支付使用20积分，使用10元余额</div>-->
                   <div class="btn-box">
                       <div class="study btn"  v-if="paid_info.order" @click="jumpDeatil(paid_info.order.course.id)">去学习</div>
                       <div class="home btn" @click="jumpIndex">回首页</div>
                   </div>
               </div>
               <div class="course" v-if="paid_info.order">
                   <div class="title">课程详情</div>
                   <div class="li-item mx-1px-bottom" @click="jumpDeatil(paid_info.order.course.id)">
                       <div class="left-info">
                           <img :src="paid_info.order.course.picture">
                       </div>
                       <div class="right-info">
                           <div class="name">{{paid_info.order.course.title}}</div>
                           <div class="teach-box">
                               <div class="money">¥ {{paid_info.order.course.display_price}}元</div>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="teacher" v-if="paid_info.coteries && paid_info.coteries.data && paid_info.coteries.data.length">
                   <div class="title">课程讲师数据圈</div>
                   <div class="cirle-list">
                       <div class="item mx-1px-bottom" v-for="(item,index) in paid_info.coteries.data" @click="jumpShare(item.id)">
                           <div class="logo">
                               <img :src="item.avatar">
                           </div>
                           <div class="text">
                               <div class="name">{{item.name}}</div>
                               <div class="owner">{{detail.user.user_name}}</div>
                           </div>
                           <div class="iconfont icon-jiantou"></div>
                       </div>
                   </div>
               </div>
           </div>
        <div v-if="init == false && isSuccess == true">
            <div class="header">
                <div class="title">支付失败</div>
                <div class="topic">如已支付成功，请联系客服</div>
                <div class="btn-box">
                    <div class="study btn"  @click="jumpDeatil(paid_info.order.course.id)" v-if="paid_info.order">查看课程</div>
                    <div class="home btn" @click="payAgain()" v-if="pay_again">重新支付</div>
                </div>
            </div>
        </div>


    </div>

</template>

<script type="text/ecmascript-6">
    import { Cache, cache_keys, exif ,env} from '../../utils/util';
    import { List,NavBar } from 'vant';
    export default {
        component:{
            List,
            NavBar
        },
        name: 'recharge-success',
        data(){
            return {
                order_no:'',
                paid_info:'',
                init:false,
                isSuccess:false,
                is_navbar:true,
                pay_again:true
            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
            let order_no = this.$route.query.order_no;
            let charge_id = this.$route.query.charge_id;
            if(order_no){
                let data = {
                    order_no:order_no,
                    charge_id:charge_id || ''
                }
                this.$store.dispatch('queryOrderPaid',data)
            } else {
                this.$dialog.alert('非法进入')
            }
            EventBus.$on('paidOrder',this.getOrderInfo);
        },
        beforeDestroy(){
            EventBus.$off('paidOrder')
        },
        mounted(){

        },
        methods:{
            jumpShare(id){
                this.$router.push({
                    name:'index-shareCirle',
                    query:{
                        id:id
                    }
                })
            },
            onClickLeft(){
                this.$router.push({
                    name:'index-index'
                })
            },
            getOrderInfo(res){
                if(res.data.order.status == 'paid'){
                    this.paid_info = res.data;
                    this.init = true;
                    this.isSuccess = true
                } else {
                    this.paid_info = res.data;
                    this.init = false;
                    this.isSuccess = true
                }

            },
            jumpDeatil(course_id){
                this.$router.push({
                    name:'index-detail',
                    params:{
                        id:course_id
                    }
                })
            },
            jumpIndex(){
                this.$router.push({
                    name:'index-index'
                })
            },
            //点击重新支付按钮
            payAgain(){
                let order_no = this.$route.query.order_no;
                let charge_id = this.$route.query.charge_id;
                if(order_no){
                    let data = {
                        order_no:order_no,
                        charge_id:charge_id || ''
                    }
                    this.$store.dispatch('queryOrderPaid',data);
                    this.pay_again = false;
                } else {
                    this.$dialog.alert('非法进入')
                }

            }

        }


    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #success{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        .van-nav-bar+div{
            padding-top: 66px !important;
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
        .header{
            background-color: #FFFFFF;
            padding: 20px 0 30px 0;
            text-align: center;
            margin-bottom: 10px;
            .title{
                color: #F8B62D;
                font-size: 25px;
                line-height: 33px;
                padding-bottom: 14px;
            }
            .topic{
                color: #9B9B9B;
                font-size: 12px;
                line-height: 16px;
                padding-bottom: 22px;
            }
            .btn-box{
                display: flex;
                align-items: center;
                justify-content: center;
                .btn{
                    width: 100px;
                    height: 30px;
                    text-align: center;
                    line-height:30px;
                    border: 1px solid #FB5054;
                    font-size:14px;
                    border-radius: 49px;
                }
                .study{
                    color: #FB5054;
                    margin-right: 37px;
                }
                .home{
                    color: #FFFFFF;
                    background-color: #FB5054;
                }
            }

        }
        .course{
            margin-bottom: 10px;
            .title{
                padding: 10px 15px;
                color:#909090;
                font-size: 12px;
                line-height: 17px;
            }
            .li-item{
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
                        color: #202020;
                        font-size: 15px;
                        line-height: 22px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        margin-bottom: 8px;
                        height: 44px;
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
        .teacher{
            .title{
                padding: 10px 15px;
                color:#909090;
                font-size: 12px;
                line-height: 17px;
            }
            .cirle-list{
                padding: 0 0 0 15px;
                background-color: #FFFFFF;
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


    }



</style>
