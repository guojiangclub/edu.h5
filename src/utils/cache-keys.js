export default function (cache) {
    return {
        token: 'user_token',
        info: 'user_info', //user界面储存
        apply: 'activity_apply',   //活动报名状态储存
	    search_history: cache + 'search_history',  // 搜索记录储存
        edu_detail: 'edu_detail', //课程支付储存
        agent_code: 'agent_code',//rf
        order_info: 'order_info',
        old_order_info:'old_order_info'
    }
}
