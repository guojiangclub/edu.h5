<template>
    <div id="blogs-detail">
        <Header title="文章">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="title-box">
                <div class="title">{{detail.post.title}}</div>
                <div class="tagstext">
                    <div class="tags" v-for="tag in detail.topics" @click="jump('question-topic', tag.topic_id)">
                        {{tag.topic_title}}
                    </div>
                </div>
                <div class="user-time">
                    <b>{{detail.post.friendly_date}}</b>
                    <b>浏览：{{detail.post.view_count}}</b>
                </div>

                <div class="user-info">

                    <div class="info" @click="jump('visitor', detail.post.user.id)">
                        <div class="img-box" v-if="detail.post.user.avatar_file">
                            <img :src="detail.post.user.avatar_file" alt="">
                        </div>
                        <div class="img-box" v-if="!detail.post.user.avatar_file">
                            <img src="../../static/img/avatar.png" alt="">
                        </div>
                        <div class="user-name">
                            {{detail.post.user.user_name}}
                        </div>
                    </div>
                    <div class="follow" @click="follow(detail.post.user.id)" :class="detail.followed == true ? 'change' : ''" v-if="detail.post.user.id !=info.id">
                        <span v-if="detail.followed">已</span>关注
                    </div>
                </div>
            </div>
            <div class="blogs-content" v-html="detail.post.message">

            </div>

            <div class="comments-box mx-1px-top">
                <!--用户已登录-->
                <div class="user-lgoin" v-if="login">
                    <div class="top">
                        <div class="user-info">
                            <div class="avatar" v-if="info.avatar_file">
                                <img :src="info.avatar_file" alt="">
                            </div>
                            <div class="avatar" v-if="!info.avatar_file">
                                <img src="../../static/img/avatar.png" alt="">
                            </div>
                            <div class="name">
                                {{info.user_name}}
                            </div>
                        </div>
                    </div>
                    <div class="bottoms clearfix">
                        <textarea v-model="commentText">

                        </textarea>
                        <div @click="reply">
                            回复
                        </div>
                        <!--<div>-->
                            <!--{{favoriteStatus}}-->
                        <!--</div>-->
                    </div>
                </div>
                <!--用户未登录-->
                <div class="user-no-login" v-if="!login" @click="goLogin">
                    登录进行回复
                </div>
            </div>
            <span class="home" @click="jump('edu')">
                <i class="iconfont icon-shouye"></i>
            </span>
        </div>
        <div class="bottom-box">
            <div class="item" :class="detail.is_reward ? 'active' : ''" @click="reward">
                <i class="iconfont icon-shang"></i>
                <!--<div class="num">{{detail.post.reward_count}}</div>-->
            </div>
            <div class="item" :class="detail.voted ? 'active' : ''" @click="voted">
                <i class="iconfont icon-dianzan-mian-"></i>
                <div class="num">{{detail.post.vote_count}}</div>
            </div>
            <div class="item" :class="detail.faved ? 'active' : ''" @click="faved">
                <i class="iconfont icon-shoucang-mian-"></i>
                <div class="num">{{detail.post.favorite_count}}</div>
            </div>
            <div class="item" @click="jump('blogs-comments')">
                <i class="iconfont icon-pinglun-mian-"></i>
                <div class="num">{{detail.post.comment_count}}</div>
            </div>
        </div>



