/**
 * Created by Administrator on 2017/5/31.
 */
import { Cache, cache_keys, exif } from '../../utils/util';

// 获取当前登录用户的信息
export const queryUserInfo = function ({commit,state}) {
	const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/me', {
	        headers:{
		        Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.data && res.meta) {
	            EventBus.$emit('userInfo', res);
	            Cache.set(cache_keys.info, res, 0);
            } else {
	            EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
	        EventBus.$Modal.confirm({body: '服务端出错'});
        })
};
// 用户修改密码
export const amendPwd = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/users/update/password', {
			old_password: data.old_password,
			password: data.password,
			password_confirmation: data.password_confirmation
		}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('amend', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}

		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}

// 找回密码
export const findPwd = function ({commit, state}, data) {
	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/oauth/find/password', data)
		.then(res => {
			res = res.data;
            EventBus.$Indicator.remove();
            if (res.status) {
				EventBus.$emit('find', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({body: '服务端出错'});
		})

}

//修改用户手机号码
export const phoneNumber = function ({commit, state}, data) {
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/users/update/mobile', data, {
            headers:{
                Authorization: access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status){
                EventBus.$emit('phonenum', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//获取邮箱验证码
export const userEmail = function ({commit, state}, email) {
    const oauth = Cache.get(cache_keys.token);
    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/email/code', {
            email
        }, {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status){
                EventBus.$emit('useremail', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//修改用户邮箱
export const modifyEmail = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/users/update/email', {
            email: data.email,
            code: data.code,
        },{
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status){
                EventBus.$emit('modifyemail', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

// 根据ID获取用户信息
export const queryIdInfo = function ({commit, state}, id) {
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/u/' + id, {
            headers:{
                Authorization: access_token
            }
        })
		.then(res => {
			res = res.data;
			if (res.status) {
                EventBus.$Indicator.remove();
                EventBus.$emit('idInfo', res);//用户资料
                EventBus.$emit('idUser', res);//我的档案
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({body: '服务端出错'});
		})
}
// 获取用户回答的信息
export const queryUserAnswer = function ({commit, state}, data) {
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/u/' + data.id + '/answers', {
			params: {
				page: data.page
			},
            headers:{
                Authorization: access_token
            }
		})
		.then(res => {
			res = res.data;
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('answer', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取用户提问信息
export const queryUserAsk = function ({commit, state}, data) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/u/' + data.id + '/questions', {
			params: {
				page: data.page
			},
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('ask', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取用户博客信息
export const queryUserBlog = function ({commit, state}, data) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/u/' + data.id + '/posts', {
			params: {
				page: data.page
			},
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('blog', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
};

// 获取用户课程信息
export const queryUserCourse = function ({commit, state}, data) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';
	EventBus.$Indicator.blade();
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/u/' + data.id + '/courses', {
			params: {
				page: data.page,
				type: data.type
			},
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('course', res);
			} else {
				EventBus.$Modal.confirm({body: res.message || '请求失败'})
			}
		}, err => {
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
		.then(ret =>{
			EventBus.$Indicator.remove();
		})
};

// 获取用户关注的问题
export const queryUserFocusQuestions = function ({commit, state}, data) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/u/' + data.id + '/focusQuestions', {
			params: {
				page: data.page,
			},
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$emit('focusQuestions', res);
		})
};

// 获取用户关注的话题
export const queryUserFocusTopics = function ({commit, state}, data) {
	var oauth = Cache.get(cache_keys.token);
	var access_token = oauth ? oauth.access_token : '';

	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/u/' + data.id + '/focusTopics', {
			params: {
				page: data.page
			},
			headers:{
				Authorization: access_token
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$emit('focusTopics', res);
		})
};

// 修改个人资料
export const updateinfo = function ({commit, state}, data) {
	const oauth = Cache.get(cache_keys.token);

	EventBus.$http
		.post(EventBus.$Config.baseUrl + 'api/users/update/info', {
			sex:data.sex,
			birthday: data.birthday,
			province: data.province,
			city: data.city,
			truename: data.truename,
			signature: data.signature,
            homepage: data.homepage
		}, {
			headers:{
				Authorization: oauth.access_token
			}
		})
		.then(res => {
			res = res.data;
			if (res.status) {
				EventBus.$emit('UpdateInfo', true, res);
			} else {
                EventBus.$emit('UpdateInfo', false, res);
			}
		}, err => {
            EventBus.$emit('UpdateInfo', false, {
                message: '服务端出错'
            });
		})
}


// 搜索
export const querySearchList = function ({commit, state}, data) {
	EventBus.$http
		.get(EventBus.$Config.baseUrl + 'api/search', {
			params: {
				q: data.q,
				type: data.type,
				page: data.page || 1
			}
		})
		.then(res => {
			res = res.data;
			EventBus.$Indicator.remove();
			if (res.meta && res.meta.pagination) {
				EventBus.$emit('searchList', res);
			} else {
				EventBus.$Modal.confirm({body: '请求失败'});
			}
		}, err => {
			EventBus.$Indicator.remove();
			EventBus.$Modal.confirm({body: '服务端出错'});
		})
}

//获取工作经历信息
export const queryWork = function ({commit, state}, id) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/u/resume/work/' + id + '/show', {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('idWork', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//获取项目档案信息
export const queryProject = function ({commit, state}, id) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/u/resume/project/' + id + '/show', {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('idProject', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//获取学习经历信息
export const querySchool = function ({commit, state}, id) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/u/resume/school/' + id + '/show', {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('idSchool', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//添加工作经历
export const editWork = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/u/resume/work', {
            name: data.name,
            role: data.role,
            start_at: data.start_at,
            end_at: data.end_at,
            city: data.city,
            tags: data.tags,
            description: data.description
        }, {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('EditWork', true, res);
            } else {
                EventBus.$emit('EditWork', false, res);
            }
        }, err => {
            EventBus.$emit('EditWork', false, {
                message: '服务端出错'
            });
        })
}

