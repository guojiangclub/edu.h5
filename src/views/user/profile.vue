<template>
    <div id="user-profile">
        <Header title="个人资料">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="head" :style="{backgroundImage:'url('+imgData[0].base64+')'}">
                <div class="bgimg"></div>
                <i class="picon iconfont icon-xiugai-" @click="jump('edit')"></i>
                <div class="right">
                    <!--<Upload >-->
                    <div class="size">
                        <img :src="imgData[0].base64" alt="">
                    </div>
                    <!--</Upload>-->
                    <i class="iconfont icon-viptubiao" v-if="my.isIdentity"></i>
                    <i class="iconfont icon-svip2" v-if="my.isSvip"></i>
                    <div class="text">
                        <input  class="mediacy" type="text" v-model="name" readonly>
                    </div>
                </div>

                <div class="items">
                    <div class="item-top" @click="">
                        <div class="txt">声望</div>
                        <div class="num">{{pro.integral}}</div>
                    </div>
                    <div class="item-top" @click="jump('user-follow')">
                        <div class="txt">关注</div>
                        <div class="num">{{pro.friend_count}}</div>
                    </div>
                    <div class="item-top" @click="jump('user-fans')">
                        <div class="txt">粉丝</div>
                        <div class="num">{{pro.fans_count}}</div>
                    </div>
                </div>

            </div>

            <div class="personal">
                <div class="item-g mx-1px-bottom">
                    <div>个人网站</div>
                    <div class="text" v-if="my.profile.homepage">
                        {{my.profile.homepage}}
                    </div>
                    <div class="text" v-else>
                        这个人很懒，没填写个人网址
                    </div>
                </div>
                <div class="item-g">
                    <div>个人简介</div>
                    <div class="text" v-if="my.signature">
                        {{my.signature}}
                    </div>
                    <div class="text" v-else>
                        这个人很懒，没填写个人简介
                    </div>
                </div>
            </div>

            <div class="bosom">
                <div class="item line mx-1px-bottom" @click="jump('trends')">
                    <div class="txt">我的动态</div>
                    <div class="enter iconfont icon-fanhui-1"></div>
                </div>
                <div class="item" @click="jump('myfiles')">
                    <div class="txt">我的档案</div>
                    <div class="enter iconfont icon-fanhui-1"></div>
                </div>
            </div>

            <div class="last">
                <div class="last-item line mx-1px-bottom" @click="jump('user-course')">
                    <div class="txt">我的课程</div>
                    <div class="enters">{{my.courseCount}}</div>
                </div>
                <div class="last-item line mx-1px-bottom" @click="jump('user-ask')">
                    <div class="txt">我的提问</div>
                    <div class="enters">{{my.askCount}}</div>
                </div>
                <div class="last-item mx-1px-bottom" @click="jump('user-answer')">
                    <div class="txt">我的回答</div>
                    <div class="enters">{{my.answerCount}}</div>
                </div>
                <div class="last-item mx-1px-bottom" @click="jump('user-blogs')">
                    <div class="txt">我的文章</div>
                    <div class="enters">{{my.postCount}}</div>
                </div>
                <!--<div class="last-item mx-1px-bottom" @click="">
                    <div class="txt">我的分享</div>
                    <div class="enters"></div>
                </div>
                <div class="last-item" @click="jump('user-favorites')">
                    <div class="txt">我的收藏</div>
                    <div class="enters">{{my.courseCount}}</div>
                </div>-->
            </div>



        </div>

        <!--头像上传-->

        <!--性别选择-->
        <!--<Picker type="NormalPicker" v-model="showSex" @sure="sex" :list="sexList" :init-arr="sexDefault"></Picker>-->

        <!--生日选择-->
        <!--<Picker type="DatePicker" v-model="showDate" @sure="date" valueSeparator="-"></Picker>-->

        <!--城市选择-->
        <!--<Picker type="AreaPicker" v-model="showAddress" @sure="address" valueSeparator="-"></Picker>-->

        <!--<v-button :loading='showLoading' height='50px' @click="submit">保存</v-button>-->

        <!--<div class="submit">-->
            <!--保存-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {Cache, cache_keys, is } from '../../utils/util';

    export default {
    	name: 'user-profile',
    	data() {
    		return {
                imgData: [
                    {
	                    base64: ''
                    }
                ],
			    signature: '',
			    name: '',
                pro:'',
                my:'',
                init: false
		    }
        },
	    methods:{
            jump(name) {
                if (name) {
                    this.$router.push({name: name, params: {id: this.pro.id}});
                }
            },
		    load(data) {
			    this.imgData = data
		    },
		    date(data) {
			    this.dateData = data.formatDate;
		    },
		    Info(res, status) {
                if (!status) {
                    this.init = true
                }
		        this.pro = res.data;
		        this.my = res.meta;
		    	this.signature = res.meta.signature;
		    	this.name = res.data.user_name;
		    	this.imgData[0].base64 = res.data.avatar_file;

            }

	    },
	    created() {
            var userInfo  = Cache.get(cache_keys.info);
            if (userInfo) {
                this.Info(userInfo, true)
            } else {
                this.$store.dispatch('queryUserInfo');
                EventBus.$on('userInfo',this.Info);
            }
            console.log(this.cache);
	    },
        beforeDestroy() {
    	    if (this.init) {
                EventBus.$off('userInfo');
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #user-profile {
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

            .head {
                /*height: 205px;*/
                width: 100%;
                padding: 21px 12px 12px 12px;
                position: relative;
                overflow: hidden;
                /*display: flex;*/
                background-repeat:no-repeat;
                background-size: cover;
                text-align: center;
                z-index: 1;

                .bgimg{
                    position: absolute;
                    background: rgba(0,140,238,1);
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 0;

                }
                .picon{
                    position: absolute;
                    right: 20px;
                    color: #fff;
                    z-index: 100;
                }
                .right {
                    z-index: 99;
                    position: relative;
                    margin: 0 auto;
                    width: 200px;
                    height: 130px;
                    overflow: hidden;
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
                    .size{
                        margin: 0 auto;
                        width: 90px;
                        height: 90px;
                        img{
                            border-radius: 100%;
                            width: 100%;
                        }
                    }
                    .text{
                        z-index: 99;
                        position: relative;
                        .mediacy{
                            text-align: center !important;
                            color: #fff;
                            z-index: 9999;
                        }
                    }
                }
                .items{
                    z-index: 99;
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;
                    .item-top{
                        flex: 1;
                        text-align: center;
                        &:nth-child(2){
                            border-left: 1px solid rgba(255,255,255,.5);
                            border-right: 1px solid rgba(255,255,255,.5);
                        }
                        .icon{
                            font-size: 30px;
                        }
                        .txt{
                            font-size: 15px;
                            color: rgba(255,255,255,.75);
                            font-weight: normal;
                        }
                        .num{
                            color: rgba(255,255,255,1);
                            font-size: 13px;
                            font-weight: normal;
                        }
                    }
                }
            }

            .personal{
                .item-g{
                    padding: 12px;
                    background: #fff;
                    div{
                        font-size: 15px;
                        font-weight: normal;
                    }
                    span{
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
                    .enters{
                        color: #008cee;
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
                        color: #008cee;
                        font-weight: normal;
                    }
                }
            }

        }
        .vlc-button{
            position: absolute;
            bottom: 0;
            .vlc-button-btn{
                background: #008cee;
                border-radius: inherit;
                height: 100%;
            }
        }
        .submit{
            width: 100%;
            position: absolute;
            bottom: 0;
            height: 50px;
            background: #ed1e31;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
            color: #fff;
        }
    }
</style>