<!--打赏-->
        <div id="blogs-money" v-show="isShow">
            <div class="body">
                <div class="del" @click="flag">
                    <i class="iconfont icon-quxiao-"></i>
                </div>
                <div class="dsimg">
                    <img src="../../static/img/hb.png" alt="">
                    <p>点赞是美意， 打赏是鼓励</p>
                </div>
                <div class="num">

                    <input v-show="custom" type="text" class="changes"  v-model="moneys" @blur="focusState = false" v-focus="focusState">
                    <span v-show="!custom">￥: <span>{{money}}</span></span>
                </div>
                <div class="much">
                    <div class="much-money" :class="money == '1.00' ? 'actives' : ''" @click="assignment('1.00')">￥1.00</div>
                    <div class="much-money" :class="money == '2.00' ? 'actives' : ''" @click="assignment('2.00')">￥2.00</div>
                    <div class="much-money" :class="money == '5.00' ? 'actives' : ''" @click="assignment('5.00')">￥5.00</div>
                    <div class="much-money" :class="money == '10.00' ? 'actives' : ''" @click="assignment('10.00')">￥10.00</div>
                    <div class="much-money" :class="money == '20.00' ? 'actives' : ''" @click="assignment('20.00')">￥20.00</div>
                    <div class="much-money" :class="custom ? 'actives' : ''" @click="change">自定</div>
                </div>
                <div class="btns" @click="submit" >
                    打赏
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	import {Cache, cache_keys, setPageTitle, env} from '../../utils/util';
    import pingpp from 'pingpp-js';

	export default {
		name: 'blogs-detail',
		data() {
			return {
//				detail: {},
				login: false,
				info: '',
				commentText: '',
				id: '',
                isShow:false,
                custom:false,
                money:'10.00',
                userId:'',
                moneys: '',
                focusState: ''
			}
		},
        directives: {
            focus: {
                update: function (el, {value}) {
                    if (value) {
                        el.focus()
                    }
                }
            }
        },
		computed: {
            detail() {
				return this.$store.getters.getBlogsDetail;
            }
        },
		methods: {
			jump(name, id) {
				if (!id) {
					this.$router.push({name: name, params: {id: this.id}});
                } else {
					this.$router.push({name: name, params: {id: id}})
				}
			},
            //            回答完评论后清除输入框中的内容
            blogsDetail() {
                this.commentText = '';
            },
            reply() {
                if (this.commentText == '') {
                    this.$Modal.confirm({body: '请填写评论内容'})
                } else {
                    var data = {
                        id: this.id,
                        message: this.commentText
                    }
                    this.$store.dispatch('commentEssay', data);
                }
            },
//            打赏
            reward(){
                let isLogin = !!Cache.get(cache_keys.token);
                if (!isLogin) {
                    this.isShow = false;
                    this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                } else {
                    this.isShow = true;
                }
            },
            //打赏金额
            assignment(money){
                this.money = money;
                this.custom = false
            },
            //隐藏打赏
            flag(){
                this.isShow = false;
            },
            change(){
                this.custom = true;
                this.money = this.moneys;
                this.focusState = true;
            },
			goLogin() {
				var source = this.$route.path;
				this.$router.push({name: 'user-login', query: {source}});
			},
            setTitle(res) {
				setPageTitle(res.data.post.title)
            },

//            打赏支付
            submit() {
                console.log(window.location.host+'/#'+this.$route.path);
                let isLogin = !!Cache.get(cache_keys.token);
                let channel = 'alipay_wap';
                let amount = '';
                let extra = {
                    success_url: window.location.protocol + '//' + window.location.host+'/#'+this.$route.path,
                    cancel_url:window.location.protocol + '//' + window.location.host+'/#'+this.$route.path
                };
                if (env.isWechat) {
                    channel = 'wx_pub'
                }

                if (Number(this.moneys) == 0 && this.custom)  {
                    this.$Modal.confirm({body:'打赏金额不能少于一分钱'})
                    return
                }

                if (this.custom) {
                    amount = Number(this.moneys)*100
                } else {
                    amount = Number(this.money)*100
                }

                let data = {
                    id: this.id,
                    channel: channel,
                    extra: extra,
                    amount: amount
                }


                if (!isLogin) {
                    this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                } else {
                    this.$store.dispatch('submitDetail', data)
                }
            },
//            微信支付
            wxBlogsCharge(data){
                window.location.href = data.url;
            },

//            支付宝支付
            blogsCharge(success, charge) {
                if (success) {
                    pingpp.createPayment(charge, (result, err) => {
                        if (result == "success") {
                            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                        } else if (result == "fail") {
                            // charge 不正确或者微信公众账号支付失败时会在此处返回
                        } else if (result == "cancel") {
                            // 微信公众账号支付取消支付
                        }
                    })
                } else {
                    this.$Modal.confirm({body: '请求支付失败, 请重试!'});
                }
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
//                    this.$Modal.info({body: '46846gerger'});
                }

            },
//            点赞
			voted() {
				var is_login = !!Cache.get(cache_keys.token);
				if (is_login) {

					if (this.detail.voted) {
						this.$store.dispatch('cancelLikeEsay', this.id);
                    } else {
						this.$store.dispatch('likeEsay', this.id);
                    }
                } else {
					this.$Modal.info({body: '请先登录', onOk: this.goLogin})
//                    this.$Modal.info({body: '46846gerger'});
                }

			},
//            收藏
			faved() {
				var is_login = !!Cache.get(cache_keys.token);

				if (is_login) {
					if (this.detail.faved) {
						this.$store.dispatch('cancelFavoriteEsay', this.id);
                    } else {
						this.$store.dispatch('favoriteEsay', this.id);
                    }
                } else {
					this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                }
            },
			userInfo(res) {
				this.info = res.data;
			},
			isLogin() {
				var is_login = !!Cache.get(cache_keys.token);
//				var userIinfo = Cache.get(cache_keys.info);
				if (is_login) {
					this.login = true;
					this.$store.dispatch('queryUserInfo');
//					this.info = userIinfo.data;
				} else {
					this.login = false;
				}
			}

		},
		created() {
			this.isLogin();
			this.id = this.$route.params.id;
			this.$Indicator.blade();
			this.$store.dispatch('queryBlogsDetail', this.id);
			EventBus.$on('commentInfo', this.blogsDetail);
			EventBus.$on('userInfo',this.userInfo);
			EventBus.$on('blogsDetail', this.setTitle);
			EventBus.$on('wxBlogsCharge',this.wxBlogsCharge);
			EventBus.$on('blogsCharge',this.blogsCharge)
		},
		beforeDestroy() {
			EventBus.$off('commentInfo');
			EventBus.$off('userInfo');
			EventBus.$off('blogsDetail');
            EventBus.$off('wxBlogsCharge');
            EventBus.$off('blogsCharge');
        }
	}