//添加项目经历
export const editProject = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/u/resume/project', {
            name: data.name,
            role: data.role,
            start_at: data.start_at,
            end_at: data.end_at,
            url: data.url,
            tags: data.tags,
            description: data.description
        }, {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('EditProject', true, res);
            } else {
                EventBus.$emit('EditProject', false, res);
            }
        }, err => {
            EventBus.$emit('EditProject', false, {
                message: '服务端出错'
            });
        })
}

//添加学校经历
export const editSchool = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/u/resume/school', {
            name: data.name,
            department: data.department,
            start_at: data.start_at,
            end_at: data.end_at,
            degree: data.degree,
            tags: data.tags,
            description: data.description
        }, {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('EditSchool', true, res);
            } else {
                EventBus.$emit('EditSchool', false, res);
            }
        }, err => {
            EventBus.$emit('EditSchool', false, {
                message: '服务端出错'
            });

        })
}

//修改工作经历
export const modifyWork = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .put(EventBus.$Config.baseUrl + 'api/u/resume/work/' + data.id, {
            name: data.name,
            role: data.role,
            start_at: data.start_at,
            end_at: data.end_at,
            city: data.city,
            tags: data.tags,
            description: data.description
        }, {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('ModifyWork', true, res);
            } else {
                EventBus.$emit('ModifyWork', false, res);
            }
        }, err => {
            EventBus.$emit('ModifyWork', false, {
                message: '服务端出错'
            });

        })

}

//修改学校经历
export const modifySchool = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .put(EventBus.$Config.baseUrl + 'api/u/resume/school/' + data.id, {
            name: data.name,
            department: data.department,
            start_at: data.start_at,
            end_at: data.end_at,
            degree: data.degree,
            tags: data.tags,
            description: data.description
        }, {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('ModifySchool', true, res);
            } else {
                EventBus.$emit('ModifySchool', false, res);
            }
        }, err => {
            EventBus.$emit('ModifySchool', false, {
                message: '服务端出错'
            });

        })
}

//修改项目经历
export const modifyProject = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .put(EventBus.$Config.baseUrl + 'api/u/resume/project/' + data.id, {
            name: data.name,
            role: data.role,
            start_at: data.start_at,
            end_at: data.end_at,
            url: data.url,
            tags: data.tags,
            description: data.description
        }, {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('ModifyProject', true, res);
            } else {
                EventBus.$emit('ModifyProject', false, res);
            }
        }, err => {
            EventBus.$emit('ModifyProject', false, {
                message: '服务端出错'
            });

        })
}

//删除学习经历信息
export const deleteSchool = function ({commit, state}, id) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .delete(EventBus.$Config.baseUrl + 'api/u/resume/school/' + id , {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('delSchool', true, res);
            } else {
                EventBus.$emit('delSchool', false, res);
            }
        }, err => {
            EventBus.$emit('delSchool', false, {
                message: '服务端出错'
            });

        })
}

