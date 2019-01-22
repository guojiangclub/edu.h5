// origin json data
export const origin = function (data) {
    return JSON.parse(JSON.stringify(data));
};

// for tab-control
export const tab_titles = function(list) {
    var titles = [];
    list.forEach(tab => titles.push(tab.title));
    return titles;
};

// data/time
export const get_date = function (time) {
    return String(time).replace(/\s.+$/, '');
};

export const today_date = function (dateTime) {
    var parts = dateTime.split(' ');
    var date = parts[0];
    var time = parts[1];

    time = time.split(':').slice(0, 2).join(':');

    var today = new Date().format('yyyy-mm-dd');

    return today === date ? time : date;
};

export const select_time = function (v1, v2) {
    if(v1 && v2) {
        const weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            date1 = v1.substring(0,10),
            date2 = v2.substring(0,10),
            _date1 = date1.replace(/-/g,"/"),
            _date2 = date2.replace(/-/g,"/"),
            day1 = weekDay[new Date(date1).getDay()],
            day2 = weekDay[new Date(date2).getDay()],
            time1 = v1.substring(11,16),
            time2 = v2.substring(11,16);
        if(date1==date2){
            return _date1 +' '+ day1 +' '+ time1 + '-' + time2;
        }else{
            return _date1 +' '+ day1 +' '+ time1 + ' - ' + _date2 +' '+ day2 +' '+ time2;
        }
    }
};

export const abs_money = function (value) {
    return Math.abs(value);
};

export const fix_money = function (money) {
    return String(money).replace(/\..+$/, '');
};

export const fen_money = function (money) {
    return (parseFloat(money) || 0).toFixed(2);
};

export const fen_to_yuan = function (money) {
    return ((parseInt(money) || 0) / 100).toFixed(2);
};

export const group_number = function (value) {
    return String(value).replace(/[^0-9]/, '');
};

export const fix_point = function (value) {
    return Number(value) > 0 ? '+' + value : value;
};

export const point_style = function (value) {
    return Number(value) > 0 ? 'add_score' : 'sub_score';
};
export const point_color = function (item) {
    if (item.status == 1 && item.expired == 1) {
        return 'status'
    } else if (item.status == 1 && item.expired == 0) {
        return 'add_score'
    } else if (item.status == 0 && item.expired == 1) {
        return 'status'
    } else if (item.status == 0 && item.expired == 0) {
        return 'status'
    }
};

export const goods_int = function (value) {
    return parseInt(value);
};

export const staff_type = function (value) {
    return value == 'employee' ? '员工内购' : '官方商城';
};

// get string length
export const get_length = function (value) {
    return String(value).length;
};

// cart product attributes
export const cart_attr = function (data) {
    var array = [];
    if (data.color) array.push(data.color);
    if (data.size) array.push(data.size);
    return array.join(', ');
};

// order status name
export const order_status = function (status) {
    var defautValue = process.env.NODE_ENV === 'development' ? '未知状态' + status : '';

    return {
        0: '临时订单',
        1: '待付款',
        2: '待发货',
        3: '待收货',
        4: '待评价',
        5: '已完成',
        6: '已取消',
        7: '已退款',
        8: '已作废',
        9: '已删除'
    }[status] || defautValue;
};

// refunds status name
export const refunds_status = function (status) {
    var defautValue = process.env.NODE_ENV === 'development' ? '未知状态' + status : '';

    return {
            0: '待审核',
            1: '审核通过',
            2: '拒绝申请',
            3: '已完成',
            4: '已关闭',
            5: '等待用户退货',
            6: '用户已退货',
            7: '等待商城发货'
        }[status] || defautValue;
};
// 用户等级过滤器
export const tnfVip = function (status) {
    var defautValue = process.env.NODE_ENV === 'development' ? '未知状态' + status : '';

    return {
            0: '探索客 Explorer',
            1: '开拓者 Blazer',
            2: '冒险家 Adventurer',
            3: '登顶客 Pioneer'
        }[status] || defautValue;
};

// 商品等级过滤器
export const goods_grade = function (grade, comments) {
    if (grade && comments ) {
        return grade / comments
    } else {
        return 0
    }
};


// 优惠券详情页换行过滤器
export const br_style = function (value) {
    return String(value).replace(/\n/g, '<br />');
};


export const number_separator = function (value) {

    return value.toString().replace(/\B(?=(\d{3})+$)/g,',')

};


export const price_filter = function (sellPrice,minPrice,maxPrice) {
    return minPrice&&maxPrice ? '￥'+number_separator(minPrice) +'-￥'+number_separator(maxPrice) : '￥'+sellPrice

};

//时间过去多久
export const howLong = function (v) {
    const t = new Date().getTime() - new Date(v.replace(/-/g,"/")).getTime(),
          timeMap = {
              d: 86400000,
              h: 3600000,
              m: 60000,
              s: 1000
          },
          d = Math.floor(t/timeMap.d),
          h = Math.floor(t/timeMap.h%24),
          m = Math.floor(t/timeMap.m%60),
          s = Math.floor(t/timeMap.s%60);
    switch(true){
        case d>0:
            return d+'天前';
        case h>0:
            return h+'小时前';
        case m>0:
            return m+'分钟前';
        case s>0:
            return s+'秒前';
    }
};

//chub_act 判断图文类型
export const chubActType = function(v){
  return {
      1: '测评',
      2: '指南'
  }[v];
};

export const time16 = function(v){
    if(!v) return;
    return v.substring(0,16)
};

export const chubAcStatus = function (v) {
    return {
        0: '报名未开始',
        1: '活动报名中',
        2: '报名已截止',
        3: '活动已结束',
        4: '报名已截止',
        5: '活动已满额',
    }[v];
};

export const date = function (v1, v2) {
  if(v1 && v2) {
    const date1 = v1.substring(0,10).replace(/-/g,"/"),
      date2 = v2.substring(0,10).replace(/-/g,"/");
    return date1 +'-'+ date2;
  }
};

// 过滤星期
export const setDate = function (v) {
    if (v) {
        var index = v.lastIndexOf(" ");
        return v.slice(0,index)
	    // return v.replace(/星期/, '');

    }
};

export const setYear = function (v) {
    if (v) {
	    var year = '';
	    v.replace(/(\w*)-(\w*)-(\w*)/,function (match,y,m,d) {
		    year = y;
	    })
	    return year;
    }
};

export const setMonth = function (v) {
    if (v) {
	    var month = '';
	    v.replace(/(\w*)-(\w*)-(\w*)/,function (match,y,m,d) {
		    month = m;
	    })
	    return month;
    }
};

export const setDay = function (v) {
    if (v) {
	    var day = '';
	    v.replace(/(\w*)-(\w*)-(\w*)/,function (match,y,m,d) {
		    day = d;
	    })
	    return day;
    }
};


