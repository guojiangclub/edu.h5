<template>
    <div id="index">
        <div>
            <!--头部-->
            <div class="header">
                <!--搜索-->
                <div class="search" @click="jumpSearch">
                    <input type="text" placeholder="搜索你感兴趣的课程" disabled="true" >
                </div>
                <!--轮播图-->
                <div class="banner">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for="(image, index) in homedata.banners" :key="index" @click="jumpLocation(image.link)">
                            <img :src="image.image" alt="">
                        </van-swipe-item>
                    </van-swipe>

                </div>
            </div>
            <!--svip的广告图-->
            <!--<div class="svip-box" @click="jumpLocation(homedata.svipBanner[0].link)">
                <img :src="homedata.svipBanner[0].image">
            </div>-->
            <!--优惠券-->
            <div class="coupon-box" v-if="homedata.coupons && homedata.coupons.length">
                <div class="scroll-view">
                    <div class="pa-li" v-for="(item,index) in homedata.coupons" :key="index" @click="receiveCoupon(item.id,item.is_receive,index)">
                        <div class="li-item">
                            <div class="left-info" v-if="item.action_type.type == 'cash'">{{item.action_type.value}}元</div>
                            <div class="left-info" v-else>{{item.action_type.value}}折</div>
                            <div class="right-info">
                                <div class="label">{{item.title}}</div>
                                <div class="soon" v-if="!item.is_receive">立即领取</div>
                                <div class="soon" v-else>已领取</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--课程分类的菜单-->
            <!--<div class="menu-box">
                <div class="scroll-view">
                    <div class="pa-li" @click="jump('index-classification',36)">
                        <div class="li-item">
                            <div class="top-info">
                                数据
                            </div>
                            <div class="bottom-info">
                                大数据
                            </div>
                        </div>
                    </div>
                    <div class="pa-li" @click="jump('index-classification',37)">
                        <div class="li-item">
                            <div class="top-info logo-1">
                                分析
                            </div>
                            <div class="bottom-info">
                                数据分析
                            </div>
                        </div>
                    </div>
                    <div class="pa-li" @click="jump('index-classification',38)">
                        <div class="li-item">
                            <div class="top-info logo-2">
                                挖掘
                            </div>
                            <div class="bottom-info">
                                数据挖掘
                            </div>
                        </div>
                    </div>
                    <div class="pa-li" @click="jump('index-classification',43)">
                        <div class="li-item">
                            <div class="top-info logo-3">
                                库
                            </div>
                            <div class="bottom-info">
                                数据库
                            </div>
                        </div>
                    </div>
                    <div class="pa-li" @click="jump('index-classification',39)">
                        <div class="li-item">
                            <div class="top-info logo-4">
                                学习
                            </div>
                            <div class="bottom-info">
                                机器学习
                            </div>
                        </div>
                    </div>
                    <div class="pa-li" @click="jump('index-classification',40)">
                        <div class="li-item">
                            <div class="top-info logo-5">
                                智能
                            </div>
                            <div class="bottom-info">
                                人工智能
                            </div>
                        </div>
                    </div>
                    <div class="pa-li" @click="jump('index-classification',72)">
                        <div class="li-item">
                            <div class="top-info logo-6">
                                职业
                            </div>
                            <div class="bottom-info">
                                职业发展
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->
            <!--分类菜单-->
            <div class="classify-menu">
                <div class="classify-item" @click="jump('index-classification',36)">
                    <div class="top-info">
                        数据
                    </div>
                    <div class="bottom-info">
                        大数据
                    </div>
                </div>
                <div class="classify-item" @click="jump('index-classification',37)">
                    <div class="top-info logo-1">
                        分析
                    </div>
                    <div class="bottom-info">
                        数据分析
                    </div>
                </div>
                <div class="classify-item" @click="jump('index-classification',38)">
                    <div class="top-info logo-2">
                        挖掘
                    </div>
                    <div class="bottom-info">
                        数据挖掘
                    </div>
                </div>
                <div class="classify-item" @click="jump('index-classification',43)">
                    <div class="top-info logo-3">
                        库
                    </div>
                    <div class="bottom-info">
                        数据库
                    </div>
                </div>
               <!-- <div class="classify-item" @click="jump('index-classification',39)">
                    <div class="top-info logo-4">
                        学习
                    </div>
                    <div class="bottom-info">
                        机器学习
                    </div>
                </div>
                <div class="classify-item" @click="jump('index-classification',40)">
                    <div class="top-info logo-5">
                        智能
                    </div>
                    <div class="bottom-info">
                        人工智能
                    </div>
                </div>
                <div class="classify-item" @click="jump('index-classification',72)">
                    <div class="top-info logo-6">
                        职业
                    </div>
                    <div class="bottom-info">
                        职业发展
                    </div>
                </div>
                <div class="classify-item" @click="jump('index-classification',41)">
                    <div class="top-info logo-7">
                        商业
                    </div>
                    <div class="bottom-info">
                        商业智能BI
                    </div>
                </div>-->
            </div>
            <!--推荐课程列表-->
            <div class="recommend-list">
                <div class="title mx-1px-bottom">推荐课程</div>
                <div class="ul-content">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore" :immediate-check="immediate">
                        <van-cell  v-for="(item,index) in dataList" :key="index" @click="jump('index-detail',item.id)">
                            <div class="li-item">
                                <div class="left-info">
                                    <img :src="item.picture">
                                    <div class="limit-discount" v-if="item.is_discount == 1"></div>
                                </div>
                                <div class="right-info">
                                    <div class="name">{{item.title}}</div>
                                    <div class="tiem-box">
                                        <div class="time">
                                            <span class="iconfont icon-keshi"></span>
                                            {{item.lesson_count}}课时
                                        </div>
                                        <div class="many">
                                            {{item.student_count}}人学习
                                        </div>
                                    </div>
                                    <div class="teach-box">
                                        <div class="teacher" v-if="item.teacher">
                                            <span class="iconfont icon-laoshi"></span>
                                            {{item.teacher.name || '无名'}}老师
                                        </div>
                                        <div class="money">¥ {{item.display_price}}元</div>
                                    </div>
                                </div>
                            </div>
                        </van-cell>
                    </van-list>
                </div>
            </div>
        </div>
        <!--tabbar-->
        <van-tabbar v-model="active" active-color="#004E9D" @change="jumpTab">
            <van-tabbar-item>
                <span>首页</span>
                <img :src="props.active ? icon.active : icon.normal" alt="" slot="icon"
                     slot-scope="props">
            </van-tabbar-item>
            <van-tabbar-item>
                <span>我的课程</span>
                <img src="https://cdn.ibrand.cc/icon_course.png" alt="" slot="icon">
            </van-tabbar-item>
            <!--<van-tabbar-item>
                <span>SVIP</span>
                <img src="https://cdn.ibrand.cc/icon_svip.png" alt="" slot="icon">
            </van-tabbar-item>-->
            <van-tabbar-item>
                <span>个人中心</span>
                <img src="https://cdn.ibrand.cc/icon_user.png" alt="" slot="icon">
            </van-tabbar-item>
        </van-tabbar>
        <!--<div class="ibrand" bindtap="jumpWeb">
            <div class="iconfont icon-dibu logo"></div>
            <div class="txt">www.ibrand.cc</div>
        </div>
        <div class="black-mask {{is_black ? 'cur' : ''}}"></div>-->

    </div>
