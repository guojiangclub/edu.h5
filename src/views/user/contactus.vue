<template>
    <div id="contactus">
        <Header title="联系我们">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">

            <div class="contact">
                <div class="contact-item">
                    <p>培训咨询（线上或线下培训、个人学习与培训）</p>
                    <p>联系人：梁勇</p>
                    <p>电话：158-2133-9409</p>
                </div>
                <div class="contact-item">
                    <p>企业咨询（项目合作、工具选型免费咨询、企业培训）</p>
                    <p>联系人：周剑</p>
                    <p>电话：177-0179-9911</p>
                </div>
                <!--<div class="contact-item">
                    <p>猎头服务</p>
                    <p>联系人：熊威</p>
                    <p>电话：158-0090-8884</p>
                </div>-->
            </div>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">


    export default {
        name: 'contactus',
        data() {
            return {

            }
        },
        methods: {
            jump(name) {
                if (name) {
                    this.$router.push({name: name});
                }
            }
        },
        created() {

        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #contactus{
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
            .contact{
                background: #ffffff;
                padding-left: 13px;
                .contact-item{
                    padding-top: 30px;
                    color: #676767;
                    p{
                        &:first-child{
                            color: #005aab;
                            padding-bottom: 15px;
                        }
                    }
                    &:last-child{
                        padding-bottom: 50px;
                    }
                }
            }
        }
    }


</style>
