/**
 * Created by lcfevr on 16/7/18.
 */
require('./polyfill');
import * as easingEquations from '../utils/easing';
import * as exif from './exif';

import Config from '../config/config';
import wechat from './wechat';

// 缓存模块
import * as Cache from './cache';
import cacheKeys from './cache-keys';

export function strLength(str) {
    var oLength = 0;
    for (let ch of str) {
        if (ch.codePointAt(0) > 0xFFF) {
            oLength += 4
        } else {
            oLength += 2
        }
    }
    return oLength;
}
export function getLength(str) {
    return [...str].length;
}

export function getMultiArr(arr, ...newArr) {
    arr.push(...newArr);
    return arr;
}
export function pushArr(arr, newArr) {
    arr.push(...newArr)
    return arr;
}
export function baseImg(imgObj, callback) {
    var reader = new FileReader();
    reader.onload = callback()
    reader.readAsDataURL(imgObj)
}
export function objToArr(obj) {
    var arr = [];
    Object.keys(obj).forEach(function (item) {
        arr.push(obj[item])
    })

    return arr;
}
export function setPageTitle(title) {
    document.title = title;

    if (Config.isIphone && Config.isWechat) {
        var body = document.getElementsByTagName('body')[0];
        var iframe = document.createElement('iframe');
        // iframe.setAttribute('src', '/favicon.ico');

        iframe.addEventListener('load', function () {
            setTimeout(function () {
                iframe.removeEventListener('load');
                document.body.removeChild(iframe);
            }, 0);
        });
        document.body.appendChild(iframe);
    }
	var link = window.location.href;
	var info = Cache.get(cache_keys.info);
	if (info && info.meta && info.meta.agentCode) {
		if (link.indexOf('?') != -1) {
			link = link + '&rf=' + info.meta.agentCode;
		} else {
			link = link + '?rf=' + info.meta.agentCode;
		}
	}

    wechat.update_share({
        title:title,
        desc:title,
        link: link
    });

}

/**
 * scrollTo position
 * @param container: the container current scrollTop
 * @param element: the target scrollY property
 * @param offset: the offset padding
 * @param duration: total animation time
 * @param easing: easing equation to use
 */
export const scrollTo = function (container, element, offset = 0, duration = 500, easing = 'easeOutSine') {
	var scrollY = container.scrollTop,
		scrollTargetY = getPos(element).top + offset,
		currentTime = 0,
		startTime = 0;

	// add animation loop
	function tick() {
		currentTime = Date.now();

		var p = (currentTime - startTime) / duration;
		var t = easingEquations[easing](p);

		if (p < 1) {
			requestAnimationFrame(tick);

			container.scrollTop = scrollY + ((scrollTargetY - scrollY) * t);
		} else {
			container.scrollTop = scrollTargetY;
		}
	}

	// call it once to get started
	startTime = Date.now();
	tick();
};

/**
 * get element position of screen
 * @param element
 * @returns {number}
 */
/**
 *
 * @param element
 * @returns {{ top, left }}
 */
export const getPos = function(element) {
	var left = 0,
		top = 0;

	if (!element) return { top, left };

	do {
		left += element.offsetLeft;
		top += element.offsetTop;
	} while ( element = element.offsetParent );

	return { top, left };
};

var write = document.write;
export const loadJs = function (urls, callback, fallback) {
    if (typeof urls !== 'string' && !Array.isArray(urls)) return;
    var arrays = Array.isArray(urls) ? urls : [urls];
    if (!arrays.length) return;

    var src = arrays.shift();

    document.write = function(content) {
        var matches = /<script[^>]+src="([^"]+)"/i.exec(content);

        if (matches && matches[1]) {
            arrays.push(matches[1]);
        } else {
            var html = document.body.innerHTML;
            document.body.innerHTML = html + content;
        }
    };

    appendScript(src, function () {
        if (arrays.length) {
            loadJs(arrays, callback);
        } else {
            document.write = write;
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    }, function () {
        unloadJs(src, function () {
            console.error('Failed to load: ' + src);

            document.write = write;
            if (fallback && typeof fallback === 'function') {
                fallback();
            }
        });
    });
};

export const unloadJs = function (urls, callback) {
    if (typeof urls !== 'string' && !Array.isArray(urls)) return;
    var arrays = Array.isArray(urls) ? urls : [urls];
    if (!arrays.length) return;
    arrays = arrays.map(u => u.replace(/^[^/]*?\/\//, ''));

    var scripts = document.body.querySelectorAll('script');
    for (let script of scripts) {
        let src = script.getAttribute('src');
        if (!!~arrays.indexOf(src)) {
            document.body.removeChild(script);
        }
    }

    if (callback && typeof callback === 'function') {
        callback();
    }
};

function appendScript(src, callback, fallback) {
    if (existsScript(src)) {
        if (callback && typeof callback === 'function') callback();
        return;
    }

    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = src;
    if (callback && typeof callback === 'function') script.onload = callback;
    if (fallback && typeof fallback === 'function') script.onerror = fallback;

    document.body.appendChild(script);
}

export function existsScript(src) {
    var scripts = document.body.querySelectorAll('script');
    for (let script of scripts) {
        if (script.getAttribute('src') === src) {
            return true;
        }
    }

    return false;
}

export function camelcaseToHyphen(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}


export function findComponentUpward (content, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = content.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

export function findComponentDownward (content, componentName) {
    const childrens = content.$children;
    let children = null;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
            }
        });

        for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i];
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}

export function findComponentsDownward (content, componentName, components = []) {
    const childrens = content.$children;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            const childs = child.$children;

            if (name === componentName) components.push(child);
            if (childs.length) {
                const findChilds = findComponentsDownward(child, componentName, components);
                if (findChilds) components.concat(findChilds);
            }
        });
    }
    return components;
}

export function random_str() {
    let len = 32;
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let max = chars.length;

    let str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * max));
    }
    return str;
}

// 环境
export const env = {
    isIPad: /ipad/i.test(window.navigator.userAgent),
    isIphone: /iphone|ipad|ipod/i.test(window.navigator.userAgent),
    isWechat: /MicroMessenger/i.test(window.navigator.userAgent)
};

// 判断
export const is = {
    has(val) {
        return !!val;
    },
    not(val) {
        return !val;
    },
    empty(val) {
        return val === '';
    },
    equal(v1, v2) {
        return v1 === v2;
    },
    qq(val) {
        return val &&　/^[1-9]\d{4,12}$/.test(val);
    },
    name(val) {
        return val &&　/^[A-Za-z0-9\u4E00-\u9FA5_]{2,14}$/.test(val);
    },
    projectsname(val) {
        return val &&　/^[A-Za-z0-9\u4E00-\u9FA5_]{2,32}$/.test(val);
    },
    mobile(val) {
        return val && /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/.test(val);
    },
    fifteen(val) {
        return val && /^[\d\-_+]{2,15}$/.test(val);
    },
    email(val) {
        return val && /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
    },
    url(val) {
        return val && /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(val);
    },
    identity_no(code){
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        var pass = true;

        if (!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dx]$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }

        else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        return pass;
    },
    password(val) {
        return val && val.length && val.length > 5;
    }
};

// 全局配置
var globalConfigs = Config.PROJECT;

var cache_keys = cacheKeys(globalConfigs);

export {
    Cache,
    cache_keys,
    globalConfigs,
    exif
};
