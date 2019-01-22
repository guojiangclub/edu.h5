<template>
    <div id="classes">
        <Header title="班级套餐" :fixed="true">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list.hasMore" ref="pulldown">
                <div class="img">
                    <img src="../../static/img/poster.png" alt="">
                </div>
                <div class="list">
                    <div class="item" v-for="item in classes" @click="jump(item.id)">
                        <div class="img">
                            <img :src="item.picture" alt="">
                        </div>
                        <div class="text">
                            {{item.title}}
                        </div>
                        <div class="money-box">
                            <div>
                                {{item.student_count}}人学习
                            </div>
                            <div class="money">
                                {{item.discount_price}}元
                            </div>
                        </div>
                    </div>
                </div>
            </LoadMore>

        </div>

        <div class="tabbar-box">
            <div class="tabbar tab-title" :class="showSubSet ? 'cur' : ''">
                <div class="tabbar-item" @click="go(2)">
                    <i class="iconfont icon-kecheng"></i>
                    <div>课程</div>

                </div>
                <div class="tabbar-item active" @click="go(1)">
                    <i class="iconfont icon-banji"></i>
                    <div>班级</div>
                </div>
                <div class="tabbar-item" @click="go(3)">
                    <div v-show="!showSubSet">
                        <i class="iconfont icon-faxian"></i>
                        <div>发现</div>
                    </div>
                    <div class="x" v-show="showSubSet">
                        <i class="iconfont icon-quxiao-"></i>
                    </div>
                </div>
                <!--<div class="tabbar-item" @click="go(4)">
                    <img src="../../static/img/511.png" alt="">
                    &lt;!&ndash;<div class="text">双11</div>&ndash;&gt;
                </div>-->
                <div class="tabbar-item" @click="go(4)">
                    <i class="iconfont icon-VIP"></i>
                    <div>SVIP</div>
                </div>
                <div class="tabbar-item" @click="go(5)">
                    <i class="iconfont icon-wode"></i>
                    <div>我的</div>
                </div>
            </div>

            <div class="subset tab-title" :class="showSubSet ? 'active' : ''">
                <div class="tabbar-item" @click="go(6)">
                    <i class="iconfont icon-toutiao"></i>
                    <div>头条</div>
                </div>
                <div class="tabbar-item" @click="go(7)">
                    <i class="iconfont icon-wenda"></i>
                    <div>问答</div>
                </div>
                <div class="tabbar-item" @click="go(8)">
                    <i class="iconfont icon-huodong"></i>
                    <div>活动</div>
                </div>
                <div class="tabbar-item" @click="go(9)">
                    <i class="iconfont icon-boke"></i>
                    <div>博客</div>
                </div>
                <div class="tabbar-item" @click="go(10)">
                    <i class="iconfont icon-wode"></i>
                    <div>我的</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
    	name: 'classes',
        data() {
    		return {
			    showSubSet: false,
			    classes: [],
			    list: {
				    init: false,
				    page: 1,
				    hasMore: true
			    },
			    height: '100%',
            }

        },
	    created() {
		    this.$Indicator.blade();
    		this.$store.dispatch('classroom');
    		EventBus.$on('class', this.classData);
		    this.$on('done', this.done);
        },
	    beforeDestroy() {
		    EventBus.$off('class')
	    },
	    methods: {
    		jump(id) {
    			this.$router.push({name: 'edu-classes-detail', params: {id: id}})
            },
	        go(id) {
		        switch (id) {
			        case 1:
//				        this.$router.push({name: 'question', params: '0'})
				        break
			        case 2:
				        this.$router.push({name: 'edu'})
				        break
			        case 3:
				        this.showSubSet = !this.showSubSet;
				        break
			        case 4:
				        this.$router.push({name: 'edu-svip-new'})
				        break
			        case 5:
				        this.$router.push({name: 'user-index'})
				        break
			        case 6:
				        this.$router.push({name: 'news'})
				        break
			        case 7:
				        this.$router.push({name: 'question', params: {id: 0}})
				        break
			        case 8:
				        this.$router.push({name: 'activity'})
				        break
			        case 9:
				        this.$router.push({name: 'blogs', params: {id: 0}})
				        break
			        case 10:
				        this.$router.push({name: 'user-index'})
				        break
		        }
	        },
		    done() {
			    this.$nextTick(() => {
				    this.$refs.pulldown.onLoadOff();
			    })
		    },
		    //    		加载更多
		    loadMore() {
			    const page = this.list.page + 1;
			    this.$store.dispatch('classroom', page);
		    },
		    //            数据赋值
		    classData(res) {
			    var list,
				    page = res.meta.pagination,
				    current_page = page.current_page,
				    total_pages = page.total_pages;
			    if (current_page == 1) {
				    list = res.data;
			    } else {
				    list = this.answer.concat(res.data);
			    }
			    this.classes = list;
			    this.list.init = true;
			    this.list.page = current_page;
			    this.list.hasMore = current_page < total_pages;
			    this.$emit('done');
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #classes{
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
            padding-bottom: 60px;
            img{
                width: 100%;
            }
            .list{
                font-size: 0;
                padding: 10px 2px 20px 2px;
                .item{
                    margin-top: 10px;
                    padding: 0 8px;
                    font-size: 15px;
                    width: 50%;
                    display: inline-block;
                }
                .text{
                    height: 48px;
                    overflow: hidden;
                }
                .money-box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #666666;
                    font-size: 12px;
                    .money{
                        font-size: 14px;
                        color: #005bac;
                    }
                }
            }
        }
        /*底部导航*/
        .tabbar-box {

            .tab-title {
                position: fixed;
                /*background: #e6e6e6;*/
                display: flex;
                justify-content: space-between;
                align-content: center;
            }
            .tabbar {
                bottom: 0;
                width: 100%;
                height: 50px;
                background: #F2F2F2;

                &.cur{
                    background: #e6e6e6;
                }
            }
            .tabbar-item {
                position: relative;
                display: block;
                text-align: center;
                flex: 1;
                width: 0%;
                font-size: 14px;
                color: #4C4C4C;
                padding-top: 3px;

                i {
                    display: block;
                    font-size: 35px;
                    line-height: 25px;
                }
                img{
                    margin-top: 15px;
                    width: 50%;
                }
                .text{
                    color: #f37119;
                }

                .x{
                    i{
                        font-size: 20px;
                        line-height: 50px;
                    }
                }
                &.active {
                    color: #005AAC;

                    i {
                        color: #005AAC;
                    }
                }

            }

            .subset{

                bottom: -55px;
                width: 100%;
                height: 65px;
                opacity: 0;
                background: #F2F2F2;
                transition:all .3s linear;
                .tabbar-item{
                    padding-top: 10px;
                }
                &.active{

                    bottom:50px;
                    opacity: 1;
                }
            }
        }
    }
</style>
