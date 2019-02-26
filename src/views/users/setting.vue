<template>
    <div id="setting">
        <van-nav-bar
            title='个人设置'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
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
    import { List,NavBar } from 'vant';
    import { Cache, cache_keys, exif ,env} from '../../utils/util';
    export default {
        component:{
            List,
            NavBar
        },
        name: 'users-setting',
        data(){
            return {
                is_navbar:true,


            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
        },
        methods:{
            onClickLeft(){
                window.history.back(-1)
            },
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
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
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
