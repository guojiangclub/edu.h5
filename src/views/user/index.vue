<template>
    <div id="user-index">
       <!-- <Header title="我的" :wechat=true>
            <div slot="right" class="right-item">
                <i class="search iconfont icon-sousuo-"></i>
            </div>
        </Header>-->

        <div class="content">
            <div class="head">
                <div class="top" >
                    <div class="left" @click="profile">
                        <div class="avatar avatar_default" v-if="info.data.avatar_file">
                            <img :src="info.data.avatar_file" alt="">
                        </div>
                        <div class="avatar avatar_default" v-if="!info.data.avatar_file">
                            <img src="../../static/img/avatar.png" alt="">
                        </div>
                    </div>
                    <div class="center">
                        <span class="vmc-nowrap">{{info.data.user_name}}</span>
                        <i class="iconfont icon-viptubiao" v-if="info.meta.isIdentity"></i>
                        <i class="iconfont icon-svip2" v-if="info.meta.isSvip"></i>
                        <span class="getSvip" v-if="!info.meta.isSvip" @click="jump('major')">
                            开通svip
                        </span>
                        <div v-if="info.meta.isSvip">
                            <countdown :value="info.meta.deadline" type="2"></countdown>
                        </div>
                        <div class="bottom">
                            <span @click="jump('user-follow')">关注 {{info.data.friend_count}} <i class="iconfont icon-fanhui-1"></i></span>
                            <span @click="jump('user-fans')">粉丝 {{info.data.fans_count}} <i class="iconfont icon-fanhui-1"></i></span>
                        </div>
                        <!--<div>声望 {{info.data.integral}} ，被赞 {{info.data.agree_count}} ，被推荐 {{info.data.article_agree_count}}</div>-->
                    </div>
                    <!--<div class="right"><i class="iconfont icon-xiugai&#45;&#45;"></i></div>-->
                </div>
                <!--<div class="signature" v-if="info.meta.signature">
                    {{info.meta.signature}}
                </div>
                <div class="signature" v-else>
                    这个人很懒，没填写个人简介
                </div>
                <div class="middel" v-if="info.data.province">
                    <i class="iconfont icon-weizhi-"></i>
                    <div class="address">
                        {{info.data.province}} {{info.data.city}}
                    </div>
                </div>-->
                <div class="items">
                    <div class="item-top" @click="jump('user-answer')">
                        <div class="icon iconfont icon-huida-"></div>
                        <div class="txt">回答</div>
                        <div class="num">{{info.meta.answerCount}}</div>
                        <!--<div class="enter iconfont icon-fanhui-1"></div>-->
                    </div>
                    <div class="item-top" @click="jump('user-ask')">
                        <div class="icon iconfont icon-tiwen-"></div>
                        <div class="txt">提问</div>
                        <div class="num">{{info.meta.askCount}}</div>
                        <!--<div class="enter iconfont icon-fanhui-1"></div>-->
                    </div>
                    <div class="item-top" @click="jump('user-blogs')">
                        <div class="icon iconfont icon-boke-"></div>
                        <div class="txt">博客</div>
                        <div class="num">{{info.meta.postCount}}</div>
                        <!--<div class="enter iconfont icon-fanhui-1"></div>-->
                    </div>
                    <div class="item-top" @click="jump('user-course')">
                        <div class="icon iconfont icon-kecheng-"></div>
                        <div class="txt">课程</div>
                        <div class="num">{{info.meta.courseCount}}</div>
                        <!--<div class="enter iconfont icon-fanhui-1"></div>-->
                    </div>
                </div>


            </div>
            <div class="itme-box">
                <ul class="list">
                    <li class="authentication" @click="jump('identity')" v-if="!info.meta.isIdentity">
                        <span>实名认证后，可增加账号的保护能力</span>
                        <span class="authenticate">
                            去认证
                            <i class="iconfont icon-shuangjiantou"></i>
                        </span>
                    </li>
                    <li class="item line">
                        <div class="line-left" @click="balance">
                            <i class="iconfont icon-yue"></i>
                            <div class="txt">余额</div>
                            <div class="enter iconfont icon-fanhui-1"></div>
                        </div>
                        <div class="line-rigth" @click="point">
                            <i class="iconfont icon-jifen"></i>
                            <div class="txt">积分</div>
                            <div class="enter iconfont icon-fanhui-1"></div>
                        </div>

                    </li>
                    <!--<li class="item line" @click="jump('dynamic')">
                        <div class="txt">最新动态</div>
                        <span class="round" v-if="info.meta.unreadNotifications != 0"></span>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>-->
                    <!--<li class="item line" @click="jump('recruitment')">
                        <div class="txt">求职招聘</div>
                        <span class="round"></span>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>-->
                     <!--<li class="mx-1px-bottom item" @click="jump('user-ask')">
                        <div class="icon iconfont icon-tiwen-"></div>
                        <div class="txt">提问 <span>{{info.meta.askCount}}</span></div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                    <li class="mx-1px-bottom item" @click="jump('user-blogs')">
                        <div class="icon iconfont icon-boke-"></div>
                        <div class="txt">博客 <span>{{info.meta.postCount}}</span></div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                    <li class="mx-1px-bottom item" @click="jump('user-course')">
                        <div class="icon iconfont icon-kecheng-"></div>
                        <div class="txt">课程 <span>{{info.meta.courseCount}}</span></div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>-->
                    <!-- <li class="mx-1px-bottom item" @click="jump('user-favorites')">
                         <div class="icon iconfont icon-shoucang&#45;&#45;"></div>
                         <div class="txt">收藏</div>
                         <div class="enter iconfont icon-fanhui-"></div>
                     </li>
                     <li class="mx-1px-bottom item" @click="jump('user-attention')">
                         <div class="icon iconfont icon-guanzhu&#45;&#45;"></div>
                         <div class="txt">关注</div>
                         <div class="enter iconfont icon-fanhui-"></div>
                     </li>-->
                    <!--<li class="mx-1px-bottom item line" @click="jump('user-amend')">
                        &lt;!&ndash;<div class="icon iconfont icon-xiugai-"></div>&ndash;&gt;
                        <div class="txt">修改密码</div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                    <li class="mx-1px-bottom item" @click="exit">
                        &lt;!&ndash;<div class="icon iconfont icon-tuichu-"></div>&ndash;&gt;
                        <div class="txt">退出登录</div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>-->
                    <li class="mx-1px-bottom item line" @click="jump('information')">
                        <div class="txt">我的消息</div>
                        <span class="round" v-if="info.meta.unreadNotifications != 0"></span>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                    <!--<li class="mx-1px-bottom item"  @click="jump('private')">
                        <div class="txt">我的私信</div>
                        <span class="round" v-if="info.meta.unreadNotifications != 0"></span>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>-->
                    <li class="mx-1px-bottom item" @click="jump('task')">
                        <div class="txt">我的任务</div>
                        <span class="round" v-if="info.meta.unreadNotifications != 0"></span>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                    <li class="mx-1px-bottom item" @click="jump('extension')" v-if="info.meta.isAgent">
                        <div class="txt">我的推广</div>
                        <span class="round" v-if="info.meta.unreadNotifications != 0"></span>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                   <!-- <li class="mx-1px-bottom item" @click="jump('user-favorites')">
                        <div class="txt">我的收藏</div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>-->
                    <li class="mx-1px-bottom item line" @click="jump('contactus')">
                        <div class="txt">联系我们</div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                    <li class="item " @click="jump('fit')">
                        <div class="txt">设置</div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </li>
                </ul>
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
                <div class="tabbar-item" @click="go(4)">
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
    import Countdown from '../../components/Countdown-vip.vue';
	import {logout} from '../../utils/oauth';
	import {Cache, cache_keys, is } from '../../utils/util';

	export default {
		name: 'user-index',
        components: {
            Countdown
        },
		data() {
			return {
				list: [
					{
						'class': 'icon-huida--',
						'txt': '回答',
						'bg': '#2ec397',
						'num': 0,
						'forward': 'user-answer'
					},
					{
						'class': 'icon-tiwen--',
						'txt': '提问',
						'bg': '#f9a014',
						'num': 0,
						'forward': 'user-ask'
					},
					{
						'class': 'icon-boke--',
						'txt': '博客',
						'bg': '#ea6c4c',
						'num': 0,
						'forward': 'user/blogs'
					},
					{
						'class': 'icon-kecheng--',
						'txt': '课程',
						'bg': '#5c95f1',
						'num': 0,
						'forward': 'user-course'
					},
					{
						'class': 'icon-shoucang--',
						'txt': '收藏',
						'bg': '#7bb94a',
						'forward': 'user-favorites'
					},
					{
						'class': 'icon-guanzhu--',
						'txt': '关注',
						'bg': '#F48FB1',
						'forward': 'user-attention'
					},
					{
						'class': 'icon-xiugai--',
						'txt': '修改密码',
						'bg': '#ea6c4c',
						'forward': 'user-amend'
					},
					{
						'class': 'icon-tuichu--',
						'txt': '退出登录',
						'bg': '#999',
						'forward': ''
					}
				],
				info: {
					data: '',
                    meta: ''
                },
				showSubSet: false
			}
		},
        computed:{
		    userme() {
		        return this.$store.getters.getEduCourse;
            }
        },
		methods: {
			jump(name) {
				if (name) {
					this.$router.push({name: name, params: {id: this.info.data.id}});
				}
			},
            balance() {
                window.location.href = window.location.origin + '/store/#!/recharge/balance';
            },
            point() {
                window.location.href = window.location.origin + '/store/#!/user/point';
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
//						this.$router.push({name: 'user-index'})
						break
					case 6:
						this.$router.push({name: 'news'})
						break
					case 7:
						this.$router.push({name: 'activity'})
						break
				}
			},
			profile() {
				this.$router.push({name: 'user-profile'});
            },
			exit() {
				logout.call(this);
			},
			Info(res) {
				this.info = res;

//				this.$router.push({name: 'user-index', query: {id: res.data.id}})
			}
		},
        created() {
	        var userInfo  = Cache.get(cache_keys.info);
	        if (userInfo) {
		        this.Info(userInfo)
            } else {
		        this.$store.dispatch('queryUserInfo');
		        EventBus.$on('userInfo', this.Info)
	        }
	        this.$store.dispatch('queryUserInfo');
	        EventBus.$on('userInfo', this.Info)
        },
        beforeDestroy() {
            EventBus.$off('userInfo');
        }
	}
