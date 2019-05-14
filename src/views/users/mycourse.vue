<template>
    <div id="my_course">
        <div v-if="token">
            <div class="navbar mx-1px-bottom">
                <div  class="navbar-item" :class="activeIndex == 0 ? 'activity' : ''" @click="tabClick(0,$event)">
                    <div class="navbar-title">学习课程</div>
                </div>
                <div  class="navbar-item" :class="activeIndex == 1 ? 'activity' : ''" @click="tabClick(1,$event)">
                    <div class="navbar-title">通知公告</div>
                </div>
                <div class="navbar-slider" :style="{width:width + 'px', transform: 'translateX('+ sliderOffset +'px)'}"></div>
            </div>
            <div class="ul-content">
                <div v-if="activeIndex == 0">
                    <div v-if="dataList && dataList.length">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore" :immediate-check="immediate">
                            <van-cell v-for="(item,index) in dataList" :key="index">
                                <div class="li-list">
                                    <div class="item" @click="jumpDetail(item.course.id)">
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
                                                <div class="teacher" v-if="item.course.teacher">
                                                    <span class="iconfont icon-laoshi"></span>
                                                    {{item.course.teacher.name || '无名'}}老师
                                                </div>
                                                <div class="money">已加入</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </van-cell>
                        </van-list>
                    </div>
                    <div v-else class="no-data">暂无数据</div>
                </div>
                <div class="li-list" v-if="activeIndex == 1">
                    <div v-if="announcement && announcement.length">
                        <van-list v-model="anloading" :finished="anfinished" finished-text="没有更多了" @load="loadMore" :immediate-check="immediate">
                            <van-cell v-for="(item,index) in announcement" :key="index">
                                <div class="notice-item">
                                    <div class="content">
                                        <div v-html="item.content"></div>
                                    </div>
                                    <div class="teacher-time mx-1px-bottom">
                                        <div class="teacher" v-if="item.course.teacher">
                                            <span class="iconfont icon-laoshi"></span>
                                            {{item.course.teacher.name || '无名'}}老师
                                        </div>
                                        <div class="time">{{item.created_at}}</div>
                                    </div>
                                    <div class="from">来自：{{item.course.title}}</div>
                                </div>
                            </van-cell>
                        </van-list>
                    </div>
                    <div v-else class="no-data">暂无数据</div>
                </div>
            </div>
        </div>
        <div class="un-login" v-else>
            <div class="avatar">
                <img src="https://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F/defaultAvatar.png" alt="">
            </div>
            <div class="title">
                未登录
            </div>
            <div class="topic">点击立即登录查看我的课程</div>
            <div class="btn-box" @click="jumpLogin()">
                立即登录
            </div>

        </div>
        <!--tabbar-->
        <van-tabbar v-model="active" active-color="#004E9D" @change="jumpTab">
            <van-tabbar-item>
                <span>首页</span>
                <img src="https://cdn.ibrand.cc/icon_index.png" alt="" slot="icon">
            </van-tabbar-item>
            <van-tabbar-item>
                <span>我的课程</span>
                <img :src="props.active ? icon.active : icon.normal" alt="" slot="icon"
                slot-scope="props">
            </van-tabbar-item>
            <van-tabbar-item>
                <span>SVIP</span>
                <img src="https://cdn.ibrand.cc/icon_svip.png" alt="" slot="icon">
            </van-tabbar-item>
            <van-tabbar-item>
                <span>个人中心</span>
                <img src="https://cdn.ibrand.cc/icon_user.png" alt="" slot="icon">
            </van-tabbar-item>
        </van-tabbar>
    </div>




</template>

