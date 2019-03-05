<template>
    <div id="lessons">
        <van-nav-bar
            :title='this.detail.title'
            left-arrow
            @click-left="onClickLeft"
            v-if="is_navbar"
        />
        <div class="video-box" id="J_prismPlayer">
        </div>
        <div class="course-introduce">
            <div class="time-length mx-1px-bottom">
                <div class="topic">
                    课时{{detail.number}}：{{detail.title}}
                </div>
                <!-- <div class="already-percent">
                     已观看 20%
                 </div>-->
            </div>
            <div class="category" v-if="course_detail.data">
                <div class="txt">{{course_detail.data.title}}</div>
                <div class="see-detail" @click="jumpDetail">查看详情</div>
            </div>
        </div>
        <div class="ul-content">
            <div class="item-list" v-for="(item,index) in classList" :key="index">
                <div class="topic mx-1px-bottom" v-if="item.item_type == 'chapter'">{{item.title}}</div>
                <div class="course-list" @click="palyStudy(item.id)">
                    <div class="item mx-1px-bottom" :class="item.id == id ? 'activeitem' : ''" v-if="item.item_type == 'lesson'">
                        <div class="txt">
                            <span class="iconfont icon-shipinbofang"></span>
                            课时{{item.number}}： {{item.title}}
                        </div>
                        <div class="the-length">{{item.length_min}}</div>
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
        name: 'lessons',
        component:{
            List,
            NavBar
        },
        data(){
            return {
                is_navbar:true,
                id:'', //课时id
                detail:'',
                classList:'',
                course_id:'',//课程id
                course_detail:'',
                activeVal:'',
                newList:[],
                aliplayer: ''
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.course_id = this.$route.params.course_id;
            let data = {
                id:this.id
            }
            let cdata = {
                id:this.course_id
            }
            let ddata = {
                id:this.course_id
            }
            this.$store.dispatch('queryLessons',data);
            this.$store.dispatch('queryClassList',cdata);
            this.$store.dispatch('queryDetail',ddata);
            EventBus.$on('lessonsDate',this.getLessonsDetail)
            EventBus.$on('classListDate',this.getLessonsList)
            EventBus.$on('detailData',this.getcourseDetail)
        },
        beforeDestroy(){
            EventBus.$off('lessonsDate')
            EventBus.$off('getLessonsList')
            EventBus.$off('detailData')
            /*this.aliplayer.off('ended',this.endedNext)*/

        },
        mounted(){

        },
        methods:{
            jumpDetail(){
              this.$router.push({
                  name:'index-detail',
                  params:{
                      id:this.course_id
                  }
              })
            },
            //onClickLeft
            onClickLeft(){
                window.history.back(-1)
            },
            //视频播放完成自动播放下一集
            endedNext(){
                if(this.course_detail.meta.isMember){
                    var newList = this.newList;
                    var id = this.id;
                    var idx = '';
                    var length = newList.length;
                    //如果是最后一节课，就不要下一级播放
                    if(newList[length-1].id == id){
                        return
                    }
                    newList.forEach((val,index)=>{
                        if (val.id == id){
                        idx  = index+1
                    }
                })
                    id = newList[idx].id;
                    this.id = id;
                    let data = {
                        id:this.id
                    }
                    this.$store.dispatch('queryLessons',data)

                } else {
                    return
                }

            },
            palyStudy(id){
                if(this.course_detail.meta.isMember){
                    let data = {
                        id:id
                    }
                    this.$store.dispatch('queryLessons',data)
                } else {
                    this.$dialog.alert({
                        message:'请您先购买本课程'
                    })
                }
            },
            getcourseDetail(res){
                this.course_detail = res
            },
            getLessonsDetail(res){
                this.detail = res.data;
                if(res.data.vod){
                    var  playInfo = res.data.vod.PlayInfoList.PlayInfo;
                    var newUrl = '';
                    playInfo.forEach(val=>{
                        if(val.Format == 'm3u8'){
                            newUrl = val.PlayURL
                    }
                    })
                }
                this.$nextTick(() => {
                    this.aliplayer = new Aliplayer({
                        id: 'J_prismPlayer',
                        width: '100%',
                        autoplay: true,
                        source:newUrl,
                       /* vid:res.data.vod.VideoMeta.VideoId,
                        playauth:res.data.vod.PlayAuth,*/
                        /*cover:res.data.vod.VideoMeta.CoverURL,*/
//                        vid:'94cd2797dd274a1c8d04e80915694e25',
//                        playauth:'eyJTZWN1cml0eVRva2VuIjoiQ0FJUzN3SjFxNkZ0NUIyeWZTaklyNG5HSStuZXFabFg5WTZlVzBYMWdYbGpmUGhJaHJ6dDFEejJJSGxQZTNGaEFPb2V2L2svbVc5VTdmb2Nsck1xRmNVYUdoR2ZNSk10djh3R29GUDRKcExGc3QySjZyOEpqc1ZtMEtRUjkxdXBzdlhKYXNEVkVma3VFNVhFTWlJNS8wMGU2TC8rY2lyWVhEN0JHSmFWaUpsaFE4MEtWdzJqRjFSdkQ4dFhJUTBRazYxOUszemRaOW1nTGlidWkzdnhDa1J2MkhCaWptOHR4cW1qL015UTV4MzFpMXYweStCM3dZSHRPY3FjYThCOU1ZMVdUc3Uxdm9oemFyR1Q2Q3BaK2psTStxQVU2cWxZNG1YcnM5cUhFa0ZOd0JpWFNaMjJsT2RpTndoa2ZLTTNOcmRacGZ6bjc1MUN0L2ZVaXA3OHhtUW1YNGdYY1Z5R0d0RHhrWk9aUXJ6emJZNWhLK2lnQVJtWGpJRFRiS3VTbWhnL2ZIY1dPRGxOZjljY01YSnFBWFF1TUdxRGNmRC9xUW1RT2xiK0cvWGFqUHBxajRBSjVsSHA3TWVNR1YrRGVMeVF5aDBFSWFVN2EwNDRxTDZvYnQ4WG1zUWFnQUduMnZXOUROQWJVSVRjK2x0bjZKa2lEbFZ5RGFObExPcG1wZlpKbU5LOFB6Um9MK0dRK2haYjNNeVhOalZxNTV4UjN1cHVsR0x0bHVLbFR4TmJwY0k2NTJXQjB1N2NQYU1TbFdLUHFJQkFRdU9EN2EwbG5VYVBzRG1wMVBSUFhuUS92TkMybFR2eFFZNi9tUmFGSk4rTGFHMnNFOUVQNXVuSitaL2FwOS9mY1E9PSIsIkF1dGhJbmZvIjoie1wiQ2FsbGVyXCI6XCJLQkJkYm5jL1lORHhyQXZLVUNYclR5aTZUem5hQ295RjBJaEtEMEp1STNzPVxcclxcblwiLFwiRXhwaXJlVGltZVwiOlwiMjAxOS0wMy0wNVQwOToyNzozNlpcIixcIk1lZGlhSWRcIjpcIjk0Y2QyNzk3ZGQyNzRhMWM4ZDA0ZTgwOTE1Njk0ZTI1XCIsXCJQbGF5RG9tYWluXCI6XCJ2b2QuaGVsbG9iaS5jb21cIixcIlNpZ25hdHVyZVwiOlwiUmorbnRBMXJoemFxNlJuUnVNazdsZzRic2hVPVwifSIsIlZpZGVvTWV0YSI6eyJTdGF0dXMiOiJOb3JtYWwiLCJWaWRlb0lkIjoiOTRjZDI3OTdkZDI3NGExYzhkMDRlODA5MTU2OTRlMjUiLCJUaXRsZSI6IjQyOCIsIkNvdmVyVVJMIjoiaHR0cDovL3ZvZC5oZWxsb2JpLmNvbS85NGNkMjc5N2RkMjc0YTFjOGQwNGU4MDkxNTY5NGUyNS9zbmFwc2hvdHMvNTk1OWM0Mjc2ODBhNDZmMjhkNDNhMzY1MWQ3Yjg0ZGItMDAwMDUuanBnIiwiRHVyYXRpb24iOjIyNDcuOTQ3fSwiQWNjZXNzS2V5SWQiOiJTVFMuTkpzaFNqREZ2Qkx1WWNEZXk2cHdkaXlGNiIsIlBsYXlEb21haW4iOiJ2b2QuaGVsbG9iaS5jb20iLCJBY2Nlc3NLZXlTZWNyZXQiOiI3b0ZIQ21NWkRkeGp0bVZYanJQb1JUVld0cEJ5cGdWOVc2aWFOaWlTeG9UNiIsIlJlZ2lvbiI6ImNuLXNoYW5naGFpIiwiQ3VzdG9tZXJJZCI6MTYyNzc1MzUwNTkwOTk4MX0=',

                        encryptType: 1
                    },fn=>{
                        /*this.aliplayer.on('ended',this.endedNext)*/

                    })
                })
                if(env.isWechat){
                    this.is_navbar = false;
                    setPageTitle(res.data.title)
                }
            },
            getLessonsList(res){
                var newList = [];//筛选过后的数组
                res.data.forEach(val=>{
                    if(val.item_type == 'lesson'){
                        newList.push(val)
                    }
                });
                this.classList = res.data;
                this.newList = newList
            }

        }



    }
