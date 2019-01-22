<template>
    <div id="user-favorites">
        <Header title="收藏">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="head" @click="jump('favorites-add')"><i class="iconfont icon-shangchuan"></i> 创建收藏夹</div>
            <div class="favoritesi-item" >

                <div class="fbox">
                    <!--<div class="dot">
                        <div class="iconfont icon-renminbi"></div>
                    </div>-->
                    <div class="roundedTwo" v-show="round">
                        <input type="checkbox" value="None" id="roundedTwo" name="check" />
                        <label for="roundedTwo" class="selected" @click=""></label>
                    </div>

                    <div class="con" @click="jump('favorites-detail')">
                        <div class="favorites-name mx-1px-bottom alike">
                            老夫看你最近有凶兆啊
                        </div>
                        <div class="favorites-con alike">
                            <div class="house">666条收藏</div>
                            <div class="follow" v-show="!round">666人关注</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="bottom mx-1px-top">
            <div class="edit" v-show="flag" @click="hide" >编辑</div>
            <div class="del" v-show="!!round">
                <div class="left" @click="back" >
                    <div class="txt">取消</div>
                </div>
                <div class="rigth" @click="cut" >
                    <div class="txt">删除</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'user-favorites',
        data() {
            return {
                flag: true,
                round: false
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            },
            hide() {
                this.flag = !this.flag;
                this.round = !this.round;
            },
            back() {
                this.flag = !this.flag;
                this.round = !this.round;
            },
            cut() {

            }

        },
        created() {

        },
        beforeDestroy() {

        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    #user-favorites {
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
        .contents{
            .head{
                text-align: center;
                padding: 22px 0;
                background: #008cee;
                color: #fff;
                i{
                    font-size: 12px;
                }
            }
            .favoritesi-item{
                margin: 10px 15px 0px 15px;
                .fbox{
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    .roundedTwo {
                        width: 25px;
                        height: 25px;
                        position: relative;
                        background: #fff;
                        border: 1px solid #9b9b9b;
                        -moz-border-radius: 50%;
                        -webkit-border-radius: 50%;
                        border-radius: 50%;
                        margin-right: 10px;
                        label {
                            width: 21px;
                            height: 21px;
                            position: absolute;
                            top: 1px;
                            left: 1px;
                            cursor: pointer;
                            /*background: #fff;*/
                            -moz-border-radius: 50%;
                            -webkit-border-radius: 50%;
                            border-radius: 50%;

                        }
                        .selected{
                            &:after {

                                width: 9px;
                                height: 5px;
                                position: absolute;
                                top: 5px;
                                left: 4px;
                                border: 3px solid #ea4448;
                                border-top: none;
                                border-right: none;
                                background: transparent;
                                filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=1);
                                opacity: 1;
                                -moz-transform: rotate(-45deg);
                                -ms-transform: rotate(-45deg);
                                -webkit-transform: rotate(-45deg);
                                transform: rotate(-45deg);
                            }
                        }
                       /* input[type=checkbox] {
                            visibility: hidden;
                            &:checked + label:after {
                                filter: progid:DXImageTransform.Microsoft.Alpha(enabled=false);
                                opacity: 1;
                            }
                        }*/
                    }
                    .con{
                        background: #fff;
                        border-radius: 5px;
                        flex: 5;
                        .alike{
                            padding: 10px 8px;
                        }
                        .favorites-name{
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                        }
                        .favorites-con{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 15px;
                            color: #9b9b9b;
                        }
                    }
                    .dot{
                        margin-right: 10px;
                        .icon-renminbi{
                            display: inline-block;
                            font-size: 23px;
                            color: #ea4448;
                        }
                    }

                }

            }
        }
        .bottom{

            background: #fff;
            padding: 14px 0;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .edit{
                text-align: center;
                color: #008cee;
            }
            .del{
                display: flex;
                .left{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    color: #9b9b9b;
                    border-right:1px solid #ccc;

                    .txt{
                        text-align: left;
                    }
                }
                .rigth{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    .txt{
                        color: #ea4448;
                        font-weight: normal;
                        text-align: left;
                    }

                }
            }
        }
    }
</style>
