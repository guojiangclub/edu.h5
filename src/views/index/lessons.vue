<template>
    <div id="lessons">
        <div class="video-box">
            <video src=""></video>
        </div>
        <div class="course-introduce">
            <div class="time-length mx-1px-bottom">
                <div class="topic">
                    课时2：离开我的日子你别来无恙
                </div>
                <!-- <div class="already-percent">
                     已观看 20%
                 </div>-->
            </div>
            <div class="category">
                <div class="txt">我最亲爱的</div>
                <div class="see-detail">查看详情</div>
            </div>
        </div>
        <div class="ul-content">
            <div class="item-list">
                <div class="topic mx-1px-bottom">没我的日子</div>
                <div class="course-list">
                    <div class="item mx-1px-bottom activeitem">
                        <div class="txt">
                            <span class="iconfont icon-shipinbofang"></span>
                            课时1： 第一天
                        </div>
                        <div class="the-length">12：44</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'lessons',
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
    #lessons{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .video-box{
            background-color: #ffffff;
            video{
                width: 100%;
            }
        }
        .course-introduce{
            padding:15px;
            background-color: #FFFFFF;
            margin-bottom: 10px;
            .time-length{
                .topic{
                    color: #202020;
                    font-size: 15px;
                    line-height: 21px;
                    font-weight: 600;
                    padding-bottom: 5px;
                }
                .already-percent{
                    color: #909090;
                    font-size: 12px;
                    line-height: 17px;
                    padding-bottom: 10px;
                }
            }
            .category{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding:15px 0 0 0;
                .txt{
                    color: #4A4A4A;
                    font-size: 13px;
                    line-height: 18px;
                }
                .see-detail{
                    padding: 5px 8px;
                    border-radius:4px;
                    border: 1px solid #D7D7D7;
                    color:#999999;
                    font-size: 12px;
                    line-height: 14px;
                }
            }
        }
        .ul-content{
            background-color: #FFFFFF;
            .item-list{
                .topic{
                    padding: 0 15px;
                    height: 50px;
                    line-height: 50px;
                    color: #202020;
                    font-size: 14px;
                }
                .course-list {
                    .item {
                        margin: 0 15px;
                        height: 50px;
                        line-height: 50px;
                        color: #4A4A4A;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .txt {
                            flex: 1;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            span {
                                display: inline-block;
                                padding-right: 10px;

                            }

                        }
                        .the-length{
                            margin-left: 5px;
                        }
                        .free-btn {
                            color: #004E9D;
                            font-size: 13px;
                            line-height: 18px;
                            padding: 3px 9px;
                            border: 1px solid #004E9D;
                            border-radius: 2px;
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
    }


</style>
