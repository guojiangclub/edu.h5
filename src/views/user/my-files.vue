<template>
    <div id="my-files">
        <Header title="档案">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="head">
                <div class="text">
                    <input type="text" v-model="info.data.user_name" readonly>
                </div>
                <div class="resume">
                    <span class="signature" v-if="!info.meta.signature">这个人很懒，没填写个人简介</span>
                    <input  v-model="info.meta.signature" readonly v-else>

                </div>
            </div>

            <div class="means">
                <div class="item mx-1px-bottom">
                    <div class="name">
                        城市
                    </div>
                    <div class="text" @click="">
                        <!--<input type="text" placeholder="无" readonly>-->
                        <span>{{info.data.city}}</span>
                    </div>
                </div>
            </div>

            <div class="detailed">
                <div class="occupation record">
                    <div class="text">职业档案</div>
                    <div class="career pbg" v-if="info.meta.works == ''">
                        <div class="details">暂无职业详细资料</div>
                    </div>

                    <div class="tag data" v-else >
                        <div class="all mx-1px-bottom" v-for="(work,ind) in info.meta.works">
                            <div class="title" @click="show1(ind)" >
                                <div>{{work.name}}</div>
                                <i class="iconfont icon-fanhui-1" :class="ind == occupations ? 'rotate' : ''"></i>
                            </div>
                            <div class="full">{{work.role}}</div>
                            <div class="full" v-show="ind == occupations">
                                <div class="time">{{work.start_at}}~{{work.end_at}}</div>
                                <div class="city">{{work.city}}</div>
                                <div class="tags">{{work.tags}}</div>
                                <div class="description">{{work.description}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project record">
                    <div class="text">项目档案</div>
                    <div class="article pbg" v-if="info.meta.projects == '' ">
                        <div class="details">暂无项目详细资料</div>
                    </div>
                    <div class="pro data" v-else >
                        <div class="all mx-1px-bottom" v-for="(project,ind) in info.meta.projects">
                            <div class="title" @click="show2(ind)" >
                                <div>{{project.name}}</div>
                                <i class="iconfont icon-fanhui-1" :class="ind == article ? 'rotate' : ''"></i>
                            </div>
                            <div class="full">{{project.role}}</div>
                            <div class="full" v-show="ind == article">
                                <div class="time">{{project.start_at}}~{{project.end_at}}</div>
                                <div class="city">{{project.url}}</div>
                                <div class="tags">{{project.tags}}</div>
                                <div class="description">{{project.description}}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="learn record">
                    <div class="text">学习经历</div>
                    <div class="study pbg" v-if="info.meta.schools == ''">
                        <div class="details">暂无学习详细资料</div>
                    </div>

                    <div class="lea data" v-else>
                        <div class="all mx-1px-bottom" v-for="(school,ind) in info.meta.schools">
                            <div class="title" @click="show3(ind)" >
                                <div>{{school.name}}</div>
                                <i class="iconfont icon-fanhui-1" :class="ind == study ? 'rotate' : ''"></i>
                            </div>
                            <div class="full">{{school.start_at}}~{{school.end_at}}</div>
                            <div class="full" v-show="ind == study">
                                <div class="time">{{school.department}}</div>
                                <div class="city">{{school.degree}}</div>
                                <div class="tags">{{school.tags}}</div>
                                <div class="description">{{school.description}}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </div>

       <!-- 头像上传

        性别选择
        <Picker type="NormalPicker" v-model="showSex" @sure="sex" :list="sexList" :init-arr="sexDefault"></Picker>

        生日选择
        <Picker type="DatePicker" v-model="showDate" @sure="date" valueSeparator="-"></Picker>

        城市选择
        <Picker type="AreaPicker" v-model="showAddress" @sure="address" valueSeparator="-"></Picker>

        <v-button :loading='showLoading' height='50px' @click="submit">保存</v-button>

        <div class="submit">
        保存
        </div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import { is } from '../../utils/util';
    export default {
        name: 'my-files',
        data() {
            return {
                /*projects: [],
                schools: [],
                works: [],
                city: '',*/
                info: {
                    data:'',
                    meta:''
                },
                occupations: null,//职业档案详情
                article: null,//项目档案详情
                study: null,//学习档案详情
            }
        },
        methods:{
//            档案的显示隐藏
            show1(ind) {
                if (this.occupations == ind) {
                    this.occupations = null;
                } else {
                    this.occupations = ind;
                }
            },
            show2(ind) {
                if (this.article == ind) {
                    this.article = null;
                } else {
                    this.article = ind;
                }
            },
            show3(ind) {
                if (this.study == ind) {
                    this.study = null;
                } else {
                    this.study = ind;
                }
            },
            Info(res) {
                /*this.works = res.meta.works;
                this.projects = res.meta.projects;
                this.schools = res.meta.schools;
                this.signature = res.meta.signature;
                this.name = res.data.user_name;
                this.city = res.data.city;*/
                this.info = res

            }

        },
        created() {
            this.$Indicator.blade();
            const id = this.$route.params.id;
            this.$store.dispatch('queryIdInfo', id);
            EventBus.$on('idUser',this.Info);
        },
        beforeDestroy() {
            EventBus.$off('idUser');
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #my-files {
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
            color: #3d4145;
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 50px;
            font-weight: normal;

            input {
                width: 100%;
                height: 40px;
                font-size: 14px;
                font-weight: initial;
                color: #3d4145;
            }
            textarea {
                width: 100%;
                height: 30px;
                font-size: 14px;
                font-weight: initial;
                color: #3d4145;
            }

            .head {
                padding: 5px 15px;
                background: #008cee;
                display: flex;
                flex-direction: column;
                .text{
                    input{
                        text-align: left !important;
                        color: #fff;
                    }
                }
                .resume{
                    .signature{
                        color: rgba(255,255,255,.8);
                    }
                    input{
                        margin-top: -15px;
                        color: rgba(255,255,255,.5);
                        display: inline-block;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis
                    }
                }
            }
            .means{
                background: #fff;
                .item{
                    padding: 11px 35px 11px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .text{
                        span{
                            text-align: right;
                        }
                    }
                }
            }

            .detailed{
                .record{
                    margin-top: 25px;
                    .text{
                        padding: 0px 0px 5px 15px;
                        color: #888;
                    }
                    .pbg{
                        padding: 11px 15px;
                        background: #fff;
                    }
                    .data{
                        background: #fff;
                        padding-left: 15px;
                        .all{
                            padding: 12px 15px 9px 0px;
                            .title{
                                font-weight: 600;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                i{
                                    color: #9b9b9b;
                                    font-size: 14px;

                                }
                                .rotate{
                                    transition:all .2s linear;
                                    /*transition-delay:0.2s;*/
                                    transform: rotateZ(-90deg);
                                }
                            }
                            .full{
                                font-size: 12px;
                                color: #a7a7a7;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                            }
                        }
                    }
                }


            }



        }
        .vlc-button{
            position: absolute;
            bottom: 0;
            .vlc-button-btn{
                background: #008cee;
                border-radius: inherit;
                height: 100%;
            }
        }
        .submit{
            width: 100%;
            position: absolute;
            bottom: 0;
            height: 50px;
            background: #ed1e31;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
            color: #fff;
        }
    }
</style>