//删除工作经历信息
export const deleteWork = function ({commit, state}, id) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .delete(EventBus.$Config.baseUrl + 'api/u/resume/work/' + id , {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('delWork', true, res);
            } else {
                EventBus.$emit('delWork', false, res);
            }
        }, err => {
            EventBus.$emit('delWork', false, {
                message: '服务端出错'
            });

        })
}

//删除项目经历信息
export const deleteProject = function ({commit, state}, id) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .delete(EventBus.$Config.baseUrl + 'api/u/resume/project/' + id , {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('delProject', true, res);
            } else {
                EventBus.$emit('delProject', false, res);
            }
        }, err => {
            EventBus.$emit('delProject', false, {
                message: '服务端出错'
            });

        })
}


//上传头像
export const uploadAvatar =function({commit,state},file){
    if (!/(jpg|jpeg|gif|bmp|png)$/i.test(file.type)) {
        EventBus.$Modal.confirm({title:"消息提示",body:"图片格式错误"});
        return;
    }
    if (file.size > 10485760 ) {
        EventBus.$Modal.confirm({title:"消息提示",body:"图片大小不可超过10M"});
        return;
    }
    exif.getData(file, () => {
        let Orientation = exif.getTag(file, 'Orientation') || 1;
        EventBus.$Indicator.blade();
        var oauth = Cache.get(cache_keys.token);
        var form = new FormData();
        try {
            form.append('Content-Type', file.type || 'application/octet-stream');
            form.append('avatar_file', file);
            form.append('Orientation', Orientation);
        } catch (err) {
            // this.uploading = false;
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({title:"消息提示",body:"图片格式错误"});
            return;
        }
        EventBus.$http.post(EventBus.$Config.baseUrl+'api/users/upload/avatar',form,{
            headers: {
                Authorization: oauth.access_token
            }
        }).then(res=>{
            res=res.data;
            EventBus.$Indicator.remove();
            // EventBus.$Modal.info({title:"消息提示",body:"上传成功"});
            EventBus.$emit("upload_img",res.data.url);
        },err=>{
            EventBus.$Indicator.remove();
            EventBus.$Modal.confirm({title:"消息提示",body:"上传失败"});
        });
    });

}

//实名认证
export const idCard = function ({commit, state}, data) {
    const oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .post(EventBus.$Config.baseUrl + 'api/users/verify/apply', {
            name: data.name,
            photo: data.photo,
            card: data.card
        }, {
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('IdCard', true, res);
            } else {
                EventBus.$emit('IdCard', false, res);
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//获取实名认证信息
export const queryidCard = function ({commit, state}, data) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/users/identity', {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('qIdCard', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
	    .then(() => {
		    EventBus.$Indicator.remove();
	    })
}

//我的任务
export const FinishTask = function ({commit, state}, data) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/users/task', {
            headers:{
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.status) {
                EventBus.$emit('finishtask', res)
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//我的关注
export const MyFollows = function ({commit, state}, data) {
    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/u/' +data.id+ '/follows', {
            params: {
                page: data.page
            },
            headers: {
                Authorization: access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.meta && res.meta.pagination) {
                EventBus.$emit('myfollows', res)
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//我的粉丝
export const MyFans = function ({commit, state}, data) {

    var oauth = Cache.get(cache_keys.token);
    var access_token = oauth ? oauth.access_token : '';

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/u/' +data.id+ '/fans', {
            params: {
                page: data.page
            },
            headers: {
                Authorization: access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.meta && res.meta.pagination) {
                EventBus.$emit('myfans', res)
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body: '服务端出错'});
        })
}

//获取我的动态
export const queryTrends = function ({commit, state}, data) {

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/u/' + data.id + '/activity', {
            params: {
                page: data.page
            }
        })
        .then(res => {
            res = res.data;
            if (res.meta && res.meta.pagination) {
                EventBus.$emit('trend', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body:'服务端出错'});
        })
}


//消息中心
export const queryMessagecenter = function ({commit, state}, data) {
    var oauth = Cache.get(cache_keys.token);

    EventBus.$http
        .get(EventBus.$Config.baseUrl + 'api/users/notifications', {
            params: {
                page: data.page,
                type: data.type
            },
            headers: {
                Authorization: oauth.access_token
            }
        })
        .then(res => {
            res = res.data;
            if (res.meta && res.meta.pagination) {
                EventBus.$emit('messagecenter', res);
            } else {
                EventBus.$Modal.confirm({body: res.message || '请求失败'})
            }
        }, err => {
            EventBus.$Modal.confirm({body:'服务端出错'});
        })
}
