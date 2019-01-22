<template>
    <span>{{time}}</span>
</template>

<script type="text/ecmascript-6">
    export default {
	    props: {
		    endTime: {
			    type: String,
			    default: null
		    },
            message:{
	            type: String,
	            default: '已结束'
            }
	    },
        data() {
	    	return {
			    time : '',
			    flag : false,
            }
        },
        methods: {
	        timeDown () {
		        const endTime = new Date(this.endTime)
		        const nowTime = new Date();
		        let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
		        let d = parseInt(leftTime/(24*60*60))
		        let h = this.formate(parseInt(leftTime/(60*60)%24))
		        let m = this.formate(parseInt(leftTime/60%60))
		        let s = this.formate(parseInt(leftTime%60))
		        if(leftTime <= 0){
		        	this.time = this.message
			        this.flag = true
			        this.$emit('time-end')
		        } else {
			        this.time = `${d}天${h}小时${m}分${s}秒`
                }

	        },
	        formate (time) {
		        if(time>=10){
			        return time
		        }else{
			        return `0${time}`
		        }
	        }
        },
	    mounted () {
		    let time = setInterval(()=>{
			    if(this.flag == true){
				    clearInterval(time)
			    } else {
				    this.timeDown()
                }
		    },1000)
	    },
    }

</script>