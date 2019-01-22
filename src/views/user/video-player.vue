<!--h5-video插件DPlayer   目前还未发现什么兼容性问题demo-->
<template>
    <div class="box">
        <div class="video-box" :class="isPhone ? '' : 'noPhone'">
            <div class="video-box" id="videoElement" @click="hide"></div>
            <div class="iconfont icon-quanping1" v-show="controls" @click="show"></div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import {env} from'../../utils/util';
    import 'dplayer/dist/DPlayer.min.css';
    import DPlayer from 'dplayer';
    export default {
        data() {
            return {
                dplayer: '',
                controls: true,
                display: false,
                isPhone: env.isIphone
            }
        },
        created() {


            this.$nextTick(() => {

                this.dplayer = new DPlayer({
                    container: document.querySelector('#videoElement'),
                    video: {
                        url: 'http://ie.microsoft.com/testdrive/ieblog/2011/nov/pp4_blog_demo.mp4',
                        pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515649132886&di=c7ef1d658833b1248d50e52ae2d2a808&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201503%2F16%2F20150316230646_MYkFt.jpeg',
                        defaultQuality: 0
                    }
                });
                var video = document.querySelector('.dplayer-video');
                if (video.nodeName == 'VIDEO') {
                    video.setAttribute('x5-video-player-type', 'h5');
                    video.setAttribute('x5-video-player-fullscreen', 'true');
                }
                var full = document.querySelector('.dplayer-full-icon');
//                console.log(full.className);
                full.addEventListener("click", () => {
                    this.show();
                }, false)

                /*if (env.isIphone) {
                    this.controls = !this.controls;
                    var elements=document.querySelector('.dplayer-full-icon');
                    console.log(elements);
                } else {
                    this.controls = !this.controls;
                }*/
            })


        },
        methods: {
            show() {
                var video = document.querySelector('.dplayer-video-current');
                var attribute = video.getAttributeNode('x5-video-orientation');
                if (attribute) {
                    if (attribute.nodeValue == 'landscape') {
                        // 取消全屏
                        video.setAttribute('x5-video-orientation', 'portrait');
                    } else {
                        // 全屏
                        video.setAttribute('x5-video-orientation', 'landscape');
                    }
                } else {
                    // 全屏
                    video.setAttribute('x5-video-orientation', 'landscape');
                }

                this.dplayer.play();
            },
            hide() {
                var elements=document.getElementsByClassName('dplayer-hide-controller');
                console.log(elements.length);
                if (elements.length) {
                    this.controls = false
                } else {
                    this.controls = true
                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    @import "//at.alicdn.com/t/font_534568_ec555a0bqp5vcxr.css";
    .box{
        .video-box{
            position: relative;
            .controls {
                display: inline-block;
                position: absolute;
                z-index: 99999999 !important;
                bottom: 7px;
                color: #5a5a5a;
                font-size: 20px;
                /*object-fit: fill;*/
                right: 5px;
                background: #fafafa;
            }
            .next{
                font-size: 30px;
                position: absolute;
                z-index: 99999999 !important;
                color: #FFFFFF;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            video{
                width: 100%;
            }

            .icon-quanping1{
                display: none;
                position: absolute;
                bottom: 0;
                right: 30px;
                font-size: 20px;
                margin-bottom: 3px;
                color: #ffffff;
            }

            .dplayer-controller{
                .dplayer-icons-right{
                    .dplayer-setting{
                        display: none !important;
                    }
                    .dplayer-full-in-icon{
                        display: none !important;
                    }
                }
            }
            &.noPhone {
                .dplayer-controller {
                    .dplayer-full-icon{
                        display: none !important;
                    }
                }
                .icon-quanping1{
                    display: block;
                }
            }
        }


    }

</style>
