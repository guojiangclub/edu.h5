<template>
    <div id="student-info">
        <div class="infomation-content">
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    真实姓名：
                </div>
                <input type="text"/>
            </div>
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    手机号码：
                </div>
                <input type="text" />
            </div>
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    微信账号：
                </div>
                <input type="text"/>
            </div>
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    所在公司：
                </div>
                <input type="text" />
            </div>
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    公司职位：
                </div>
                <input type="text" />
            </div>
        </div>
        <div class="save" >保存</div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'studentinfo',
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
    #student-info{
        height: 100%;
        background-color:#F3F3F3;
        .infomation-content{
            margin-top:15px;
            background-color: #FFFFFF;
            .item{
                padding:0 15px;
                height: 50px;
                line-height: 50px;
                display: flex;
                align-items: center;
                .option{
                    font-size: 14px;
                    color:#4A4A4A;

                    span{
                        color: #FB5054;
                    }
                }
                input{
                    flex: 1;
                    padding-left: 16px;
                    font-size:14px;
                    color:#4A4A4A;
                    font-weight: 600;
                }
            }

        }
        .save{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height:50px;
            line-height: 50px;
            background-color: #004E9D;
            color: #FFFFFF;
            font-size: 15px;
            font-weight: 500;
            text-align: center;
        }

    }

</style>
