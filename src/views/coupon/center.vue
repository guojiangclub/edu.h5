<template>
    <div id="center">
        <div class="content">
            <div class="item" :class="index == activeIndex ? 'active' : ''" v-for="(item,index) in coupons" :key="index" @click="change(index,item.id)">
                <div class="left-info">
                    <div class="money" v-if="item.discount.action_type.type == 'cash' ">
                        <span>¥</span>
                        {{item.discount.action_type.value}}
                    </div>
                    <div class="money" v-if="item.discount.action_type.type == 'percentage' ">
                        {{item.discount.action_type.value}}
                        <span>折</span>
                    </div>
                    <div class="label">{{item.discount.label}}</div>
                </div>
                <div class="right-info">
                    <div class="title">{{item.discount.title}}</div>
                    <div class="created-at">{{item.discount.use_start_time}}-{{item.discount.use_end_time}}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import { Cache, cache_keys, exif } from '../../utils/util';
    export default {
        name: 'coupon-center',
        data(){
            return {
                coupons:'',//优惠券
                activeIndex:''
            }
        },
        created(){

        },
        beforeDestroy(){

        },
        mounted(){
            var order_info = Cache.get(cache_keys.order_info);
            this.coupons = order_info.coupons;
            var bestCouponID = order_info.bestCouponID;
            var coupons = order_info.coupons;
            coupons.forEach((val,index)=>{
                if (val.id == bestCouponID){
                        this.activeIndex = index
                }
            })
        },
        methods:{
            change(index,id){
                this.activeIndex = index;
                var info = Cache.get(cache_keys.order_info);
                info.bestCouponID = id;
                Cache.set(cache_keys.order_info,info,0)
                //返回上一页
                window.history.back(-1);
            }

        }



    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #center{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;

        .content{
            padding: 15px;
            .item{
                position: relative;
                display: flex;
                background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-20/34961047.jpg");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                padding:10px 20px;
                align-items: flex-end;
                margin-bottom:15px;
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
            }
            .active{
                background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-20/91417730.jpg");
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }

    }


</style>
