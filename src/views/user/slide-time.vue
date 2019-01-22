<!--原生video视频控制条demo，还有诸多bug和兼容性未解决-->
<template>
    <!--<transition name="vlc-ani-slide-left">-->
    <div class="video">
        <div class="content">
            <!--<video src="http://kphp.org/html5/kphp.mp4" ref="video" controls></video>-->
            <div class="video-box" ref="hide">
                <video webkit-playsinline x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline src="http://ie.microsoft.com/testdrive/ieblog/2011/nov/pp4_blog_demo.mp4" ref="video" ></video>
                <div class="img" v-show="imgflag">
                    <img src="http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif" alt="" width=50 ref="img">
                </div>
                <div class="video-controls" v-show="show">
                    <div class="bg">
                        <div class="vlc-slide" id="parentBox" ref="parentBox" @click.stop="clickDistance($event)">
                            <div class="activeBox" ref="activeBox" id="activeBox"></div>
                            <div id="ball" class="slide-ball" ref="slide"></div>
                        </div>
                    </div>

                    <div class="controls">
                        <div class="play">
                            <button class="btn iconfont" ref="btn" :class="icon ? 'icon-zanting' : 'icon-bofang'"></button>
                            <div class="time" >
                                <span class="ctime" ref="start">00:00</span>/<span class="alltime" ref="allT"></span>
                            </div>
                        </div>

                        <i class="iconfont icon-webicon311"></i>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <!--</transition>-->
</template>
<style rel="stylesheet/less" lang="less">
    @import "//at.alicdn.com/t/font_534568_rc0n4ehhv337syvi.css";

    .video{

        .content{
            .video-box{
                position: relative;
                video{
                    width: 100%;
                }
                .img{
                    position: absolute;
                    top:0;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    /*display: none;*/
                }
                .video-controls{
                    position: absolute;
                    bottom: 10px;
                    left: 0;
                    right: 0;
                    .bg{
                        padding: 20px 10px 0 10px;

                        .vlc-slide{
                            position: relative;
                            height: 2px;
                            width: 100%;
                            background: rgba(255,255,255,.5);
                            margin-right: 5px;
                            .slide-ball{
                                position: absolute;
                                left: 0;
                                top:-5px;
                                width: 12px;
                                height: 12px;
                                background: #ffffff;
                                border-radius:100% ;
                            }
                            .activeBox{
                                position: absolute;
                                left: 0;
                                width: 0;
                                background: #ffffff;
                                height: 2px;
                            }
                        }

                    }

                    .controls{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px 10px 0px 10px;
                        .play{
                            display: flex;
                            align-items: center;
                            .btn{
                                margin-right: 10px;
                                margin-bottom: 5px;
                                color: #ffffff;
                            }
                            .time{
                                font-size: 12px;
                                color: #ffffff;
                                margin-right: 10px;
                            }

                        }
                        .icon-webicon311{
                            color: #ffffff;
                        }

                    }
                }


            }


        }




    }
