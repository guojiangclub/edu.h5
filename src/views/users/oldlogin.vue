<template>
    <div id="oldlogin">
        <div class="header">
            <div class="logo">
                <img src="http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-29/45704537.jpg">
            </div>
            <div class="text">最用心的商业智能在线学院</div>
        </div>
        <div class="content">
            <div class="item mx-1px-bottom">
                <span class="iconfont icon-laoshi"></span>
                <input type="text" placeholder="手机/用户名/邮箱" >
            </div>
            <div class="item mx-1px-bottom">
                <span class="iconfont icon-suo"></span>
                <input type="password" placeholder="请输入账号密码" >
            </div>
        </div>
        <div class="binding-btn">绑定</div>

    </div>



</template>

<script type="text/ecmascript-6">
    export default {
        name: 'users-oldlogin',
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
    #oldlogin{
        height: 100%;
        overflow: auto;
        .header{
            padding:44px 0 33px 0;
            .logo{
                width: 170px;
                margin:0 auto;
                img{
                    width: 100%;
                }
            }
            .text{
                padding-top: 15px;
                text-align: center;
                color: #909090;
                font-size: 12px;
                line-height: 17px;
            }
        }
        .content{
            margin:0 15px 27px 15px;
            padding: 0 12px 20px 12px;
            background-color:#F3F3F3;
            border-radius: 4px;
            .item{
                display: flex;
                height: 50px;
                line-height: 50px;
                font-size: 12px;
                span{
                    color:#909090;
                    padding:0 15px;
                }
                input{
                    height: 100%;
                    line-height: 50px;
                }
            }


        }
        .binding-btn{
            margin:  0 15px;
            background-color: #004E9D;
            height: 50px;
            line-height: 50px;
            border-radius: 4px;
            color: #FFFFFF;
            font-size: 15px;
            text-align: center;
        }

    }


</style>
