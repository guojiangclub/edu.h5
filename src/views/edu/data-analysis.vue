<template>
    <div id="data-analysis">
        <Header title="数据分析师八大能力培养">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <img src="../../static/img/data_banner.png" alt="">
            <img src="../../static/img/data_01.png" alt="">
            <img src="../../static/img/data_02.png" alt="">
            <img src="../../static/img/data_04.png" alt="">
            <img src="../../static/img/data_05.png" alt="">
            <img src="../../static/img/data_06.png" alt="">
            <img src="../../static/img/data_03.png" alt="">
            <div class="contents__catalog">
                <ul class="serial">
                    <li class="mx-1px-top serial__item" :class="show ? 'active' : ''">
                        <div class="serial__flex " @click="showserial">
                            <div class="serial__number">
                                <p>01</p>
                                <h4>前言：为什么会有《数据分析八大 能力》这门课程</h4>
                            </div>
                            <i class="iconfont icon-sanjiao1" v-if="show == false"></i>
                            <i class="iconfont icon-sanjiao2" v-if="show == true"></i>
                        </div>
                        <div class="serial__text">
                            <ul class="serial__content">
                                <li><span>1.一个有趣的现象：为什么都叫数据分析部，不叫ESP部（Excel+SQL+Python部）</span></li>
                                <li><span>2.一个本质的问题：数字、数据、数据分析与数据分析工作有什么关联和区别</span></li>
                                <li><span>3.一个成长的难题：从掌握取数技能，到完成数据分析工作，还需要补充多少能力</span></li>
                                <li><span>4.做一个能完成工作、解决问题、能助力业务的真正的数据分析师，不要做人肉跑数机</span></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mx-1px-top serial__item" :class="show1 ? 'active' : ''">
                        <div class="serial__flex" @click="showserial1">
                            <div class="serial__number">
                                <p>02</p>
                                <h4>第一章：数据分析师八大 能力介绍</h4>
                            </div>
                            <i class="iconfont icon-sanjiao1" v-if="show1 == false"></i>
                            <i class="iconfont icon-sanjiao2" v-if="show1 == true"></i>
                        </div>
                        <div class="serial__text">
                            <ul class="serial__content">
                                <li>
                                    <h3>综述：八大 能力从何而来</h3>
                                </li>
                                <li><span>1.数据分析师所属的部门及职责</span></li>
                                <li><span>2.数据分析师价值：助力业务，推动决策</span></li>
                                <li><span>3.从企业决策流程，看有用的数据分析该是什么样</span></li>
                                <li><span>4.数据分析师的工作内容与流程</span></li>
                                <li><span>5.为了输出更有价值的工作，所必须的八项能力</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>能力一：收集信息能力 </h3>
                                </li>
                                <li><span>1.自主收集信息是掌握业务的必要手段</span></li>
                                <li><span>2.为什么数据分析师必须理解业务</span></li>
                                <li><span>3.优秀的数据分析师不会等着别人来教自己</span></li>
                                <li><span>4.七步成诗法：理解业务的7个关键问题</span></li>
                                <li><span>5.应用七步成诗法所必备的信息收集能力</span></li>
                                <li><span>6.实战指南：制作一份自己行业的业务手册</span></li>
                                <li><span>7.特别提示：交流业务情况时的保密原则与谈话尺度</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>能力二：沟通需求能力</h3>
                                </li>
                                <li><span>1.需求沟通是数据分析的起点</span></li>
                                <li><span>2.不会沟通就当一辈子人肉跑数机</span></li>
                                <li><span>3.一个好的数据分析需求，应具有的5个特征</span></li>
                                <li><span>4.当业务提需求时，该如何确认问题</span></li>
                                <li><span>5.当业务不理不睬，该如何主动了解</span></li>
                                <li><span>6.实战指南：常见的十问十答，亲自去试试</span></li>
                                <li><span>7.特别提示：必须克服不敢张嘴，关门造车坏习惯</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>能力三：定义问题能力</h3>
                                </li>
                                <li><span>1.定义问题是正确选择分析方法的保证</span></li>
                                <li><span>2.数据分析不是万能的，界定不清，怎么干都是错</span></li>
                                <li><span>3.常见的5类业务问题与数据分析可以做事</span></li>
                                <li><span>4.收到问题时，第一时间判断问题范畴</span></li>
                                <li><span>5.解决问题所需的时间、投入需事先规划</span></li>
                                <li><span>6.实战指南：3个常见的似是而非的问题，挑战下看是否能分的清</span></li>
                                <li><span>7.特别提示：改掉唯业务是从，人家说一句自己动一下的毛病</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>能力四：梳理流程能力</h3>
                                </li>
                                <li><span>1.梳理流程是定位问题的最有效手段</span></li>
                                <li><span>2.不了解业务流程就无法深入分析</span></li>
                                <li><span>3.梳理业务流程的基本方法</span></li>
                                <li><span>3.梳理业务流程的基本方法</span></li>
                                <li><span>5.描述性统计是梳理流程的利器</span></li>
                                <li><span>6.实战指南：从一份基础数据，看出业务的问题所在</span></li>
                                <li><span>7.特别提示：没有业务背景的描述性统计是浪费时间</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>能力五：定义标准的能力</h3>
                                </li>
                                <li><span>1.先有标准，才有“好/坏”的判断</span></li>
                                <li><span>2.没有明确标准是分析下不了结论的罪魁祸首</span></li>
                                <li><span>3.如何收集基于业务经验的标准</span></li>
                                <li><span>4.如何在没有经验时探索标准</span></li>
                                <li><span>5.如何验证标准的有效性</span></li>
                                <li><span>6.实战指南：基于常规销售数据，探索如何评价各分公司业务的标准</span></li>
                                <li><span>7.特别提示：特别警惕把描述现状和评论现状混为一谈的问题</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>能力六：寻找原因的能力</h3>
                                </li>
                                <li><span>1.寻找问题原因的基本逻辑：归纳法与演绎法</span></li>
                                <li><span>2.寻找问题依托的是层层递进的假设检验</span></li>
                                <li><span>3.沿着业务流程，提出分析假设</span></li>
                                <li><span>4.设定假设检验方案与检验标准</span></li>
                                <li><span>5.估算各原因的影响与筛选重点原因</span></li>
                                <li><span>6.实战指南：从一份基础数据，看出业务的问题所在</span></li>
                                <li><span>7.特别提示：不能通过ABtest检验来验证的原因，不是好原因</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>能力七：提出建议的能力</h3>
                                </li>
                                <li><span>1.提分析建议是体现分析价值的重要一环</span></li>
                                <li><span>2.分析建议的深度，取决于对业务的了解，而非分析能力</span></li>
                                <li><span>3.如何有效收集业务方案</span></li>
                                <li><span>4.如何评估业务方案的效用与可行性</span></li>
                                <li><span>5.如何基于评估结果向业务方建议</span></li>
                                <li><span>6.实战指南：基于一份分析数据，试着提建议</span></li>
                                <li><span>7.特别提示：分析建议不等于执行计划，守住分析的界线</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>能力八：总结汇报的能力</h3>
                                </li>
                                <li><span>1.总结汇报是数据分析的点睛之笔</span></li>
                                <li><span>2.好的分析结果是包装出来的，不是自己憋出来的</span></li>
                                <li><span>3.因人而异，考虑场景，才有好的汇报</span></li>
                                <li><span>4.如何针对不同对象，设计汇报方案</span></li>
                                <li><span>5.实战指南：同一份文件，3个对象，请设计汇报方案</span></li>
                                <li><span>6.特别提示：必须牢记，业务方是评价数据分析质量的唯一裁判</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>后记：高质量的工作成果，从来不是单单靠技术实现的</h3>
                                </li>
                                <li><span>1.如果方向歪了，怎么做都是错</span></li>
                                <li><span>2.工作成果=（自己努力+伙伴支持）*领导认可</span></li>
                                <li><span>3.酒香也怕巷子深，不会包装白累死</span></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mx-1px-top serial__item" :class="show2 ? 'active' : ''">
                        <div class="serial__flex" @click="showserial2">
                            <div class="serial__number">
                                <p>03</p>
                                <h4>第二章：八大能力在数据分析工作中应用</h4>
                            </div>
                            <i class="iconfont icon-sanjiao1" v-if="show2 == false"></i>
                            <i class="iconfont icon-sanjiao2" v-if="show2 == true"></i>
                        </div>
                        <div class="serial__text">
                            <ul class="serial__content">
                                <li>
                                    <h3>第一节：八大能力在临时性取数工作中的应用</h3>
                                </li>
                                <li><span>1.临时性取数规范模板</span></li>
                                <li><span>2.临时性取数需求沟通要点</span></li>
                                <li><span>3.临时性取数交付形式</span></li>
                                <li><span>4.如何避免反反复复临时取数</span></li>
                                <li><span>5.如何从临时取数中引申出报表、专题、项目类需求</span></li>
                                <li><span>6.实战指南：制作属于自己的一份《数据需求分析报告》</span></li>
                                <li><span>7.特别提示：拒绝临时性取数的问答对战</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>第二节：八大能力在专题类分析工作中的应用</h3>
                                </li>
                                <li><span>1.专题分析规范模板</span></li>
                                <li><span>2.专题分析需求沟通要点</span></li>
                                <li><span>3.专题分析交付形式</span></li>
                                <li><span>4.专题分析，业务部门没任何思路，怎么办？</span></li>
                                <li><span>5.专题分析，业务部门太强势，怎么办？</span></li>
                                <li><span>6.专题分析，总被嫌弃不深入，怎么办？</span></li>
                                <li><span>7.专题分析，不知道对业务部门有没有用，怎么办？</span></li>
                                <li><span>8.实战指南：跟踪自己的专题分析效果</span></li>
                                <li><span>9.特别提示：通过专题分析，紧密配合业务部门行动的方法</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>第三节：八大能力在数据报表工作中的应用</h3>
                                </li>
                                <li><span>1.报表需求的规范模板</span></li>
                                <li><span>2.报表需求的沟通要点</span></li>
                                <li><span>3.报表需求的交付形式</span></li>
                                <li><span>4.报表经常做，看得人很少，怎么办？</span></li>
                                <li><span>5.报表发出来，不知道对业务部门有什么用，怎么办？</span></li>
                                <li><span>6.天天跑基础报表，没有技术含量怎么办？</span></li>
                                <li><span>7.如何从日常报表中引申出专题、项目类需求</span></li>
                                <li><span>8.实战指南：制作属于自己的一份《报表说明》</span></li>
                                <li><span>9.特别提示：通过日报引发业务部门兴趣的技巧切磋</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>第三节：八大能力在数据建模项目中的应用</h3>
                                </li>
                                <li><span>1.建模项目规范模板</span></li>
                                <li><span>2.建模项目需求沟通要点</span></li>
                                <li><span>3.建模项目交付形式</span></li>
                                <li><span>4.数据建模，业务部门啥都指望模型搞掂，怎么办？</span></li>
                                <li><span>5.数据建模，业务部门质疑建模过程，怎么办？</span></li>
                                <li><span>6.数据建模，业务部门对建模要求过高，怎么办？</span></li>
                                <li><span>7.实战指南：试着自己用模型解决一个具体问题</span></li>
                                <li><span>8.特别提示：数据建模项目中期望值、进度、交付成果管控</span></li>
                            </ul>
                            <ul class="serial__content">
                                <li>
                                    <h3>第四节：八大能力在数据产品开发工作中的应用</h3>
                                </li>
                                <li><span>1.数据产品的规范模板</span></li>
                                <li><span>2.数据产品的沟通要点</span></li>
                                <li><span>3.数据产品的交付形式</span></li>
                                <li><span>4.数据产品做出来，用的人很少，怎么办？</span></li>
                                <li><span>5.数据产品做出来，总被吐槽，怎么办？</span></li>
                                <li><span>6.实战指南：把自己常规报表升级为一个产品</span></li>
                                <li><span>7.特别提示：数据产品项目中期望值、进度、交付成果管控</span></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mx-1px-top serial__item" :class="show3 ? 'active' : ''">
                        <div class="serial__flex" @click="showserial3">
                            <div class="serial__number">
                                <p>04</p>
                                <h4>第三章：八大能力在销售、营销、运营等工作中的应用案例（不断更新）</h4>
                            </div>
                            <i class="iconfont icon-sanjiao1" v-if="show3 == false"></i>
                            <i class="iconfont icon-sanjiao2" v-if="show3 == true"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <img src="../../static/img/data_07.png" alt="">
            <img src="../../static/img/data_08.jpg" alt="">

            <img src="../../static/img/data_09.jpg" alt="">
            <img src="../../static/img/data_10.jpg" alt="">
            <img src="../../static/img/data_11.png" alt="">
            <div class="question">
                <div class="title">
                    常见问题/Question & Answer
                </div>
                <div class="item-box">
                    <div class="item">
                        <p>Q：课程没有再赘述取数工作使用，学院有可以推荐的课程吗？</p>
                        <div>
                            A：Excel、sql、python操作可学
                            <a href="https://mobile.hellobi.com/#/edu/course/205">《七周成为数据分析师》</a>、数据获取可学
                            <a href="https://mobile.hellobi.com/#/edu/course/157">《Python3网络爬虫实战案例》</a>、数据建模可学
                            <a href="https://mobile.hellobi.com/#/edu/course/159">《Python数据科学精华实战课程》</a>
                        </div>
                    </div>
                    <div class="item">
                        <p>Q：如果我有关于课程相关的问题，该如何咨询？</p>
                        <div><a href="tel:158-2133-9409" class="tel">您可以直接拨打梁老师咨询电话：158-2133-9409</a></div>
                    </div>
                    <div class="item">
                        <p>Q：为什么使用视频教学？</p>
                        <div>A：学院课程都是属于理论+实操类培训课程，每个系列课程都有大量的操作课，通过视频观看老师的操作，反复学习实践才能更好的掌握。</div>
                    </div>
                    <div class="item">
                        <p>Q：每节课的时间多长？</p>
                        <div>A：每节课的时间一般控制在10-15分钟左右，有些课程为了保证教学连续性，大约30分钟左右</div>
                    </div>
                    <div class="item">
                        <p>Q：学习过程中遇到问题怎么办？</p>
                        <div>A：可以直接在课程中独享的答疑区进行提问，讲师会积极回答问题。凡参加课程的学员都会进入课程内容VIP群，讲师和社区专家会分享知识和答疑问题。</div>
                    </div>
                </div>
            </div>
            <!--<img src="../../static/img/svip-question.png" alt="">-->
            <div class="copyright">
                Copyright © 天善智能-上海拓善智能科技有限公司 2018
            </div>
        </div>
        <div class="bottom">
            <div class="bottom__left">
                <div class="price">
                    <span>￥</span>
                    <span>{{data.price}}</span>
                </div>
                <div class="original">
                    <span class="original__price">原价 ：￥799</span>
                    <div class="time">
                        <span class="triangle"></span>
                        <!--<countdown :value=""></countdown>-->
                        <span><countdown :value="data.endsAt.date"></countdown></span>
                    </div>
                </div>
            </div>
            <div class="bottom__right">
                <div class="purchase" @click="purchase" v-if="!data.isPay">立即购买</div>
                <div class="study" v-else @click="jump('edu-course', 272)">您已购买课程, 点此去学习</div>
            </div>
            <span class="home" @click="jump('edu')">
                <i class="iconfont icon-shouye"></i>
            </span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Countdown from '../../components/Countdown-w.vue';
    import {Cache, cache_keys, env, } from '../../utils/util';
    import pingpp from 'pingpp-js';

    export default {
        name:'data',
        components: {
            Countdown
        },
        data() {
            return {
                show: false,
                show1: false,
                show2: false,
                show3: false,
                data: {
                    endsAt: {
                        date: ''
                    }
                }
            }
        },
        created() {
           var agent_code = this.$route.query.rf || Cache.get(cache_keys.agent_code) || '';
           if (agent_code) {
               Cache.set(cache_keys.agent_code, agent_code, 0);
           }
	        console.log(agent_code);
	        this.$store.dispatch('EduData', agent_code);
            EventBus.$on('edudata', this.indexData);
            EventBus.$on('wxDataCharge', this.wxdataCharge);
            EventBus.$on('DataCharge', this.dataCharge);
        },
        beforeDestroy() {
            EventBus.$off('edudata');
            EventBus.$off('edudata');
            EventBus.$off('edudata');
        },
        methods: {
            jump(name, id) {
                this.$router.push({name: name, params: {id: id}})
            },
            indexData(res) {
                this.data = res;
            },
            goLogin() {
                var source = this.$route.path;
                this.$router.push({name: 'user-login', query: {source}});
            },
            showserial() {
                this.show = !this.show;

            },
            showserial1() {
                this.show1 = !this.show1;

            },
            showserial2() {
                this.show2 = !this.show2;

            },
            showserial3() {
                this.show3 = !this.show3;

            },
            purchase() {
                var is_login = !!Cache.get(cache_keys.token);
                var channel = 'alipay_wap'
                var extra = {
                    success_url: window.location.href,
                    cancel_url: window.location.href
                };
                var rf = Cache.get(cache_keys.agent_code) || '';
//                var rfNull = '';
                /*if (rf == null) {
                    rf = rfNull;
                }*/
                if (env.isWechat) {
                    channel = 'wx_pub'
                }
                var data = {
                    channel: channel,
                    extra: extra,
                    rf: rf
                }
                if (is_login) {
                    this.$store.dispatch('submitDatapay',data)
                } else {
                    this.$Modal.info({body: '请先登录', onOk: this.goLogin})
                }
            },
            dataCharge(success, charge) {
                if (success) {
                    pingpp.createPayment(charge, (result, err) => {
                        if (result == "success") {
                            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                        } else if (result == "fail") {
                            // charge 不正确或者微信公众账号支付失败时会在此处返回
                        } else if (result == "cancel") {
                            // 微信公众账号支付取消支付
                        }
                    })
                } else {
                    this.$Modal.confirm({body: '请求支付失败, 请重试!'});
                }
            },
            wxdataCharge(data) {
                window.location.href = data.url;
            }
        }
    }
