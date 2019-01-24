<template>
    <div id="center">
        <div class="content">
            <div class="item active">
                <div class="left-info">
                    <div class="money">
                        <span>¥</span>
                        782.00
                    </div>
                   <!-- <div class="money" wx:if="{{item.discount.action_type.type == 'percentage'}}">
                        {{item.discount.action_type.value}}
                        <span>折</span>
                    </div>-->
                    <div class="label">欢迎光临</div>
                </div>
                <div class="right-info">
                    <div class="title">美特好超市</div>
                    <div class="created-at">2018-2019</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'coupon-center',
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
