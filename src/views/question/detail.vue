<template>
    <div id="question-detail">
        <Header title="问答">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="content">
            <div class="content-top">
                <div class="question-info">
                    <div class="question-name">
                        {{questionData.question.question_content}}
                    </div>
                    <div class="tag-box">
                        <div class="tag" v-for="tag in questionData.question.topics" @click="jump('question-topic', tag.topic_id)">{{tag.topic_title}}</div>
                    </div>
                </div>
                <div class="question-content clearfix">
                    <div class="content-text" v-html="questionData.question.question_detail">

                    </div>
                    <div class="question-user">
                        <div>
                            <!--gawgeah-->
                        </div>
                        <div class="attention" @click="attention(questionData.question.question_id)">
                            <span v-if="questionData.isFocus">已</span>关注
                        </div>
                    </div>

                </div>
            </div>
            <div class="content-bottom">
                <div class="answer-box mx-1px-top">
                    <div class="answer-item mx-1px-bottom" v-for="(answers, index) in questionData.answers" :class="'item_' + answers.answer_id">
                        <div class="answer-info">
                            <div class="avatar" v-if="answers.user.avatar_file">
                                <img :src="answers.user.avatar_file" alt="">
                            </div>
                            <div class="avatar" v-else>
                                <img src="../../static/img/avatar.png" alt="">
                            </div>
                            <div class="text name">{{answers.user.user_name}}</div>
                            <div class="text">{{answers.friendly_date}}</div>
                            <div class="text">回答</div>
                        </div>
                        <div class="answer-content" :class="questionData.isBlur ? 'active' : ''">
                            {{answers.answer_content}}
                        </div>
                        <div class="answer-operation-box">
                            <div class="operation-top">
                                <div class="praise" :class="answers.isVoteUp ? 'active' : ''" @click="like(answers.answer_id, index)">
                                    <i class="iconfont icon-dianzan-"></i>
                                    <p>{{answers.agree_count}}</p>
                                </div>
                                <div class="comment" @click="lockComments(answers.answer_id, index)">
                                    <i class="iconfont icon-wenda-"></i>
                                    <p>{{answers.comment_count}}</p>
                                </div>
                            </div>
                            <div class="operation-bottom mx-1px-top" v-if="show[index]">
                                <div class="arrows">

                                </div>
                                <div class="arrows active">

                                </div>

                                <!--有评论的情况-->
                                <div class="child-answer-list" v-if="comments[index] && comments[index].length">
                                    <div class="child-answer-item mx-1px-top" v-for="item in comments[index]">
                                        <div class="child-answer-info">
                                            <div class="avatar" v-if="item.user.avatar_file">
                                                <img :src="item.user.avatar_file" alt="">
                                            </div>
                                            <div class="avatar" v-else>
                                                <img src="../../static/img/avatar.png" alt="">
                                            </div>
                                            <div class="name">
                                                {{item.user.user_name}}
                                            </div>
                                            <div class="time">
                                                {{item.friendly_date}} 回答
                                            </div>
                                        </div>
                                        <div class="child-answer-content">
                                            {{item.message}}
                                        </div>
                                    </div>
                                </div>
                                <!--没有评论的情况-->
                                <div class="no-child-answer" v-else>
                                    暂无评论
                                </div>
                                <div class="answer-input-box">
                                    <div class="textarea">
                                        <textarea v-model="commentList[index]"></textarea>
                                    </div>
                                    <div class="btn-box">
                                        <div @click="close(index)">取消</div>
                                        <div @click="discuss(answers.answer_id, index)">评论</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="answer-botom-box">

                    <!--用户已登录-->
                    <div class="user-lgoin" v-if="login && !questionData.isAnswer">
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
                            <div class="input">
                                <CheckBox label="关注问题" v-model="attentionStatus"></CheckBox>
                            </div>
                        </div>
                        <div class="bottom-box clearfix">
                        <textarea v-model="replyText">

                        </textarea>
                            <div @click="reply(questionData.question.question_id)">
                                回复
                            </div>
                        </div>
                    </div>

                    <div class="isAnswer" v-if="login && questionData.isAnswer" @click="jump('edit-question', questionData.myAnswerId)">
                        您已回答过该问题,<span>重新编辑回答</span>
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
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	import {Cache, cache_keys, setPageTitle} from '../../utils/util';
	import {mapGetters, mapState} from 'vuex';

	export default {
		name: 'question-detail',
		data() {
			return {
				show: {},
				commentList: {},
				login: false,
				attentionStatus: true,
				replyText: '',
                info: ''
			}
		},
		computed: {
			questionData() {
				return this.$store.getters.getQuestionDetail;
			},
			comments() {
				return this.$store.getters.getQuestionComments;
			}
		},
		created() {

			EventBus.$Indicator.blade();
			this.isLogin();
			var id = this.$route.params.id;
			this.$store.dispatch('queryQuestionDetail', id);
			EventBus.$on('questionDetail', this.assignment);
			EventBus.$on('commentList',this.clostText);
			EventBus.$on('userInfo',this.userInfo);
		},
		beforeDestroy() {
			EventBus.$off('questionDetail');
			EventBus.$off('commentList');
			EventBus.$off('userInfo');
        },
		methods: {
			jump(name, id) {
				this.$router.push({name: name, params: {id: id}})
			},
            userInfo(res) {
				this.info = res.data;


            },
			isLogin() {
				var is_login = !!Cache.get(cache_keys.token);
				if (is_login) {
					this.login = true;
					this.$store.dispatch('queryUserInfo');
				} else {
					this.login = false;
				}
			},
			goLogin() {
				var source = this.$route.path;
				this.$router.push({name: 'user-login', query: {source}});
			},
//            点赞&取消点赞
			like(id,index) {
				var data = {
					id: id,
                    index: index
                }
				if (this.login) {
					if (this.questionData.answers[index].isVoteUp) {
						this.$store.dispatch('cancelDetailLike', data);
                    } else {
						this.$store.dispatch('questionDetailLike', data)
                    }
				} else {
//					alert('请先登录')
					this.$Modal.info({
						title: '请登录',
                        onOk: this.goLogin,
                        showCancle: false
					});
				}
			},
//            获取回答的数量&改变关注状态
			assignment(res) {
				setPageTitle(res.data.question.question_content)
				var length = res.data.answers.length;
				for (let i = 0; i < length; i++) {
					this.$set(this.commentList, i, '');
				}


//            定位到第一条
                if (this.$route.query.answerId) {
                    res.data.answers.forEach(item => {
                        if (item.answer_id == this.$route.query.answerId) {
                            this.$nextTick(() => {
                                this.$el.querySelector('.item_' + this.$route.query.answerId).scrollIntoView(true);
                            })
                        }
                    })
                }
			},
			lockComments(id, index) {
				var data = {
					id,
					index
				};
				if (this.show[index] == undefined) {
					this.$set(this.show, index, true);
					this.$store.dispatch('questionCommentList', data);
				} else if (this.show[index] == true) {
					this.$set(this.show, index, false);
				} else {
					this.$set(this.show, index, true);
				}
			},
			close(index) {
				this.show[index] = false;
			},
//            评论回复
			discuss(id, index) {
				var data = {
					id: id,
					message: this.commentList[index],
                    index: index
				}
				if (this.login) {
					if (data.message == '') {
						EventBus.$Modal.confirm({body: '请输入内容' })
					} else {
						this.$store.dispatch('answerComment', data);
					}
                } else {
					this.$Modal.info({body: '请登录', onOk: this.goLogin});
                }
			},
//            问题回复
			reply(id) {
				var data = {
					id: id,
                    message: this.replyText,
                    focus: this.attentionStatus
                }
                if (!this.replyText) {
	                this.$Modal.confirm({body: '请填写评论内容'})
                } else {
	                this.$store.dispatch('answerQuestion', data);
                }
            },
            clostText(index) {

				this.commentList[index] = '';

            },
//            关注问题
			attention(id) {
				if (this.login) {
					if (this.questionData.isFocus) {
						this.$store.dispatch('cancelAttentionQuestion', id);
					} else {
						this.$store.dispatch('attentionQuestion',id);
					}
                } else {
					this.$Modal.info({body: '请登录', onOk: this.goLogin});
                }
            }

		}
	}