</script>


<style rel="stylesheet/less" lang="less">
    #data-analysis{
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
            padding-bottom: 50px;
            img {
                display: block;
                width: 100%;
            }
            .contents__catalog{
                .serial{
                    padding: 0px 15px 20px 5px ;
                    .serial__item{
                        margin-bottom: 12px;

                        &.active{

                            .serial__flex{
                                background: #f3f3f3;

                            }
                            .serial__text{
                                display: block;
                                background: #f3f3f3;
                            }
                        }
                        .serial__flex{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color: #001d32;
                            margin-left: 11px;

                            .serial__number{
                                display: flex;
                                padding: 16px 0px;
                                p{
                                    font-size: 20px;
                                    font-weight: bold;
                                }
                                h4{
                                    font-size: 10px;
                                    padding: 0 20px;
                                }
                            }
                            i{
                                color: #c1c1c1;
                                font-size: 14px;
                            }
                        }
                        .serial__text{
                            display: none;
                            margin-left: 11px;
                            .serial__content{
                                color: #001d32;
                                font-size: 7px;
                                padding: 0px 30px 12px 44px;
                                li{
                                    h3{
                                        font-size: 8px;
                                    }
                                    span{
                                        display: inline-block;
                                        padding-left: 17px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .question{
                background: #ffffff;
                .title{
                    padding: 40px 0 10px 0;
                    text-align: center;
                    font-size: 16px;
                    color: #001d32;
                }
                .item-box{
                    padding: 0 10px;
                    .item{
                        font-size: 10px;
                        padding-bottom: 10px;
                        p{
                            color: #001d32;
                        }
                        div{
                            color: #737c84;
                            a{
                                color: #008aef;
                                &.tel{
                                    color: #737c84;
                                }
                            }
                        }
                    }
                }

            }
            .copyright{
                font-size: 12px;
                height: 30px;
                line-height: 30px;
                background: #0a1624;
                color: #FFFFFF;
                text-align: center;
            }
        }
        .bottom{
            position: fixed;
            bottom: 0px;
            left: 0;
            right: 0;
            background: #f2f2f2;
            display: flex;
            align-items: center;
            height: 50px;
            .bottom__left{
                width: 225px;
                height: 50px;
                background: #F2F2F2;
                display: flex;
                align-items: center;
                padding: 0 23px 0 12px;
                overflow: hidden;
                .price{
                    color: #e62d21;
                    font-size: 16px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    padding-right: 10px;
                    span{
                        &:first-child{
                            font-size: 10px;
                            font-weight: 100;
                        }
                    }
                }
                .original{
                    font-size: 10px;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    .original__price{
                        color: #666;
                        text-decoration: line-through;
                    }
                    .time{
                        background: #999;
                        color: #ffffff;
                        position: relative;
                        padding-left: 2px;
                        .triangle{
                            position: absolute;
                            height: 0px;
                            width: 0px;
                            top: 3px;
                            left:-5px;
                            border-top: 6px solid transparent;
                            border-right: 5px solid #999;
                            border-bottom: 5px solid transparent;
                        }
                    }
                }

            }
            .bottom__right{
                flex: 1;
                text-align: center;
                color: #ffffff;

                .purchase{
                    height: 50px;
                    font-size: 14px;
                    line-height: 50px;
                    background: red;

                }
                .study{
                    height: 50px;
                    font-size: 10px;
                    line-height: 50px;
                    background: #008cf0;

                }
            }
            .home {
                /*padding: 10px;*/
                width: 44px;
                height: 44px;
                background: #fff;
                border-radius: 50%;
                position: fixed;
                bottom: 100px;
                right: 30px;
                box-shadow: 0px 1px 10px #222;
                text-align: center;
                line-height: 44px;
                i{
                    color: #008cee;
                    font-size: 23px;
                }
            }


        }
    }

</style>

