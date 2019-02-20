<template>
    <div id="svip">
        <div class="header">
            <img src="https://cdn.ibrand.cc/svip_four.png">
            <div class="discount">
                <div class="coupons">
                    <div class="item" v-for="(item,index) in plans.plans" :key="index">
                        <img :src="item.img">
                    </div>
                </div>
                <div class="cut-down">
                    svip优惠剩余时间：
                    <span>{{endTime.day}}</span>天
                    <span>{{endTime.hour}}</span>小时
                    <span>{{endTime.minute}}</span>分钟
                    <span>{{endTime.second}}</span>秒  已有{{plans.member_count_all}}人购买svip
                </div>
            </div>
        </div>
        <div class="special">
            <img src="https://cdn.ibrand.cc/svip_eleven.png">
        </div>
        <div class="special">
            <img src="https://cdn.ibrand.cc/svip_seven.png">
        </div>
        <div class="special pad">
            <img src="https://cdn.ibrand.cc/svip_eight.png">
        </div>
        <div class="special">
            <img src="https://cdn.ibrand.cc/svip_five.png">
        </div>
        <div class="contents">
            <div class="title">
                <img  src="https://cdn.ibrand.cc/svip_nine.png">
            </div>
            <div class="content" v-if="svip_course && svip_course.machineCourses && svip_course.machineCourses.length">
                <div class="detail">
                    <img :src="svip_course.machineCourses[0].associate.picture" >
                    <div class="info-box">
                        <div class="left">
                            <span>{{svip_course.machineCourses[0].associate.teacher.name || '无名'}}</span>|
                            <span>{{svip_course.machineCourses[0].associate.lesson_count}}课时</span>|
                            <span>{{svip_course.machineCourses[0].associate.student_count}}学习</span>
                        </div>
                        <div class="right">
                            {{svip_course.machineCourses[0].associate.display_price}}元
                        </div>
                    </div>

                </div>
                <div class="ul-list">
                    <div class="li-item mx-1px-bottom" v-for="(item,index) in svip_course.machineCourses" :key="index" v-if="index != 0">
                        <div class="left-info">
                            <img :src="item.associate.picture">
                        </div>
                        <div class="right-info">
                            <div class="name">{{item.associate.title}}</div>
                            <div class="tiem-box">
                                <div class="time">
                                    {{item.associate.lesson_count}}课时
                                </div>
                                <div class="many">
                                    {{item.associate.student_count}}人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    {{item.associate.teacher.name || '无名'}}老师
                                </div>
                                <div class="money">¥ {{item.associate.display_price}}元</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="title">
                <img src="https://cdn.ibrand.cc/fourteen.png">
            </div>
            <div class="content red" v-if="svip_course && svip_course.businessCourses && svip_course.businessCourses.length">
                <div class="detail">
                    <img :src="svip_course.businessCourses[0].associate.picture" >
                    <div class="info-box">
                        <div class="left">
                            <span>{{svip_course.businessCourses[0].associate.teacher.name || '无名'}}</span>|
                            <span>{{svip_course.businessCourses[0].associate.lesson_count}}课时</span>|
                            <span>{{svip_course.businessCourses[0].associate.student_count}}学习</span>
                        </div>
                        <div class="right">
                            {{svip_course.businessCourses[0].associate.display_price}}元
                        </div>
                    </div>

                </div>
                <div class="ul-list">
                    <div class="li-item mx-1px-bottom" v-for="(item,index) in svip_course.businessCourses" :key="index" v-if="index != 0">
                        <div class="left-info">
                            <img :src="item.associate.picture">
                        </div>
                        <div class="right-info">
                            <div class="name">{{item.associate.title}}</div>
                            <div class="tiem-box">
                                <div class="time">
                                    {{item.associate.lesson_count}}课时
                                </div>
                                <div class="many">
                                    {{item.associate.student_count}}人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    {{item.associate.teacher.name || '无名'}}老师
                                </div>
                                <div class="money">¥ {{item.associate.display_price}}元</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="title">
                <img src="https://cdn.ibrand.cc/svip_six.png">
            </div>
            <div class="content yellow" v-if="svip_course && svip_course.bigdataCourses && svip_course.bigdataCourses.length">
                <div class="detail">
                    <img :src="svip_course.bigdataCourses[0].associate.picture" >
                    <div class="info-box">
                        <div class="left">
                            <span>{{svip_course.bigdataCourses[0].associate.teacher.name || '无名'}}</span>|
                            <span>{{svip_course.bigdataCourses[0].associate.lesson_count}}课时</span>|
                            <span>{{svip_course.bigdataCourses[0].associate.student_count}}学习</span>
                        </div>
                        <div class="right">
                            {{svip_course.bigdataCourses[0].associate.display_price}}元
                        </div>
                    </div>

                </div>
                <div class="ul-list">
                    <div class="li-item mx-1px-bottom" v-for="(item,index) in svip_course.bigdataCourses" :key="index" v-if="index != 0">
                        <div class="left-info">
                            <img :src="item.associate.picture">
                        </div>
                        <div class="right-info">
                            <div class="name">{{item.associate.title}}</div>
                            <div class="tiem-box">
                                <div class="time">
                                    {{item.associate.lesson_count}}课时
                                </div>
                                <div class="many">
                                    {{item.associate.student_count}}人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    {{item.associate.teacher.name || '无名'}}老师
                                </div>
                                <div class="money">¥ {{item.associate.display_price}}元</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="title">
                <img src="https://cdn.ibrand.cc/svip_ten.png">
            </div>
            <div class="content green" v-if="svip_course && svip_course.biCourses && svip_course.biCourses.length">
                <div class="detail">
                    <img :src="svip_course.biCourses[0].associate.picture" >
                    <div class="info-box">
                        <div class="left">
                            <span>{{svip_course.biCourses[0].associate.teacher.name || '无名'}}</span>|
                            <span>{{svip_course.biCourses[0].associate.lesson_count}}课时</span>|
                            <span>{{svip_course.biCourses[0].associate.student_count}}学习</span>
                        </div>
                        <div class="right">
                            {{svip_course.biCourses[0].associate.display_price}}元
                        </div>
                    </div>

                </div>
                <div class="ul-list">
                    <div class="li-item mx-1px-bottom" v-for="(item,index) in svip_course.biCourses" :key="index" v-if="index != 0">
                        <div class="left-info">
                            <img :src="item.associate.picture">
                        </div>
                        <div class="right-info">
                            <div class="name">{{item.associate.title}}</div>
                            <div class="tiem-box">
                                <div class="time">
                                    {{item.associate.lesson_count}}课时
                                </div>
                                <div class="many">
                                    {{item.associate.student_count}}人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    {{item.associate.teacher.name || '无名'}}老师
                                </div>
                                <div class="money">¥ {{item.associate.display_price}}元</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="content sales" v-if="svip_course && svip_course.otherCourses && svip_course.otherCourses.length">
                <div class="topic">
                    <div class="goodness">SVIP会员可6折购买其他课程</div>
                    <div class="txt">学院涵盖数据系列的课程：从基础的数据库知识，到商业智能解决方案，到数据挖掘，等系列</div>
                </div>
                <div class="ul-list">
                    <div class="li-item mx-1px-bottom" v-for="(item,index) in svip_course.otherCourses" :key="index">
                        <div class="left-info">
                            <img :src="item.associate.picture">
                        </div>
                        <div class="right-info">
                            <div class="name">{{item.associate.title}}</div>
                            <div class="tiem-box">
                                <div class="time">
                                    {{item.associate.lesson_count}}课时
                                </div>
                                <div class="many">
                                    {{item.associate.student_count}}人学习
                                </div>
                            </div>
                            <div class="teach-box">
                                <div class="teacher">
                                    {{item.associate.teacher.name || '无名'}}老师
                                </div>
                                <div class="money">¥ {{item.associate.display_price}}元</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="special">
            <img  src="https://cdn.ibrand.cc/twelve.png">
        </div>
        <div class="special pad">
            <img  src="https://cdn.ibrand.cc/thirteen.png">
        </div>
        <div class="special">
            <img  src="https://cdn.ibrand.cc/sixteen.png">
        </div>
        <div class="discount">
            <div class="coupons">
                <div class="item" v-for="(item,index) in plans.plans" :key="index">
                    <img :src="item.img">
                </div>
            </div>
            <div class="cut-down">
                svip优惠剩余时间：
                <span>{{endTime.day}}</span>天
                <span>{{endTime.hour}}</span>小时
                <span>{{endTime.minute}}</span>分钟
                <span>{{endTime.second}}</span>秒  已有{{plans.member_count_all}}人购买svip
            </div>
        </div>
        <div class="special">
            <img  src="https://cdn.ibrand.cc/fifteen.png">
        </div>
        <div class="copyright">
            Copyright © 天善智能-上海拓善智能科技有限公司 2019
        </div>
        <!--固定导航栏-->
        <div class="tabBar">
            <div class="left-item">
                <div class="info">
                    <span class="iconfont icon-shouye"></span>
                    <div class="txt" @click="jumpIndex">首页</div>
                </div>
            </div>
            <div class="right-item" v-if="plans && plans.isVip">您已购买SVIP</div>
            <div class="right-item" v-else>立即购买SVIP</div>
        </div>
        <div class="black-mask"></div>


    </div>