</template>

<script type="text/ecmascript-6">
    import { List,Swipe, SwipeItem,NavBar,Tabbar, TabbarItem  } from 'vant';
    import { Cache, cache_keys, exif } from '../../utils/util';
    export default {
        name: 'index',
        component:{
            List,
            Swipe,
            SwipeItem,
            Tabbar,
            TabbarItem,
            NavBar
        },
        data(){
            return {
                active:0,
                icon: {
                    normal: 'https://cdn.ibrand.cc/icon_index.png',
                    active: 'https://cdn.ibrand.cc/icon_index_HL.png'
                },
                homedata:{
                    banners:[
                        {
                            image:''
                        }
                    ],
                    categories:[

                    ],
                    coupons:[],
                    svipBanner:[
                        {
                            image:''
                        }
                    ]

                },
                dataList:[],//推荐课程列表
                page:0,//页数
                hasMore:true,
                loading:false,
                finished:false,
                immediate: false,
                discount_id:'',//当前领取的
                activeIndex:'',//当前领取的优惠券的下标
            }
        },
        created(){
            const data = {
                page:1
            }
            let couponDate ={
                discount_id:this.discount_id
            }
            //请求首页数据
            this.$store.dispatch('queryHomeDate');
            //请求首页中的推荐课程列表数据
            this.$store.dispatch('queryCourseList',data);
            //监听从action js 里面的数据,触发homedata这个函数
            EventBus.$on('gethomeDate',this.homeDate);
            EventBus.$on('takeCoupon',this.getCouponDate);
            //监听courseList这个事件里面的数据，触发recommendList这个函数
            EventBus.$on('courseList',this.recommendList)

        },
        beforeDestroy(){
          EventBus.$off('gethomeDate');
            EventBus.$off('courseList');
            EventBus.$off('takeCoupon');
        },
        methods:{
            jumpTab(index){
                if(index == 0){
                    return
                } else if (index == 1){
                    this.$router.push({
                        name:'users-mycourse'
                    })
                } else if(index == 2){
                    this.$router.push({
                        name:'users-index'
                    })
                }
            },
            //点击领取优惠券
            receiveCoupon(id,is_receive,index){
                this.discount_id = id;
                this.activeIndex = index;
                const oauth = Cache.get(cache_keys.token);
                if(oauth && oauth.access_token){
                    if(is_receive){
                        this.$toast('您已领取过该优惠券')
                    } else {
                        let couponDate = {
                            discount_id:id
                        }
                        this.$store.dispatch('queryTakecoupon',couponDate);
                    }
                } else {
                    var source = this.$route.path;
                    this.$router.push({name: 'users-register', query: {source}});
                }
            },
            //点击领取优惠券的数据处理
            getCouponDate(res){
                this.$toast("领取成功");
                this.homedata.coupons[this.activeIndex].is_receive = true;
            },
            homeDate(res){
                let coupons = res.data.coupons;
                if(res.data.coupons && res.data.coupons.length){
                    coupons.forEach((val)=>{
                        val.is_receive = false
                    })
                    this.homedata.coupons = coupons
                }
                this.homedata = res.data;
            },
            //点击分类跳到分类页面去
            jump(name,id){
                this.$router.push({
                    name:name,
                    params:{
                        id:id
                    }
                })
            },
            //点击跳到详情页去
            //将所得到的推荐课程列表数据进行分页处理
            recommendList(res){
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
                this.hasMore = total_pages > current_page;
                this.loading = false;



            },
            jumpSearch(){
              this.$router.push({
                  name:'index-search'
              })
            },
            //触底分页加载更多数据
            loadMore(){
                const page = this.page + 1;
                const data = {
                    page:page
                }
                if(this.hasMore){
                    this.$store.dispatch('queryCourseList',data);
                    //加载状态结束，需要将loading变成false
                } else {
                    //数据全部加载完成
                    this.loading = false;
                    this.finished = true;
                }


            },
            jumpLocation(href){
                if(href){
                    window.location.href = href
                } else {
                    return
                }
            },


        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #index{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        padding-bottom:70px;
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .header{
            margin-bottom: 10px;
            .search{
                padding:8px 15px;
                background-color: #004E9D;
                input{
                    width: 100%;
                    border-radius:15px;
                    background-color: #fff;
                    padding: 0 13px;
                    height:30px;
                    line-height: 30px;
                }
                input::-webkit-input-placeholder {
                    color: #999999;
                    font-size: 12px;
                }
            }
            .banner{
                img{
                    height: 100%;
                    width: 100%;
                }


            }

        }
        .svip-box{
            padding:9px 15px;
            height:84px;
            background-color: #FFFFFF;
            margin-bottom:12px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .coupon-box{
            padding: 7px 10px;
            background-color: #fff;
            margin-bottom: 10px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .scroll-view{
                overflow-x: scroll;
                .pa-li{
                    display: inline-block;
                    width:175px;
                    padding:0 5px;
                    .li-item{
                        background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-19/90385913.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        display: flex;
                        padding:6px 10px;
                        align-items: center;
                        justify-content: space-between;
                        .left-info{
                            font-size:20px;
                            color: #202020;

                        }
                        .right-info{
                            .label{
                                font-size: 12px;
                                color: #fff;
                                line-height: 17px;
                                padding: 2px;
                            }
                            .soon{
                                padding: 4px 12px;
                                background-color: #fff;
                                color:#202020;
                                font-size: 10px;
                                display: inline-block;
                            }
                        }
                    }
                }

            }
        }
        .menu-box{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            background-color: #fff;
            padding: 18px 0;
            margin-bottom: 10px;
            .scroll-view{
                overflow-x: scroll;
                .pa-li{
                    display: inline-block;
                    text-align: center;
                    .li-item{
                        padding:0 20px;
                        .top-info{
                            display: inline-block;
                            width: 44px;
                            height: 44px;
                            border-radius: 50%;
                            background-color:#887974;
                            line-height: 44px;
                            text-align: center;
                            margin-bottom: 10px;
                            color: #FFFFFF;
                            box-sizing: border-box;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            &.logo-1{
                                background-color:#00b1d1;
                            }
                            &.logo-2{
                                  background-color:#f5a1c7;
                              }
                            &.logo-3{
                                background-color:#68a8d4;
                            }
                            &.logo-4{
                                background-color:#7ec9ce;
                            }
                            &.logo-5{
                                background-color:#f599a0;
                            }
                            &.logo-6{
                                background-color:#c599d7;
                            }
                        }
                        .bottom-info{
                            color: #909090;
                            font-size: 14px;
                            line-height: 20px;
                        }
                    }
                }

            }
        }
        .classify-menu{
            background: #fff;
            padding-top: 15px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .classify-item{
                padding-bottom:15px;
                width: 25%;
                text-align: center;
                .top-info{
                    display: inline-block;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background-color:#887974;
                    line-height: 44px;
                    text-align: center;
                    margin-bottom: 10px;
                    color: #FFFFFF;
                    box-sizing: border-box;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    &.logo-1{
                        background-color:#00b1d1;
                    }
                    &.logo-2{
                        background-color:#f5a1c7;
                    }
                    &.logo-3{
                        background-color:#68a8d4;
                    }
                    &.logo-4{
                        background-color:#7ec9ce;
                    }
                    &.logo-5{
                        background-color:#f599a0;
                    }
                    &.logo-6{
                        background-color:#c599d7;
                    }
                    &.logo-7{
                        background-color:#33b4ad;
                    }
                }
                .bottom-info{
                    color: #909090;
                    font-size: 14px;
                    line-height: 20px;
                }

            }
        }
        .recommend-list{
            background-color: #fff;
            .title{
                padding:11px 15px;
                color:#4A4A4A;
                font-size: 16px;
                line-height: 22px;
            }
            .ul-content{
                .li-item{
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .left-info{
                        position: relative;
                        width:135px;
                        height: 90px;
                        margin-right: 15px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .limit-discount{
                            position: absolute;
                            width: 60px;
                            height: 26px;
                            background: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-28/15934896.jpg") no-repeat;
                            background-size: 100% 100%;
                            top:0;
                            right: 0;
                        }
                    }
                    .right-info{
                        flex: 1;
                        .name{
                            color: #202020;
                            font-size: 15px;
                            line-height: 22px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            margin-bottom: 8px;
                            height:44px;
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
                                flex: 1;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                span{
                                    font-size: 12px;
                                }
                            }
                            .money{
                                flex: 1;
                                text-align: right;
                                color: #FF2741;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
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
