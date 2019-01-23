<template>
    <div id="search">
        <!--搜索-->
        <div class="search">
            <input type="text" placeholder="搜索你感兴趣的课程"/>
            <span>确认</span>
        </div>
        <div class="ul-content">
            <div class="li-list">
                <div class="item mx-1px-bottom">
                    <div class="left-info">
                        <img src="http://img0.imgtn.bdimg.com/it/u=586695282,1298873478&fm=26&gp=0.jpg">
                        <div class="limit-discount"></div>
                    </div>
                    <div class="right-info">
                        <div class="name">今日份挨打</div>
                        <div class="tiem-box">
                            <div class="time">
                                <span class="iconfont icon-keshi"></span>
                                89课时
                            </div>
                            <div class="many">
                                200人学习
                            </div>
                        </div>
                        <div class="teach-box">
                            <div class="teacher">
                                <span iconfont icon-laoshi></span>
                                丽丽老师
                            </div>
                            <div class="money">¥ 85元</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-more">没有更多数据了！！！</div>

    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'search',
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
    #search{
         height: 100%;
        background-color:#F3F3F3;
        overflow: auto;
        .search{
            padding:8px 15px;
            background-color: #004E9D;
            display: flex;
            align-items: center;
            justify-content: space-between;
            input{
                flex: 1;
                border-radius:15px;
                background-color: #fff;
                padding: 0 13px;
                height:30px;
                line-height: 30px;
                font-size: 12px;
            }
            input::-webkit-input-placeholder {
                color: #999999;
                font-size: 12px;
            }
            span{
                padding-left: 15px;
                color: #FFFFFF;

            }
        }
        .ul-content{
            background-color: #FFFFFF;
            .li-list{
                .item{
                    padding: 20px 15px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .left-info{
                        width:135px;
                        height: 90px;
                        margin-right: 15px;
                        position: relative;
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
                            height:44px;
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
                            .money{
                                color: #FF2741;
                            }
                        }
                    }
                    .limit-discount{
                        position: absolute;
                        width: 60px;
                        height: 26px;
                        background: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-28/15934896.jpg") no-repeat;
                        background-size: 100% 100%;
                        top:0;
                        right: 0;
                    }
                }

            }
        }
        .no-more{
            padding: 20px 0;
            text-align: center;
            color: #202020;
        }

    }

</style>