</template>

<script type="text/ecmascript-6">
    import { Cache, cache_keys, exif } from '../../utils/util';
    export default {
        name: 'svip',
        data(){
            return {
                plans:'',
                order_no:'',
                openid:'',
                plan_id:'',
                endTime: {
                    interval: '',
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second:0,
                    count: 0
                },
                endtype:0,
                endmessage:'',
                timer:'',
                is_black:false,
                svip_course:''


            }
        },
        created(){
            this.$store.dispatch('querySvip');
            this.$store.dispatch('querySvipCourse');
            EventBus.$on('svipPlans',this.getSvipPlans)
            EventBus.$on('svipCourse',this.getSvipCourse)

        },
        beforeDestroy(){
            EventBus.$off('svipPlans')
            EventBus.$off('svipCourse')

        },
        mounted(){

        },
        methods:{
            //获取svip课程推广位
            getSvipCourse(res){
                this.svip_course = res.data;
            },
            jumpIndex(){
              this.$router.push({
                  name:'index-index'
              })
            },
            //处理套餐数据
            getSvipPlans(res){
                this.plans = res.data;
                this.timer = setInterval(this.countTime, 1000)
            },
            //倒计时
            countTime(){
                var d = 86400000,
                    h = 3600000,
                    n = 60000,
                    end = this.plans.end_time,
                    server = this.plans.server_time,
                    // \D ：匹配除数字从0-9以外的任一字符  匹配一个非数字字符，也可以使用字符簇[^0-9]或[^\d]来表示
                    arr = String(end).split(/\D/),
                    newArr = String(server).split(/\D/);
                newArr = newArr.map(Number); //遍历数组的每一项，都变成数字
                arr = arr.map(Number);
                //转换的时候 月份需要减一  因为 月份是从0 - 11 ，gettime
                //new Date 的参数 百度 ，这是中国标准时间  逗号
                var serverTime = new Date(newArr[0], newArr[1] - 1, newArr[2], newArr[3], newArr[4], newArr[5]).getTime();
                var endTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]).getTime();
                //计算 服务器时间跟结束时间 的间隔
                var timeDiff = endTime - serverTime;
                var allTime = this.endTime.count + 1000;
                this.endTime.count =  allTime;
                // this.endTime.count += 1000;
                var interval = timeDiff - this.endTime.count;
                if (interval < 0) {
//		        	活动结束
                    //do somethimg
                    clearInterval(this.timer);

                } else {
                    var day = Math.floor(interval / d);
                    Math.floor(interval -= day * d);
                    var hour = Math.floor(interval / h);
                    Math.floor(interval -= hour * h);
                    var minute = Math.floor(interval / n);
                    var second = Math.floor(interval % n / 1000);
                    this.endTime.day =  day;
                    this.endTime.hour = hour;
                    this.endTime.minute =  minute;
                    this.endTime.second = second
                }



            }

        }



    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #svip{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .header{
            width: 100%;
            img{
                vertical-align: middle;
                width: 100%;
            }
        }
        .discount{
            background-color:#ffa800;
            padding:20px 10px;
            .coupons{
                display: flex;
                align-items: center;
                justify-content: center;
                padding-bottom: 12px;
                .item{
                    padding: 0 10px;
                    flex: 1;
                    img{
                        width: 100%;
                        vertical-align: middle;
                    }
                }
            }
            .cut-down{
                border-radius: 2px;
                background-color:#ffeecc;
                color:#4c0678;
                line-height: 40px;
                height: 40px;
                font-size:12px;
                text-align: center;
                span{
                    font-size: 15px;
                }


            }
        }
        .special{
            width: 100%;
            background-color:#040c30;
            img{
                width: 100%;
                vertical-align: middle;
            }
            &.pad{
                padding: 0 10px;
            }
        }
        .contents{
            background-color:#040c30;
            padding:0 10px 10px 10px;
            .title{
                img{
                    width: 100%;
                    vertical-align: middle;
                }
            }
        }
        .content{
            background-color:#018fed;
            padding:20px 12px 10px 12px;
            margin-bottom:45px;
            &.red{
                background-color:#e7584d;
            }
            &.yellow{
                background-color: #f0a534;
            }
            &.green{
                background-color:#2fd492;
            }
            &.sales{
                border-radius: 2px;
                margin-bottom: 0px;
            }
            .detail{
                background-color:#f3f3f3;
                border-radius: 4px;
                padding:10px;
                margin-bottom:20px;
                img{
                    width: 100%;
                    vertical-align: middle;
                }
                .info-box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height:42px;
                    line-height: 42px;
                    .left{
                        color: #b5b5b5;
                        font-size: 12px;
                        span{
                            display: inline-block;
                            padding:0 10px;
                        }
                    }
                    .right{
                        color:#0a2562;
                        font-size: 12px;
                        padding-right:10px;
                    }
                }
            }
            .ul-list{
                .li-item{
                    padding: 20px 15px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    background-color:#f3f3f3;
                    margin:10px 0;
                    .left-info{
                        position: relative;
                        width:135px;
                        height: 90px;
                        margin-right: 15px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .limit-discount{
                            position: absolute;
                            width: 60px;
                            height: 26px;
                            background: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-28/15934896.jpg") no-repeat;
                            background-size: 100% 100%;
                            top:0;
                            right: 0;
                        }
                    }
                    .right-info{
                        flex: 1;
                        .name{
                            color: #202020;
                            font-size: 15px;
                            line-height: 22px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            margin-bottom: 8px;
                            height:44px;
                        }
                        .tiem-box{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color:#909090;
                            font-size: 12px;
                            line-height: 14px;
                            padding-bottom: 10px;
                            .time{
                                span{
                                    font-size: 12px;
                                }
                            }
                        }
                        .teach-box{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color:#909090;
                            font-size: 12px;
                            line-height: 14px;
                            .teacher{
                                span{
                                    font-size: 12px;
                                }
                            }
                            .money{
                                color: #4c0678;
                            }
                        }
                    }
                }
            }
            .topic{
                color: #FFFFFF;
                text-align: center;
                padding:10px 0 10px 0;
                .goodness{
                    font-size: 16px;
                    font-weight: bold;
                    padding-bottom: 12px;
                }
                .txt{
                    font-size: 12px;
                }
            }


        }
        .copyright{
            background-color:#02061a;
            color: #FFFFFF;
            height: 100px;
            line-height: 50px;
            font-size: 12px;
            text-align: center;
            padding-bottom: 50px;
        }
        .tabBar{
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: #f2f2f2;
            height: 50px;
            font-size:16px;
            color: #b4b4b4;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left-item{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                .info{
                    flex: 1;
                }
            }
            .right-item{
                flex: 2;
                text-align: center;
                height: 50px;
                line-height: 50px;
                background-color:#e62d21;
                color: #FFFFFF;

            }
        }
        .black-mask{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: #000000;
            z-index: 100;
            display: none;
            &.cur{
                display: block;
            }
        }

    }


</style>