</script>

<style rel="stylesheet/less" lang="less">
    #question-detail {

        .clearfix:after {
            content: " ";
            display: block;
            clear: both;
            height: 0;
        }
        .clearfix {
            zoom: 1;
        }
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
            padding-bottom: 60px;

            .content-top {
                .question-info {
                    color: #fff;
                    background-color: #008cee;
                    padding: 12px;

                    .question-name {
                        font-size: 16px;
                    }
                    .tag-box {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: flex-start;
                        padding-top: 5px;

                        .tag {
                            background-color: #22a4ff;
                            font-size: 14px;
                            padding: 5px;
                            margin: 5px 5px 0 0;
                        }
                    }
                }
                .question-content {
                    padding: 12px;
                    box-shadow: 0 2px 6px #888888;
                    word-wrap: break-word;

                }
                .question-user{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 20px;
                    .attention {
                        display: block;
                        padding: 5px 12px;
                        color: #fff;
                        border-radius: 2px;
                        font-size: 14px;
                        background: #008cee;
                    }
                }
            }
            .content-bottom {
                margin-top: 12px;
                font-size: 14px;
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

                .answer-box {
                    .answer-item {
                        padding: 10px 0;
                        .answer-info {
                            font-size: 13px;
                            color: #666666;
                            display: flex;
                            flex-direction: row;
                            flex-wrap: wrap;
                            align-items: center;
                            justify-content: flex-start;
                            line-height: 16px;
                            padding: 0 12px;

                            > * {
                                margin: 0 0 3px 3px;
                            }
                            .avatar {
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                border-radius: 100%;
                                text-align: center;
                                overflow: hidden;

                                img {
                                    width: 100%;
                                    height: auto;
                                }
                            }
                            .text {
                                height: 18px;
                                line-height: 18px;

                                &.name {
                                    color: #008cee;
                                }
                            }
                            .tag {
                                color: #101010;
                                padding: 2px 3px;
                                background: #e4e4e4;
                            }
                        }
                        .answer-content {
                            padding: 10px 12px;
                            word-wrap: break-word;

                            &.active {
                                color: transparent;
                                text-shadow: #111 0 0 15px;
                            }
                        }
                        .answer-operation-box {
                            position: relative;
                            .operation-top {
                                display: flex;
                                align-items: center;
                                padding: 0 12px;
                                .active{
                                    color: #008cee;

                                    i{
                                        color: #008cee;
                                    }
                                }
                                div {
                                    display: flex;
                                    /*align-items: center;*/
                                    background: #f5f5f5;
                                    border-radius: 4px;
                                    padding: 3px 5px;
                                    font-size: 14px;
                                    margin-right: 10px;
                                    color: #999;

                                    p {
                                        display: block;
                                        margin-left: 5px;
                                    }
                                    i {
                                        display: block;
                                        font-size: 10px;
                                        color: #848484;
                                        line-height: 19px;
                                    }
                                }
                            }
                            .operation-bottom {
                                margin-top: 20px;
                                padding: 0 12px;
                                background: #f5f5f5;
                                .arrows {
                                    position: absolute;
                                    width: 0;
                                    height: 0;
                                    margin: 0 !important;
                                    line-height: 0;
                                    border-style: solid;
                                    z-index: 2;
                                    top: -15px;
                                    left: 85px;
                                    border-color: transparent transparent #f5f5f5 transparent;
                                    border-width: 8px;

                                    &.active {
                                        z-index: 0;
                                        top: -16px;
                                        left: 85px;
                                        border-color: transparent transparent #cccccc transparent;
                                        border-width: 8px;
                                    }
                                }
                                .no-child-answer {
                                    height: 20px;
                                    line-height: 20px;
                                    padding: 10px 0;
                                    text-align: center;
                                    color: #333333;
                                    box-sizing: content-box;
                                    font-size: 14px;
                                }
                                .child-answer-list {
                                    padding: 10px 0;

                                    .child-answer-item {
                                        padding: 10px 0;

                                        &.item_17918{
                                            background: red;
                                        }
                                        .child-answer-info {
                                            font-size: 13px;
                                            color: #666666;
                                            display: flex;
                                            flex-direction: row;
                                            flex-wrap: wrap;
                                            align-items: center;
                                            justify-content: flex-start;
                                            line-height: 16px;

                                            .avatar {
                                                width: 20px;
                                                height: 20px;
                                                line-height: 20px;
                                                border-radius: 100%;
                                                text-align: center;
                                                overflow: hidden;
                                                margin-left: 3px;
                                                img {
                                                    width: 100%;
                                                    height: auto;
                                                }
                                            }
                                            .name {
                                                margin: 0 3px;
                                                color: #008cee;
                                            }
                                        }
                                        .child-answer-content {
                                            font-size: 14px;
                                            padding: 10px 0 0 3px;
                                        }
                                    }
                                }
                                .answer-input-box {
                                    padding-bottom: 10px;
                                    textarea {
                                        width: 100%;
                                        height: auto;
                                        font-size: 14px;
                                        background: #ffffff;
                                        border: 1px solid #ccc;
                                        border-radius: 4px;
                                        padding: 6px;
                                    }
                                    .btn-box {
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        margin-top: 10px;

                                        div {
                                            font-size: 14px;
                                            border-radius: 2px;
                                            padding: 5px 12px;
                                            background: #008cee;
                                            color: #ffffff;
                                            text-align: center;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .answer-botom-box {
                    font-size: 14px;
                    /*margin-top: 20px;*/
                    padding: 20px 12px;

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
                        .bottom-box {
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
                    .isAnswer{
                        text-align: center;

                        span{
                            color: #008cee;
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
            }
        }
    }
</style>
