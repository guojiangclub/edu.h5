<template>
    <div id="time-vip" v-if="show">
        <!--<i class="icono-clock"></i>-->
        <div class="timevip" v-if="type == 1">
            特价仅剩：<span>{{day}}</span> 天 <span>{{hour}}</span> 时 <span>{{minute}}</span> 分 <span> {{second}} </span> 秒
        </div>

        <div class="timevip" v-if="type == 2">
            SVIP剩余时间：<span>{{day}}</span> 天 <span>{{hour}}</span> 时
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export  default {
        props: {
            value: {
                type: String,
                default: null
            },
            type: {
                type: String,
                default: '1'
            }
        },
        methods: {
            countTime() {
                var d = 86400000,
                    h = 3600000,
                    n = 60000,
                    end = this.value,
                    arr = String(end).split(/\D/);
                arr = arr.map(Number);
                var nowTime = new Date().getTime();
                var endTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]).getTime();
                var interval = endTime - nowTime;
                if (interval < 0) {
                    this.show = false;
                    this.$emit("over");
                } else {
                    var day = Math.floor(interval / d);
                    Math.floor(interval -= day * d);
                    var hour = Math.floor(interval / h);
                    Math.floor(interval -= hour * h);
                    var minute = Math.floor(interval / n);
                    var second =Math.floor(interval% n/1000);
                    this.day = day;
                    this.hour = hour;
                    this.minute = minute;
                    this.second = second;
                }
            }
        },
        created() {
            setInterval(this.countTime,200);
        },
        data() {
            return {
                show: true,
                day: 0,
                hour: 0,
                minute: 0,
                second:0
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    #time-vip {
        display: flex;
        align-items: center;
        i {
            transform: scale(0.7);
        }

        .timevip {
            font-size: 12px !important;
            color: #4a4a4a !important;
            margin-top: 0px !important;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
            span {
                display: inline-block;
                color: #4a4a4a !important;
                font-size: 12px !important;
            }
        }
    }
</style>