</style>
<script>
    export default{
        data() {
            return{
                icon:false,
                imgflag:false,
                show:true,
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                this.$nextTick(() => {
                    this.btn=this.$refs.btn;//播放
                    this.Cstart=this.$refs.start;//时间
                    this.allT=this.$refs.allT;//全部时间
                    this.ov=this.$refs.video;//全部时间
                    this.img=this.$refs.img;//加载中显示的图片
                    this.hides=this.$refs.hide;//显示隐藏controls
//                    this.dom=this.$refs.slide;//圆点
                    this.dom = document.getElementById("ball");
                    this.parentBox=document.getElementById("parentBox");//进度条
                    this.activeBox=document.getElementById("activeBox");//移动
                    this.startRecord=0;
                    this.startX=0;
                    this.moveX='';
                    this.distanceX='';
                    this.clickedDistance="";
                    this.bindEvents();
                })
            },
            bindEvents(){
                this.dom.addEventListener("touchstart",this.onTouchStart);
                this.dom.addEventListener("touchmove",this.onTouchMove);
                this.dom.addEventListener("touchend",this.onTouchEnd);
//                this.hides.addEventListener("touchstart",this.onTouchStarthides);
                this.ov.addEventListener("durationchange",this.onDurationchange);
                this.ov.addEventListener("timeupdate",this.onTimeupdate);
                this.ov.addEventListener("pause",this.onPause);
                this.ov.addEventListener("playing",this.onPlaying);
                this.ov.addEventListener("ended",this.onEnded);
                this.ov.addEventListener("canplay",this.onCanplay);
                this.ov.addEventListener("waiting",this.onWaiting);
                this.btn.addEventListener("click",this.clickBtn);
//                this.parentBox.addEventListener("click",this.clickDistance);
            },
            unbindEvents(){
                this.dom.removeEventListener("touchstart",this.onTouchStart);
                this.dom.removeEventListener("touchmove",this.onTouchMove);
                this.dom.removeEventListener("touchend",this.onTouchEnd);
                this.hides.removeEventListener("touchstart",this.onTouchStarthides);
                this.parentBox.removeEventListener("click",this.clickDistance);
                this.ov.removeEventListener("durationchange",this.onDurationchange);
                this.ov.removeEventListener("timeupdate",this.onTimeupdate);
                this.ov.removeEventListener("pause",this.onPause);
                this.ov.removeEventListener("playing",this.onPlaying);
                this.ov.removeEventListener("ended",this.onEnded);
                this.ov.removeEventListener("canplay",this.onCanplay);
                this.ov.removeEventListener("waiting",this.onWaiting);
                this.btn.removeEventListener("click",this.clickBtn);
            },
            clickDistance(e){
                debugger
//          console.dir(e);
                this.width=this.parentBox.offsetWidth;
//                console.log('点击parentBox宽'+this.width);
                this.moveWidth=this.dom.offsetWidth;
//                console.log(this.moveWidth);
//                console.log('点击moveWidth移动的宽'+this.moveWidth);
                this.clickedDistance=e.clientX-this.parentBox.offsetLeft-this.moveWidth/2;
//                console.dir(this.clickedDistance);
                this.setTranslate(this.clickedDistance);
//          this.distanceX=this.clickedDistance;
                this.startX=this.clickedDistance;

//          console.dir(e.clientX-this.parentBox.offsetLeft);
//          this.distanceX=this.moveX-this.startRecord+this.startX;
            },
            onTouchStart(e){

//          拿到滑条宽度
//        alert("1");
                this.width=this.parentBox.offsetWidth;
                this.moveWidth=this.dom.offsetWidth;
                this.startRecord=e.touches[0].clientX;
//          e.preventDefault();
//          console.log(e.touches[0].clientX);
//          console.log(this.width);
            },
            onTouchMove(e){
                e.preventDefault();
                this.moveX=e.touches[0].clientX;
//          console.log('MOVEX'+this.moveX);
                this.distanceX=this.moveX-this.startRecord+this.startX;

//          console.log('点击'+this.startX);
//          console.log('移动的distancex'+this.distanceX);
                this.setTranslate(this.distanceX)
            },
            onTouchEnd(e){
                e.preventDefault();
//        this.onTouchMove = null;
                this.startX=this.distanceX;
            },
            onDurationchange(){
                this.allT.innerHTML = this.setTime( this.ov.duration );
            },
            onTimeupdate(){
//                console.log('***** timeupdate  更改为 ' +  this.setTime(this.ov.currentTime)  );
//                console.log('自动的width'+this.width+'px');
//                console.log('自动的moveWidth'+this.moveWidth+'px');

                var max = this.width - this.moveWidth;
//                console.log('可以移动的最大值'+max+'px');
                var cTime = parseInt( this.ov.currentTime );
//                console.log('当前视频时间'+cTime+'秒');
                var left = parseInt( this.ov.currentTime/this.ov.duration * max ) ;
//                console.log('需要移动'+left+ 'px');
                this.dom.style.left =  left + 'px';
//                console.log('小圆点应该移动'+this.dom.style.left);
                this.activeBox.style.width = left + 'px';
//                console.log('背景颜色应该移动'+this.activeBox.style.width);
                this.Cstart.innerHTML = this.setTime(cTime);

            },
            onEnded(){
                  this.icon = false;
                  this.show = true;
            },
            onPause(){
               this.icon = false;
            },
            onPlaying(){
               this.icon = true;
            },
            onCanplay(){
                this.imgflag = false;
            },
            onWaiting(){
                this.imgflag = true;
                console.log('加载加载加载');
            },
            onTouchStarthides(){
                this.show = !this.show;
                setTimeout(() => {
                    this.show = !this.show;
                },6000)
            },
            clickBtn(){
                this.width=this.parentBox.offsetWidth;
//                console.log('初始化的width'+this.width);
                this.moveWidth=this.dom.offsetWidth;
//                console.log('初始化的moveWidth'+this.moveWidth);
                if(this.ov.paused){
                    this.ov.play();
                    this.icon=!this.icon;
                }
                else{
                    this.ov.pause();
                    this.icon=!this.icon;
                    //ov.stop();
                }
            },
            setTranslate(num){
                var max = this.width-this.moveWidth;
                if(num>=max){
                    num=max;
                }
                if(num<=0){
                    num=0;
                }
//          console.dir(num);
//          转化时间方法
                this.setTime(num);
                this.activeBox.style.width=num+'px';
                this.dom.style.left=num+'px';
//          console.log('最大宽度'+max);
                this.ov.currentTime = num/max * this.ov.duration;
            },
            setTime(num){
                var h =  Math.floor( num/3600 );
                var m =  Math.floor( num%3600/60 );
                var s =  Math.floor( num%3600%60);

                if (this.transNum(h) >= 1) {
                    var tTime = this.transNum(h) + ':' + this.transNum(m) + ':' + this.transNum(s);
                } else {
                    var tTime = this.transNum(m) + ':' + this.transNum(s);

                }
                return tTime;
            },
            transNum(x){
                if( x<10 ){
                    return '0'+x;
                }
                else{
                    return x;
                }
            }
        },
        beforeDestroy(){
            this.unbindEvents()
        },
    }
</script>
