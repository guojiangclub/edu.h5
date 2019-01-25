<template>
    <div id="setting">
        <div class="content">
            <div class="item mx-1px-bottom">
                <div class="option">修改手机号</div>
                <div class="iconfont icon-jiantou"></div>
            </div>
        </div>
        <div class="exit-btn">退出登录</div>

    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'users-setting',
        data(){
            return {


            }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#f3f3f3;
    }
    #setting{
        height: 100%;
        overflow: auto;
        background-color: #f3f3f3;
        .content{
            background-color:#fff;
            margin-top: 10px;
            .item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding:15px 20px 15px 15px;
                color: #4A4A4A;
                font-size: 14px;
                line-height: 20px;

                .iconfont{
                    color: #909090;
                    font-size: 12px;
                }
            }

        }
        .exit-btn{
            position: fixed;
            bottom: 30px;
            z-index: 20;
            left: 15px;
            right: 15px;
            background-color: #FFFFFF;
            text-align: center;
            height: 50px;
            line-height: 50px;
            color: #4A4A4A;
            font-size: 14px;
        }

    }

</style>
