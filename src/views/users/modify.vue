<template>
    <div id="modify">
        <van-nav-bar
            title='修改手机号'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <div>
            <div class="content">
                <div class="item mx-1px-bottom">
                    <span class="">新手机号</span>
                    <input type="text" v-model="mobile"  placeholder="新手机号" placeholder-class="input-placeholder"/>
                </div>
                <div class="item mx-1px-bottom">
                    <span class="">验证码</span>
                    <input type="text" placeholder="验证码" v-model="identifyingcode" placeholder-class="input-placeholder" />
                    <div class="get-code" @click="getCode">{{codes.codeText}}</div>
                </div>
            </div>
        </div>
        <div class="exit-btn" @click="sureUpdata">确认修改</div>

    </div>

</template>

<script type="text/ecmascript-6">
    import { List,NavBar ,Toast } from 'vant';
    import { Cache, cache_keys, exif ,env,is} from '../../utils/util';
    export default {
        component:{
            List,
            NavBar,
            Toast
        },
        name: 'users-modify',
        data(){
            return {
                is_navbar:true,
                mobile:'',
                identifyingcode:'',
                codes:{
                    total:60,
                    codeText:"获取验证码"
                },
                sending:false,


            }
        },
        created(){
            if(env.isWechat){
                this.is_navbar = false
            }
            EventBus.$on('modifycodeData',this.verifyCode);
            EventBus.$on('updateMobileData',this.getUpdatemobile)
        },
        methods:{
            onClickLeft(){
                window.history.back(-1)
            },
            sureUpdata(){
                var message = '';
                if(!is.has(this.mobile)){
                    message = '请输入您的手机号'
                } else if(!is.mobile(this.mobile)){
                    message = '手机号格式不正确，请重新输入'
                } else if(!is.has(this.identifyingcode)){
                    message = '请输入验证码'
                }
                if(message){
                    this.$dialog.alert({message: message});
                    return
                } else {
                    let data = {
                        mobile:this.mobile,
                        code:this.identifyingcode
                    }
                    this.$store.dispatch('queryUpdatemobile',data)
                }
            },
            //修改手机号
            getUpdatemobile(res){
                this.$toast.success('修改成功');
                setTimeout(()=>{
                    Cache.remove(cache_keys.token);
                    this.$router.push({
                        name:'index-index'
                    })
                },3000)
            },
            verifyCode(res){
                //成功请求到数据之后
                var total = this.codes.total;//秒数，倒计时
                this.codes.codeText = total + '秒后再发送';
                //需要手动做一个倒计时
                var timer = setInterval(()=>{
                    total--;
                    this.codes.codeText = total + '秒后再发送';
                    if(total<1){
                        this.sending = false;
                        this.codes.codeText = '获取验证码';
                        clearInterval(timer)
                    }
                },1000)

            },
            //随机获取一串字符串
            randomStr(){
                return  Math.random().toString(36).substr(2,24);
            },
            getCode(){
                //如果已经点击了按钮，则将sending变为true，不能继续点击
                if(this.sending){
                    return
                }
                var message = '';
                if(!is.has(this.mobile)){
                    message = '请输入您的手机号'
                } else if(!is.mobile(this.mobile)){
                    message = '手机号格式不正确，请重新输入'
                }
                if(message){
                    this.$dialog.alert({message: message});
                    return
                } else {
                    var randoms = this.randomStr();
                    this.codes.codeText = '短信发送中';
                    this.sending = true
                    let data = {
                        mobile:this.mobile,
                        access_token:randoms
                    }
                    this.$store.dispatch('queryCode',data)
                }


            },
        }

    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#f3f3f3;
    }
    #modify{
        height: 100%;
        overflow: auto;
        background-color: #ffffff;
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        /*.van-nav-bar + div{
            padding-top: 36px!important;
        }*/
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
        .exit-btn{
            background-color: #004E9D;
            text-align: center;
            height: 50px;
            line-height: 50px;
            color: #ffffff;
            font-size: 14px;
            margin: 0 15px;
            border-radius: 4px;
        }
        .content{
            margin:28px 15px 34px 15px;
            padding: 0 12px 20px 12px;
            background-color:#F3F3F3;
            border-radius: 4px;
            .item{
                display: flex;
                height: 50px;
                align-items: center;
                font-size: 12px;
                span{
                    color:#202020;
                    padding:0 15px;
                }
                input{
                    flex: 1;
                    height: 100%;
                    line-height: 50px;
                }
                .input-placeholder{
                    color:#909090;
                }
                .get-code{
                    padding: 6px 10px;
                    color: #FFFFFF;
                    background-color: #004E9D;
                    font-size: 12px;
                    border-radius: 4px;
                    line-height: 17px;
                    box-sizing: border-box;
                    height:30px;
                }
            }


        }

    }

</style>
