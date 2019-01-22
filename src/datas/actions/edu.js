/**
 * Created by Administrator on 2017/6/19.
 */
import {
	eduCourse
} from '../mutation-types';
import { Cache, cache_keys } from '../../utils/util';

// 获取课程首页轮播图以及分类数据
export const queryEduIndex = function ({commit, state}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/edu/header')
		.then(res => {
			res = res.data;
			EventBus.$emit('eduIndex', res);
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}
// 获取课程详情数据
export const queryEduDetail = function ({commit, state}, data) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/course/' + data.id, {
            params: {
                rf: data.rf
            },
			headers: {
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			commit(eduCourse, res);
            EventBus.$Indicator.remove();
            EventBus.$emit('eduDetail', res);
			EventBus.$emit('eduDetailPay', res);
			EventBus.$emit('edudetailAnnoun', res)
		}, err => {
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取课程公告
export const queryEduAnnouncement = function ({commit, state}, data) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/course/'+ data.id +'/announcement', {
            params: {
                page: data.page
            },
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.meta && res.meta.pagination) {
                EventBus.$emit('eduannouncement', res);
                EventBus.$emit('eduLessonAnnouncement', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        },  err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
};

// 获取课程的课时数据
export const queryEduTime = function ({commit, state}, id) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/course/' + id + '/lessons')
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			EventBus.$emit('eduTime', res);
			EventBus.$emit('eduTimeLesson', res);
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取课程评论列表
export const queryEduReviews = function ({commit, state}, data) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/course/' + data.id + '/reviews', {
			params: {
				page: data.page
			}
		})
		.then(res => {
			res = res.data;
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('eduReviews', res);
				EventBus.$emit('eduReviewsLesson', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		},  err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取所有课程分类列表
export const queryCategoryList = function ({commit, state}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/edu/category')
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('categoryList', res.data);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取分类下的课程列表
export const queryCoursesList = function ({commit, state}, data = {type: 0, category: '', page: 1}) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/courses', {
			params: {
				type: data.type,
				category: data.category,
				page: data.page
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('categoryDetail', res);
				EventBus.$emit('coursesList', res);
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 提交报名
export const submitCourseInfo = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);
	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/course/' + data.id + '/pay', data, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res =>{
			res = res.data;
			if (res.status) {
			    EventBus.$emit('charge', true, res, data)
                // if (data.channel == 'wx_pub') {
                //     EventBus.$emit('wxCharge', res.data);
                // } else if (data.channel == 'alipay_wap') {
                //     EventBus.$emit('charge', true, res.data.charge)
                // } else {
                //     EventBus.$emit('xjhCharge',res)
                // }
			} else {
				EventBus.$emit('charge', false, res.message);
			}
		}, err => {
			EventBus.$emit('charge', false, '请求支付失败, 请重试!');
		})
}

// 获取课时详情(课程播放)
export const queryLesson = function ({commit, state}, id) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/course/lesson/' + id, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('lessonData', res.data)
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'});
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}

// SVIP页面课程数据
export const svipDataList = function ({commit, state}) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/svip', {
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.status) {
				EventBus.$emit('svipData', res.data);
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}
		},err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}
//SVIP2018页面课程数据
export const svipNewDataList = function ({commit, state},data) {
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/svip2018', {
            params: {
                rf: data.rf
            },
            headers:{
                Authorization: access_token
            }
        })
        .then(res => {
            res = res.data;
            EventBus.$Indicator.remove();
            if (res.status) {
                EventBus.$emit('svipNewData', res.data);
            } else {
                EventBus.$Modal.confirm({body: '请求失败'});
            }
        },err => {
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

// 双11页面数据
export const queryDoubleData = function ({commit, state}) {
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';
    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/1111', {
            headers:{
                Authorization: access_token
            }
        })
        .then(res => {
            res = res.data;
            EventBus.$Indicator.remove();
            if (res.status) {
                EventBus.$emit('doubleData', res.data);
            } else {
                EventBus.$Modal.confirm({body: res.status});
            }
        },err => {
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}
// SVIP报名
export const submitSvip = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);
	EventBus.$http
		.post(EventBus.$Config.baseUrl + "api/svip/pay", data, {
            headers:{
                Authorization: oauth.access_token
            }
        })
		.then(res => {
			res = res.data;
			if (res.status) {
				if (data.channel == 'wx_pub') {
					EventBus.$emit('wxSvipCharge', res.data)
				} else {
					EventBus.$emit('svipCharge', true, res.data.charge)
				}
			} else {
				EventBus.$emit('svipCharge', false);
			}
		}, err => {
			EventBus.$emit('svipCharge', false);
		})
}
// SVIP2018报名
export const submitSvipNew = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$http
        .post(EventBus.$Config.baseUrl + "api/svip2018/pay", data, {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                if (data.channel == 'wx_pub') {
                    EventBus.$emit('wxSvipNewCharge', res.data)
                } else {
                    EventBus.$emit('svipNewCharge', true, res.data.charge)
                }
            } else {
                EventBus.$emit('svipNewCharge', false);
            }
        }, err => {
            EventBus.$emit('svipNewCharge', false);
        })
}

// 班级首页
export const classroom = function ({commit, state}, page) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/classroom', {
			params: {
				page: page
			}
		})
		.then(res => {
			res = res.data;
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('class', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		},err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
		.then(res => {
			EventBus.$Indicator.remove();
		})
}

// 班级详情页
export const classroomDetail = function ({commit, state}, id) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/classroom/' + id, {
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.status) {
				EventBus.$emit('classDetail', res.data)
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}

// 班级购买
export const payclassroom = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/classroom/' + data.id + '/pay', data, {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                if (data.channel == 'wx_pub') {
                    EventBus.$emit('classWxCharge', res.data);
                } else if (data.channel == 'alipay_wap') {
                    EventBus.$emit('classCharge', true, res.data.charge)
                } else {
                    EventBus.$emit('classXjhCharge',res)
                }
            } else {
                EventBus.$emit('classCharge', false);
            }

        }, err => {
            EventBus.$emit('classCharge', false);
        })
}

// 我的推广
export const Extension = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/agent', {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('extension', res.data)
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }

        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//推广课程
export const EduData = function ({commit,state}, rf) {
    const oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';
	console.log(rf);
	EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/data', {
	        params: {
		        rf: rf || ''
	        },
            headers:{
                Authorization: access_token
            },
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('edudata', res.data)
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }

        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })

}

// 数据分析师课程支付
export const submitDatapay = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$http
        .post(EventBus.$Config.baseUrl + "api/data/pay", data, {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                if (data.channel == 'wx_pub') {
                    EventBus.$emit('wxDataCharge', res.data)
                } else {
                    EventBus.$emit('DataCharge', true, res.data.charge)
                }
            } else {
                EventBus.$emit('DataCharge', false);
            }
        }, err => {
            EventBus.$emit('DataCharge', false);
        })
}




