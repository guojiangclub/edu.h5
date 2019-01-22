<template>
    <div id="user-profile">
        <Header title="个人资料">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="head mx-1px-bottom">
                <div class="left">
                    头像
                </div>
                <div class="right">
                    <Upload @on-change-file="load">
                        <img :src="imgData[0].base64" alt="">
                    </Upload>
                </div>
            </div>
            <div class="item mx-1px-bottom">
                <div class="name">
                    真实姓名
                </div>
                <div class="text">
                    <input type="text" placeholder="请输入真实姓名" v-model="name">
                </div>
            </div>
            <div class="item mx-1px-bottom">
                <div class="name">
                    性别
                </div>
                <div class="text" @click="selects('sex')">
                    <input type="text" placeholder="请选择性别" v-model="sexData" readonly>
                </div>
            </div>
            <div class="item mx-1px-bottom">
                <div class="name">
                    生日
                </div>
                <div class="text" @click="selects('date')">
                    <input type="text" placeholder="请选择生日" v-model="dateData" readonly>
                </div>
            </div>
            <div class="item mx-1px-bottom">
                <div class="name">
                    现居城市
                </div>
                <div class="text" @click="selects('address')">
                    <input type="text" placeholder="请选择现居城市" v-model="addressData" readonly>
                </div>
            </div>
            <div class="item mx-1px-bottom">
                <div class="name">
                    个人简介
                </div>
                <div class="text">
                    <textarea placeholder="请输入个人简介" v-model="signature"></textarea>
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

        <v-button :loading='showLoading' height='50px' @click="submit">保存</v-button>

        <!--<div class="submit">-->
            <!--保存-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import { is } from '../../utils/util';
    export default {
    	name: 'user-profile',
    	data() {
    		return {
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
                    extra: []
                };
			    var message = null;
			    if (!is.has(this.name)) {
				    message = '请输入您的姓名';
                } else if (!is.has(this.sexData)) {
			    	message = '请选择性别'
                } else if (!is.has(this.dateData)) {
			    	message = '请选择生日'
                } else if (!is.has(this.addressData)) {
			    	message = '请选择城市'
                } else if (!is.has(this.signature)) {
			    	message = '请输入个人简介'
                }

                if (message) {
	                this.$Modal.confirm({body: message})
                } else {
	                this.$store.dispatch('updateinfo',data);
                }
		    },
            update() {
	            this.$Modal.confirm({body: "修改成功", onOk: function () {
                    window.history.back();
	            }})
            },
		    address(data) {
			    this.addressData = data.formArea;
			    this.province = data.province.name;
			    this.city = data.city.name;
			    this.area = data.district.name;
		    },
		    Info(res) {
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
//			    console.dir(this.changeDate(this.dateData));

            },
//            changeDate(tiem) {
//		    	return tiem.replace(/(\w*)-(\w*)-(\w*)/,"{y:$1,m:$2,d:$3}");
//            }

	    },
	    created() {
    		var date = '2017-10-15';
		    date.replace(/(\w*)-(\w*)-(\w*)/,function (match,key,key2,key3) {
//                console.log(match,key,key2,key3);

		    })
		    this.$store.dispatch('queryUserInfo');
		    EventBus.$on('userInfo',this.Info);
		    EventBus.$on('UpdateInfo', this.update);
	    }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #user-profile {
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
            font-weight: bold;
            padding-bottom: 50px;
            input {
                width: 100%;
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
                padding: 12px;
                display: flex;
                justify-content: space-between;

                .right {
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
            }
            .item{
                padding: 12px;
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
