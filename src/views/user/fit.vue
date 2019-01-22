<template>
    <div id="fit">
        <Header title="设置">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="item line" @click="jump('uncertified')">
                <div class="txt">实名认证</div>
                <div class="enter iconfont icon-fanhui-1"></div>
            </div>
            <div class="item line" @click="jump('user-amend')">
                <div class="txt">修改密码</div>
                <div class="enter iconfont icon-fanhui-1"></div>
            </div>
            <div class="item line" @click="jump('postbox')">
                <div class="txt">修改邮箱</div>
                <div class="enter iconfont icon-fanhui-1"></div>
            </div>
            <div class="item line" @click="jump('phone')">
                <div class="txt">修改手机号</div>
                <div class="enter iconfont icon-fanhui-1"></div>
            </div>
            <div class="item quit" @click="exit">
                <div class="txt">退出登录</div>
            </div>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">

    import {logout} from '../../utils/oauth';

    export default {
        name: 'fit',
        data() {
            return {

            }
        },
        methods: {
            jump(name) {
                if (name) {
                    this.$router.push({name: name});
                }
            },
            exit() {
                logout.call(this);

            }
        },
        created() {

        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #fit{
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
            margin-top: 12px;
            .line{
                margin-bottom: 12px;
                display: flex;
                justify-content: space-between;
            }
            .item{
                background: #fff;
                padding: 12px 15px;

            }
            .quit{
                color: red;
                text-align: center;
            }

        }
    }


</style>
