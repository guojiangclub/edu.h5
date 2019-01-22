<template>
    <div id="edu-comments">
        <Header title="评论" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="grade mx-1px-bottom">
                <div class="left">
                    评分：
                </div>
                <div class="right">
                    <Rater :size="20" v-model="rater"></Rater>
                </div>
            </div>
            <div class="textarea">
                <textarea placeholder="说点什么吧..." v-model.trim="text"></textarea>
            </div>
            <div class="submit iconfont icon-rfeiji" @click="submit">

            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    	data() {
    		return {
			    rater: 5,
			    text: ''
            }
        },
        methods: {
    		submit() {
    			if (this.text.length < 5) {
    				this.$Modal.confirm({body: '请输入5个字以上的评价'})
                } else {
    				const data = {
    					rater: this.rater,
                        text: this.text
                    }

                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #edu-comments{
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
        .contents{
            height: 100%;
            overflow: auto;

            .grade{
                display: flex;
                align-items: center;
                padding: 12px;
            }
            .textarea{
                width: 100%;
                height: 150px;
                padding: 12px;
                textarea{
                    width: 100%;
                    height: 100%;
                    border: 1px solid #dddddd;
                    padding: 5px;
                }
            }
            .submit{
                position: absolute;
                right: 12px;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background: #008cee;
                color: #ffffff;
            }
        }
    }
</style>
