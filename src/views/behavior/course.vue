<template>
    <div id="user-course">
        <Header title="课程">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="edu-list-box">
                <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" @on-change="change">
                    <div slot="slot-item-0" class="edu-list">
                        <!--<PullDown :height='height' :load-more="loadMore" :refresh="refresh"  ref="pulldown_0" >-->
                        <!--<div slot="content">-->

                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[0].hasMore" ref="pulldown_0">
                            <!--<div v-if="!dataList[0].length && list[0].init">-->
                            <!--没有更多了-->
                            <!--</div>-->
                            <div>
                                <div class="mx-1px-bottom edu-item" v-for="item in dataList[0]" @click="jump(item.id)">
                                    <div class="item-left">
                                        <img :src="item.picture" alt="">
                                    </div>
                                    <div class="item-right">
                                        <div class="edu-name">
                                            {{item.title}}
                                        </div>
                                        <div class="edu-middle">
                                            <div class="tiem">
                                                <i class="iconfont icon-liulan-"></i>
                                                <div>{{item.lessonNum}} 课时</div>
                                            </div>
                                            <div class="people">
                                                {{item.studentNum}} 人学习
                                            </div>
                                        </div>
                                        <div class="edu-bottom">
                                            <div class="teacher">
                                                {{item.teacher_info.user_name}}
                                            </div>
                                            <div class="money">
                                                <span v-if="item.price != 0">{{item.price}} 元</span>
                                                <span v-else>免费</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LoadMore>


                        <!--</div>-->
                        <!--</PullDown>-->
                    </div>
                    <div slot="slot-item-1" class="edu-list">
                        <!--<PullDown :height='height' :load-more="loadMore" :refresh="refresh"  ref="pulldown_1" >-->
                        <!--<div slot="content">-->

                        <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[1].hasMore"  ref="pulldown_1">
                            <!--<div class="move" v-if="!dataList[1].length && list[1].init">-->
                            <!--没有更多了-->
                            <!--</div>-->
                            <div>
                                <div class="mx-1px-bottom edu-item" v-for="item in dataList[1]" @click="jump(item.id)">
                                    <div class="item-left">
                                        <img :src="item.picture" alt="">
                                    </div>
                                    <div class="item-right">
                                        <div class="edu-name">
                                            {{item.title}}
                                        </div>
                                        <div class="edu-middle">
                                            <div class="tiem">
                                                <i class="iconfont icon-liulan-"></i>
                                                <div>{{item.lessonNum}} 课时</div>
                                            </div>
                                            <div class="people">
                                                {{item.studentNum}} 人学习
                                            </div>
                                        </div>
                                        <div class="edu-bottom">
                                            <div class="teacher">
                                                {{item.teacher_info.user_name}}
                                            </div>
                                            <div class="money">
                                                <span v-if="item.price != 0">{{item.price}} 元</span>
                                                <span v-else>免费</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LoadMore>

                        <!--</div>-->
                        <!--</PullDown>-->
                    </div>
                </Slide-bar>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    	name: 'user-course',
    	data() {
    		return {
			    tabIndex: 0,
                list: [
                    {
                        name: '学习中',
	                    init: false,
	                    page: 1,
	                    hasMore: true,
                        type: 'learning'
                    },
                    {
                        name: '已完成',
	                    init: false,
	                    page: 1,
	                    hasMore: true,
                        type: 'learned'
                    }
                ],
			    dataList: {
			    	0: [],
                    1: []
                },
			    height: '100%',
                id: ''
            }
        },
        created() {
		    this.tabIndex = Number(this.$route.query.status) || 0;
		    this.id = this.$route.params.id;
		    const type = this.list[this.tabIndex].type;
		    var data = {
			    id: this.id,
			    page: 1,
			    type: type
		    }
		    this.$store.dispatch('queryUserCourse', data);
		    EventBus.$on('course', this.courseData);
	    },
	    beforeDestroy() {
    		EventBus.$off('course')
        },
        methods: {
    		jump(id) {
			    this.$router.push({name: 'edu-course', params: {id: id} });
            },
//            加载更多
	        loadMore() {
    			const page = this.list[this.tabIndex].page + 1;
    			const type = this.list[this.tabIndex].type;
    			const data = {
				    id: this.id,
    				page: page,
                    type: type
                };
                this.$store.dispatch('queryUserCourse', data);
            },
//            刷新数据
            refresh() {
    			const type = this.list[this.tabIndex].type;
    			const data = {
				    id: this.id,
    				page: 1,
                    type: type
                };
	            this.$store.dispatch('queryUserCourse', data);
            },
//            数据赋值
	        courseData(res, status) {
    			/*if (status) {
				    var list,
					    page = res.meta.pagination,
					    current_page = page.current_page,
					    total_pages =page.total_pages;
				    if (current_page == 1) {
					    list = res.data;
				    } else {
					    list = this.dataList[this.tabIndex].concat(res.data);
				    }

				    this.dataList[this.tabIndex] = list;
				    this.list[this.tabIndex].init = true;
				    this.list[this.tabIndex].page = current_page;
				    this.list[this.tabIndex].hasMore = current_page < total_pages;
                }*/
		        this.list[this.tabIndex].hasMore = false;
		        this.$refs['pulldown_' + this.tabIndex].onLoadOff();
		        this.list[this.tabIndex].init = true;
    			this.dataList[this.tabIndex] = res.data;
            },
//            改变tabIndex
            change(i) {
	            this.tabIndex = i;
	            const type = this.list[this.tabIndex].type;
	            const data = {
		            id: this.id,
	            	page: 1,
                    type: type
                };
	            this.$router.replace({name: 'user-course', params: {id: this.id}, query: {status: i}});
	            if (!this.list[i].init) {
		            this.$store.dispatch('queryUserCourse', data);
	            }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #user-course {
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
            }
            .vlc-slideBar {
                border: none;
                height: 100%;
                background: #fff;

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
                /*overflow: auto;*/
                .vlc-slideBar-content{
                    display: flex;
                    /*height: inherit;*/
                    /*overflow: inherit;*/
                }
                /*.vlc-slideBar-content-item{*/
                    /*height: inherit;*/
                    /*overflow: auto;*/
                /*}*/
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
                        background: #FFFFFF;

                        .item-left{
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
                                height: 35px;
                            }
                            .edu-middle{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                font-size: 14px;
                                color: #666;
                                margin: 3px 0;
                                .tiem{
                                    display: flex;
                                    align-items: center;
                                    /*margin-left: -4px;*/

                                    i{
                                        display: block;
                                        font-size: 15px;
                                        margin-right: 5px;
                                    }
                                }
                                .people{

                                }
                            }
                            .edu-bottom{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                font-size: 14px;
                                color: #666;
                                .teacher{

                                }
                                .money{

                                }
                            }
                        }
                    }
                    .move{
                        text-align: center;
                        line-height: 40px;
                    }
                }
            }
        }
    }
</style>
