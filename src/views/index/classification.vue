<template>
    <div id="classfication">
        <van-nav-bar
            title='分类页面'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <!--一级菜单-->
        <div class="classifical-menu">
            <div class="scroll-view" id="kinds">
                <div :id="'c'+item.id" class="menu-item" :class="item.id == category_id ? 'active' : ''" v-for="(item,index) in kindsDate" :key="index" @click="tabKinds(item.id,$event)">
                    {{item.name}}
                </div>
            </div>
        </div>
        <!--tabbar-->
        <div class="navbar mx-1px-bottom">
                <div  class="navbar-item" :class="activeIndex == 0 ? 'activity' : ''" @click="changetab(0,$event)">
                    <div class="navbar-title">推荐</div>
                </div>
                <div  class="navbar-item" :class="activeIndex == 1 ? 'activity' : ''" @click="changetab(1,$event)">
                    <div class="navbar-title">最热</div>
                </div>
            <div class="navbar-slider" :style="{width:width + 'px',transform:'translateX('+sliderOffset+'px)'}"></div>
        </div>
        <div class="ul-content">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore" :immediate-check="immediate">
                <van-cell  v-for="(item,index) in dataList" :key="index" @click="jump(item.id)">
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
                                <div class="teacher" v-if="item.tearcher">
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

</template>

<script type="text/ecmascript-6">
    import { Cache, cache_keys, exif ,env} from '../../utils/util';
    import { List,NavBar } from 'vant';
    export default {
        component:{
            List,
            NavBar
        },
        name: 'classification',
        data(){
            return {
                is_navbar:true,
                category_id:'',//分类id
                dataList:[],
                isRefresh:true,
                page:0,
                hasMore:true,
                loading:false,
                finished:false,
                immediate: false,
                width:'',
                sliderOffset:0,
                activeIndex:0,
                kindsDate:[]
            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
            this.category_id = this.$route.params.id;
            let data = {
                type:2,
                category:this.category_id,
                page:1
            }
            this.$store.dispatch('queryClassify',data);
            this.$store.dispatch('queryHomeDate');
            EventBus.$on('classifyList',this.classsifyDate)
            EventBus.$on('getKinds',this.getkindList)
        },
        beforeDestroy(){
            EventBus.$off('classifyList');
            EventBus.$off('getKinds');
        },
        mounted(){
            this.width = document.body.clientWidth / 2;

        },
        methods:{
            jump(id){
                this.$router.push({
                    name:'index-detail',
                    params:{
                        id:id
                    }
                })
            },
            onClickLeft(){
              window.history.back(-1)
            },
            //点击分类
            tabKinds(id,e){
                this.isRefresh = true;
                this.category_id =  id;
                this.sliderOffset = 0;
                this.activeIndex = 0;
                var kindsDom = document.getElementById('kinds');
                kindsDom.scrollLeft = e.currentTarget.offsetLeft - 15;
                let data = {
                    type:2,
                    category:id,
                    page:1
                }
                this.$store.dispatch('queryClassify',data);
            },
            //获取分类种类
            getkindList(res){
                this.kindsDate = res.data.categories;
                this.$nextTick(() =>{
                    var kindsDom = document.getElementById('kinds');
                    var activeDom = document.getElementById('c'+ this.category_id);
                    kindsDom.scrollLeft = activeDom.offsetLeft - 15;
                })
            },
            classsifyDate(res){
                if(this.isRefresh){
                    this.dataList =[]
                }
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
            loadMore(){
                this.isRefresh = false;
                let page = this.page + 1;
                let typefy = 0;
                if(this.activeIndex == 0){
                    typefy = 2
                }
                if(this.activeIndex == 1){
                    typefy = 1
                }
                let data = {
                    type:typefy,
                    category:this.category_id,
                    page:page
                }
                if(this.hasMore){
                    this.$store.dispatch('queryClassify',data);
                    //加载状态结束，需要将loading变成false
                } else {
                    //数据全部加载完成
                    this.loading = false;
                    this.finished = true;
                }


            },
            changetab(index,e){
                this.isRefresh = true;
                this.activeIndex = index;
                this.sliderOffset = e.currentTarget.offsetLeft;
                if(index == 0){
                    let data = {
                        type:2,
                        category:this.category_id,
                        page:1
                    }
                    this.$store.dispatch('queryClassify',data);
                }
                if(index == 1){
                    let data = {
                        type:1,
                        category:this.category_id,
                        page:1
                    }
                    this.$store.dispatch('queryClassify',data);
                }
            }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #classfication{
        padding-bottom:20px;
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        .van-nav-bar + div {
            padding-top: 66px!important;
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
        .classifical-menu{
            background-color: #FFFFFF;
            padding:20px 0px 10px 15px;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 10px;
            .scroll-view{
                overflow-x: auto;
                .menu-item{
                    padding-right: 30px;
                    display: inline-block;
                    color:#909090;
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: 400;
                    &.active{
                        color:#202020;
                        font-weight: 500;

                    }
                }
            }

        }
        .navbar {
            width: 100%;
            display: flex;
            height: 50px;
            line-height: 50px;
            background: #FFFFFF;
            font-size: 14px;
            color: #9B9B9B;

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
            background-color: #FFFFFF;
                .li-item{
                    padding: 20px 15px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .left-info{
                        width:135px;
                        height: 90px;
                        margin-right: 15px;
                        position: relative;
                        img {
                            width: 100%;
                            height: 100%;
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
                            span{
                                font-size: 12px;
                            }
                        }
                        .teach-box{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color:#909090;
                            font-size: 12px;
                            line-height: 14px;
                            span{
                                font-size: 12px;
                            }
                            .money{
                                color: #FF2741;
                            }
                        }
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

        }

    }


</style>
