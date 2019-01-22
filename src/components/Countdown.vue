<template>
    <div id="time-box" v-if="show">
        <!--<i class="icono-clock"></i>-->
        <div class="time">
           <span class="span">特价优惠仅剩 <span>{{day}}</span> 天 <span>{{hour}}</span> 时 <span>{{minute}}</span> 分 <span> {{second}} </span> 秒 </span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export  default {
        props: {
            value: {
                type: String,
                default: null
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
    #time-box {
        display: flex;
        align-items: center;
        i {
            transform: scale(0.7);
        }

        .time {
            .span {
                font-size: 12px;
                /*color: #9b9b9b;*/
                /*padding: 0 5px;*/
            }
            .abox{
                color: #ffffff;
                text-align: center;
                line-height: 20px;
                display: inline-block;
                width: 20px;
                height: 20px;
                background: rgba(170,11,16,1);
            }
        }
    }
</style>