</script>

<style rel="stylesheet/less" lang="less">
    html,body{
        background-color:#F3F3F3;
    }
    #lessons{
        height: 100%;
        overflow: auto;
        background-color:#F3F3F3;
        .prism-controlbar-bg{
            background-color:#004E9D;
        }
        .van-nav-bar{
            background-color:#004E9D;
            position: fixed;
            top: 0;
            width: 100%;
            .van-icon{
                color: #ffffff;
            }
        }
        .van-nav-bar + div{
            padding-top: 0px!important;
            margin-top: 46px!important;
        }
        .van-nav-bar__title{
            color: #ffffff;
        }
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
        .course-introduce{
            padding:15px;
            background-color: #FFFFFF;
            margin-bottom: 10px;
            .time-length{
                .topic{
                    color: #202020;
                    font-size: 15px;
                    line-height: 21px;
                    font-weight: 600;
                    padding-bottom: 5px;
                }
                .already-percent{
                    color: #909090;
                    font-size: 12px;
                    line-height: 17px;
                    padding-bottom: 10px;
                }
            }
            .category{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding:15px 0 0 0;
                .txt{
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #4A4A4A;
                    font-size: 13px;
                    line-height: 18px;
                }
                .see-detail{
                    width: 68px;
                    box-sizing:border-box;
                    padding: 5px 8px;
                    border-radius:4px;
                    border: 1px solid #D7D7D7;
                    color:#999999;
                    font-size: 12px;
                    line-height: 14px;
                }
            }
        }
        .ul-content{
            background-color: #FFFFFF;
            .item-list{
                .topic{
                    padding: 0 15px;
                    height: 50px;
                    line-height: 50px;
                    color: #202020;
                    font-size: 14px;
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
                        .txt {
                            flex: 1;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            span {
                                display: inline-block;
                                padding-right: 10px;

                            }

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
        }
    }


</style>
