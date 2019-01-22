<template>
    <div id="identity">
        <Header title="我的">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="head">
                <div class="my">个人身份认证</div>
                <span>智能加密，保障您的信息安全</span>
            </div>
            <div class="con">
                <div class="text ">真实姓名</div>
                <input type="text" placeholder="请输入真实姓名" v-model="name">
                <div class="text">身份证号</div>
                <input type="text" placeholder="请输入本人真实身份证号" v-model="card">
            </div>
            <div class="cor">
                <div class="text">上传注意事项</div>
                <div class="txt">
                    <p>1.确保上传能看到身份证四角。</p>
                    <p>2.确保上传身份证的清晰。</p>
                    <p>3.上传图片大小不能超过2M。</p>
                </div>
                <div class="face">
                    <input id="profile_avatar_upload" type="file" accept="image/*" class="img_file" @change="fileChange">
                    <div v-if="!url">
                        <div class="iconfont icon-xiangji"></div>
                        <span>上传身份证正面（拍摄人像页）</span>
                    </div>
                    <img :src="url" alt="" v-else>

                </div>
            </div>

        </div>
        <div class="bottom">
            <v-button :loading='showLoading' @click="submit">确定</v-button>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">

    import {logout} from '../../utils/oauth';
    import { is } from '../../utils/util';

    export default {
        name: 'identity',
        data() {
            return {
                name:'',
                card:'',
                url: '',
                showLoading: false
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
            fileChange(){
                var files = document.getElementById('profile_avatar_upload').files;
                console.dir(files);
                if (!files.length) return;
                this.$store.dispatch('uploadAvatar',files[0]);

            },
            Img(res) {
                this.url = res;
            },
            submit() {


                let data = {
                    name: this.name,
                    photo: this.url,
                    card: this.card
                }
                let mes = null;
                if (!is.has(this.name)) {
                    mes = '请输入您的姓名';
                } else if (!is.has(this.card)) {
                    mes = '请输入您的身份证'
                } else if (!is.identity_no(this.card)) {
                    mes = '身份证格式错误';
                } else if (!is.has(this.url)) {
                    mes = '请输入您的身份证照片'
                }

                if (mes) {
                    this.$Modal.confirm({body: mes})
                } else {
                    this.showLoading = true;
                    this.$store.dispatch('idCard',data);
                }

//                this.card = s;

            },
            idcard(status, res) {
                this.showLoading = false;

//                this.$router.push({name: 'success', qurey: {status: res.status}})
                if (status) {
                    this.$Modal.info({
                        body:"上传成功" ,
                        okText:'确定',
                        cancleText:'返回',
                        onOk: function () {
                            window.history.back();
                        }
                    });
                } else {
                    this.$Modal.info({
                        body:"上传失败",
                        okText:'重新认证',
                        cancleText:'取消',
                    });
                }
            }

        },
        created() {
            EventBus.$on('upload_img', this.Img);
            EventBus.$on('IdCard', this.idcard)
        },
        beforeDestroy() {
            EventBus.$off('upload_img');
            EventBus.$off('IdCard');
        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #identity{
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
            box-sizing: border-box;
            padding-bottom: 60px;

            .head{
                background: #008cee;
                padding: 10px 15px;
                .my{
                    color: #fff;
                }
                span{
                    color: rgba(255,255,255,.6);
                    font-size: 12px;
                }

            }
            .con{
                margin-top: 10px;
                width: 100%;
                .text{
                    padding: 20px 15px;
                    padding-bottom: 5px;
                }
                input{
                    font-size: 12px;
                    padding: 14px 15px;
                    width: 100%;
                    background: #fff;
                }
            }
            .cor{

                margin: 30px 15px 0px 15px;
                .face {
                    background: #008cee;
                    text-align: center;
                    padding-bottom: 20px;
                    padding-top: 5px;
                    position: relative;

                    .icon-xiangji{
                        font-size: 60px;
                        color: #fff;
                    }
                    span{
                        color: #fff;
                    }
                    input {
                        background: red;
                        width: 100%;
                        position: absolute;
                        top: 0px;
                        left: 0;
                        height: 100%;
                        opacity: 0;
                    }
                }
                .text{
                    font-size: 14px;
                    margin-bottom: 7px;
                    color: #9b9b9b;
                }
                .txt{
                    font-size: 12px;
                    color: #9b9b9b;
                    margin-bottom: 15px;
                }
            }

        }
        .bottom {

            .vlc-button-normal{
                background-color: #008cee;
                border-color: #008cee;
            }
            background: #008cee;
            padding: 5px 0;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .edit {
                text-align: center;
                color: #fff;
            }
        }
    }


</style>
