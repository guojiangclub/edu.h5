<template>
    <div id="teacher">
        <van-nav-bar
            title='教师详情页'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <div class="header">
            <div class="avatar" v-if="detail.user">
                <img :src="detail.user.avatar">
            </div>
            <div class="introduce">
                <div class="nick-name" v-if="detail.user">{{detail.user.user_name}}</div>
                <div class="label" v-if="detail.members && detail.coteries">
                    课程：{{detail.members.length}} 丨 数据圈：{{detail.coteries.length || 0}}
                </div>
            </div>
        </div>
        <!--讲师介绍-->
        <div class="teacher-info">
            <div class="title mx-1px-bottom">讲师介绍</div>
            <div class="label">
                <div class="name" v-if="detail.user">{{detail.user.user_name}}老师</div>
                <div class="txt">淘宝7年资深讲师 国家工信部高级电子商务师</div>
            </div>
        </div>
        <!--讲师圈子-->
        <div class="teacher-circle">
            <div class="title mx-1px-bottom">讲师数据圈</div>
            <div class="cirle-list">
                <div class="item">
                    <div class="logo">
                        <img src="https://wx3.sinaimg.cn/mw690/006ABCf7gy1fycfk2jk7sj30jx0kewq0.jpg">
                    </div>
                    <div class="text">
                        <div class="name">罗熙表情包</div>
                        <div class="owner">黔在在</div>
                    </div>
                    <div class="iconfont">i</div>
                </div>
                <div class="item mx-1px-bottom">
                    <div class="logo">
                        <img src="https://wx4.sinaimg.cn/mw690/006ABCf7gy1fycfk0sy7yj30jw0jxtim.jpg"></img>
                    </div>
                    <div class="text">
                        <div class="name">不要生气</div>
                        <div class="owner">黔在在</div>
                    </div>
                    <div class="iconfont icon-jiantou"></div>
                </div>
            </div>

        </div>
        <!--讲师课程-->
        <div class="teacher-course" v-if="detail.members && detail.members.length">
            <div class="title mx-1px-bottom">
                讲师课程
            </div>
            <div class="ul-content">
                <div class="li-list" v-for="(item,index) in detail.members" @click="jump('index-detail',item.course.id)">
                    <div class="item mx-1px-bottom">
                        <div class="left-info">
                            <img :src="item.course.picture">
                        </div>
                        <div class="right-info">
                            <div class="name">{{item.course.title}}</div>
                            <div class="tiem-box">
                                <div class="time">
                                    <span class="iconfont icon-keshi"></span>
                                    {{item.course.lesson_count}}课时
                                </div>
                                <div class="many">
                                    {{item.course.student_count}}人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    <span class="iconfont icon-laoshi"></span>
                                    {{detail.user.user_name}}老师
                                </div>
                                <div class="money">¥ {{item.course.display_price}}元</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import { Cache, cache_keys, exif ,env} from '../../utils/util';
    import { List,NavBar } from 'vant';
    export default {
        component:{
            List,
            NavBar
        },
        name: 'teacher',
        data(){
            return {
                teacher_id:'',
                detail:'',
                is_navbar:true


            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
            this.teacher_id = this.$route.params.id;
            let data = {
                id:this.teacher_id
            }
            this.$store.dispatch('querytearch',data)
            EventBus.$on('tearcherdata',this.getTearchDetail)

        },
        beforeDestroy(){
            EventBus.$off('tearcherdata')
        },
        mounted(){

        },
        methods:{
            onClickLeft(){
                window.history.back(-1);
            },
            getTearchDetail(res){
                this.detail = res.data
            },
            jump(name,id){
                this.$router.push({
                    name:name,
                    params:{
                        id:id
                    }
                })
            },

        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #teacher{
        height: 100%;
        background-color:#F3F3F3;
        overflow: auto;
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
        .header{
            background-color:#004E9D;
            padding:30px 15px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .avatar{
                width: 60px;
                height: 60px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .introduce{
                padding-left: 22px;
                color: #FFFFFF;
                .nick-name{
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 22px;
                    padding-bottom: 10px;
                }
                .label{
                    font-size: 12px;
                    line-height: 17px;
                }
            }
        }
        .teacher-info{
            padding-left: 15px;
            background-color: #FFFFFF;
            margin-bottom: 10px;
            .title{
                height: 44px;
                line-height: 44px;
                color: #4A4A4A;
                font-size: 14px;
                font-weight: 500;
            }
            .label{
                padding: 15px 15px 20px 0;
                color: #909090;
                font-size: 12px;
                line-height: 17px;
                .name{
                    padding-bottom: 4px;
                }
            }
        }
        .teacher-circle{
            background-color:#fff;
            margin-bottom: 10px;
            .title{
                height: 44px;
                line-height: 44px;
                padding: 0 15px;
                color: #4A4A4A;
                font-size: 14px;
            }
            .cirle-list{
                padding: 0 0 0 15px;
                .item{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 15px 20px 15px 0;
                    .logo{
                        width: 40px;
                        height: 40px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .text{
                        flex: 1;
                        padding-left: 10px;
                        .name{
                            color: #202020;
                            font-size: 13px;
                            line-height: 18px;
                            padding-bottom: 5px;
                        }
                        .owner{
                            color: #909090;
                            font-size: 12px;
                            line-height: 17px;
                        }
                    }
                    .iconfont{
                        color: #909090;
                        font-size: 16px;
                    }
                }
            }

        }
        .teacher-course{
            background-color: #FFFFFF;
            margin-bottom: 20px;
            .title{
                color: #4A4A4A;
                font-size: 14px;
                height:44px;
                line-height: 44px;
                font-weight: 500;
                padding: 0 15px;
            }
            .ul-content{
                .li-list{
                    .item{
                        padding: 20px 15px;
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;
                        .left-info{
                            width:135px;
                            height: 90px;
                            margin-right: 15px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .right-info{
                            flex: 1;
                            .name{
                                height: 44px;
                                color: #202020;
                                font-size: 15px;
                                line-height: 22px;
                                overflow : hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                margin-bottom: 8px;
                            }
                            .tiem-box{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                color:#909090;
                                font-size: 12px;
                                line-height: 14px;
                                padding-bottom: 10px;
                                .time{
                                    span{
                                        font-size: 12px;
                                    }
                                }
                            }
                            .teach-box{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                color:#909090;
                                font-size: 12px;
                                line-height: 14px;
                                .teacher{
                                    span{
                                        font-size: 12px;
                                    }
                                }
                                .money{
                                    color: #FF2741;
                                }
                            }
                        }
                    }
                }
            }
        }



    }

</style>