<script type="text/ecmascript-6">
    import { List } from 'vant';
    import { Cache, cache_keys, exif ,env } from '../../utils/util';
    export default {
        name: 'users-mycourse',
        component:{
            List
        },
        data(){
            return {
                active:1,
                width:'',
                sliderOffset:'',
                activeIndex:0,
                dataList:[],
                page:0,
                more:true,
                init:false,
                loading:false,
                finished:false,
                announcement:[],
                anpage:0,
                anmore:true,
                aninit:false,
                anloading:false,
                anfinished:false,
                immediate:false,
                icon: {
                    normal: 'https://cdn.ibrand.cc/icon_course.png',
                    active: 'https://cdn.ibrand.cc/icon_course_HL.png'
                },
                token:''
            }
        },
        created(){
            let  oauth = Cache.get(cache_keys.token);
           if(oauth && oauth.access_token){
               this.token  = oauth.access_token;
               let data = {
                   page:1
               }
               this.$store.dispatch('queryMycourseList',data)
               EventBus.$on('myCourseList',this.getMycourseList)
               EventBus.$on('mynoteList',this.getMynoteList)
           }


        },
        beforeDestroy(){
            EventBus.$off('myCourseList');
            EventBus.$off('mynoteList');

        },
        mounted(){
            this.width = document.body.clientWidth/2;
            this.sliderOffset = 0
        },
        methods:{
            jumpTab(index){
                if(index == 1){
                    return
                } else if (index == 0){
                    this.$router.push({
                        name:'index-index'
                    })
                } else if(index == 2){
                    this.$router.push({
                        name:'index-svip'
                    })
                } else if(index == 3){
                    this.$router.push({
                        name:'users-index'
                    })
                }
            },
            jumpDetail(id){
                this.$router.push({
                    name:'index-detail',
                    params:{
                        id:id
                    }
                })
            },
            //加载更多
            loadMore(){
                if(this.activeIndex == 0){
                    let page = this.page + 1;
                    let cdata = {
                        page:page
                    }
                    if (this.more) {
                        this.$store.dispatch('queryMycourseList',cdata)
                    } else {
                        this.loading = false;
                        this.finished = true;
                    }
                } else {
                    let anpage = this.anpage + 1;
                    let ndata = {
                        page:anpage
                    }
                    if(this.anmore){
                        this.$store.dispatch('queryMynoteList',ndata)
                    } else {
                        this.anloading = false;
                        this.anfinished = true;
                    }
                }

            },
            tabClick(index,e){
                this.activeIndex = index;
                this.sliderOffset = e.currentTarget.offsetLeft;
                let data = {
                    page:1
                }
                if(!this.init){
                    this.$store.dispatch('queryMycourseList',data)
                }
                if(index == 1){
                    if(!this.aninit){
                        this.$store.dispatch('queryMynoteList',data)
                    }
                }
            },
            getMynoteList(res){
                var list;
                var page = res.meta.pagination;
                var current_page = page.current_page;
                var total_pages = page.total_pages;
                if(current_page == 1){
                    list = res.data;
                } else {
                    list = this.announcement.concat(res.data);
                }
                this.announcement = list;
                this.anpage = current_page;
                this.anmore = current_page < total_pages;
                this.aninit = true;
                this.anloading = false;
            },
            //处理我的课程列表
            getMycourseList(res){
                var list;
                var page = res.meta.pagination;
                var current_page = page.current_page;
                var total_pages = page.total_pages;
                if(current_page == 1){
                    list = res.data;
                } else {
                    list = this.dataList.concat(res.data);
                }
                this.dataList = list;
                this.page = current_page;
                this.more = current_page < total_pages;
                this.init = true;
                this.loading = false;
            },
//            跳到登录页面去
            jumpLogin(){
                let source = this.$route.path;
                this.$router.push({
                    name:'users-register',
                    query:{
                        source:source
                    }
                })
            }

        }


    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#f3f3f3;
    }
    #my_course{
        height: 100%;
        overflow: auto;
        background-color: #f3f3f3;
        padding-bottom: 60px;
        .un-login{
            .avatar{
                margin: 56px auto 11px auto;
                width:80px;
                height: 80px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .title{
                text-align: center;
                color: #999999;
                font-size: 16px;
                line-height: 22px;
                padding-bottom: 8px;
            }
            .topic{
                text-align: center;
                color: #999999;
                font-size: 12px;
                line-height: 14px;
                padding-bottom: 39px;
            }
            .btn-box{
                height: 50px;
                line-height: 50px;
                color: #ffffff;
                text-align: center;
                margin:0 40px;
                font-size: 16px;
                background-color:#004E9D;
                border-radius:4px;
            }
        }
        .navbar {
            position: fixed;
            top: 0px;
            width: 100%;
            display: flex;
            height: 50px;
            line-height: 50px;
            background: #FFFFFF;
            font-size: 14px;
            color: #9B9B9B;
            z-index: 20;
            &.top_adr{
                top: 0px;
            }

            .navbar-item {
                flex: 1;
                width: 0%;
                text-align: center;

                &.activity {
                    color: #004E9D;
                }
            }
            .navbar-slider {
                position: absolute;
                content: " ";
                left: 0;
                bottom: 0;
                width: 4em;
                height: 3px;
                background-color: #004E9D;
                transition: transform .3s;
            }
        }
        .ul-content{
            margin-top: 50px;
            .no-data{
                text-align: center;
                padding: 20px;
                color: #9B9B9B;
            }
            .li-list{
                .item{
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    background-color: #FFFFFF;
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
                                color: #202020;
                            }
                        }
                    }
                }
                .notice-item{
                    background-color: #FFFFFF;
                    margin-bottom: 10px;
                    /* .title{
                       padding: 15px;
                       color: #202020;
                       font-size: 14px;
                       line-height: 20px;
                     }*/
                    .content{
                        padding: 15px 15px 0px 15px;
                        line-height: 20px;
                        color:#4A4A4A;
                        font-size: 13px;
                    }
                    .teacher-time{
                        padding:10px 15px 15px 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        color: #909090;
                        font-size: 12px;
                        .teacher{
                            span{
                                color: #909090;
                                flex: 12px;
                                display: inline-block;
                                padding-right: 8px;
                            }
                        }
                    }
                    .from{
                        padding: 12px 15px;
                        color: #004E9D;
                        font-size:12px;
                        line-height: 17px;
                    }
                }

            }
        }
        .black-mask{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: #000000;
            z-index: 100;
            display: none;
            &.cur{
                display: block;
            }
        }

    }



</style>
