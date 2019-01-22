<template>
    <div id="edu-success">
        <Header title="标题">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="win con" v-if="status">
                <i class="iconfont icon-chenggong"></i>
                <span>购买成功</span>
                <b class="money" v-if="point == 'true'"><b class="num">{{cache.point}} 积分</b></b>
                <b class="money" v-else>￥<b class="num">{{cache.svip_price}} </b></b>
                <div>您已成功购买“<p>{{cache.title}}</p>”课程</div>
            </div>
            <div class="fail con" v-else>
                <i class="iconfont icon-shibai"></i>
                <span>购买失败</span>
                <div>很遗憾您未购买“<p>{{cache.title}}</p>”课程</div>
            </div>
        </div>


        <div class="bottom">
            <div class="edit" @click="learn()" v-if="status" >
                <div class="left cor">
                    <div class="txt">
                        查看课程
                    </div>
                </div>
            </div>
            <div class="edit" v-else>
                <div class="left" @click="" >
                    <div class="txt">返回</div>
                </div>
                <div class="rigth">
                    <div class="txt">重新购买</div>
                </div>
            </div>
        </div>
    </div>



</template>

<script type="text/ecmascript-6">
    import {Cache, cache_keys} from '../../utils/util';
    export default {
        name: 'edu-success',
        data() {
            return {
                stauts: '',
                cache: '',
                point: ''
            }
        },
        methods: {
            learn(){
                let id = this.cache.id;
                this.$router.replace({name: 'edu-course', params: {id}});
            }
        },
        created() {
            this.status = this.$route.query.result;
            this.point = this.$route.query.point;
//            debugger
            this.cache = Cache.get(cache_keys.edu_detail);
            console.log(this.cache)
        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #edu-success{
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
            .con{
                background: #fff;
                text-align: center;
                padding-top: 27px;
                padding-bottom: 16px;
                i{
                    font-size: 27px;
                    margin-right: 5px;
                }
                span{
                    font-size: 25px;
                }
                div{
                    font-size: 14px;
                    margin-top: 5px;
                    display: flex;
                    justify-content: center;
                    color: #9b9b9b;
                }
                p{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    font-weight: normal;
                    display: inline-block;
                    width: 70px;
                }
            }
            .win{
                i{
                    color: #f8b62d;
                }
                span{
                    color: #f8b62d;
                }
                b{
                    font-weight: normal;
                }
                .money{
                    display: block;
                    margin-top: 25px;
                    font-size: 35px;
                    .num{
                        font-size: 35px;
                    }
                }
            }
            .fail{
                i{
                    color: #e73237;
                }
                span{
                    color: #e73237;
                }
            }

        }
        .bottom {
            /*display: flex;*/
            background: #008cee;
            /*padding: 14px 0;
            justify-content: center;
            align-items: center;
            text-align: center;*/
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .edit {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    padding: 15px 0px;
                    flex: 1;
                    background: #FFFFFF;
                    color: #9b9b9b;
                    .txt{
                        text-align: center;
                    }
                    &.cor{
                        background: #008cee;
                        color: #fff;
                    }
                }
                .rigth{
                    padding: 15px 0px;
                    flex: 1;
                    .txt{
                        color: #FFFFFF;
                        font-weight: normal;
                        text-align: center;
                    }
                    /*.tinct{
                       background: #008cee;
                       color: #fff;
                   }*/

                }
            }
        }
    }


</style>
