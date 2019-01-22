<template>
    <div id="search">
        <div class="search-bar" :class="{active: showbtn}">
            <div class="input-wrap">
                <i class="iconfont icon-sousuo-" @click="searchKeywords"></i>
                <input type="text" v-model="keyword" placeholder="输入关键字..." @focus="showbtn=true" @blur="showbtn=false" @keyup.enter="searchKeywords">
            </div>
            <button @click="searchKeywords">确定</button>
        </div>
        <div class="search-box" v-if="searches.length && show">
            <div class="history">
                <div class="item mx-1px-bottom" v-for="(search, index) in searches">
                    <div class="left" @click="searchHistory(index)">
                        {{search}}
                    </div>
                    <div class="right" @click="removeSearchHistory(index)">

                    </div>
                </div>
            </div>
            <div class="clear" @click="clearSearchHistory">
                清空历史记录
            </div>
        </div>

        <div class="contents" v-show="!show">
            <Slide-bar :list="list" height="100%" scrollHeight="44px" :canDrag=false :index="tabIndex" @on-change="change">

                <!--问题部分-->
                <div slot="slot-item-0" class="search-list question-list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[0].hasMore" :refresh="refresh" ref="pulldown_0">
                        <div class="question-item mx-1px-bottom" v-for="item in dataList[0]" @click="jump('question-detail', item.source_id)">
                            <div class="question-text" v-html="item.title">

                            </div>
                            <div class="question-num">
                                {{item.answer_count}}
                            </div>
                        </div>
                    </LoadMore>
                </div>

                <!--文章部分-->
                <div slot="slot-item-1" class="search-list article-list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[1].hasMore" :refresh="refresh" ref="pulldown_1">
                        <div class="article-item mx-1px-bottom" v-for="item in dataList[1]" @click="jump('blogs-detail', item.source_id)">
                            <div class="article-text" v-html="item.title">

                            </div>
                            <div class="article-info">
                                <span class="num">{{item.votes}}推荐</span>
                                <span class="time">{{item.create_timestamp}}</span>
                            </div>
                        </div>
                    </LoadMore>
                </div>

                <!--话题部分-->
                <div slot="slot-item-2" class="search-list topic-list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[2].hasMore" :refresh="refresh" ref="pulldown_2">
                        <div class="topic-item mx-1px-bottom" v-for="item in dataList[2]" v-html="item.title" @click="jump('question-topic', item.source_id)">

                        </div>
                    </LoadMore>
                </div>

                <!--用户部分-->
                <div slot="slot-item-3" class="search-list user-list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[3].hasMore" :refresh="refresh" ref="pulldown_3">
                        <div class="user-item mx-1px-bottom" v-for="item in dataList[3]" @click="jump('visitor', item.source_id)">
                            <div class="user-avatar">
                                <img :src="item.avatar_file" alt="">
                            </div>
                            <div class="user-info">
                                <div class="user-name" v-html="item.title">
                                    这是用户名
                                </div>
                                <div class="user-info-item">
                                    <span>声望：{{item.reputation}}</span>
                                    <span>提问：{{item.question_count}}</span>
                                    <span>回答：{{item.answer_count}}</span>
                                    <span>文章：{{item.article_count}}</span>
                                </div>
                            </div>
                        </div>
                    </LoadMore>
                </div>

                <!--课程部分-->
                <div slot="slot-item-4" class="search-list edu-list">
                    <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list[4].hasMore" :refresh="refresh" ref="pulldown_4">
                        <div class="mx-1px-bottom edu-item" v-for="item in dataList[4]" @click="jump('edu-course', item.source_id)">
                            <div class="item-left">
                                <img :src="item.picture" alt="">
                            </div>
                            <div class="item-right">
                                <div class="edu-name" v-html="item.title">

                                </div>
                                <div class="edu-middle">
                                    <div class="tiem">
                                        <i class="iconfont icon-liulan-"></i>
                                        <div>{{item.lessonNum}}课时</div>
                                    </div>
                                    <div class="people">
                                        {{item.studentNum}}人学习
                                    </div>
                                </div>
                                <div class="edu-bottom">
                                    <div class="teacher">
                                        <i class="iconfont icon-renshu-"></i>
                                        <span>{{item.teacherIds}}</span>
                                    </div>
                                    <div class="money">
                                        {{item.price}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LoadMore>
                </div>

            </Slide-bar>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import {Cache, cache_keys} from '../../src/utils/util';
    export default {
    	name: 'search',
        data() {
            return {
	            height: '100%',
	            tabIndex: 0,
	            searches: Cache.get(cache_keys.search_history) || [],
	            keyword: '',
	            show: true,
                showbtn: false,
                isSearch: true,
                list: [
                    {
	                    init: false,
	                    page: 1,
	                    hasMore: true,
                        name: '问题'
                    },
                    {
	                    init: false,
	                    page: 1,
	                    hasMore: true,
                        name: '文章'
                    },
                    {
	                    init: false,
	                    page: 1,
	                    hasMore: true,
                        name: '话题'
                    },
                    {
	                    init: false,
	                    page: 1,
	                    hasMore: true,
                        name: '用户'
                    },
                    {
	                    init: false,
	                    page: 1,
	                    hasMore: true,
                        name: '课程'
                    }
                ],
	            dataList: {
		            0: [],
		            1: [],
		            2: [],
                    3: [],
                    4: []
	            },
            }
        },
	    created() {
        	this.tabIndex = Number(this.$route.query.status) || 0;
		    this.keyword = this.$route.query.keyword;

		    if (this.keyword) {
			    this.show = false;
			    this.$Indicator.blade();
			    var data = {
				    q: this.keyword,
				    page: 1,
				    type: this.tabIndex + 1
			    }
			    this.$store.dispatch('querySearchList',data);
            }
        	EventBus.$on('searchList', this.searchListData);


		    console.log(this.searches);
        },
	    beforeDestroy() {
		    EventBus.$off('searchList');
	    },
	    methods: {
    		jump(name,id) {
    			this.$router.push({name: name, params: {id: id}});
            },
	        searchKeywords() {
		        var keyword = this.keyword;
		        if (!keyword || !keyword.length) return;
		        var searches = JSON.parse(JSON.stringify(this.searches));
		        for (let i = 0, len = searches.length; i < len; i++) {
			        let search = searches[i];
			        if (search === keyword) {
				        searches.splice(i, 1);
				        break;
			        }
		        }
		        searches.unshift(keyword);
	        	Cache.set(cache_keys.search_history, searches, 0);

	        	var query = Object.assign({}, this.$route.query, {keyword});

	        	this.show = false;
		        this.searches = searches;
		        this.$router.replace({name: 'search', query});

		        var data = {
		        	q: this.keyword,
			        type: this.tabIndex + 1,
		        	page: 1
                }

		        this.$store.dispatch('querySearchList', data);
		        // 请求的接口
            },
	        searchHistory(index) {
	        	var searches = JSON.parse(JSON.stringify(this.searches));
	        	var keyword = searches[index];

	        	searches.splice(index, 1);
	        	searches.unshift(keyword);

		        Cache.set(cache_keys.search_history, searches, 0);

		        var query = Object.assign({}, this.$route.query, {keyword});

		        this.show = false;
		        this.searches = searches;
		        this.$router.replace({name: 'search', query});

		        // 请求的接口
            },
	        removeSearchHistory(index) {
		        var searches = JSON.parse(JSON.stringify(this.searches));

		        searches.splice(index, 1);

		        Cache.set(cache_keys.search_history, searches, 0);

		        this.searches = searches;
	        },
	        clearSearchHistory() {
		        Cache.remove(cache_keys.search_history);
//		        this.show = false;
		        this.searches = [];
	        },
		    searchListData(res) {
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
			    this.$refs['pulldown_' + this.tabIndex].onLoadOff();
            },
//            加载更多
		    loadMore() {
	        	var page = this.list[this.tabIndex].page + 1;
	        	const type = this.tabIndex + 1;
	        	const data = {
	        		q: this.keyword,
                    page: page,
                    type: type
                }
			    this.$store.dispatch('querySearchList', data);
            },
//            刷新数据
		    refresh() {
	        	const type = this.tabIndex + 1;
	        	const data = {
	        		q: this.keyword,
                    page: 1,
                    type: type
                }
			    this.$store.dispatch('querySearchList', data);
            },
//            改变tabIndex
            change(i) {
	        	let keyword = this.$route.query.keyword;
	        	this.tabIndex = i;
	        	var data = {
	        		q: this.keyword,
	        		page: 1,
                    type: i + 1
                }
	        	if (keyword) {
			        this.$router.replace({name: 'search', query: {status: i, keyword}});
                } else {
			        this.$router.replace({name: 'search', query: {status: i}});
                }
                if (!this.list[i].init) {
	                this.$Indicator.blade();
	                this.$store.dispatch('querySearchList',data);
                }

            }
        },
	    watch:{
		    "$route.query.keyword": function (a,b) {
//			    var data = {
//				    q: this.$route.query.keyword,
//				    page: 1,
//				    type: this.tabIndex + 1
//			    }
//			    this.$store.dispatch('querySearchList',data);
			    window.location.reload();
		    }
	    }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #search {
        font-size: 14px;
        color: #3d4145;
        .search-bar {
            background-color: #393a3f;
            padding: 8px 12px;
            position: relative;

            .input-wrap {
                border-radius: 6px;
                overflow: hidden;
                transition: all .3s;
                position: relative;

                i {
                    position: absolute;
                    color: #848484;
                    height: 34px;
                    line-height: 34px;
                    margin-left: 8px;
                }

                input {
                    border-radius: 0;
                    display: block;
                    width: 100%;
                    height: 34px;
                    font-size: 14px;
                    color: #101010;
                    padding: 0 4px 0 30px;
                    background: #ffffff;
                }

            }

            &.active {
                button {
                    width: 40px;
                }
            }
            &.active {
                .input-wrap{
                    margin-right: 50px;
                }
            }
            button {
                transition: all .3s;
                font-size: 14px;
                color: #fff;
                height: 34px;
                width: 0;
                overflow: hidden;
                position: absolute;
                right: 12px;
                top: 8px;
                white-space: nowrap;
            }
        }
        .search-box {
            .title{
                padding: 12px;
                display: flex;
                justify-content: space-between;
            }
            .history{
                .item{
                    height: 40px;
                    line-height: 40px;
                    color: #7f7f7f;
                    border-color: #c9c9c9;
                    padding-left: 15px;
                    padding-right: 50px;
                    .right {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 50px;
                        height: 100%;

                        &:before {
                            content: '';
                            position: absolute;
                            height: 1px;
                            width: 20px;
                            top: 20px;
                            left: 15px;
                            margin-top: -1px;
                            background: #7f7f7f;
                            transform: rotate(45deg);
                        }
                        &:after {
                            content: '';
                            position: absolute;
                            height: 1px;
                            width: 20px;
                            top: 20px;
                            left: 15px;
                            margin-top: -1px;
                            background: #7f7f7f;
                            transform: rotate(-45deg);
                        }
                    }
                }
            }
            .clear{
                text-align: center;
                color: #6baccf;
                height: 40px;
                line-height: 40px;
            }
        }
        .contents {
            height: 100%;
            overflow: auto;
            .vlc-slideBar {
                border: none;
                height: 100%;

                .vlc-slideBar-wrapper {
                    font-size: 16px;
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
                .search-list{
                    flex: 1;
                    height: 100%;
                    overflow: auto;
                    padding-bottom: 100px;

                    em{

                        color: red;
                    }

                    /*问题部分*/
                    &.question-list{
                        .question-item{
                            display: flex;
                            align-items: baseline;
                            justify-content: space-between;
                            padding: 12px;
                            .question-item{
                                flex: 1;
                            }
                            .question-num {
                                margin-left: 12px;
                                background-color: #008cee;
                                font-size: 12px;
                                color: #fff;
                                padding: 0 5px;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                            }
                        }
                    }

                    /*文章部分*/
                    &.article-list {
                        .article-item {
                            font-size: 14px;
                            color: #101010;
                            padding: 12px;
                            .article-info {
                                padding-top: 8px;
                                font-size: 12px;
                                .num{
                                    display: inline-block;
                                    background-color: #008cee;
                                    color: #fff;
                                    padding: 0 3px;
                                }
                            }
                        }
                    }

                    /*话题部分*/
                    &.topic-list {
                        font-size: 14px;
                        color: #101010;

                        .topic-item {
                            padding: 12px;
                        }
                    }

                    /*用户部分*/
                    &.user-list {
                       .user-item{
                           display: flex;
                           padding: 12px;

                           .user-avatar{
                               width: 40px;
                               height: 40px;
                               border-radius: 100%;
                               overflow: hidden;

                               img{
                                   display: block;
                               }
                           }
                           .user-info {
                               flex: 1;
                               margin-left: 12px;
                               font-size: 12px;
                               .user-name {
                                   max-width: 100%;
                                   overflow: hidden;
                                   white-space: nowrap;
                                   text-overflow: ellipsis;
                               }
                               .user-info-item{
                                   padding-top: 3px;
                                   color: #616161;

                                   span{
                                       margin-right: 5px;

                                       &:last-child {
                                           margin-right: 0;
                                       }
                                   }
                               }
                           }
                       }
                    }

                    /*课程部分*/
                    &.edu-list{
                        .edu-item{
                            display: flex;
                            flex-direction: row;
                            flex-wrap: nowrap;
                            align-items: flex-start;
                            justify-content: space-between;
                            padding: 12px;

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
                                    font-size: 14px;
                                    height: 33px
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

                                        i{
                                            display: block;
                                            margin-right: 5px;
                                            font-size: 10px;
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
                                    margin: 3px 0;
                                    .teacher{
                                        display: flex;
                                        align-items: center;
                                        i{
                                            display: block;
                                            margin-right: 5px;
                                            font-size: 10px;
                                        }
                                    }
                                    .money{
                                        font-size: 12px;
                                        color: #005AAC;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
