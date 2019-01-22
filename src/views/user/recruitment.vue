<template>
    <div id="recruitment">
        <Header title="招聘">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="top">
            <div class="search ">
                <i class="iconfont icon-sousuo- icon"></i>
                <input type="text" placeholder="搜索职位">
            </div>
            <div class="option mx-1px-top">
                <div class="position same" :class="site ? 'active' : ''" @click="seat">
                    位置 <i class="iconfont icon-fanhui-1 rotate"></i>
                </div>
                <div class="company same" :class="company ? 'active' : ''" @click="firm">
                    公司 <i class="iconfont icon-fanhui-1 rotate"></i>
                </div>
                <div class="claim same" :class="claim ? 'active' : ''" @click="ask">
                    要求 <i class="iconfont icon-fanhui-1 rotate"></i>
                </div>
            </div>
        </div>

        <div class="content">

            <LoadMore :height='height' :auto=false :load-more="loadMore" :has-more="list.hasMore" :refresh="refresh" ref="pulldown" v-show="hide">

                <div class="post-list">
                    <div class="post-item" @click="jump('particular')" v-for="item in 10">
                        <img src="../../static/img/kn.png" alt="">
                        <div class="post-right">
                            <div class="name">web前端工程师</div>
                            <div class="case">
                                <span class="post-company">上海拓善智能科技有限公司</span>
                                <span class="salary">10k-15k</span>
                            </div>
                            <div class="post-position  mx-1px-top">
                                <div class="locate equal">
                                    <i class="iconfont icon-weizhitianshan post-icon"></i>
                                    长沙
                                </div>
                                <div class="time equal">
                                    <i class="iconfont icon-jiaoyujingli post-icon"></i>
                                    1-3年
                                </div>
                                <div class="education equal">
                                    <i class="iconfont icon-gongzuojingli post-icon"></i>
                                    本科
                                </div>
                                <span class="while equal">23小时前</span>
                            </div>
                        </div>
                    </div>
                </div>

            </LoadMore>
            <div class="company-list mx-1px-top" v-show="site">
                <div class="company-item">
                    <div class="name">当前城市</div>
                    <div class="btn-list">
                        <span class="btn white">{{other}}</span>
                    </div>
                </div>
                <div class="company-item">
                    <div class="name">其他城市</div>
                    <div class="btn-list">
                        <span class="btn flash" v-for="(item,index) in otherarr" @click="others(item, index)">{{item}}</span>
                    </div>
                </div>
                <div class="bottom" >
                    <div class="edit">
                        <v-button :loading='showLoading' height='50px' @click="sitesub">确定</v-button>
                    </div>
                </div>
            </div>
            <div class="company-list mx-1px-top" v-show="company">
                <!--<div class="company-item" v-for="(items, indexs) in companyarr">
                    <div class="name">{{items.title}}</div>
                    <div class="btn-list">
                        <span class="btn" v-for="(item, index) in items.items" :class="{selected: !!selections[item.id]}" @click="financings(item, true)">{{item.value}}</span>
                    </div>
                </div>-->
                <div class="company-item" v-for="(items, indexs) in companyarrs">
                    <div class="name">{{items[0]}}</div>
                    <div class="btn-list">
                        <span class="btn" v-for="(item, index) in items[1]" :class="index == financing[indexs] ? 'selected' : ''" @click="financings(index, indexs, true)">{{item}}</span>
                    </div>
                </div>
                <!--<div class="company-item">
                    <div class="name">团队规模</div>
                    <div class="btn-list">
                        <span class="btn" v-for="(item,index) in 5" :class="index == tema ? 'white' : ''" @click="temas(index)">{{index}}</span>
                    </div>
                </div>
                <div class="company-item">
                    <div class="name">行业</div>
                    <div class="btn-list">
                        <span class="btn" v-for="(item,index) in 5" :class="index == industry ? 'white' : ''" @click="industrys(index)">{{index}}</span>
                    </div>
                </div>-->
                <div class="bottom" >
                    <div class="edit">
                        <v-button :loading='showLoading' height='50px' @click="companysub">确定</v-button>
                    </div>
                </div>
            </div>
            <div class="company-list mx-1px-top" v-show="claim">
                <!--<div class="company-item" v-for="(items, indexs) in claimarr">
                    <div class="name">{{items.title}}</div>
                    <div class="btn-list">
                        <span class="btn" v-for="(item,index) in items.items" :class="{selected: !!claitions[item.id]}" @click="financings(item, false)">{{item.value}}</span>
                    </div>
                </div>-->
                <div class="company-item" v-for="(items, indexs) in claimarrs">
                    <div class="name">{{items[0]}}</div>
                    <div class="btn-list">
                        <span class="btn" v-for="(item, index) in items[1]" :class="index == finan[indexs] ? 'selected' : ''" @click="financings(index, indexs, false)">{{item}}</span>
                    </div>
                </div>
                <!--
                <div class="company-item">
                    <div class="name">工作经验</div>
                    <div class="btn-list">
                        <span class="btn" v-for="(item,index) in 5" :class="index == work ? 'white' : ''" @click="works(index)">{{index}}</span>
                    </div>
                </div>
                <div class="company-item">
                    <div class="name">薪资</div>
                    <div class="btn-list">
                        <span class="btn" v-for="(item,index) in 5" :class="index == salary ? 'white' : ''" @click="salarys(index)">{{index}}</span>
                    </div>
                </div>-->
                <div class="bottom" >
                    <div class="edit">
                        <v-button :loading='showLoading' height='50px' @click="claimsub">确定</v-button>
                    </div>
                </div>
            </div>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">

    export default {
        name: 'recruitment',
        data() {
            return {
                showLoading: false,
                height: '100%',
                tabIndex: 0,
                list: {
                        init: false,
                        page: 1,
                        hasMore: true,
                },
                company: false,
                claim: false,
                site: false,
                hide: true,
                selections: {
                	'0-0': {
                        value: '全部',
                        id: '0-0',
		                type: 0
                    },
                    '1-0': {
                        value: '全部',
                        id: '1-0',
	                    type: 1
                    },
                    '2-0': {
                        value: '全部',
                        id: '2-0',
                        type: 2
                    }
                },
                claitions: {
                    '0-0': {
                        value: '全部',
                        id: '0-0',
                        type: 0
                    },
                    '1-0': {
                        value: '全部',
                        id: '1-0',
                        type: 1
                    },
                    '2-0': {
                        value: '全部',
                        id: '2-0',
                        type: 2
                    }
                },
                other: '全国',
                otherarr: ['上海','北京','南京','深圳','长沙','其他城市'],
                companyarr: [
                    {
                        title: '融资规模',
	                    items: [
                            {
                            	value: '全部',
                                id: '0-0',
	                            type: 0
                            },
		                    {
			                    value: '未融资',
			                    id: '0-1',
			                    type: 0
		                    },
		                    {
			                    value: '天使轮',
			                    id: '0-2',
			                    type: 0
		                    },
		                    {
			                    value: 'A轮',
			                    id: '0-3',
			                    type: 0
		                    }
                        ]
                    },
                    {
                        title: '团队规模',
	                    items: [
		                    {
			                    value: '全部',
			                    id: '1-0',
			                    type: 1
		                    },
		                    {
			                    value: '0-20人',
			                    id: '1-1',
			                    type: 1
		                    },
		                    {
			                    value: '20-99人',
			                    id: '1-2',
			                    type: 1
		                    },
		                    {
			                    value: '100-499人',
			                    id: '1-3',
			                    type: 1
		                    }
	                    ]
                    },
                    {
                        title: '行业',
	                    items: [
		                    {
			                    value: '全部',
			                    id: '2-0',
			                    type: 2
		                    },
		                    {
			                    value: '非互联网行业',
			                    id: '2-1',
			                    type: 2
		                    },
		                    {
			                    value: '移动互联网',
			                    id: '2-2',
			                    type: 2
		                    },
		                    {
			                    value: '健康医疗',
			                    id: '2-3',
			                    type: 2
		                    }
	                    ]
                    }
                ],
                claimarr: [
                    {
                        title: '最低学历',
                        items: [
                            {
                                value: '全部',
                                id: '0-0',
                                type: 0
                            },
                            {
                                value: '博士',
                                id: '0-1',
                                type: 0
                            },
                            {
                                value: '硕士',
                                id: '0-2',
                                type: 0
                            },
                            {
                                value: '本科',
                                id: '0-3',
                                type: 0
                            }
                        ]
                    },
                    {
                        title: '工作经验',
                        items: [
                            {
                                value: '全部',
                                id: '1-0',
                                type: 1
                            },
                            {
                                value: '应届生',
                                id: '1-1',
                                type: 1
                            },
                            {
                                value: '1年以内',
                                id: '1-2',
                                type: 1
                            },
                            {
                                value: '3-5年',
                                id: '1-3',
                                type: 1
                            }
                        ]
                    },
                    {
                        title: '薪资',
                        items: [
                            {
                                value: '全部',
                                id: '2-0',
                                type: 2
                            },
                            {
                                value: '3k以下',
                                id: '2-1',
                                type: 2
                            },
                            {
                                value: '3-5k',
                                id: '2-2',
                                type: 2
                            },
                            {
                                value: '5-10k',
                                id: '2-3',
                                type: 2
                            }
                        ]
                    }
                ],
                financing: {
                    0:0,
                    1:0,
                    2:0
                },
                finan: {
                    0:0,
                    1:0,
                    2:0
                },
                companyarrs: [
                    ['融资规模',['全部','未融资','天使轮','A轮','B轮','C轮','D轮以上','已上市']],
                    ['团队规模',['全部','0-20人','20-99人','100-499人','500人以上']],
                    ['行业',['全部','非互联网行业','移动互联网','健康医疗','旅游','金融','IT软件','游戏','互联网','媒体','信息安全']],
                ],
                claimarrs: [
                    ['最低学历',['全部','博士','硕士','本科','大专','高中','中专及以下']],
                    ['工作经验',['全部','应届生','1年以内','1-3年','3-5年','5-10年','10年以上']],
                    ['薪资',['全部','3k以下','3-5k','5-10k','10-20k','20-50k','50k以上']],
                ],
            }
        },
        created() {

        },
        methods: {
            others(item, index){
//                debugger
                this.otherarr.splice(index,1,this.other);
                [this.other, item] = [item, this.other];
            },
            /*financings(item, name){
                console.log(name);

                if (name) {
                    var selections = Object.assign({}, this.selections);
                } else {
                    var selections = Object.assign({}, this.claitions);
                }
	            var id = item.id;

	            if (!selections[id]) {
		            for (let k in selections) {
			            if (selections.hasOwnProperty(k)) {
				            let o = selections[k];
				            if (o.type == item.type) {
					            delete selections[k];
				            }
			            }
		            }
		            selections[id] = {
			            id: item.id,
			            value: item.value,
                        type: item.type
		            };
                }
                if (name) {
                    this.selections = Object.assign({}, selections);
                } else {
                    this.claitions = Object.assign({}, selections);
                }
            },*/
            financings(index, indexs, name){
                if (name) {
                    this.financing[indexs] = index;
                } else {
                    this.finan[indexs] = index;
                }
            },
           /* temas(index){
               this.tema = index;
            },
            industrys(index){
               this.industry = index;
            },
            educations(index){
               this.education = index;
            },
            works(index){
               this.work = index;
            },
            salarys(index){
               this.salary = index;
            },*/
            companysub(){
               this.company = false;
               this.hide = true;
            },
            claimsub(){
                this.claim = false;
                this.hide = true;
            },
            sitesub(){
                this.site = false;
                this.hide = true;
            },
//            位置
            seat(){
                this.site = !this.site;
                this.company = false;
                this.claim = false;
                if (this.site){
                    this.hide = false;
                } else {
                    this.hide = true;
                }
            },
//            公司
            firm(){
                this.company = !this.company;
                this.site = false;
                this.claim = false;
                if (this.company){
                    this.hide = false;
                } else {
                    this.hide = true;
                }
            },
//            要求
            ask(){
                this.claim = !this.claim;
                this.site = false;
                this.company = false;
                this.hide = !this.hide;
                if (this.claim){
                    this.hide = false;
                } else {
                    this.hide = true;
                }
            },
            jump(name) {
                this.$router.push({name: name});
            },
//            加载更多
            loadMore() {
            },
//            刷新数据
            refresh() {

            },
//            改变tabIndex
            change() {

            }
        },

    }

