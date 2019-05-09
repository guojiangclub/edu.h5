<template>
    <div id="about">
        <div v-html="about.content">

        </div>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                about: ''
            }
        },
        created() {
            this.$store.dispatch('getAboutInfo');
            EventBus.$on('aboutInfo',this.info);
        },
        methods: {
            info(info) {
                this.about = info
            }
        },
        beforeDestroy() {
            EventBus.$off('aboutInfo');
        }
    }
</script>


<style rel="stylesheet/less" lang="less">
    #about {
        overflow: auto;
        height: 100%;
    }
</style>
