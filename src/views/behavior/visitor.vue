<template>
    <div id="visitor">
        <Header title="用户资料">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <!--<div class="head">
                <div class="top">
                    <div class="left">
                        <div class="avatar avatar_default" v-if="info.data.avatar_file">
                            <img :src="info.data.avatar_file" alt="">
                        </div>
                        <div class="avatar avatar_default" v-if="!info.data.avatar_file">
                            <img src="../../static/img/avatar.png" alt="">
                        </div>
                    </div>
                    <div class="center">
                        <h2 class="vmc-nowrap">{{info.data.user_name}}</h2>
                        <div>声望 {{info.data.integral}} ，被赞 {{info.data.agree_count}} ，被推荐 {{info.data.article_agree_count}}</div>
                    </div>
                </div>
                <div class="signature" v-if="info.meta.signature">
                    {{info.meta.signature}}
                </div>
                <div class="signature" v-else>
                    这个人很懒，没填写个人简介
                </div>
                <div class="middel" v-if="info.data.province">
                    <i class="iconfont icon-weizhi"></i>
                    <div class="address">
                        {{info.data.province}} {{info.data.city}}
                    </div>
                </div>
                <div class="bottom">关注 {{info.data.friend_count}} &nbsp;&nbsp;粉丝 {{info.data.fans_count}}</div>
            </div>
            <div class="itme-box">
                <ul class="list">
                    <li class="mx-1px-bottom item" @click="jump('user-answer')">
                        <div class="icon iconfont icon-huida-"></div>
                        <div class="txt">回答 <span></span></div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                    <li class="mx-1px-bottom item" @click="jump('user-ask')">
                        <div class="icon iconfont icon-tiwen-"></div>
                        <div class="txt">提问 <span></span></div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                    <li class="mx-1px-bottom item" @click="jump('user-blogs')">
                        <div class="icon iconfont icon-boke-"></div>
                        <div class="txt">博客 <span></span></div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                </ul>
            </div>-->
            <div class="head">
                <div class="top">
                    <div class="left">
                        <div class="avatar avatar_default" v-if="info.data.avatar_file">
                            <img :src="info.data.avatar_file" alt="">
                        </div>
                        <div class="avatar avatar_default" v-if="!info.data.avatar_file">
                            <img src="../../static/img/avatar.png" alt="">
                        </div>
                    </div>
                    <i class="iconfont icon-viptubiao" v-if="info.meta.isIdentity"></i>
                    <i class="iconfont icon-svip2" v-if="info.meta.isSvip"></i>
                    <div class="center">
                        <h2 class="vmc-nowrap">{{info.data.user_name}}</h2>
                        <!--<div>声望 {{info.data.integral}} ，被赞 {{info.data.agree_count}} ，被推荐 {{info.data.article_agree_count}}</div>-->
                    </div>
                </div>
                <div class="items">
                    <div class="item-top" @click="">
                        <div class="txt">声望</div>
                        <div class="num">{{info.data.integral}}</div>
                    </div>
                    <div class="item-top" @click="jump('user-follow')">
                        <div class="txt">关注</div>
                        <div class="num">{{info.data.friend_count}}</div>
                    </div>
                    <div class="item-top" @click="jump('user-fans')">
                        <div class="txt">粉丝</div>
                        <div class="num">{{info.data.fans_count}}</div>
                    </div>
                </div>

            </div>
            <div class="personal">
                <div class="item-g mx-1px-bottom">
                    <div>个人网站</div>
                    <div class="text" v-if="info.meta.profile">
                        {{info.meta.profile.homepage}}
                    </div>
                    <div class="text" v-else>
                        这个人很懒，没填写个人网址
                    </div>
                </div>
                <div class="item-g" >
                    <div>个人简介</div>
                    <div class="text" v-if="info.meta.signature">
                        {{info.meta.signature}}
                    </div>
                    <div class="text" v-else>
                        这个人很懒，没填写个人简介
                    </div>
                </div>
            </div>

            <div class="bosom">
                <div class="item mx-1px-bottom" @click="jump('trends')">
                    <div class="txt">TA动态</div>
                    <div class="enter iconfont icon-fanhui-1"></div>
                </div>
                <div class="item" @click="jump('myfiles')">
                    <div class="txt">TA档案</div>
                    <div class="enter iconfont icon-fanhui-1"></div>
                </div>
            </div>

            <div class="last">
                <div class="last-item mx-1px-bottom" @click="jump('user-ask')">
                    <div class="txt">TA提问</div>
                    <div class="enters">{{info.meta.askCount}}</div>
                </div>
                <div class="last-item mx-1px-bottom" @click="jump('user-answer')">
                    <div class="txt">TA回答</div>
                    <div class="enters">{{info.meta.answerCount}}</div>
                </div>
                <div class="last-item mx-1px-bottom" @click="jump('user-blogs')">
                    <div class="txt">TA文章</div>
                    <div class="enters">{{info.meta.postCount}}</div>
                </div>
               <!-- <div class="last-item mx-1px-bottom" @click="">
                    <div class="txt">TA分享</div>
                    <div class="enters"></div>
                </div>
                <div class="last-item" @click="">
                    <div class="txt">TA收藏</div>
                    <div class="enters">{{info.meta.courseCount}}</div>
                </div>-->
            </div>






        </div>

        <div class="item-b ">
            <div class="line-left" @click="follow(info.data.id)" >
                <div class="follow fol" :class="info.data.isFocus ? 'unfollow' : '' ">
                    <div class="txt"><span v-if="info.data.isFocus">已</span>关注</div>
                </div>
            </div>
            <!--<div class="line-rigth" @click="">
                <div class="txt">私信</div>
            </div>-->

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Cache, cache_keys} from '../../utils/util';

    export default {
    	name: 'visitor',
    	data() {
    		return {
			    info: {
				    data: '',
				    meta: {
                        profile: ''
                    }
			    },
                foll: ''
            }
        },
        methods: {
	        jump(name) {
		        if (name) {
			        this.$router.push({name: name, params: {id: this.info.data.id}});
		        }
	        },
            goLogin() {
                var source = this.$route.path;
                this.$router.push({name: 'user-login', query: {source}});
            },
	        Info(res) {
		        this.info = res;
	        },
            //            关注
            follow(id) {
	            var data = {
	                id: id
                }
                var is_login = !!Cache.get(cache_keys.token);
                if (is_login) {
                    this.$store.dispatch('focusUser',data)
                } else {
                    this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                }
            },
            fol() {
                this.info.data.isFocus = !this.info.data.isFocus
            }
        },
	    created() {
    		const id = this.$route.params.id;
		    this.$store.dispatch('queryIdInfo',id);
            EventBus.$on('idInfo',this.Info)
            EventBus.$on('Focususer',this.fol)
	    },
	    beforeDestroy() {
            EventBus.$off('idInfo');
            EventBus.$off('Focususer');
	    }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #visitor {
        background: #efeff4;
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
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
            color: #3d4145;
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 50px;

            input {
                width: 100%;
                height: 40px;
                font-size: 14px;
                font-weight: initial;
                color: #3d4145;
            }
            textarea {
                width: 100%;
                height: 40px;
                font-size: 14px;
                font-weight: initial;
                color: #3d4145;
                margin-top: 10px;
            }
           /* .head {
                background-color: #008cee;
                padding: 12px;
                padding-top: 24px;
                color: #fff;

                .top {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;

                    .left {

                        .avatar {
                            width: 60px;
                            height: 60px;
                            line-height: 60px;
                            border-radius: 100%;
                            text-align: center;
                            overflow: hidden;
                        }
                        img {
                            width: 100%;
                            height: auto;
                        }
                    }

                    .center {
                        flex: 1;
                        overflow: hidden;
                        padding-left: 12px;

                        h2 {
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            font-size: 16px;
                        }
                        div {
                            font-size: 12px;
                            padding-top: 8px;
                        }
                    }
                    .right {
                        width: 44px;
                        height: 44px;
                        line-height: 44px;
                        text-align: right;
                        i {
                            font-size: 28px;
                        }
                    }
                }
                .signature {
                    font-size: 12px;
                    margin-top: 10px;
                }
                .middel {
                    i {
                        margin-right: 5px;
                        display: block;
                    }
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    padding-top: 8px;
                }
                .bottom {
                    font-size: 12px;
                    padding-top: 8px;
                }
            }*/



            .head {
                /*height: 205px;*/
                width: 100%;
                padding: 21px 12px 12px 12px;
                overflow: hidden;
                text-align: center;
                background: #008cee;

                .top{
                    position: relative;
                    margin: 0 auto;
                    width: 200px;
                    height: 130px;
                    i{
                        position: absolute;
                    }
                    .icon-svip2{
                        margin-left: 11px;
                        font-size: 10px;
                        background: #e94447;
                        /*padding: 1px 1px;*/
                        border-radius: 2px;
                        color: #ffffff;
                        bottom: 40px;
                        right: 0px;
                    }
                    .icon-viptubiao{
                        margin-left: 11px;
                        font-size: 14px;
                        color: #f7b532;
                        bottom: 40px;
                        right: 55px;
                    }
                    .left {
                        margin: 0 auto;
                        width: 90px;
                        height: 90px;
                        border-radius: 100%;
                        overflow: hidden;
                        img {
                            width: 100%;
                        }
                    }
                    .center {
                        padding: 10px 0;

                        h2 {
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            font-size: 16px;
                            color: #fff;

                        }
                    }
                }

                .items {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;
                    .item-top {
                        flex: 1;
                        text-align: center;
                        &:nth-child(2) {
                            border-left: 1px solid rgba(255, 255, 255, .5);
                            border-right: 1px solid rgba(255, 255, 255, .5);
                        }
                        .icon {
                            font-size: 30px;
                        }
                        .txt {
                            font-size: 15px;
                            color: rgba(255, 255, 255, .5);
                            font-weight: normal;
                        }
                        .num {
                            color: rgba(255, 255, 255, 1);
                            font-size: 13px;
                            font-weight: normal;
                        }
                    }
                }
            }
            .personal{
                .item-g {
                    padding: 12px;
                    background: #fff;
                    div {
                        font-size: 15px;
                        font-weight: normal;
                    }
                    span {
                        font-weight: normal;
                        font-size: 13px;
                        color: #bbb;
                    }
                    .text{
                        font-size: 13px;
                        color: #bbb;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
            }

            .bosom{
                margin: 10px 0;
                .item {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;
                    height: 48px;
                    padding: 0 15px;
                    background: #fff;
                    font-weight: normal;

                    /* &:first-child .icon {
                         background: #2ec397;
                     }*/

                    .icon {
                        width: 30px;
                        height: 30px;
                        line-height: 31px;
                        border-radius: 50%;
                        text-align: center;
                        font-size: 15px;
                        color: #fff;
                    }
                    .txt {
                        flex: 1;
                        /*padding-left: 12px;*/
                        font-size: 16px;
                        color: #101010;

                        span {
                            color: #666666;
                        }
                    }
                    .enter {
                        color: #ccc;
                        font-weight: bold;
                    }

                }
            }
            .last{
                margin-bottom: 10px;
                .last-item{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;
                    height: 48px;
                    padding: 0 15px;
                    background: #fff;
                    font-weight: normal;
                    .txt {
                        flex: 1;
                        /*padding-left: 12px;*/
                        font-size: 16px;
                        color: #101010;
                    }
                    .enters {
                        color: #aaa;
                        font-weight: normal;
                    }
                }
            }


        }
        .item-b{
            background: #fff;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 50px;
            padding: 0 15px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            /*box-shadow:0 1px 0 #000 inset;*/
            .line-left{
                flex: 1;
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: center;
                /*border-right: 1px solid #ccc;*/
                color: #008cee;

                .fol{
                    display: flex;
                    align-items: center;
                    text-align: center;
                    font-weight: normal;
                    i{
                        font-size: 12px;
                    }
                    .txt{
                        padding-left: 8px;
                        text-align: left;
                    }
                }
                .unfollow{
                    color: #909090;
                }


            }
            .line-rigth{
                flex: 1;
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: center;

                .txt{
                    font-weight: normal;
                    padding-left: 8px;
                    text-align: left;
                    color: #909090;
                }

            }
        }

    }
</style>
