
<style rel="stylesheet/less" lang="less">
    // @import '../styles/common.css';
    @import "~vlc-ui/dist/styles/vlc.css";
    @import "../static/css/1px.css";
    /*@import "../static/css/reset.css";*/
    @import "//at.alicdn.com/t/font_384012_8030xmrpm71ll3di.css";
    /*@import 'video.js/dist/video-js.css'*/
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: none;
        font-size: 16px;
        overflow: hidden;
        background-color: #ffffff;
        line-height: 1.6;
    }
    #main {
        width: 100%;
        height: 100%;
        -webkit-user-select:text;
        -moz-user-select:text;
        -o-user-select:text;
        user-select:text;
    }

    .page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; -webkit-overflow-scrolling: touch;
        -webkit-tap-highlight-color: transparent;
        font-family: "PingFang SC", "Microsoft YaHei", Helvetica Neue,Helvetica,Arial,sans-serif;
        font-weight: normal;
        background-color: #ffffff;
        z-index: 0;
    }

</style>
<template>
    <div id="main">
        <transition :name="direction" mode="in-out">
            <keep-alive :include="includedComponents">
                <router-view   class="page"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                direction:'forward',
	            includedComponents: 'amend-pwd'
            }
        },
        mounted () {

        },
        watch:{
            $route(to,from){

                let toDepth = to.path.split('/').length;
                let fromDepth = from.path.split('/').length;

                if (toDepth == fromDepth) {
//                    this.direction = 'vlc-ani-fade'
                } else if(toDepth > fromDepth) {
                    this.direction = 'vlc-ani-right';
                } else if (toDepth < fromDepth) {

                    this.direction = 'vlc-ani-left'
                } else {
                	this.direction = '';

                }
            },
        },

        beforeDestroy () {

        },
        methods: {

        },

    }
</script>
