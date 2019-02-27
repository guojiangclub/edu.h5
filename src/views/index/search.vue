<template>
    <div id="search">
        <van-nav-bar
            title='搜索页面'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <!--搜索-->
        <div class="search">
            <input type="text" placeholder="搜索你感兴趣的课程" v-model="title"/>
            <span @click="sureSearch">确认</span>
        </div>
        <div class="ul-content" v-if="dataList.length">
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
        <div class="no-more" v-else>暂无数据</div>

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
        name: 'search',
        data(){
            return {
                title:'',
                dataList:[],
                page:0,
                hasMore:true,
                loading:false,
                finished:false,
                immediate: false,
                is_navbar:true
            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
            EventBus.$on('searchList',this.searchDate)
        },
        beforeDestroy(){
            EventBus.$off('searchList');
        },
        methods:{
            onClickLeft(){
              window.history.back(-1);
            },
            //初始化数据
           initData(){
               this.hasMore = true;
               this.loading=false;
               this.finished=false;
               this.immediate= false;
           },
            jump(id){
                this.$router.push({
                    name:'index-detail',
                    params:{
                        id:id
                    }
                })
            },
            sureSearch(){
                this.initData();
                const data = {
                    title:this.title,
                    page:1
                }
                this.$store.dispatch('querySearch',data);
            },
            searchDate(res){
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
                let page = this.page + 1;
                let data = {
                    title:this.title,
                    page:page
                }
                if(this.hasMore){
                    this.$store.dispatch('querySearch',data);
                    //加载状态结束，需要将loading变成false
                } else {
                    //数据全部加载完成
                    this.loading = false;
                    this.finished = true;
                }
            }
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #search{
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
        .search{
            padding:8px 15px;
            background-color: #004E9D;
            display: flex;
            align-items: center;
            justify-content: space-between;
            input{
                flex: 1;
                border-radius:15px;
                background-color: #fff;
                padding: 0 13px;
                height:30px;
                line-height: 30px;
                font-size: 12px;
            }
            input::-webkit-input-placeholder {
                color: #999999;
                font-size: 12px;
            }
            span{
                padding-left: 15px;
                color: #FFFFFF;

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
                        img{
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
        .no-more{
            padding: 20px 0;
            text-align: center;
            color: #202020;
        }

    }

</style>
