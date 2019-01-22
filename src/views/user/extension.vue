<template>
    <div id="extension">
        <Header title="我的推广">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="content__top">
                <div class="top__profit">
                    <span class="top__last">昨日收益 {{data.yesterdayAmount}} 元</span>
                    <span class="top__now">{{data.payAmount}}</span>
                    <span class="top__all">所获总收益(元)</span>
                </div>
                <div class="top__tab">
                    <div class="browse">
                        <div class="txt">
                            页面浏览量
                        </div>
                        <div class="num">
                            {{data.pageView}}
                        </div>
                    </div>
                    <div class="register">
                        <div class="txt">
                            注册人数
                        </div>
                        <div class="num">
                            {{data.registerCount}}
                        </div>
                    </div>
                    <div class="purchase">
                        <div class="txt">
                            购买人数
                        </div>
                        <div class="num">
                            {{data.payCount}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="content__spread">
                <h1>推广方法</h1>
                <div class="spread__text" v-html="data.text">

                </div>
            </div>
            <div class="content__img">
                <img :src="data.agentView.img" alt="">
            </div>
            <div class="content__spread settlement">

                <h1>结算方法：</h1>
                <div class="spread__text">
                    <p>1.天善团队会在每月4号结算上一个月您所获得的收益，把钱打到您指定的账户</p>
                    <p>2.如有疑问，欢迎您联系梁勇：158 2133 9409 （手机号&微信号）</p>
                </div>
            </div>
        </div>

        <div class="tabbar-box">
            <div class="tabbar tab-title" :class="showSubSet ? 'cur' : ''">
                <div class="tabbar-item" @click="go(1)">
                    <i class="iconfont icon-wenda"></i>
                    <div>问答</div>
                </div>
                <div class="tabbar-item" @click="go(2)">
                    <i class="iconfont icon-kecheng"></i>
                    <div>课程</div>
                </div>
                <div class="tabbar-item" @click="go(3)">
                    <div v-show="!showSubSet">
                        <i class="iconfont icon-faxian"></i>
                        <div>发现</div>
                    </div>
                    <div class="x" v-show="showSubSet">
                        <i class="iconfont icon-quxiao-"></i>
                    </div>
                </div>
                <div class="tabbar-item " @click="go(4)">
                    <i class="iconfont icon-boke"></i>
                    <div>博客</div>
                </div>
                <div class="tabbar-item active" @click="go(5)">
                    <i class="iconfont icon-wode"></i>
                    <div>我的</div>
                </div>
            </div>

            <div class="subset tab-title" :class="showSubSet ? 'active' : ''">
                <div class="tabbar-item" @click="go(6)">
                    <i class="iconfont icon-toutiao"></i>
                    <div>头条</div>
                </div>
                <div class="tabbar-item" @click="go(7)">
                    <i class="iconfont icon-huodong"></i>
                    <div>活动</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'extension',
        data() {
            return {
                height: '100%',
                showSubSet: false,
                data: {
                    agentView: {
                        img: ''
                    }
                }
            }
        },
        created() {
            this.$store.dispatch('Extension');
            EventBus.$on('extension', this.extension);
        },
        beforeDestroy() {
            EventBus.$off('extension');

        },
        methods: {
            extension(res) {
                this.data = res;
            },
            jump(name,id) {
                this.$router.push({name: name, params: {id: id} });
            },
            go(id) {
                switch (id) {
                    case 1:
                        this.$router.push({name: 'question', params: {id: 0}})
                        break
                    case 2:
                        this.$router.push({name: 'edu'})
                        break
                    case 3:
                        this.showSubSet = !this.showSubSet;
                        break
                    case 4:
                        this.$router.push({name: 'blogs', params: {id: 0}})
                        break
                    case 5:
                        this.$router.push({name: 'user-index'})
                        break
                    case 6:
                        this.$router.push({name: 'news'})
                        break
                    case 7:
                        this.$router.push({name: 'activity'})
                        break
                }
            }
        }
    }

</script>

<style rel="stylesheet/less" lang="less">

    #extension {
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                    font-size: 15px;
                }
            }
            .title {
                text-align: center;
            }
            .right {
                font-size: 0;
            }
        }
        .content {
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            background: #efeff4;
            padding-bottom: 60px;
            .content__top{
                background: #008aef;
                color: #ffffff;
                .top__profit{
                    padding: 35px 0;
                    text-align: center;
                    span{
                        display: block;
                        &.top__last{
                            font-size: 10px;
                        }
                        &.top__now{
                            font-size: 36px;
                        }
                        &.top__all{
                            font-size: 12px;
                        }
                    }
                }
                .top__tab{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    text-align: center;
                    padding: 15px 35px;
                    background: rgba(255,255,255,0.2);
                    .txt{
                        font-size: 10px;
                    }
                    .num{
                        font-size: 15px;
                    }
                }
            }
            .content__spread{
                padding: 0 20px 0 10px ;
                color: #001d32;
                background: #ffffff;
                h1{
                    padding-top: 17px;
                    font-size: 15px;
                }
                .spread__text{
                    padding: 17px 0;
                    p{
                        font-size: 10px;
                        padding-bottom: 5px;
                        a{
                            color: #008aef;
                        }
                    }
                }

            }
            .content__img{
                padding: 20px 10px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .settlement{
                margin-bottom: 20px;
            }


        }

        /*底部导航*/
        .tabbar-box {

            .tab-title {
                position: fixed;
                /*background: #e6e6e6;*/
                display: flex;
                justify-content: space-between;
                align-content: center;
            }
            .tabbar {
                bottom: 0;
                width: 100%;
                height: 50px;
                background: #ffffff;

                &.cur{
                    background: #e6e6e6;
                }
            }
            .tabbar-item {
                position: relative;
                display: block;
                text-align: center;
                flex: 1;
                width: 0%;
                font-size: 14px;
                color: #4C4C4C;
                padding-top: 3px;

                i {
                    display: block;
                    font-size: 35px;
                    line-height: 25px;
                }

                .x{
                    i{
                        font-size: 20px;
                        line-height: 50px;
                    }
                }
                &.active {
                    color: #005AAC;

                    i {
                        color: #005AAC;
                    }
                }

            }

            .subset{

                bottom: -65px;
                width: 100%;
                height: 65px;
                opacity: 0;
                background: #F2F2F2;
                transition:all .3s linear;
                .tabbar-item{
                    padding-top: 10px;
                }
                &.active{

                    bottom:50px;
                    opacity: 1;
                }
            }
        }
    }
</style>
