<template>
    <div id="coupon-index">
        <van-nav-bar
            title='我的优惠券'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <div class="navbar mx-1px-bottom" :class="is_navbar == false ? 'top_adr' : ''">
                <div class="navbar-item" :class="index == activeIndex ? 'activity' : ''" v-for="(item,index) in tabList" :key="index" @click="tabClick(index,$event)">
                    <div class="navbar-title">{{item.title}}</div>
                </div>
            <div class="navbar-slider" :style="{width:width + 'px', transform: 'translateX('+ sliderOffset +'px)'}"></div>
        </div>
        <div class="coupon-content" v-if="activeIndex == 0">
            <div v-if="dataList && dataList[0] && dataList[0].length">
                <van-list v-model="tabList[0].loading" :finished="tabList[0].finished" finished-text="没有更多了" @load="loadMore" :immediate-check="immediate">
                    <van-cell v-for="(item,index) in dataList[0]" :key="index">
                        <div class="li-list">
                            <div class="item">
                                <div class="left-info">
                                    <div class="money" v-if="item.discount.action_type.type == 'cash'">
                                        <span>¥</span>
                                        {{item.discount.action_type.value}}
                                    </div>
                                    <div class="money" v-if="item.discount.action_type.type == 'percentage'">
                                        {{item.discount.action_type.value}}
                                        <span>折</span>
                                    </div>
                                    <div class="label">{{item.discount.label}}</div>
                                </div>
                                <div class="right-info">
                                    <div class="title">{{item.discount.title}}</div>
                                    <div class="created-at">{{item.discount.use_start_time}}-{{item.discount.use_end_time}}</div>
                                </div>
                                <!--遮罩层-->
                                <!--<div class="mask">
                                    <div class="cirles">
                                        <span>已使用</span>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </van-cell>
                </van-list>
            </div>
            <div v-else class="no-data">暂无数据</div>
        </div>
        <div class="coupon-content" v-if="activeIndex == 1">
            <div v-if="dataList && dataList[1] && dataList[1].length">
                <van-list v-model="tabList[1].loading" :finished="tabList[1].finished" finished-text="没有更多了" @load="loadMore" :immediate-check="immediate">
                    <van-cell v-for="(item,index) in dataList[1]" :key="index">
                        <div class="li-list">
                            <div class="item">
                                <div class="left-info">
                                    <div class="money" v-if="item.discount.action_type.type == 'cash'">
                                        <span>¥</span>
                                        {{item.discount.action_type.value}}
                                    </div>
                                    <div class="money" v-if="item.discount.action_type.type == 'percentage'">
                                        {{item.discount.action_type.value}}
                                        <span>折</span>
                                    </div>
                                    <div class="label">{{item.discount.label}}</div>
                                </div>
                                <div class="right-info">
                                    <div class="title">{{item.discount.title}}</div>
                                    <div class="created-at">{{item.discount.use_start_time}}-{{item.discount.use_end_time}}</div>
                                </div>
                                <!--遮罩层-->
                                <div class="mask">
                                    <div class="cirles">
                                        <span>已使用</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-cell>
                </van-list>
            </div>
            <div v-else class="no-data">暂无数据</div>
        </div>
        <div class="coupon-content" v-if="activeIndex == 2">
            <div v-if="dataList && dataList[2] && dataList[2].length">
                <van-list v-model="tabList[2].loading" :finished="tabList[2].finished" finished-text="没有更多了" @load="loadMore" :immediate-check="immediate">
                    <van-cell v-for="(item,index) in dataList[2]" :key="index">
                        <div class="li-list">
                            <div class="item">
                                <div class="left-info">
                                    <div class="money" v-if="item.discount.action_type.type == 'cash'">
                                        <span>¥</span>
                                        {{item.discount.action_type.value}}
                                    </div>
                                    <div class="money" v-if="item.discount.action_type.type == 'percentage'">
                                        {{item.discount.action_type.value}}
                                        <span>折</span>
                                    </div>
                                    <div class="label">{{item.discount.label}}</div>
                                </div>
                                <div class="right-info">
                                    <div class="title">{{item.discount.title}}</div>
                                    <div class="created-at">{{item.discount.use_start_time}}-{{item.discount.use_end_time}}</div>
                                </div>
                                <!--遮罩层-->
                                <div class="mask">
                                    <div class="cirles">
                                        <span>已失效</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-cell>
                </van-list>
            </div>
            <div v-else class="no-data">暂无数据</div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import { List,NavBar } from 'vant';
    import { Cache, cache_keys, exif,env } from '../../utils/util';
    export default {
        name: 'coupon-index',
        component:{
            List,
            NavBar
        },
        data(){
            return {
                is_navbar:true,
                activeIndex: 0,
                sliderOffset: 0,
                width: 0,
                tabList: [
                    {
                        title: '待使用',
                        init: false,
                        page: 0,
                        more: true,
                        loading:false,
                        finished:false
                    },
                    {
                        title: '已使用',
                        init: false,
                        page: 0,
                        more: true,
                        loading:false,
                        finished:false
                    },
                    {
                        title: '已失效',
                        init: false,
                        page: 0,
                        more: true,
                        loading:false,
                        finished:false
                    }

                ],
                dataList: {
                    0: [],
                    1: [],
                    2:[]
                },
                is_coupon: 1,// 用于判断是否为优惠券 1：优惠券 0：促销折扣
                immediate:false

            }
        },
        created(){
            let data = {
                type:'valid',
                page:1
            }
            if(env.isWechat){
                this.is_navbar = false
            }
            this.$store.dispatch('queryCouponList',data);
            EventBus.$on('couponList',this.getCouponList)

        },
        beforeDestroy(){
            EventBus.$off('couponList')
        },
        mounted(){
            this.width = document.body.clientWidth/3;
            this.sliderOffset = 0
        },
        methods:{
            onClickLeft(){
                window.history.back(-1)
            },
            //加载更多
            loadMore(){
                let page = this.tabList[this.activeIndex].page + 1;
                if(this.tabList[this.activeIndex].more){
                    let type = '';
                    if(this.activeIndex == 0){
                        type = 'valid'
                    } else if(this.activeIndex == 1){
                        type = 'used'
                    } else if(this.activeIndex == 2){
                        type = 'invalid'
                    }
                    let data = {
                        type:type,
                        page:page
                    }
                    this.$store.dispatch('queryCouponList',data)
                } else {
                    //数据全部加载完成
                    this.tabList[this.activeIndex].loading = false;
                    this.tabList[this.activeIndex].finished = true;
                }


            },
            tabClick(index,e){
                this.sliderOffset = e.currentTarget.offsetLeft;
                this.activeIndex = index;
                let type = '';
                if(index == 0){
                    type = 'valid'
                } else if(index == 1){
                    type = 'used'
                } else if(index == 2){
                    type = 'invalid'
                }
                if(!this.tabList[index].init){
                    let data = {
                        type:type,
                        page:1
                    }
                    this.$store.dispatch('queryCouponList',data)
                }

            },
            //处理分页数据
            getCouponList(res){
                var list;
                var page = res.meta.pagination;
                var current_page = page.current_page;
                var total_pages = page.total_pages;
                if(current_page == 1){
                    list = res.data;
                } else {
                    list = this.dataList[this.activeIndex].concat(res.data);
                }
                this.dataList[this.activeIndex] = list;
                this.tabList[this.activeIndex].page = current_page;
                this.tabList[this.activeIndex].more = total_pages > current_page;
                this.tabList[this.activeIndex].loading= false;
                this.tabList[this.activeIndex].init = true

            }

        }



    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #coupon-index{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .no-data{
        text-align: center;
        padding: 20px;
        color: #9B9B9B;
    }
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        .van-nav-bar+div{
            padding-top:0!important;
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
        .navbar {
            position: fixed;
            top: 46px;
            width: 100%;
            display: flex;
            z-index: 20;
            height: 50px;
            line-height: 50px;
            background: #FFFFFF;
            font-size: 14px;
            color: #9B9B9B;
            &.top_adr{
                top: 0px;
            }

            .navbar-item {
                flex: 1;
                width: 0%;
                text-align: center;

                &.activity {
                    color:#004E9D;
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
        .coupon-content{
            padding:10px 15px 15px 15px;
            margin-top: 96px;
            .van-cell{
                margin-bottom:15px;
            }
            .li-list{
                margin-bottom: 10px;
                .item{
                    position: relative;
                    display: flex;
                    background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-20/34961047.jpg");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    padding:10px 20px;
                    align-items: flex-end;
                    .left-info{
                        color: #FB5054;
                        .money{
                            font-size: 35px;
                            font-weight: 500;
                            span{
                                font-size: 14px;
                            }
                        }
                        .label{
                            font-size: 12px;
                            line-height: 17px;
                        }

                    }
                    .right-info{
                        padding-left:25px;
                        flex: 1;
                        .title{
                            color: #666666;
                            font-size: 12px;
                            line-height: 17px;
                            padding-bottom: 28px;
                        }
                        .created-at{
                            color: #9B9B9B;
                            font-size: 10px;
                            line-height: 14px;
                        }
                    }
                    .mask{
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-21/80738795.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        .cirles{
                            position: absolute;
                            right: 12px;
                            top: 12px;
                            width:58px;
                            height: 58px;
                            border:1px solid #FFFFFF;
                            border-radius: 50%;
                            span{
                                display: inline-block;
                                border:1px solid #FFFFFF;
                                border-radius: 50%;
                                width:45px;
                                height: 45px;
                                text-align: center;
                                line-height: 45px;
                                transform:rotate(-45deg);
                                font-size: 12px;
                                color: #FFFFFF;
                                position: relative;
                                left: 4px;
                                top: 4px;
                            }
                        }
                    }
                }
            }

        }
        .no-more{
            text-align: center;
            font-size: 12px;
            color: #9B9B9B;

        }
    }



</style>
