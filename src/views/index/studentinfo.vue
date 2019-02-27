<template>
    <div id="student-info">
        <van-nav-bar
            title='学员信息'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <div class="infomation-content">
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    真实姓名：
                </div>
                <input type="text" v-model="name"/>
            </div>
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    手机号码：
                </div>
                <input type="text" v-model="mobile"/>
            </div>
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    微信账号：
                </div>
                <input type="text" v-model="weixin"/>
            </div>
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    所在公司：
                </div>
                <input type="text" v-model="company"/>
            </div>
            <div class="item mx-1px-bottom">
                <div class="option">
                    <span>*</span>
                    公司职位：
                </div>
                <input type="text" v-model="job"/>
            </div>
        </div>
        <div class="save" @click="saveInfo">保存</div>
    </div>

</template>

<script type="text/ecmascript-6">
    import { Cache, cache_keys, exif,is ,env} from '../../utils/util';
    import { List,NavBar } from 'vant';
    export default {
        component:{
            List,
            NavBar
        },
        name: 'studentinfo',
        data(){
            return {
                name:'',
                mobile:'',
                weixin:'',
                company:'',
                job:'',
                userInfo:'',
                is_navbar:true

            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
            EventBus.$on('updateInfo',this.getUpdateInfo);

        },
        beforeDestroy(){
            EventBus.$off('updateInfo')
        },
        mounted(){
            //获取支付页面缓存的数据
            var info = Cache.get(cache_keys.order_info);
            if(info.userDetails){
                this.userInfo = info.userDetails;
                this.name = this.userInfo.name;
                this.mobile = this.userInfo.mobile;
                this.weixin = this.userInfo.weixin;
                this.company = this.userInfo.company;
                this.job = this.userInfo.job
            }

        },
        methods:{
            onClickLeft(){
                window.history.back(-1);
            },
            //更新数据的处理
            getUpdateInfo(res){
                var info = Cache.get(cache_keys.order_info);
                info.userDetails = res.data;
                Cache.set(cache_keys.order_info,info,0);
                //返回上一页
                window.history.back(-1);

            },
            //点击保存按钮
            saveInfo(){
                var message = '';
                if(!is.has(this.name)){
                    message = '请填写真实姓名'
                } else if(!is.has(this.mobile)){
                    message = '请填写手机号码'
                } else if(!is.mobile(this.mobile)){
                    message = '手机号码格式不正确'
                } else if(!is.has(this.weixin)){
                    message = '请填写微信号'
                } else if(!is.has(this.company)){
                    message = '请填写公司名称'
                } else if(!is.has(this.job)){
                    message = '请填写工作职位'
                }
                if(message){
                    this.$dialog.alert({
                        message: message
                    });
                } else {
                    let data = {
                        name:this.name,
                        mobile:this.mobile,
                        weixin:this.weixin,
                        company:this.company,
                        job:this.job
                    }
                    this.$store.dispatch('queryUpateInfo',data)
                }

            }

        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #student-info{
        height: 100%;
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
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
        .infomation-content{
            margin-top:15px;
            background-color: #FFFFFF;
            .item{
                padding:0 15px;
                height: 50px;
                line-height: 50px;
                display: flex;
                align-items: center;
                .option{
                    font-size: 14px;
                    color:#4A4A4A;

                    span{
                        color: #FB5054;
                    }
                }
                input{
                    flex: 1;
                    padding-left: 16px;
                    font-size:14px;
                    color:#4A4A4A;
                    font-weight: 600;
                }
            }

        }
        .save{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height:50px;
            line-height: 50px;
            background-color: #004E9D;
            color: #FFFFFF;
            font-size: 15px;
            font-weight: 500;
            text-align: center;
        }

    }

</style>
