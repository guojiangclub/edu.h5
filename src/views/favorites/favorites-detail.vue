<template>
    <div id="favorites-detail">
        <Header title="收藏">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="head">
                <div class="con-title">
                    <div class="title">兴趣</div>
                    <div class="house">666条收藏</div>
                </div>
                <div class="user">
                    <div class="avatar">
                        <img src="../../static/img/avatar.png" alt="">
                    </div>
                    <h2 class="vmc-nowrap">1324f6as4f6sa4f</h2>
                </div>
            </div>
            <div class="favoritesi-item" >

                <div class="fbox">
                    <div class="roundedTwo">
                        <input type="checkbox" value="None" id="roundedTwo" name="check" />
                        <label for="roundedTwo"></label>
                    </div>

                    <div class="con" @click="">
                        <div class="favorites-con">
                            <div class="house">魔王鸽王萝莉控</div>
                            <div class="follow">2017/12/04</div>
                        </div>
                        <div class="favorites-name">
                            老夫看你最近有凶兆啊
                        </div>

                    </div>

                </div>

            </div>
        </div>

        <div class="bottom mx-1px-top">
            <div class="edit" v-show="flag">编辑</div>
            <div class="del">
                <div class="left" @click="" >
                    <div class="txt">取消</div>
                </div>
                <div class="rigth" @click="" >
                    <div class="txt">删除</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'favorites-detail',
        data() {
            return {
                flag: false
            }
        },
        methods: {
            jump(name) {
                this.$router.push({name: name});
            }

        },
        created() {

        },
        beforeDestroy() {

        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #favorites-detail {
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
                padding: 13px 15px;
                background: #fff;
                .con-title{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .title{
                        color: #0a1624;

                    }
                    .house{
                        color: #9b9b9b;
                        font-size: 12px;
                    }
                }
                .user{
                    margin-top: 7px;
                    display: flex;
                    align-items: center;
                    .avatar{
                        width: 20px;
                        height: 20px;
                        border-radius: 100%;
                        text-align: center;
                        overflow: hidden;
                        margin-right: 8px;
                        img {
                            width: 100%;
                            height: auto;
                        }
                    }
                    .vmc-nowrap{
                        font-size: 14px;
                        color: #9b9b9b;
                    }
                }
            }
            .favoritesi-item{
                margin: 15px 0px 0px 0px;
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
                        margin-left: 15px;
                        label {
                            width: 21px;
                            height: 21px;
                            position: absolute;
                            top: 1px;
                            left: 1px;
                            cursor: pointer;
                            background: #fff;
                            -moz-border-radius: 50%;
                            -webkit-border-radius: 50%;
                            border-radius: 50%;
                            &:after {
                                content: '';
                                width: 9px;
                                height: 5px;
                                position: absolute;
                                top: 5px;
                                left: 4px;
                                border: 3px solid #ea4448;
                                border-top: none;
                                border-right: none;
                                background: transparent;
                                filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
                                opacity: 0;
                                -moz-transform: rotate(-45deg);
                                -ms-transform: rotate(-45deg);
                                -webkit-transform: rotate(-45deg);
                                transform: rotate(-45deg);
                            }
                            &:hover::after {
                                filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=30);
                                opacity: 0.3;
                            }
                        }
                        input[type=checkbox] {
                            visibility: hidden;
                            &:checked + label:after {
                                filter: progid:DXImageTransform.Microsoft.Alpha(enabled=false);
                                opacity: 1;
                            }
                        }
                    }
                    .con{
                        background: #fff;
                        flex: 5;
                        padding: 13px 15px;
                        .favorites-name{
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            font-size: 14px;
                        }
                        .favorites-con{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 15px;
                            color: #9b9b9b;
                            .house{
                                color: #008cee;
                            }
                            .follow{
                                font-size: 12px;
                            }
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