</script>

<style rel="stylesheet/less" lang="less">
    #blogs-detail {
        background-color: #efeff4 !important;
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
        .contents {
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            padding-bottom: 50px;

            strong{
                font-weight: bold;
            }
            a{
                color: #4298BA;
                text-decoration: none;
                word-break: break-all;
            }
            .title-box {
                padding: 15px;
                margin-bottom: 10px;
                background: #fff;

                .title {
                    font-size: 18px;
                    font-weight: bold;
                }
                .tagstext{
                    display: flex;
                    /*flex-direction: column;*/
                    flex-wrap: wrap;
                    align-items: center;
                    font-size: 12px;
                    color: #666666;
                    margin-left: -3px;
                    margin-top: 10px;
                    .tags {
                        color: #b0b0b0;
                        padding: 3px 3px;
                        margin-right: 7px;
                        margin-bottom: 7px;
                        background-color: #efefef;
                    }
                }
                .user-time{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 5px;
                    margin-bottom: 10px;
                    b{
                        font-weight: normal;
                        font-size: 13px;
                        color: #cdcdcd;
                    }
                }
                .user-info {
                    /*display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    !*align-items: center;*!
                    font-size: 12px;
                    color: #666666;
                    margin-left: -3px;
                    margin-top: 10px;*/
                    display: flex;
                    align-items: center;
                    height: 60px;
                    text-align: center;
                    color: #2a2a2a;
                    font-size: 15px;
                    justify-content: space-between;
                    .info{
                        display: flex;
                        align-items: center;
                        /*width: 100%;*/
                        .img-box {
                            width: 40px;
                            height: 40px;
                            border-radius: 100%;
                            overflow: hidden;

                            img {
                                width: 100%;
                                height: auto;
                            }
                        }
                        .user-name {
                            margin: 0 10px;
                        }

                    }
                    .follow{
                        display: block;
                        padding: 3px 12px;
                        color: #fff;
                        border-radius: 2px;
                        font-size: 14px;
                        background: #008cee;
                    }
                    .change{
                        background: #fff;
                        border: 1px solid #d8d8d8;
                        color: #d8d8d8;
                    }

                }
            }
            /*.blogs-content {
                padding: 12px;

                font-size: 14px;
                color: #3d4145;
                white-space: pre-wrap; !* css-3 *!
                word-wrap: break-word; !* Internet Explorer 5.5+ *!
                h1,h2,h3,h4,h5,h6{
                    margin: 15px 0px 5px 0px;
                }
                p{
                    margin: 7px 0;
                }
                code {
                    white-space: pre-wrap; !* css-3 *!
                    word-wrap: break-word; !* Internet Explorer 5.5+ *!
                }
            }*/
            .blogs-content {
                background: #fff;
                padding: 10px;
                /*padding-top: 0px;*/
                font-size: 14px;
                color: #3d4145;
                white-space: pre-wrap; /* css-3 */
                word-wrap: break-word; /* Internet Explorer 5.5+ */
                h1,h2,h3,h4,h5,h6{
                    margin: 15px 0px 5px 0px;
                }
                p{
                    margin: 8px 0;
                    font-size: 14px;
                }
                pre{
                    margin: 1em 0;
                    padding: 10px;
                    overflow: auto;
                    font-family: Menlo,Monaco,Consolas,Andale Mono,lucida console,Courier New,monospace;
                    font-size: 14px;
                    word-wrap: normal;
                    background: #f6f6f6;
                    border-radius: 4px;
                }
                code {
                    white-space: pre-wrap; /* css-3 */
                    word-wrap: break-word; /* Internet Explorer 5.5+ */
                    border-radius: 3px;
                    font-family: Menlo,Monaco,Consolas,Andale Mono,lucida console,Courier New,monospace;
                    background-color: #f6f6f6;
                    box-sizing: inherit;
                }
            }
            .comments-box {
                background: #fff;
                padding: 12px;
                font-size: 14px;
                .user-lgoin {
                    .top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .user-info {
                            display: flex;
                            align-items: center;

                            .avatar {
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                border-radius: 100%;
                                text-align: center;
                                overflow: hidden;
                                margin-right: 5px;
                                img {
                                    width: 100%;
                                    height: auto;
                                }
                            }
                        }
                    }
                    .bottoms {
                        textarea {
                            width: 100%;
                            height: auto;
                            font-size: 14px;
                            background: #ffffff;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            padding: 6px;
                            margin-top: 10px;
                        }
                        div {
                            float: right;
                            margin-top: 10px;
                            text-align: right;
                            display: inline-block;
                            padding: 5px 12px;
                            color: #fff;
                            border-radius: 2px;
                            font-size: 14px;
                            background: #008cee;

                        }
                    }
                }
                .user-no-login {
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    background-color: #f5f5f5;
                    font-size: 14px;
                    text-align: center;
                    color: #999;
                    border-radius: 4px;
                }

            }

            .home {
                /*padding: 10px;*/
                width: 44px;
                height: 44px;
                background: #fff;
                border-radius: 50%;
                position: fixed;
                bottom: 100px;
                right: 30px;
                box-shadow: 0px 1px 10px #222;
                text-align: center;
                line-height: 44px;
                i{
                    color: #008cee;
                    font-size: 23px;
                }
            }
        }
        .bsplit{
            width: 100%;
            height: 33px;
            background: #efefef;
            position: absolute;
            bottom: 44px;
            left: 0;
            right: 0;
        }
        .bottom-box {
            box-shadow: 0 1px 7px #888888;
            font-size: 12px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: #ffffff;
            height: 44px;
            line-height: 44px;
            display: flex;
            align-items: center;
            color: #838383;

            .active {
                color: #47E;
            }
            .item {
                text-align: center;
                flex: 1;
                width: 0%;
                display: flex;
                align-items: center;
                justify-content: center;
                .icon-shang{
                    font-size: 22px;
                }
                i {

                    font-size: 18px;
                    margin-right: 5px;
                }
            }
        }



        #blogs-money{
            background: rgba(0,0,0,.4);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .body{
                padding: 12px 15px;
                position: absolute;
                z-index: 500;
                width: 75%;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%,-50%);
                transform: translate(-50%,-50%);
                background-color: #fafafc;
                /*text-align: center;*/
                border-radius: 5px;
                overflow: hidden;
                .del{
                    margin-bottom: 16px;
                    cursor: pointer;
                }
                .dsimg{
                    text-align: center;
                    margin-bottom: 10px;
                    img{
                        width: 61px;
                        height: 62px;
                    }
                    p{
                        font-size: 12px;
                        color: #cdcdcd;
                    }
                }
                .num{
                    width: 100%;
                    height: 46px;
                    text-align: center;
                    margin: 0 auto;
                    font-size: 30px;
                    margin-bottom: 15px;
                    .changes{
                        width: 100%;
                        height: 46px;
                        text-align: center;
                        margin: 0 auto;
                        font-size: 30px;
                    }
                }
                .much{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    flex-wrap: wrap;
                    align-items: center;
                    font-size: 13px;
                    color: #1d9dd4;
                    .much-money{
                        text-align: center;
                        line-height: 25px;
                        width: 60px;
                        height: 25px;
                        border: 1px solid #1d9dd4;
                        border-radius: 3px;
                        margin: 0 9px 18px 9px ;
                    }
                    .actives{
                        color: #a8a8a8;
                        border: 1px solid #a8a8a8;
                    }
                }
                .btns{
                    display: block;
                    height: 40px;
                    line-height: 40px;
                    width: 90%;
                    margin: 9px auto;
                    margin-bottom: 15px;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 20px;
                    text-align: center;
                    background: #1aad19;
                    outline: none;
                    border: none;
                    box-shadow:0px 2px 2px 0px #638862;
                }

            }
        }
    }
</style>