</script>

<style rel="stylesheet/less" lang="less">
    #user-index {
        background: #efeff4;
        .vlc-header {
            header {
                background: #393a3f;
            }
            line-height: 50px;
            .left {
                display: none;
            }
            .title {
                text-align: center;
                width: 100%;
                height: 100%;
                text-align: left;

            }
            .right {
                i {
                    font-size: 30px;
                }
            }
        }

        .content {
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            padding-bottom: 60px;

            .head {
                background-color: #008cee;
                padding: 24px 17px 8px 17px;
                color: #fff;

                .top {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 33px;

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
                        padding-left: 20px;

                        .vmc-nowrap {
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            font-size: 16px;
                        }
                        .getSvip {
                            display: inline-block;
                            background: #e94447;
                            padding: 2px 4px;
                            font-size: 12px;
                            border-radius: 2px;
                            margin-left: 10px;
                        }

                        #time-vip {
                            .timevip {
                                color: #FFFFFF !important;

                                span {
                                    color: #FFFFFF !important;
                                }
                            }
                        }
                        .icon-svip2{
                            margin-left: 11px;
                            font-size: 10px;
                            background: #e94447;
                            padding: 2px;
                            border-radius: 2px;
                            color: #ffffff;
                            bottom: 40px;
                            right: 0px;
                        }
                        .icon-viptubiao{
                            margin-left: 11px;
                            font-size: 14px;
                            color: #f7b532;
                        }
                        .bottom {
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
                .items{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;
                    height: 100px;
                    .item-top{
                        flex: 1;
                        text-align: center;
                        .icon{
                            font-size: 30px;
                        }
                        .txt{
                            font-size: 15px;
                        }
                        .num{
                            color: rgba(255,255,255,.5);
                            font-size: 14px;
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
                    .icon-fanhui-1{
                        &:first-child{
                            display: inline-block;
                            margin-right: 40px;
                        }
                        font-size: 12px;
                    }
                }
            }
            .itme-box {
                .list {
                    .authentication {
                        display: flex;
                        justify-content: space-between;
                        padding: 7px 15px;
                        align-items: center;
                        background: rgba(180,224,255,1);
                        font-size: 12px;
                        color: rgb(0,140,238);
                        .authenticate {
                            i{
                                font-size: 12px;
                            }
                        }
                    }
                    .line {
                        margin-top: 15px;

                        .line-left{
                            flex: 1;
                            display: flex;
                            align-items: center;
                            text-align: center;

                            .txt{
                                padding-left: 8px;
                                text-align: left;
                            }
                            .icon-fanhui-1{
                                padding-right: 12px;
                                border-right: 1px solid #cccccc;
                            }
                            .icon-yue{
                                font-size: 25px;
                                color: #f8b62d;
                            }
                        }
                        .line-rigth{
                            flex: 1;
                            display: flex;
                            align-items: center;
                            text-align: center;
                            .txt{
                                padding-left: 8px;
                                text-align: left;
                            }
                            .icon-jifen{
                                margin-left: 16px;
                                font-size: 25px;
                                color: #eb7073;
                            }
                        }
                    }
                    .item {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: center;
                        justify-content: center;
                        height: 48px;
                        padding: 0 15px;
                        background: #fff;

                        /* &:first-child .icon {
                             background: #2ec397;
                         }*/
                        .round{
                            width: 8px;
                            height: 8px;
                            background: #ea4448;
                            -moz-border-radius: 50%;
                            -webkit-border-radius: 50%;
                            border-radius: 50%;
                            margin-right: 8px;
                        }
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

            }
        }
        .vlc-tab {
            border-top: 1px solid #ccc;
            height: 55px;

            ul {
                li {
                    a {
                        &.cur {
                            color: #008cee;
                        }
                        i {
                            font-size: 28px;
                        }
                    }
                }
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
                background: #FFF;

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
