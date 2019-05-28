<template>
    <div id="detail">
        <van-nav-bar
            :title='this.detail.title'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <div class="header">
            <div class="banner">
                <img :src="detail.picture">
            </div>
            <div class="course-intro">
                <div class="title">{{detail.title}}</div>
                <div class="text">
                    {{detail.subtitle}}
                </div>
                <div class="teach-student mx-1px-top">
                    <div class="teacher" v-if="detail.teacher">
                        <span class="iconfont icon-laoshi"></span>
                        {{detail.teacher.name || '无名'}}老师
                    </div>
                    <div class="student">
                        {{detail.student_count}}人学习
                    </div>
                </div>
            </div>
        </div>
        <!--促销详情-->
        <div class="sales-promotion" v-if="detail.is_discount">
            <div class="preferential">特价优惠中</div>
            <div class="count-down">
                仅剩
                <span>{{endTime.day}}</span>天
                <span>{{endTime.hour}}</span>小时
                <span>{{endTime.minute}}</span>分钟
                <span>{{endTime.second}}</span>秒
            </div>
            <div class="origin-price">原价：¥{{detail.display_price}}</div>
        </div>
        <div class="current-coupon" v-if="detail_meta.coupons && detail_meta.coupons.length" @click="changeCoupon">
            <div class="txt">当前课程有{{detail_meta.coupons.length}}张优惠券可用</div>
            <div class="pick-up">去领取 <span class="iconfont icon-jiantou"></span></div>
        </div>
        <!--课程介绍-->
        <div class="navbar mx-1px-bottom">
                <div  class="navbar-item" :class="activeIndex == 0 ? 'activity':''" @click="tabclick(0,$event)">
                    <div class="navbar-title">课程介绍</div>
                </div>
                <div  class="navbar-item" :class="activeIndex == 1 ? 'activity':''" @click="tabclick(1,$event)">
                    <div class="navbar-title">课程目录</div>
                </div>
                <div  class="navbar-item" :class="activeIndex == 2 ? 'activity':''" @click="tabclick(2,$event)">
                    <div class="navbar-title">通知公告</div>
                </div>
            <div class="navbar-slider" :style="{width:width+'px', transform: 'translateX('+sliderOffset+'px)'}"></div>
        </div>
        <div class="tab-content">
            <!--当activeindex == 0 课程概述-->
            <div class="li-content" v-if="activeIndex == 0">
                <div class="teacher-to mx-1px-bottom">
                    <div class="title">师资介绍</div>
                    <div class="teacher-detail">
                        <div class="avatar" v-if="detail_meta.teacher && detail_meta.teacher.avatar" @click="jump('index-teacher',detail_meta.teacher.user_id)">
                            <img :src="detail_meta.teacher.avatar">
                        </div>
                        <!--<div class="avatar" v-else @click="jump('index-teacher',detail_meta.teacher.user_id)">
                            <img src="http://img1.imgtn.bdimg.com/it/u=70169729,3910397720&fm=26&gp=0.jpg">
                        </div>-->
                        <div class="text">
                            <div class="name" v-if="detail_meta.teacher" @click="jump('index-teacher',detail_meta.teacher.user_id)">{{detail_meta.teacher.name}}老师</div>
                            <div class="label" v-if="detail_meta.teacher && detail_meta.teacher.details" @click="jump('index-teacher',detail_meta.teacher.user_id)">{{detail_meta.teacher.details.signature}}</div>
                            <div class="circle mx-1px-top" @click="jumpShare(detail_meta.coterie.id)" v-if="detail_meta.coterie">
                                <div class="cirle-name">相关数据圈</div>
                                <div class="cirle-detail" v-if="detail_meta.coterie">
                                    {{detail_meta.coterie.name}}
                                    <span class="iconfont icon-jiantou"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="course-to">
                    <div class="title">课程介绍</div>
                    <!--副文本-->
                    <div class="content-to">
                        <div v-html="detail.about"></div>

                    </div>
                </div>
            </div>
            <!--当activeindex== 1 课程目录-->
            <div class="li-content" v-if="activeIndex == 1">
                <div class="title">
                    课程目录
                    <span>（共{{detail.lesson_count}}节课）</span>
                </div>
                <div class="item-list" v-for="(item,index) in classList" :key="index">
                    <div class="topic mx-1px-bottom" v-if="item.item_type == 'chapter'">章节{{item.number}}：{{item.title}}</div>
                    <div class="course-list">
                        <div class="item mx-1px-bottom" v-if="item.item_type == 'lesson'" @click="jumpLesson(item.id,item.free)">
                            <span class="iconfont icon-shipinbofang"></span>
                            <div class="txt">
                                课时{{item.number}}： {{item.title}}
                            </div>
                            <div class="free-btn" v-if="item.free && !detail_meta.isMember">免费试看</div>
                            <div class="the-length" v-else>{{item.length_min}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!--当activeindex== 3 时 通知公告-->
            <div class="li-content" v-if="activeIndex == 2">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore" :immediate-check="immediate" v-if="announcement.length && detail_meta.isMember">
                    <van-cell v-for="(item,index) in announcement" :key="index">
                        <div class="notice-item">
                            <div class="content">
                                <div v-html="item.content"></div>
                            </div>
                            <div class="teacher-time mx-1px-bottom">
                                <div class="teacher">
                                    <span class="iconfont icon-laoshi"></span>
                                    {{item.course.teacher.name || '无名'}}老师
                                </div>
                                <div class="time">{{item.created_at}}</div>
                            </div>
                            <div class="from">来自：{{item.course.title}}</div>
                        </div>
                    </van-cell>
                </van-list>
                <div class="only-see" v-if="announcement.length == 0 && detail_meta.isMember">暂无公告数据</div>
                <div class="only-see" v-if="detail_meta.isMember == false">只有课程学员才能查看公告</div>
            </div>

        </div>
        <!--svip  加 免费试看-->
        <div class="svip-buy" v-if="!detail_meta.isMember">
            <div class="svip" v-if="detail.price != 0 && detail_meta.isVip == false" @click="jumpSvip">
                <img src="http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-19/61152215.jpg">
                <div class="goodness">
                    成为svip，所选课程可省 ¥{{detail.display_price}}
                </div>
                <div class="soon-go">
                    立即省钱
                    <span class="iconfont icon-jiantou"></span>
                </div>
            </div>
            <div class="buy-box">
                <div class="how-much">
                    <!--如果价格为0，显示免费-->
                    <div class="money" v-if="detail.display_price == 0">免费</div>
                    <!--如果不是免费课程，非svip 无促销，显示原价-->
                    <div class="money" v-if="detail.display_price != 0 && detail_meta.isVip == false && detail.is_discount == 0">{{detail.display_price}}</div>
                    <!--如果不是免费课程，非svip 有促销-->
                    <div class="money"  v-if="detail.display_price != 0 && detail_meta.isVip == false && detail.is_discount == 1">
                        ¥ {{detail.display_discount_price}}
                        <span class="origin">{{detail.display_price}}</span>
                    </div>
                    <!-- 非免费课程，已经是 SVIP，同时免费课程未使用完，则显示0元。原价删除线显示。-->
                    <div class="money"  v-if="detail.display_price != 0 && detail_meta.isVip == true && detail_meta.freeCourseCount != 0">
                        ¥ 0
                    </div>
                    <!-- 非免费课程，已经是 SVIP，同时免费课程使用完，则显示6折后的钱。-->
                    <div class="money"  v-if="detail.display_price != 0 && detail_meta.isVip == true && detail_meta.freeCourseCount == 0">
                        ¥ {{svipPrice}}
                    </div>
                    <div class="unlock">解锁全部课时</div>
                </div>
                <!-- <div class="free-btn">免费试看</div>-->
                <div class="buy-course" @click="purchase">购买课程</div>
            </div>
        </div>
        <!--已经买了  查看更多课程 立即学习-->
        <div class="see-study" v-if="detail_meta.isMember">
            <div class="see-more btn" @click="jumpIndex">查看更多课程</div>
            <div class="study-soon btn" @click="jumpStudy">立即学习</div>
        </div>
        <!--联系客服-->
        <div class="customer-service">
            <div class="iconfont icon-lianxikefu" @click="changeAttention"></div>
            <div class="iconfont icon-shouye" @click="jumpIndex"></div>
        </div>
        <!--新人优惠券-->
        <!-- <div class="couple-conpon">
             <div class="paney-body">
                 <div class="close">
                     <span class="iconfont icon-yiquxiao"></span>
                 </div>
                <div class="paney-content">
                    <div class="title">新人礼已到账</div>
                    <div class="text">
                        <div class="friend">Hi，亲爱的朋友</div>
                        <div>这是我送给你的优惠券，快去使用吧！</div>
                    </div>
                    <div class="img-coupon">
                        <div class="gift-box">
                            <span class="iconfont icon-gift"></span>
                        </div>
                        <div class="gift-text">
                            <div class="label">满28元减4元</div>
                            <div class="topic">支持余额支付使用</div>
                        </div>
                        <div class="money">
                            <span>¥</span>
                            4
                        </div>
                    </div>
                    <div class="see">优惠券请到“我的优惠券”查看</div>
                    &lt;!&ndash;<div class="sure-btn">登录领取优惠券</div>&ndash;&gt;
                    <div class="sure-btn">知道了</div>
                </div>
             </div>
         </div>-->
        <!--查看选择优惠券部分-->
        <div class="maks" :class="show_coupons ? 'cur' : ''">
        </div>

        <div class="popup-box" :class="show_coupons ? 'cur' : ''">
            <div class="popup">
                <div class="popup-top">
                    <div class="title">
                        优惠券
                        <div class="close" @click="changeCoupon">
                            X
                        </div>
                    </div>
                </div>
                <div class="popup-bottom coupon">
                    <div class="title">
                        可领优惠券
                    </div>
                    <div class="coupon-box" >
                        <div class="item active" v-for="(item,index) in coupons" :key="index" @click="receiveCoupon(item.id,item.is_receive,index)">
                            <div class="left-info">
                                <div class="money" v-if="item.action_type.type == 'cash'">
                                    <span>¥</span>
                                    {{item.action_type.value}}
                                </div>
                                <div class="money" v-if="item.action_type.type == 'percentage'">
                                    {{item.action_type.value}}
                                    <span>折</span>
                                </div>
                                <div class="label">{{item.label}}</div>
                            </div>
                            <div class="right-info">
                                <div class="title">{{item.title}}</div>
                                <div class="created-at">
                                    {{item.use_start_time}}-{{item.use_end_time}}
                                    <span class="already" v-if="item.is_receive">已领取</span>
                                    <span v-else>点击领取</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--弹出客服-->
        <div class="maks" :class="show_attention ? 'cur' : ''" @click="changeAttention">

        </div>

        <div class="attention-WeChat" :class="show_attention ? 'cur' : ''">
            <div class="service-box">
                <div class="code item">
                    <img v-if="service_info.online_service_self" :src="service_info.online_service_self.qr_code" alt="">
                    <div class="text">
                        保存二维码用微信识别添加
                    </div>
                </div>

                <div class="item phone">
                    <div class="phone-text">
                        <img  v-if="service_info.online_service_self" :src="service_info.online_service_self.qr_code" alt="" />
                        <div class="phone-warp">
                            <i class="iconfont icon-dianhua"></i>
                            <div class="phone-num" v-if="service_info.online_service_self">{{service_info.online_service_self.phone}}</div>
                            <div>点击电话，咨询客服</div>
                        </div>
                    </div>
                    <div v-if="service_info.online_service_self">
                        {{service_info.online_service_self.time}}
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script type="text/ecmascript-6">
    import { Cache, cache_keys, exif ,env,setPageTitle} from '../../utils/util';
    import { List, NavBar } from 'vant';
    export default {
        name: 'detail',
        component:{
            List,
            NavBar
        },
        data(){
            return {
                is_navbar:true,
                id:'',//课程id
                detail:'',//详情页数据
                detail_meta:'',//详情页meta数据
                coupons:[],//优惠券
                width:'',
                sliderOffset:0,
                activeIndex:0,
                classList:[],
                newList:[],
                show_coupons:false,
                service_info:'',//客服数据
                show_attention:false,//弹出客服
                activeIndex:'',
                discount_id:'',
                svipPrice:'',
                announcement:[],
                anpage:0,
                anmore:true,
                loading:false,
                finished:false,
                immediate:false,
                init:true,
                endTime: {
                    interval: '',
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second:0,
                    count: 0
                },
            }
        },
        created(){
            this.id = this.$route.params.id;
            let data = {
                id:this.id
            }
            this.$store.dispatch('queryDetail',data)
            this.$store.dispatch('queryClassList',data)
            this.$store.dispatch('querySystem')
            EventBus.$on('detailDate',this.getDetail)
            EventBus.$on('classList',this.getClassList)
            EventBus.$on('serviceinfo',this.getSystem)
            EventBus.$on('reciveCoupon',this.getCouponDate)
            EventBus.$on('createOrder',this.getOrderData)
            EventBus.$on('noticeData',this.getNotice)

        },
        beforeDestroy(){
            EventBus.$off('detailDate');
            EventBus.$off('classList');
            EventBus.$off('serviceinfo');
            EventBus.$off('createOrder');
            EventBus.$off('noticeData');
        },
        mounted(){
            this.width = document.body.clientWidth / 3;
        },
        methods:{
            jumpShare(id){
                this.$router.push({
                    name:'index-shareCirle',
                    query:{
                        id:id
                    }
                })
            },
            //onClickLeft
            onClickLeft(){
                window.history.back(-1)
            },
            //倒计时
            countTime(){
                var d = 86400000,
                    h = 3600000,
                    n = 60000,
                    end = this.detail.discount_end_time,
                    server = this.detail_meta.serverTime,
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



            },

            //触底加载更多公告
            loadMore(){
                if(this.detail_meta.isMember){
                    var page = this.anpage + 1;
                    var data = {
                        id:this.id,
                        page:page
                    }
                    if(this.anmore){
                        this.$store.dispatch('queryNotice',data);
                        //加载状态结束，需要将loading变成false
                    } else {
                        //数据全部加载完成
                        this.loading = false;
                        this.finished = true;
                    }
                }


            },
            //得到公告数据之后分页数据处理
            getNotice(res){
                var list;
                var page = res.meta.pagination;
                var current_page = page.current_page;
                var total_pages = page.total_pages;
                if(current_page == 1){
                    list = res.data;
                } else {
                    list = this.announcement.concat(res.data);
                }
                this.announcement = list;
                this.anpage = current_page;
                this.anmore = total_pages > current_page;
                this.loading = false;
                this.init = false;

            },
            //处理创建订单之后的数据
            getOrderData(res){
                if(res.data.needPay){
                    Cache.set(cache_keys.order_info,res.data,0);
                    Cache.set(cache_keys.old_order_info,res.data,0);
                    this.$router.push({name: 'recharge-pay', params: {id:this.id}});

                } else {
                    var order_no = res.data.order.sn;
                    this.$router.push({name: 'recharge-success', query: {order_no:order_no}});
                }

            },
            //购买课程的逻辑
            purchase(){
              let oauth = Cache.get(cache_keys.token);
              if(oauth && oauth.access_token){
                  //创建临时订单
                  let data = {
                      course_id:this.id
                  }
                  this.$store.dispatch('queryOrder',data)

              } else {
                  var source = this.$route.path;
                  this.$router.push({name: 'users-register', query: {source}});
              }
            },
            //点击领取优惠券
            receiveCoupon(id,is_receive,index){
                this.discount_id = id;
                this.activeIndex = index;
                const oauth = Cache.get(cache_keys.token);
                if(oauth && oauth.access_token){
                    if(is_receive){
                        this.$toast('您已领取过该优惠券')
                    } else {
                        let couponDate = {
                            discount_id:id
                        }
                        this.$store.dispatch('queryTakecoupon',couponDate);
                    }
                } else {
                    var source = this.$route.path;
                    this.$router.push({name: 'users-register', query: {source}});
                }
            },
            //点击领取优惠券的数据处理
            getCouponDate(res){
                this.$toast("领取成功");
                this.coupons[this.activeIndex].is_receive = true;
            },
            //跳到首页
            jumpIndex(){
                this.$router.push({
                    name:'index-index'
                })

            },
//            跳到svip页面
            jumpSvip(){
                this.$router.push({
                    name:'index-svip'
                })
            },
            //跳到教师详情页
            jump(name,id){
                this.$router.push({
                    name:name,
                    params:{
                        id:id,
                        course_id:this.id
                    }
                })
            },
            //跳到课时详情页
            jumpLesson(id,free){
                let oauth = Cache.get(cache_keys.token);
                if(oauth && oauth.access_token){
                    //第一种情况,已经购买了课程，则直接去课时详情页
                    if(this.detail_meta.isMember){
                        this.$router.push({
                            name:'index-lessons',
                            params:{
                                course_id:this.id, //课程id
                                id:id//课时id
                            }
                        })
                    } else { // 第二种情况，并没有购买课程
                        //但是是免费课程
                        if(free){
                            this.$router.push({
                                name:'index-lessons',
                                params:{
                                    course_id:this.id, //课程id
                                    id:id//课时id
                                }
                            })
                        } else {
                            this.$dialog.alert({
                                message: '请先购买课程'
                            });
                        }

                    }
                } else {
                    var source = this.$route.path;
                    this.$router.push({name: 'users-register', query: {source}});
                }

            },
            //点击立即学习
            jumpStudy(){
                this.$router.push({
                    name:'index-lessons',
                    params:{
                        course_id:this.id, //课程id
                        id:this.newList[0].id//课时id
                    }
                })

            },
            //弹出客服
            changeAttention(){
                this.show_attention = !this.show_attention
            },
            //客服数据
            getSystem(res){
                this.service_info =res.data.online_service_data
            },
            //点击弹出优惠券
            changeCoupon(){
                this.show_coupons = !this.show_coupons
            },
            //点击切换tab
            tabclick(index,e){
                this.activeIndex = index;
                this.sliderOffset = e.currentTarget.offsetLeft;
                if(index == 2){
                    let oauth = Cache.get(cache_keys.token);
                    if(this.detail_meta.isMember && oauth && oauth.access_token && this.init){
                        let data = {
                            id:this.id,
                            page:1
                        }
                        this.$store.dispatch('queryNotice',data)

                    } else {
                        return
                    }
                }
            },
            //获取课时列表分页
            getClassList(res){
                var newList = [];//筛选过后的数组
                res.data.forEach(val=>{
                    if(val.item_type == 'lesson'){
                        newList.push(val)
                    }
                });
                this.newList = newList;
                this.classList = res.data;
            },
            //获取课程详情数据
            getDetail(res){
                let coupons = [];
                if(res.meta && res.meta.vipMember){
                    let value_vip = res.meta.vipMember.plan.actions.course_discount_percentage;
                    var s_money = res.data.price;
                    var off_money = s_money * [(value_vip) /100];
                    this.svipPrice =(off_money/100).toFixed(2);
                }
                if(res.meta.coupons && res.meta.coupons.length){
                    coupons = res.meta.coupons;
                    coupons.forEach(val=>{
                        val.is_receive = false
                    })
                }
                this.detail = res.data;
                this.detail_meta = res.meta;
                this.coupons = coupons;
                if(res.data.is_discount){
                    this.timer = setInterval(this.countTime, 1000)
                }
                if(env.isWechat){
                    this.is_navbar = false;
                }
                setPageTitle(res.data.title, res.data.subtitle, res.data.picture)
            }

        }


    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #detail {
        padding-bottom: 127px;
        height: 100%;
        background-color:#F3F3F3;
        overflow: auto;
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
        .header {
            background-color: #FFFFFF;
            margin-bottom: 10px;
            .share-home {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #004E9D;
                height: 40px;
                padding: 0 15px;
                color: #FFFFFF;
                font-size: 12px;
            }
            .banner {
                width: 100%;
                img {
                    width: 100%;
                    vertical-align: middle;
                }
            }
            .course-intro {
                padding: 0 15px;
                .title {
                    padding: 18px 0 7px 0;
                    color: #202020;
                    font-size: 18px;
                    line-height: 25px;
                    font-weight: 600;
                }
                .text {
                    color: #909090;
                    font-size: 12px;
                    line-height: 17px;
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .teach-student {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 40px;
                    color: #909090;
                    font-size: 12px;
                }
            }

        }
        .sales-promotion {
            height: 50px;
            line-height: 50px;
            display: flex;
            align-items: center;
            background-color: #FFFFFF;
            padding: 0 15px;
            .preferential {
                padding: 5px 9px;
                background-color: #FB5054;
                font-size: 14px;
                color: #FFFFFF;
                line-height: 20px;
                border-radius: 4px;
                margin-right: 7px;
            }
            .count-down {
                color: #FB5054;
                font-size: 12px;
            }
            .origin-price {
                flex: 1;
                text-align: right;
                color: #909090;
                font-size: 12px;
                text-decoration: line-through;

            }
        }
        .current-coupon {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 18px;
            color: #FB5054;
            font-size: 12px;
            line-height: 17px;
            background-color: #FFECED;
            margin-bottom: 10px;
        }
        .navbar {
            width: 100%;
            display: flex;
            height: 50px;
            line-height: 50px;
            background: #FFFFFF;
            font-size: 14px;
            color: #9B9B9B;

            .navbar-item {
                flex: 1;
                width: 0%;
                text-align: center;

                &.activity {
                    color: #004E9D;
                }
            }
            .navbar-slider {
                position: absolute;
                content: " ";
                left: 0;
                bottom: 0;
                width: 4em;
                height: 3px;
                background-color: #004E9D;
                transition: transform .3s;
            }
        }
        .tab-content {
            background-color: #FFFFFF;
            a {
                color: #008cee;
            }
            .li-content {
                .title {
                    padding: 15px;
                    font-size: 14px;
                    line-height: 20px;
                    color: #4A4A4A;
                    font-weight: 500;
                    span {
                        font-size: 12px;
                        color: #909090;
                    }
                }
                .teacher-detail {
                    display: flex;
                    align-items: flex-start;
                    padding: 0 15px 20px 15px;
                    .avatar {
                        width: 50px;
                        height: 50px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .text {
                        flex: 1;
                        padding-left: 15px;
                        overflow: hidden;
                        .name {
                            color: #202020;
                            font-size: 14px;
                            line-height: 20px;
                            padding-bottom: 5px;
                        }
                        .label {
                            color: #909090;
                            font-size: 12px;
                            line-height: 17px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            padding-bottom: 16px;
                        }
                        .circle{
                            padding:13px 0 0 0;
                            color:#909090;
                            font-size: 12px;
                            line-height: 17px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .cirle-detail{
                                color:#004E9D;
                                span{
                                    font-size: 12px;
                                    color: #004E9D;
                                }
                            }
                        }
                    }
                }
                .course-to{
                    .content-to{
                        padding: 0 15px;
                    }
                    ul {
                        padding-left: 15px;
                    }
                }
                .item-list {
                    .topic {
                        padding: 0 15px;
                        height: 50px;
                        line-height: 50px;
                        color: #202020;
                        font-size: 14px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .course-list {
                        .item {
                            margin: 0 15px;
                            height: 50px;
                            line-height: 50px;
                            color: #4A4A4A;
                            font-size: 13px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            span {
                                display: inline-block;
                                padding-right: 10px;

                            }
                            .txt {
                                flex: 1;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;

                            }
                            .the-length{
                                margin-left: 5px;
                            }
                            .free-btn {
                                color: #004E9D;
                                font-size: 13px;
                                line-height: 18px;
                                padding: 3px 9px;
                                border: 1px solid #004E9D;
                                border-radius: 2px;
                                margin-left: 5px;
                            }
                        }
                    }
                }
                .notice-item{
                    background-color: #FFFFFF;
                    margin-bottom: 10px;
                    /* .title{
                       padding: 15px;
                       color: #202020;
                       font-size: 14px;
                       line-height: 20px;
                     }*/
                    .content{
                        padding: 15px 15px 0px 15px;
                        line-height: 20px;
                        color:#4A4A4A;
                        font-size: 13px;
                    }
                    .teacher-time{
                        padding:10px 15px 15px 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        color: #909090;
                        font-size: 12px;
                        .teacher{
                            span{
                                color: #909090;
                                flex: 12px;
                                display: inline-block;
                                padding-right: 8px;
                            }
                        }
                    }
                    .from{
                        padding: 12px 15px;
                        color: #004E9D;
                        font-size:12px;
                        line-height: 17px;
                    }
                }
                .only-see{
                    padding: 20px 0;
                    text-align: center;

                }
            }
        }
        .svip-buy {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 20;
            background-color: #FFFFFF;
            .svip {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 15px;
                background: linear-gradient(270deg, rgba(237, 213, 181, 1) 0%, rgba(236, 220, 196, 1) 100%);
                img {
                    width: 41px;
                    height: 18px;
                    margin-right: 5px;
                }
                .goodness {
                    color: #4A4A4A;
                    font-size: 12px;
                    flex: 1;
                }
                .soon-go {
                    color: #202020;
                    font-size: 12px;
                    span {
                        color: #202020;
                        font-size: 12px;
                    }
                }
            }
            .buy-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px;
                .how-much {
                    flex: 1;
                    .money {
                        color: #FB5054;
                        font-size: 14px;
                        line-height: 20px;
                        span{
                            display: inline-block;
                            padding-left:7px;
                            text-decoration: line-through;
                            font-size: 10px;
                            color: #909090;
                        }
                    }
                    .unlock {
                        color: #909090;
                        font-size: 11px;
                        line-height: 16px;
                    }
                }
                .free-btn {
                    padding: 12px 15px;
                    border-radius: 4px;
                    border: 1px solid #DBDBDB;
                    color: #004E9D;
                    font-size: 14px;
                    line-height: 20px;
                    margin-right: 10px;
                }
                .buy-course {
                    padding: 12px 32px;
                    border-radius: 4px;
                    color: #FFFFFF;
                    background-color: #FB5054;
                    font-size: 14px;
                    line-height: 20px;
                }
            }
        }
        .see-study {
            position: fixed;
            right: 0;
            left: 0;
            bottom: 0;
            height: 70px;
            background-color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.15);
            .btn {
                flex: 1;
                height: 44px;
                text-align: center;
                font-size: 14px;
                line-height: 44px;
                border-radius: 4px;
            }
            .see-more {
                border: 1px solid #DBDBDB;
                color: #909090;
                margin-right: 22px;
            }
            .study-soon {
                color: #FFFFFF;
                background-color: #004E9D;

            }

        }
        .customer-service {
            position: fixed;
            right: 0;
            bottom: 28%;
            width: 45px;
            z-index: 20;
            height: 75px;
            border-radius: 4px;
            background-color: #004E9D;
            color: #ffffff;
            text-align: center;
            .iconfont {
                font-size: 22px;
                text-align: center;
            }
            .text {
                text-align: center;
                font-size: 12px;
                line-height: 17px;
            }
        }
        .couple-conpon {
            position: fixed;
            z-index: 50;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, .6);
            .paney-body {
                position: absolute;
                top: 12%;
                left: 15px;
                right: 15px;
                .close {
                    text-align: right;
                    padding-bottom: 10px;
                    span {
                        color: #FFFFFF;
                        font-size: 26px;
                    }
                }
                .paney-content {
                    background-color: #F3F3F3;
                    border-radius: 4px;
                    padding: 0 25px 30px 25px;
                    .title {
                        color: #202020;
                        text-align: center;
                        font-size: 22px;
                        line-height: 30px;
                        padding: 23px 0;

                    }
                    .text {
                        padding: 10px 0 20px 0;
                        color: #202020;
                        font-size: 15px;
                        line-height: 21px;
                        .friend {
                            padding-bottom: 4px;
                        }
                    }
                    .img-coupon {
                        background: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-25/8921692.jpg") no-repeat;
                        background-size: 100% 100%;
                        padding: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .gift-box {
                            width: 50px;
                            height: 50px;
                            line-height: 50px;
                            text-align: center;
                            background-color: #F3F3F3;
                            border-radius: 50%;
                            span {
                                font-size: 25px;
                                color: #004E9D;
                            }
                        }
                        .gift-text {
                            flex: 1;
                            padding-left: 12px;
                            color: #FFFFFF;
                            .label {
                                font-size: 16px;
                                line-height: 22px;
                                padding-bottom: 4px;
                            }
                            .topic {
                                font-size: 11px;
                            }

                        }
                        .money {
                            color: #FFFFFF;
                            font-size: 40px;
                            line-height: 56px;
                            font-weight: 500;
                            span {
                                font-size: 20px;
                                line-height: 28px;
                            }

                        }
                    }
                    .see {
                        color: rgba(0, 0, 0, .5);
                        font-size: 11px;
                        line-height: 16px;
                        padding: 20px 0 40px 0;
                    }
                    .sure-btn {
                        box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);
                        border-radius: 4px;
                        background-color: #004E9D;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 16px;
                        font-weight: 500;
                    }
                }

            }
        }
        .maks{
            display: none;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.4);
            z-index: 50;
            &.cur{
                display: block;
            }
        }

        //选择优惠券以及促销活动部分
        .popup-box {
            background: #F7F7F7;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 0;
            z-index: 50;

            transition: all .3s linear;

            &.cur {
                height: 60%;
            }

            .popup {
                height: 100%;
                box-sizing: border-box;

                .popup-top {
                    padding: 0 15px;

                    background: #e9e9e9;
                    text-align: center;
                    overflow: visible;

                    .title {
                        position: relative;
                        color: #4A4A4A;
                        overflow: visible;
                        font-size: 14px;
                        padding: 10px 0;

                        .close {
                            position: absolute;
                            right: -10px;
                            top: 0px;
                            padding: 10px;
                        }
                    }
                }
                .popup-bottom {
                    padding: 0 15px;

                    height: 100%;
                    overflow: auto;
                    box-sizing: border-box;

                    //优惠券&.coupon {
                    .title {
                        font-size: 14px;
                        color: #000;
                        padding-top: 8px;
                    }
                    .coupon-box{
                        padding:15px 0 45px 0;
                        .item{
                            position: relative;
                            display: flex;
                            background-image: url("http://ibrand-miniprogram.oss-cn-hangzhou.aliyuncs.com/18-12-20/34961047.jpg");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            padding:10px 20px;
                            align-items: flex-end;
                            margin-bottom:15px;
                            .left-info{
                                color: #FB5054;
                                width: 70px;
                                .money{
                                    font-size: 32px;
                                    font-weight: 500;
                                    span{
                                        font-size: 14px;
                                    }
                                }
                                .label{
                                    font-size: 12px;
                                    line-height: 17px;
                                }

                            }
                            .right-info{
                                padding-left:15px;
                                flex: 1;
                                .title{
                                    color: #666666;
                                    font-size: 12px;
                                    line-height: 17px;
                                    padding-bottom: 28px;
                                }
                                .created-at{
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    color: #9B9B9B;
                                    font-size: 10px;
                                    line-height: 14px;
                                    span{
                                        display: inline-block;
                                        padding: 4px 12px;
                                        background-color:#FB5054;
                                        color: #FFFFFF;
                                        font-size: 10px;
                                        margin-left: 5px;
                                        &.already{
                                            border-radius:2px;
                                            border: 1px solid #909090;
                                            color: #909090;
                                            background-color: #FFFFFF;
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
        //客服部分
        .attention-WeChat{
            position:fixed;
            bottom:0;
            width:100%;
            height:0;
            z-index:50;
            //transition:all .3s linear;
            color: #ffffff;

            text-align: center;
            overflow: hidden;
            &.cur {
                height: 40%;
            }
            .service-box {
                display: flex;
                align-content: center;
                background: #ffffff;
                height: 100%;
                font-size: 12px;


                .item {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: #000;
                    align-items: center;
                    justify-content: space-around;
                    img {
                        width: 72%;
                    }
                    &.phone {
                        background: #4B8AF2;
                        color: #ffffff;

                        &:before {
                            content: '';
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            background: #ffffff;
                            width: 20px;
                            height: 20px;
                            border-radius: 100%;
                        }
                        .phone-text {
                            width: 100%;
                            position: relative;
                            img {
                                //width: 72%;
                                opacity: 0;
                            }

                            font-size: 12px;

                            .phone-warp {
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                width: 100%;
                            }
                            i{
                                color: #FFFFFF;
                                font-size: 50px;
                            }

                            .phone-num {
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
            .vmc-popup{
                background: none;
            }
        }

    }


</style>
