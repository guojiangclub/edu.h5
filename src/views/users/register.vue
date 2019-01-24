<template>
    <div id="user-register">
        <!--<div class="tips">您没有填写</div>-->
        <div class="phone__warning">
            <img src="http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-29/45704537.jpg">
            <!--<i class="iconfont icon-anquanjinggao"></i>-->
        </div>
        <!--<div class="register_header iconfont icon-youhuiquan"></div>-->
        <div class="register_input">
            <div class="tellphone">
                <input type="text" placeholder="手机号码"/>
            </div>
            <div class="code">
                <div class="writecode">
                    <input type="text" placeholder="验证码"/>
                </div>

                <div class="getCode">获取验证码</div>
            </div>
        </div>
        <div class="submit">
            <button class="check">确认</button>
           <!-- <button type="default" wx:if="{{!checked}}" catchtap="submit" disabled="{{showLoading}}" loading="{{showLoading}}">确认</button>-->
        </div>
        <!--<div class="select">
            &lt;!&ndash;<checkbox-group bindchange="changeChecked">&ndash;&gt;
            <checkbox bindtap="changeChecked" color="#fff" checked="{{checked}}" />
            <text> 同意本小程序用户协议</text>
            &lt;!&ndash;</checkbox-group>&ndash;&gt;
        </div>-->
        <!--弹出是否绑定老用户框框-->
        <div class="bind_old cur">
            <div class="paney">
                <div class="title">绑定老用户</div>
                <div class="content mx-1px-bottom">是否绑定已有老程序</div>
                <div class="btn-box">
                    <div class="cancle btn">取消</div>
                    <div class="sure btn">确定</div>
                </div>
            </div>
        </div>
    </div>


</template>

<script type="text/ecmascript-6">
    export default {
        name: 'users-register',
        data(){
            return {


            }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#ffffff;
    }
    #user-register{
        font-size: 16px;
        background-color: #ffffff;
        padding: 0 15px;
        margin-top: 50px;
        height: 100%;
        overflow: auto;

        .tips{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            line-height: 35px;
            background-color: #e64340;
            height: 35px;
            color: #FFFFFF;
        }
        .register_header{
            padding: 36px 0 56px 0;
            text-align: center;
            color: #004E9D;
            font-size:30px;
        }
        .phone__warning{
            text-align:center;
            width:170px;
            margin:49px auto 88px auto;
            overflow:hidden;

            image{
                width: 100%;
            }
            i{

                color: #FFBE00;
                font-size: 50px;
            }
        }
        .register_input{
            margin-bottom: 60px;
            .tellphone{
                background:rgba(155,155,155,.3);
                margin-bottom: 20px;
                border-radius: 4px;
                input{
                    padding:15px 0 15px 15px ;
                    border-radius: 4px;
                }
                .input-placeholder{
                    color: #9B9B9B;
                    font-size: 14px;
                }

            }
            .code{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .writecode{
                    width: 60%;
                    background:rgba(155,155,155,.3);
                    border-radius: 4px;
                    input{
                        padding:15px 0 15px 15px ;
                    }
                    .input-placeholder{
                        color: #9B9B9B;
                        font-size: 14px;
                    }
                }
                .getCode{
                    padding: 15px 0;
                    flex: 1;
                    margin-left: 17px;
                    background-color: #004E9D;
                    text-align: center;
                    color: #FFFFFF;
                    border-radius: 4px;
                    font-size: 14px;
                }
            }
        }
        .select{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
            color: #4A4A4A;
            font-size: 12px;

            //重置按钮样式
           /* checkbox .wx-checkbox-input{
                background-color: #fff;
                border: 1px solid #c1caca;
                box-shadow: 0 1px 2px rgba(0,0,0,.05), inset 0 -15px 10px -12px rgba(0,0,0,.05);
                height: 14px;
                width: 14px;
            }
            checkbox .wx-checkbox-input.wx-checkbox-input-checked{
                background-color: #004E9D;
                border: 1px solid #004E9D;
            }*/
        }
        .submit{

            button{
                width: 100%;
                color: #ffffff;
                padding:10px 0;
                border: none;
                border-radius: 4px;
                background-color: #C9C8C8;
                font-size: 16px;
                &.check {
                    background: #004E9D;
                }
                &:after {
                    border: none;
                }
            }
        }
        //弹出绑定老用户框框
        .bind_old{
            display:none;
            z-index: 50;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color:rgba(0,0,0,.7);
            .paney{
                width: 80%;
                background-color:#FFFFFF;
                position: absolute;
                left: 50%;
                top: 28%;
                margin-left: -40%;
                color: #4A4A4A;
                border-radius:2px;
                .title{
                    padding: 25px 0;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 25px;
                }
                .content{
                    font-size: 13px;
                    line-height: 18px;
                    padding-bottom: 38px;
                    text-align: center;
                }
                .btn-box{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 50px;
                    line-height: 50px;
                    font-size:16px;
                    .btn{
                        flex: 1;
                        text-align: center;
                    }
                    .sure{
                        background-color: #004E9D;
                        color: #FFFFFF;

                    }
                }
            }
            &.cur{
                display: block;
            }
        }

    }


</style>
