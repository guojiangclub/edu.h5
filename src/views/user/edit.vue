<template>
    <div id="edit">
        <Header title="编辑资料">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="head mx-1px-bottom">
                <div class="left">个人头像</div>
                <div class="right">
                    <Upload @on-change-file="load">
                        <img :src="imgData[0].base64" alt="">
                    </Upload>
                </div>
            </div>

            <div class="info">
                <div class="item mx-1px-bottom" @click="">
                    <div class="name">
                        名字
                    </div>
                    <div class="right">
                        <div class="text">
                            <input class="trigth" type="text" placeholder="名字" v-model="name">
                        </div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </div>


                </div>
                <div class="item mx-1px-bottom">
                    <div class="name">
                        性别
                    </div>
                    <div class="right">
                        <div class="text" @click="selects('sex')">
                            <input class="trigth" type="text" placeholder="请选择性别" v-model="sexData" readonly>
                        </div>
                        <div class="enter iconfont icon-fanhui-1"></div>

                    </div>

                </div>
                <div class="item mx-1px-bottom">
                    <div class="name">
                        生日
                    </div>
                    <div class="right">
                        <div class="text" @click="selects('date')">
                            <input class="trigth" type="text" placeholder="请选择生日" v-model="dateData" readonly>
                        </div>
                        <div class="enter iconfont icon-fanhui-1"></div>

                    </div>

                </div>
                <div class="item mx-1px-bottom">
                    <div class="name">
                        个人网站
                    </div>
                    <div class="right">
                        <div class="text" @click="">
                            <input class="trigth" type="text" placeholder="个人网站" v-model="profile.homepage">
                        </div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </div>


                </div>
                <div class="item mx-1px-bottom">
                    <div class="name">
                        个人简介
                    </div>
                    <div class="right">
                        <div class="text">
                            <input class="trigth" placeholder="简介" v-model="signature">
                        </div>
                        <div class="enter iconfont icon-fanhui-1"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="name">
                        所在城市
                    </div>
                    <div class="right">
                        <div class="text" @click="selects('address')">
                            <input class="trigth" type="text" placeholder="无" v-model="addressData" readonly>
                        </div>
                        <div class="enter iconfont icon-fanhui-1"></div>

                    </div>

                </div>

            </div>
            <div class="detailed">
                <div class="occupation record">
                    <div class="text">职业档案</div>
                    <!--<div class="tag mx-1px-bottom" v-show="tag">
                        <div class="tag-text">PHP</div>
                    </div>-->
                    <div class="tag data" >
                        <div class="all mx-1px-bottom" v-for="work in works" @click="editmes('works',work.id)">
                            <div class="title">{{work.name}}</div>
                            <div class="full">{{work.role}}</div>
                        </div>
                    </div>
                    <div class="career pbg" @click="jump('works')">
                        <div class="details">+添加职业详细资料</div>
                    </div>
                </div>
                <div class="project record">
                    <div class="text">项目档案</div>
                    <div class="pro data" >
                        <div class="all mx-1px-bottom" v-for="project in projects" @click="editmes('projects',project.id)">
                            <div class="title">{{project.name}}</div>
                            <div class="full">{{project.role}}</div>
                        </div>
                    </div>
                    <div class="article pbg" @click="jump('projects')">
                        <div class="details">+添加项目详细资料</div>
                    </div>
                </div>
                <div class="learn record">
                    <div class="text">学习经历</div>
                    <div class="lea data">
                        <div class="all mx-1px-bottom" v-for="school in schools" @click="editmes('schools',school.id)">
                            <div class="title">{{school.name}}</div>
                            <div class="full">{{school.start_at}}~{{school.end_at}}</div>
                        </div>
                    </div>
                    <div class="study pbg" @click="jump('schools')">
                        <div class="details">+添加学习详细资料</div>
                    </div>
                </div>
            </div>


        </div>

        <!--头像上传-->

        <!--性别选择-->
        <Picker type="NormalPicker" v-model="showSex" @sure="sex" :list="sexList" :init-arr="sexDefault"></Picker>

        <!--生日选择-->
        <Picker type="DatePicker" v-model="showDate" @sure="date" valueSeparator="-"></Picker>

        <!--城市选择-->
        <Picker type="AreaPicker" v-model="showAddress" @sure="address" valueSeparator="-"></Picker>

        <!--<v-button :loading='showLoading' height='50px' @click="submit">保存</v-button>-->

        <v-button :loading='showLoading' height='50px' @click="submit">确定</v-button>



        <!--<div class="submit" @click="submit">-->
            <!--保存-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {Cache, cache_keys, is } from '../../utils/util';
    export default {
    	name: 'edit',
    	data() {
    		return {
                profile: {
                    homepage: '',
                },
                projects: [],
                schools: [],
                works: [],
			    sexData: '',
			    sexDataInfo:'',
			    sexDefault: [],
                dateData: '',
                addressData: '',
			    province:'',
                year: '',
                month: '',
                day: '',
			    city: '',
			    area: '',
			    showSex: false,
			    showDate: false,
			    showAddress: false,
			    showLoading: false,
                tag: false,
                all: false,
                imgData: [
                    {
	                    base64: ''
                    }
                ],
			    sexList: [
                    {
                    	target:'sex',
                    	list:[{
                    		code:'1',
                            value:'男'
                        },{
		                    code:'2',
		                    value:'女'
	                    }]
                    }
                ],
			    loading: '',
			    signature: '',
			    name: ''
		    }
        },
	    methods:{
            editmes(name, id) {
                this.$router.push({name: name, query: {id: id}});
            },
            jump(name) {
                this.$router.push({name: name});
            },
		    load(data) {
			    this.imgData = data
		    },
		    selects(name) {
			    switch (name) {
				    case 'sex':
					    this.showSex = true
					    break;
				    case 'date':
					    this.showDate = true
					    break;
				    case 'address':
					    this.showAddress = true
					    break;
			    }
		    },
		    sex(data){
			    this.sexData = data.sex.value;
			    this.sexDataInfo = data.sex.code;
		    },
		    date(data) {
                console.log(data);
                this.dateData = data.formatDate;
		    },
		    submit() {
		    	var data = {
		    		sex: this.sexDataInfo,
				    birthday: this.dateData,
				    province: this.province,
				    city: this.city,
				    area: this.area,
				    truename: this.name,
				    signature: this.signature,
                    extra: [],
                    homepage: this.profile.homepage
                };
			    var message = null;
			    if (!is.has(this.name)) {
				    message = '请输入您的姓名';
                } else if (!is.name(this.name)) {
                    message = '用户名格式不正确，请输入2-24位不含特殊符号的中英文';
                }  else if (!is.has(this.sexData)) {
			    	message = '请选择性别';
                } else if (!is.has(this.dateData)) {
			    	message = '请选择生日';
                } else if (!is.has(this.addressData)) {
			    	message = '请选择城市';
                } else if (!is.has(this.signature)) {
			    	message = '请输入个人简介';
                }

                if (message) {
                    this.$Modal.confirm({body: message})
                } else {
                    this.showLoading = true;
                    this.$store.dispatch('updateinfo',data);

//                    解决me接口问题
                    setTimeout(() => {
                        this.$store.dispatch('queryUserInfo');
                    }, 300)
                }
		    },
            update(status, res) {
		        this.showLoading = false;
		        if (status) {
                    this.$Modal.confirm({body: "修改成功", onOk: function () {
                        window.history.back();

                    }})
                } else {
                    this.$Modal.confirm({body: res.message || '请求失败'})
                }

            },
		    address(data) {
			    this.addressData = data.formArea;
			    this.province = data.province.name;
			    this.city = data.city.name;
			    this.area = data.district.name;
		    },
		    Info(res) {
                this.profile.homepage = res.data.profile.homepage;
                this.works = res.meta.works;
		        this.projects = res.meta.projects;
		        this.schools = res.meta.schools;
		    	this.signature = res.meta.signature;
		    	this.name = res.data.user_name;
		    	this.imgData[0].base64 = res.data.avatar_file;
		    	this.province = res.data.province;
		    	this.city = res.data.city;
		    	this.dateData = res.data.birthday;
		    	this.addressData = this.province + '-' + this.city;
		    	if (res.data.sex == 1) {
				    this.sexData = '男';
				    this.sexDataInfo = 1;
		    		this.sexDefault.push('男');
                } else {
				    this.sexData = '女';
				    this.sexDataInfo = 2;
				    this.sexDefault.push('女');
                }

            },

	    },
	    created() {
            var userInfo  = Cache.get(cache_keys.info);
            if (userInfo) {
                this.Info(userInfo)
            } else {
                this.$store.dispatch('queryUserInfo');
                EventBus.$on('userInfo',this.Info);
            }
		    EventBus.$on('UpdateInfo', this.update);
	    },
        beforeDestroy() {
            EventBus.$off('userInfo');
            EventBus.$off('UpdateInfo');
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #edit {
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
        .content {
            height: 100%;
            overflow: auto;
            color: #3d4145;
            font-size: 14px;
            /*font-weight: bold;*/
            padding-bottom: 50px;
            input {
                width: 90%;
                height: 40px;
                font-size: 14px;
                font-weight: initial;
                color: #3d4145;
            }
            textarea {
                width: 100%;
                height: 40px;
                font-size: 14px;
                font-weight: initial;
                color: #3d4145;
                margin-top: 10px;
            }

            .head {
                padding: 7px 27px 7px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #008cee;
                color: #fff;
                .right {
                    width: 50px;
                    height: 50px;
                    border-radius: 100%;
                    overflow: hidden;
                    img{
                        border-radius: 100%;
                        width: 100%;
                    }
                }
            }
            .info{
                padding-left: 15px;
                background: #fff;

                .item {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: 15px;
                    font-weight: normal;


                    .right{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .text{
                        .trigth{
                            text-align: right;
                        }
                        input{
                            width: 200px;
                            display:block;
                            word-break:keep-all;
                            white-space:nowrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                        }
                    }
                    .icon {
                        width: 30px;
                        height: 30px;
                        line-height: 31px;
                        border-radius: 50%;
                        text-align: center;
                        font-size: 15px;
                        color: #fff;
                    }
                    .enter {
                        color: #ccc;
                        font-weight: bold;
                    }

                }
            }
            .detailed{
                .record{
                    margin-top: 25px;
                    .text{
                        padding: 0px 0px 5px 15px;
                        color: #888;
                    }
                    .pbg{
                        padding: 11px 15px;
                        background: #fff;
                        color: #008cee;
                        text-align: center;
                    }
                    .data{
                        background: #fff;
                        padding-left: 15px;
                        .all{
                            padding: 12px 15px 9px 0px;
                            .title{
                                font-weight: 600;
                            }
                            .full{
                                font-size: 12px;
                                color: #a7a7a7;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                            }
                        }
                    }
                }


            }

        }
        .vlc-button{
            position: absolute;
            bottom: 0;
            .vlc-button-btn{
                background: #008cee;
                border-radius: inherit;
                height: 100%;
            }
        }
        .submit{
            width: 100%;
            position: absolute;
            bottom: 0;
            height: 50px;
            background: #ed1e31;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
            color: #fff;
        }
    }
</style>
