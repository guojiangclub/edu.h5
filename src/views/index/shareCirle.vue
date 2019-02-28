<template>
    <div id="share_cirle">
        <van-nav-bar
            title='知识圈分享'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <div class="content">
            <div class="bg-top"></div>
            <div class="detail-box">
                <div class="avatar">
                    <img src="http://img4.imgtn.bdimg.com/it/u=1332451350,4287284270&fm=26&gp=0.jpg" alt="">
                </div>
                <div class="nick-name">五年前的你</div>
                <div class="circle-master">圈主：黔在在</div>
                <div class="describle">
                    <div class="txt">
                        我吃东西越来越清淡，对待人情世故越来越宽容，不乱发脾气也学会了忍让，慢慢地有了一颗成长的心。也开始害怕听到任何与病痛有关的事，最大的心愿变成了全家人身体健康。相比一两年前迫不及待要去看远方的心，我更希望花十分之九的时间在温柔灯光下和妈妈吃完的一餐饭。
                    </div>
                </div>
                <div class="list">
                    <div class="item">
                        <div class="num">2.4K</div>
                        <div class="line"></div>
                        <div class="txt">主题</div>
                    </div>
                    <div class="item">
                        <div class="num">1K+</div>
                        <div class="line"></div>
                        <div class="txt">成员</div>
                    </div>
                    <div class="item">
                        <div class="num">45+</div>
                        <div class="line"></div>
                        <div class="txt">精华</div>
                    </div>
                    <div class="item">
                        <div class="num">1.7K+</div>
                        <div class="txt">问答</div>
                    </div>
                </div>
                <div class="code">
                    <div class="erweima">
                        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3669963851,1477968510&fm=27&gp=0.jpg" alt="">
                    </div>
                    <div class="text">
                        长按二维码识别，查看数据圈
                        <div> 和圈主的关系更近一步吧！</div>
                    </div>
                </div>
            </div>
            <div class="bg-bottom"></div>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import { Cache, cache_keys, exif ,env,is} from '../../utils/util';
    import { List, NavBar } from 'vant';
    export default{
        name:'index-shareCirle',
        component:{
            List,
            NavBar
        },
        data(){
            return{
                is_navbar:true

            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
        },
        methods:{
            //onClickLeft
            onClickLeft(){
                window.history.back(-1)
            },
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    #share_cirle{
        background-color:#f3f3f3;
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
            padding-top: 0!important;
            margin-top: 56px;
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
    .content{
         background-color:#004E9D;
        margin: 10px 15px 0 15px;
         .bg-top{
             height:46px;
             background-color:#004E9D;
         }
    .bg-bottom{
        height:12px;
        background-color:#004E9D;
    }
    .detail-box{
        position: relative;
        background-color: #ffffff;
        border-radius: 4px;
        padding:50px 15px 12px 15px;
        margin:0px 12px 0px 12px;
        text-align: center;
        .avatar{
            position: absolute;
            top: -36px;
            left: 50%;
            margin-left: -36px;
            width: 72px;
            height: 72px;
            border:2px solid #ffffff;
            box-shadow:0px 4px 8px 1px rgba(0,0,0,0.1);
            border-radius: 50%;
            img{
                width: 100%;
                height: 100%;
                vertical-align: middle;
                border-radius: 50%;
            }

        }
        .nick-name{
            color: #202020;
            font-size: 13px;
            line-height: 18px;
            font-weight: bold;
            padding-bottom: 5px;
        }
        .circle-master{
            color: #909090;
            font-size: 12px;
        }
        .describle{
            text-align: left;
            padding:30px 0 25px 0;
            color: #909090;
            font-size: 13px;
            line-height: 20px;
            .txt{
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
            }
        }
        .list{
            padding:18px 0 25px 0;
            border-bottom: 1px solid #E6E6E6;
            border-top: 1px solid #E6E6E6;
            display: flex;
            align-items: center;
            justify-content: center;
            .item{
                flex: 1;
                position: relative;
                .num{
                    color: #4A4A4A;
                    font-size: 15px;
                    font-weight: bold;
                    line-height: 21px;
                }
                .line{
                    position: absolute;
                    top: 10px;
                    right: 0;
                    height:16px;
                    width: 1px;
                    background-color:#E6E6E6;
                }
                .txt{
                    color: #909090;
                    font-size: 11px;
                    line-height: 16px;
                }
            }
        }
        .code{
            padding:18px 0;
            .erweima{
                width: 144px;
                height: 144px;
                margin:  0 auto;
                img{
                    width: 100%;
                    height:100%;
                    vertical-align: middle;
                }
            }
            .text{
                color: #909090;
                font-size: 14px;
                line-height: 20px;
                margin: 12px auto 0 auto;
            }
        }

    }
    }
    }


</style>