</script>


<style rel="stylesheet/less" lang="less">

    #recruitment{
        background: #efeff4;
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                }
            }
            .title {
                text-align: center;
            }
            .right {
                font-size: 0;
            }
        }
        .top{
            .search{
                margin: 7px 15px;
                background: #ffffff;
                padding: 6px 27px;
                border-radius: 5px;
                font-size: 13px;
                .icon{
                    padding-right: 7px;
                }
            }
            .option{
                background: #ffffff;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: center;
                .same{
                    flex: 1;
                    text-align: center;
                    color: #9f9f9f;
                    font-size: 13px;
                    margin: 13px 0px;
                    &.active{
                        color: #008cee;
                    }
                    .rotate{
                        font-size: 12px;
                        font-weight: 600;
                        display: inline-block;
                        transform: rotate(90deg);
                    }
                }
                .company{
                    border-left: 1px solid #e0e0e4;
                    border-right: 1px solid #e0e0e4;
                }
            }
        }
        .content{
            height: 100%;
            overflow: auto;
            padding-bottom: 150px;

            .vlc-loadmore-content{
                background: none;
                .post-list{
                    .post-item{
                        margin-top: 10px;
                        display: flex;
                        padding: 15px;
                        background: #ffffff;
                        img{
                            width: 80px;
                            height: 80px;
                            border: 1px solid #efeff4;
                            margin-right: 10px;
                        }
                        .post-right{
                            width: 100%;
                            .name{
                                /*font-size: 17px;*/
                                font-weight: 600;
                            }
                            .case{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin: 4px 0px 6px 0px;
                                .post-company{
                                    font-size: 13px;
                                    color: #9b9b9b;
                                    flex:1;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }
                                .salary{
                                    font-size: 14px;
                                    color: #eb7073;
                                }
                            }
                            .post-position{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding-top: 6px;
                                .equal{
                                    font-size: 12px;
                                    color: #9b9b9b;
                                    .post-icon{
                                        font-size: 12px;
                                    }
                                }
                            }
                        }
                    }
                }            }
            .company-list{
                padding-bottom: 50px;
                .bottom{
                    background: #fff;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    .edit{
                        text-align: center;
                        color: #fff;
                        .vlc-button-normal{
                            background-color: #008cee;
                            border-color: #008cee;
                            border-radius: 0px;
                        }
                    }
                }

                .company-item{
                    margin: 0px 15px;
                    padding: 20px 0px;
                    .name{
                        font-size: 14px;
                        color: #9b9b9b;
                    }
                    .btn-list{
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-items: center;
                        /*justify-content: space-between;*/

                        .flash:active{
                            background: #008cee;
                            color: #ffffff;
                            border: 1px solid #008cee;
                        }
                        .btn{
                            font-size: 14px;
                            color: #9b9b9b;
                            padding: 5px 21px;
                            background: #ffffff;
                            border-radius: 4px;
                            margin: 18px 22px 0px 0px;
                            border: 1px solid #dcdcdc;
                            &.selected{
                                background: #008cee;
                                color: #ffffff;
                                border: 1px solid #008cee;
                            }
                        }
                    }

                }
            }
        }
        /*.bottom{
            background: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .edit{
                text-align: center;
                color: #fff;
                .vlc-button-normal{
                    background-color: #008cee;
                    border-color: #008cee;
                    border-radius: 0px;
                }
            }
        }*/


    }


</style>
