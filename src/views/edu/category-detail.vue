<template>
    <div id="edu-category-detail">

        <Header :title="title">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="contents">
            <div class="edu-list-box">
                <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" @on-change="change">
                    <div slot="slot-item-0" class="edu-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[0].hasMore" :refresh="refresh" ref="pulldown_0">
                            <!--<div v-if="list[0].noList" class="noList">-->
                                <!--暂无数据-->
                            <!--</div>-->
                            <div class="mx-1px-bottom edu-item" v-for="item in dataList[0]" @click="jump(item.id)">
                                <div class="item-left">
                                    <img :src="item.picture" alt="">
                                    <div class="promotion" v-if="item.is_discount == 1">
                                        限时优惠中
                                    </div>
                                </div>
                                <div class="item-right">
                                    <div class="edu-name">
                                        {{item.title}}
                                    </div>
                                    <div class="edu-middle">
                                        <div class="tiem">
                                            <i class="iconfont icon-lishi-"></i>
                                            <div>{{item.lessonNum}}课时</div>
                                        </div>
                                        <div class="people">
                                            {{item.studentNum}}人学习
                                        </div>
                                    </div>
                                    <div class="edu-bottom">
                                        <div class="teacher">
                                            <i class="iconfont icon-renshu-"></i>
                                            <span>{{item.teacher_info.user_name}}</span>
                                        </div>
                                        <div class="money">
                                            <span class="price" v-if="item.is_discount == 1">{{item.price}}元</span>
                                            <span v-if="item.price !=  0">{{item.svip_price}}元</span>
                                            <span v-else>免费</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LoadMore>
                    </div>
                    <div slot="slot-item-1" class="edu-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[1].hasMore" :refresh="refresh" ref="pulldown_1">
                            <!--<div v-if="list[1].noList" class="noList">-->
                                <!--暂无数据-->
                            <!--</div>-->
                            <div class="mx-1px-bottom edu-item" v-for="item in dataList[1]" @click="jump(item.id)">
                                <div class="item-left">
                                    <img :src="item.picture" alt="">
                                    <div class="promotion" v-if="item.is_discount == 1">
                                        促销中...
                                    </div>
                                </div>
                                <div class="item-right">
                                    <div class="edu-name">
                                        {{item.title}}
                                    </div>
                                    <div class="edu-middle">
                                        <div class="tiem">
                                            <i class="iconfont icon-lishi-"></i>
                                            <div>{{item.lessonNum}}课时</div>
                                        </div>
                                        <div class="people">
                                            {{item.studentNum}}人学习
                                        </div>
                                    </div>
                                    <div class="edu-bottom">
                                        <div class="teacher">
                                            <i class="iconfont icon-renshu-"></i>
                                            <span>{{item.teacher_info.user_name}}</span>
                                        </div>
                                        <div class="money">
                                            <span class="price" v-if="item.is_discount == 1">{{item.price}}元</span>
                                            <span v-if="item.price !=  0">{{item.svip_price}}元</span>
                                            <span v-else>免费</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LoadMore>
                    </div>
                    <div slot="slot-item-2" class="edu-list">
                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[2].hasMore" :refresh="refresh" ref="pulldown_2">
                            <!--<div v-if="list[2].noList" class="noList">-->
                                <!--暂无数据-->
                            <!--</div>-->
                            <div class="mx-1px-bottom edu-item" v-for="item in dataList[2]" @click="jump(item.id)">
                                <div class="item-left">
                                    <img :src="item.picture" alt="">
                                    <div class="promotion" v-if="item.is_discount == 1">
                                        促销中...
                                    </div>
                                </div>
                                <div class="item-right">
                                    <div class="edu-name">
                                        {{item.title}}
                                    </div>
                                    <div class="edu-middle">
                                        <div class="tiem">
                                            <i class="iconfont icon-lishi-"></i>
                                            <div>{{item.lessonNum}}课时</div>
                                        </div>
                                        <div class="people">
                                            {{item.studentNum}}人学习
                                        </div>
                                    </div>
                                    <div class="edu-bottom">
                                        <div class="teacher">
                                            <i class="iconfont icon-renshu-"></i>
                                            <span>{{item.teacher_info.user_name}}</span>
                                        </div>
                                        <div class="money">
                                            <span class="price" v-if="item.is_discount == 1">{{item.price}}元</span>
                                            <span v-if="item.price !=  0">{{item.svip_price}}元</span>
                                            <span v-else>免费</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LoadMore>
                    </div>
                </Slide-bar>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { setPageTitle } from '../../utils/util';
    export default {
    	name: 'category-detail',
        data() {
            return {
                title: '',
                list: [
                    {
                        name: '最新',
	                    init: false,
	                    page: 1,
	                    hasMore: true,
                        type: 0,
                        noList: false

                    },
                    {
                        name: '最热',
	                    init: false,
	                    page: 1,
	                    hasMore: true,
	                    type: 1,
	                    noList: false
                    },
                    {
                        name: '推荐',
	                    init: false,
	                    page: 1,
	                    hasMore: true,
	                    type: 2,
	                    noList: false
                    }
                ],
	            dataList: {
		            0: [],
		            1: [],
		            2: []
	            },
	            tabIndex: 0,
                id: '',
	            height: '100%'

            }
        },
	    created() {
		    this.tabIndex = Number(this.$route.query.status) || 0;
		    const type = this.list[this.tabIndex].type;
        	this.id = Number(this.$route.params.id);
		    this.$Indicator.blade();
        	const data = {
		        page: 1,
		        type: type,
		        category: this.id
            }
		    this.$store.dispatch('queryCoursesList', data);

		    EventBus.$on('categoryDetail', this.categoryDetail)
	    },
	    beforeDestroy() {
    		EventBus.$off('categoryDetail');
        },
	    methods: {
		    jump(id) {
			    this.$router.push({name : 'edu-course', params:{id: id}});
		    },
//            加载更多
            loadMore() {
		    	const page = this.list[this.tabIndex].page + 1;
		    	const type = this.list[this.tabIndex].type;
		    	const data = {
		    		page: page,
				    type: type,
				    category: this.id
                };
	            this.$store.dispatch('queryCoursesList', data);
            },
//            刷新数据
		    refresh() {
			    const type = this.list[this.tabIndex].type;
			    const data = {
			    	page: 1,
				    type: type,
				    category: this.id
                };
			    this.$store.dispatch('queryCoursesList', data);
            },
//            内容赋值
		    categoryDetail(res) {

			    if (res.meta.category) {
				    this.title = res.meta.category.name;
				    setPageTitle(this.title);
			    }

			    var list,
				    page = res.meta.pagination,
				    current_page = page.current_page,
				    total_pages = page.total_pages;
			    if (current_page == 1) {
				    list = res.data;
			    } else {
				    list = this.dataList[this.tabIndex].concat(res.data);
			    }
			    this.dataList[this.tabIndex] = list;
			    this.list[this.tabIndex].init = true;
			    this.list[this.tabIndex].page = current_page;
			    this.list[this.tabIndex].hasMore = current_page < total_pages;
			    this.list[this.tabIndex].noList = !!!this.dataList[this.tabIndex].length;

			    this.$nextTick(() => {
				    this.$refs['pulldown_' + this.tabIndex].onLoadOff();
                })

            },
//		    改变tabIndex
		    change(i) {
			    this.tabIndex = i;
			    const type = this.list[this.tabIndex].type;
			    var data = {
				    page: 1,
				    type: type,
				    category: this.id
			    };

			    this.$router.replace({name: 'edu-category-detail', query: {status: i}});
			    setPageTitle(this.title);
			    if (!this.list[i].init) {
				    this.$Indicator.blade();
				    this.$store.dispatch('queryCoursesList', data);
			    }
		    }
	    },
    }

