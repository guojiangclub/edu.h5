<template>
    <div id="upload">
        <Header title="我的">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="face">
                <!--<img :src="url" alt="">-->
                <input :id="id[0]" type="file" accept="image/*" class="img_file" @change="fileChange">
                <div>
                    <div class="iconfont icon-xiangji"></div>
                    <span>上传身份证正面（拍摄人像页）</span>
                </div>

            </div>
            <div class="face last">

                <input :id="id[1]" type="file" accept="image/*" class="img_file" @change="fileChange">
                <div v-if="!url">
                    <div class="iconfont icon-xiangji"></div>
                    <span>上传身份证反面（拍摄国徽页）</span>
                </div>
                <img :src="url" alt="" v-else>

            </div>
            <div class="text">上传注意事项</div>
            <div class="txt">
                <p>1.确保上传能看到身份证四角。</p>
                <p>2.确保上传身份证的清晰。</p>
                <p>3.正确区分身份证正反面上传</p>
            </div>
        </div>
        <div class="bottom">
            <div class="edit" @click="jump('success')" >确定上传</div>
            <!--<div class="edit" @click="" >确定上传</div>-->
        </div>
    </div>



</template>

<script type="text/ecmascript-6">

    import {logout} from '../../utils/oauth';

    export default {
        name: 'upload',
        data() {
            return {
                id: ['profile_avatar_upload','profile_avatar_upload1'],
                url: ''
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
            fileChange(){
                for(let i = 0; i<this.id.length; i++) {
                    var files = document.getElementById(this.id[i]).files;
                    console.dir(files);
                    if (!files.length) return;
                    this.$store.dispatch('uploadAvatar',files[0]);
                }

            },
            Img(res) {
                this.url = res;
            }

        },
        created() {
            EventBus.$on('upload_img', this.Img);
        },
        beforeDestroy() {
            EventBus.$off('upload_img');
        },
    }

</script>


<style rel="stylesheet/less" lang="less">

    #upload{
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
            margin: 10px 15px 0px 15px;
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
            .last{
                margin-top: 20px;
                margin-bottom: 75px;
            }
            .text{
                font-size: 14px;
                margin-bottom: 7px;
            }
            .txt{
                font-size: 12px;
                color: #9b9b9b;
            }
        }
        .bottom {

            background: #008cee;
            padding: 14px 0;
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
