<template>
    <div id="edit-question">
        <Header title="编辑回答">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui--"></i>
            </div>
        </Header>
        <div class="contents">
            <textarea v-model="text">

            </textarea>
        </div>
        <div class="bottom" @click="submit">
            提交
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    	name: 'edit-question',
        data() {
    		return {
    			text: '',
			    question_id: ''
            }
        },
        created() {
    		var id = this.$route.params.id;
    		this.$store.dispatch('editAnswer',id);
    		EventBus.$on('editData', this.editData);
    		EventBus.$on('updateAnswerText',this.update);
    		console.log(this.$route);
        },
	    beforeDestroy() {
    		EventBus.$off('editData');
    		EventBus.$off('updateAnswerText');
        },
        methods: {
    		editData(data) {
    			this.text = data.answer_content;
    			this.question_id = data.question_id;
            },
            submit() {
    			var id = this.$route.params.id;
    			var data = {
    				id: id,
                    text: this.text
                }
    			this.$store.dispatch('updateAnswer', data);
            },
            update(res) {
    			if (res.status) {
                    this.$router.replace({name: 'question-detail', params: {id: this.question_id}});  // 直接返回会有问题。没解决！
                } else {
				    EventBus.$Modal.confirm({body: res.message || '请求失败'})
                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #edit-question {
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                padding-left: 0;
                i {
                    display: block;
                    font-size: 35px;
                }
            }
            .title {
                text-align: center;
            }
            .right {
                font-size: 0;
            }
        }
        .contents{
            height: 100%;
            padding-bottom: 50px;

            textarea{
                width: 100%;
                height: 100%;
                padding: 12px;
            }
        }
        .bottom{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 50px;
            background: #008cee;
            text-align: center;
            line-height: 50px;
            color: #ffffff;
        }
    }
</style>