</script>

<style rel="stylesheet/less" lang="less">
    #edu-category-detail{
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                    font-size: 15px;
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
            height: 100%;
            overflow: auto;

            .edu-list-box{
                height: 100%;
                .vlc-slideBar {
                    border: none;
                    height: 100%;

                    .vlc-slideBar-wrapper {
                        border-bottom: 1px solid #dddddd;

                        .vlc-slideBar-child {
                            &.active {
                                a {
                                    color: #008cee;
                                }
                            }
                        }
                        a {
                            color: #666;
                        }
                    }
                }
                .vlc-slideBar-container {

                    .vlc-slideBar-content{
                        display: flex;
                    }
                    .edu-list {
                        flex: 1;
                        height: 100%;
                        overflow: auto;
                        padding-bottom: 50px;
                        .edu-item{
                            display: flex;
                            flex-direction: row;
                            flex-wrap: nowrap;
                            align-items: flex-start;
                            justify-content: space-between;
                            padding: 12px;

                            .item-left{
                                position: relative;
                                /*width: 35%;*/
                                min-width: 110px;
                                max-width: 130px;
                                padding-right: 12px;
                                overflow: hidden;
                                box-sizing: content-box;

                                img{
                                    display: block;
                                    width: 100%;
                                }

                                .promotion{
                                    font-size: 12px;
                                    position: absolute;
                                    bottom: 0;
                                    left: 0;
                                    right: 12px;
                                    height: 20px;
                                    line-height: 20px;
                                    color: #FFFFFF;
                                    padding-left: 10px;
                                    background: rgba(255,0,0,.5);
                                }
                            }
                            .item-right{
                                flex: 1;
                                overflow: hidden;
                                line-height: 17px;

                                .edu-name{
                                    display: -webkit-box;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    font-size: 15px;
                                    height: 33px;
                                }
                                .edu-middle{
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    font-size: 10px;
                                    color: #999999;
                                    margin: 3px 0;
                                    .tiem{
                                        display: flex;
                                        align-items: center;
                                        font-size: 10px;

                                        i{
                                            margin-right: 5px;
                                            font-size: 10px;
                                            display: block;
                                        }
                                    }
                                    .people{

                                    }
                                }
                                .edu-bottom{
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    font-size: 10px;
                                    color: #999999;
                                    .teacher{
                                        i{
                                            font-size: 10px;
                                        }
                                    }
                                    .money{
                                        font-size: 12px;
                                        color: #005AAC;

                                        .price{
                                            color: #999999;
                                            text-decoration: line-through;
                                            margin-right: 5px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .noList{
                text-align: center;
                padding: 10px 0;
            }
        }
    }
</style>
