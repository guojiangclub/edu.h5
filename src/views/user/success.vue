<template>
    <div id="success">
        <Header title="我的">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="win con" v-if="statu">
                <i class="iconfont icon-chenggong"></i>
                <span>上传成功</span>
                <div>我们将会严格保护您的信息，保障您的安全</div>
            </div>
            <div class="fail con" v-else>
                <i class="iconfont icon-shibai"></i>
                <span>上传失败</span>
                <div>上传失败，请重试</div>
            </div>
        </div>


        <div class="bottom">
            <div class="edit" @click="jump('uncertified')" v-if="statu" >查看认证</div>
            <div class="edit" @click="jump('identity')" v-else >重新认证</div>
        </div>
    </div>



</template>

<script type="text/ecmascript-6">

    import {logout} from '../../utils/oauth';

    export default {
        name: 'success',
        data() {
            return {
                statu: ''
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
            idstatus(res) {
                this.statu = res.status;

            }
        },
        created() {
            EventBus.$on('IdCard', this.idstatus);
        },
        beforeDestroy() {
            EventBus.$off('IdCard');
        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #success{
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
            .con{
                background: #fff;
                text-align: center;
                padding-top: 27px;
                padding-bottom: 16px;
                i{
                    font-size: 27px;
                    margin-right: 5px;
                }
                span{
                    font-size: 25px;
                }
                div{
                    font-size: 14px;
                    margin-top: 5px;
                }
            }
            .win{
                i{
                    color: #008cee;
                }
                span{
                    color: #008cee;
                }
            }
            .fail{
                i{
                    color: #e73237;
                }
                span{
                    color: #e73237;
                }
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
