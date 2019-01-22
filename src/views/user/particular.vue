<template>
    <div id="particular">
        <Header title="招聘">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="post-list">
                <div class="post-item">
                    <img src="../../static/img/kn.png" alt="">
                    <div class="post-right">
                        <div class="name">web前端工程师</div>
                        <div class="case">
                            <span class="post-company">上海拓善智能科技有限公司</span>
                            <span class="salary">10k-15k</span>
                        </div>
                        <div class="post-position  mx-1px-top">
                            <div class="locate equal">
                                <i class="iconfont icon-weizhitianshan post-icon"></i>
                                长沙
                            </div>
                            <div class="time equal">
                                <i class="iconfont icon-jiaoyujingli post-icon"></i>
                                1-3年
                            </div>
                            <div class="education equal">
                                <i class="iconfont icon-gongzuojingli post-icon"></i>
                                本科
                            </div>
                            <span class="while equal">23小时前</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="company-list">
                <!--<div class="company-item">
                    <div class="name">职位描述</div>
                    <div class="btn-list">
                        <span class="btn white">全部</span>
                    </div>
                </div>-->
                <div class="company-item">
                    <div class="name">任职要求</div>
                    <div class="btn-list">
                        <span class="btn white">全部</span>
                    </div>
                </div>
                <div class="company-item">
                    <div class="name">公司简介</div>
                    <div class="btn-list">
                        <span :class="more ? '' : 'btn'">
                        全部
                        </span>
                        <div class="more" @click="pack">{{text ? '收起' : '展开'}}<i class="iconfont icon-fanhui-2 icon" :class="more ? 'icon' : 'rotate'"></i> </div>
                    </div>
                </div>

            </div>
            <!--失败-->
            <div class="insufficient" v-show="appear">
                <div class="intermediate">
                    <div class="body">
                        <div class="intermediate-text">投递失败！</div>
                        <div class="intermediate-a">个人简历信息未完善</div>
                    </div>
                    <div class="btn">
                        <div class="button">
                            <button class="bottom-btn all" @click="hide">取消</button>
                        </div>
                        <div class="button">
                            <button class="bottom-btn" @click="jump('edit')">完善简历</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--成功-->
            <div class="success" v-show="success">
                <div class="pair">
                    <i class="iconfont icon-yiguanzhu"></i>
                    <div class="text">已投递</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="edit">
                <v-button :loading='showLoading' height='50px' @click="delivery">投递简历</v-button>
            </div>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">

    export default {
        name: 'particular',
        data() {
            return {
                showLoading: false,
                appear: false,
                success: false,
                more: false,
                text: false,
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
            delivery(){
                this.appear = true;
                this.success = true;
                setTimeout(()=>{
                    this.success = false;
                },2000)
            },
            hide(){
                this.appear = false;
            },
            pack(){
                this.more = !this.more;
                this.text = !this.text;
            }
        },
        created() {

        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #particular{
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
        .content{
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            padding-bottom: 70px;

            .post-list{
                .post-item{
                    display: flex;
                    padding: 15px;
                    background: #ffffff;
                    img{
                        width: 80px;
                        height: 80px;
                        border: 1px solid #efeff4;
                        margin-right: 10px;
                    }
                    .post-right{
                        width: 100%;
                        .name{
                            /*font-size: 17px;*/
                            font-weight: 600;
                        }
                        .case{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin: 4px 0px 6px 0px;
                            .post-company{
                                font-size: 13px;
                                color: #9b9b9b;
                                flex:1;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            .salary{
                                font-size: 14px;
                                color: #eb7073;
                            }
                        }
                        .post-position{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-top: 6px;
                            .equal{
                                font-size: 12px;
                                color: #9b9b9b;
                                .post-icon{
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                }
            }

            .company-list{
                .company-item{
                    .name{
                        font-size: 14px;
                        margin: 20px 15px 10px 15px;
                        color: #9b9b9b;
                    }
                    .btn-list{
                        background: #ffffff;
                        padding: 13px 15px;
                        font-size: 12px;
                        color: #9b9b9b;
                        .btn{
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 10;
                            -webkit-box-orient: vertical;
                        }
                        .more{
                            text-align: center;
                            color: #008cee;
                            margin-top: 15px;
                            .icon{
                                margin-left: 5px;
                                display: inline-block;
                                transform: rotate(-90deg);
                                font-size: 12px;
                            }
                            .rotate{
                                margin-left: 5px;
                                display: inline-block;
                                transform: rotate(90deg);
                                font-size: 12px;
                            }
                        }
                    }
                }


            }
            .insufficient{
                position: fixed;
                background: rgba(0,0,0,.5);
                width: 100%;
                height: 100%;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                z-index: 99;
                .intermediate{
                    width: 60%;
                    background: #ffffff;
                    border-radius: 10px;
                    position:absolute;
                    top:50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    overflow: hidden;
                    z-index: 100;
                    .body{
                        line-height: 25px;
                        padding: 20px;
                        word-wrap: break-word;
                        overflow-y: scroll;
                        .intermediate-text{
                            text-align: center;
                            color: #ea4448;;
                        }
                        .intermediate-a{
                            font-size: 14px;
                            color: #888;;
                            text-align: center
                        }
                    }
                    .btn{
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        flex-direction: row;
                        overflow: hidden;
                        .button{
                            border-top: 1px solid #e3e3e3;
                            position: relative;
                            width: 100%;
                            overflow-x: hidden;
                            box-sizing: content-box;
                            .bottom-btn{
                                width: 100%;
                                height: 100%;
                                padding: 10px 0px;
                                color: #02bb00;
                                &.all{
                                    border-right: 1px solid #e3e3e3;
                                    color: #9b9b9b;
                                }
                            }
                        }
                    }

                }
            }
            .success{
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                z-index: 99;
                .pair{
                    background: rgba(0,0,0,.5);
                    border-radius: 10px;
                    position:absolute;
                    top:50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    overflow: hidden;
                    z-index: 100;
                    text-align: center;
                    color: #ffffff;
                    padding: 20px 30px;
                    i{
                        font-size: 30px;
                    }
                    .text{
                        font-size: 13px;
                    }
                }
            }

        }
        .bottom{
            background: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .edit{
                text-align: center;
                color: #fff;
                .vlc-button-normal{
                    background-color: #008cee;
                    border-color: #008cee;
                    border-radius: 0px;
                }
            }
        }


    }


</style>
