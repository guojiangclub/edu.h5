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
                <div class="avatar" v-if="detail.coterie">
                    <img :src="detail.coterie.avatar" alt="">
                </div>
                <div class="nick-name" v-if="detail.coterie">{{detail.coterie.name}}</div>
                <div class="circle-master" v-if="detail.user">圈主：{{detail.user.user_name}}</div>
                <div class="describle" v-if="detail.coterie">
                    <div class="txt">
                        {{detail.coterie.description}}
                    </div>
                </div>
                <div class="list" v-if="detail.coterie">
                    <div class="item">
                        <div class="num">{{detail.coterie.content_count}}</div>
                        <div class="line"></div>
                        <div class="txt">主题</div>
                    </div>
                    <div class="item">
                        <div class="num">{{detail.coterie.member_count}}</div>
                        <div class="line"></div>
                        <div class="txt">成员</div>
                    </div>
                    <div class="item">
                        <div class="num">{{detail.coterie.recommend_count}}</div>
                        <div class="line"></div>
                        <div class="txt">精华</div>
                    </div>
                    <div class="item">
                        <div class="num">{{detail.coterie.ask_count}}</div>
                        <div class="txt">问答</div>
                    </div>
                </div>
                <div class="code">
                    <div class="erweima">
                        <img :src="detail.mini_code" alt="">
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
                is_navbar:true,
                detail:''

            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
            let id = this.$route.query.id;
            let data = {
                id:id
            }
            this.$store.dispatch('queryCoterie',data)
            EventBus.$on('getCoterie',this.getshareDetail);
        },
        beforeDestroy(){
            EventBus.$off('getCoterie')
        },
        methods:{
            //onClickLeft
            onClickLeft(){
                window.history.back(-1)
            },
            getshareDetail(res){
                this.detail = res.data
            }
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
