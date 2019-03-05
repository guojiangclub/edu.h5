<template>
    <div id="lessons">
        <div class="video-box" id="J_prismPlayer">
            <!--<video :src="detail.media_uri"></video>-->
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
                <div class="see-detail">查看详情</div>
            </div>
        </div>
        <div class="ul-content">
            <div class="item-list" v-for="(item,index) in classList" :key="index">
                <div class="topic mx-1px-bottom" v-if="item.item_type == 'chapter'">{{item.title}}</div>
                <div class="course-list">
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
    export default {
        name: 'lessons',
        data(){
            return {
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

        },
        mounted(){

        },
        methods:{
            getcourseDetail(res){
                this.course_detail = res
            },
            getLessonsDetail(res){
                this.detail = res.data;

                this.$nextTick(() => {
                    this.aliplayer = new Aliplayer({
                        id: 'J_prismPlayer',
                        width: '100%',
                        autoplay: true,
                        source : res.data.media_uri,
                    })
                })
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
        .video-box{
            background-color: #ffffff;
            video{
                width: 100%;
            }
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
