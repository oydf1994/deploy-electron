import axios from 'axios'
import {
    Message
} from 'element-ui'
import VueCookies from 'vue-cookies'
// axios.defaults.baseURL = 'http://127.0.0.1:7003';
axios.defaults.baseURL = 'http://electron.east0616.top/';
axios.interceptors.request.use(config => {
    if (config.url.indexOf('login') == -1) {
        config.headers.token = JSON.parse(window.localStorage.getItem('user')).token
    }
    return config
}, err => {
    return Promise.reject(err)
})
function checkStatus(res) {
    if (res.data.status != 200) {
        Message.error({
            title: '错误',
            message: res.data.message,
            duration: 2000
        })
        return false
    } else {
        return res.data.data
    }
}

function errStatus(res) {
    Message.error({
        title: '错误',
        message: res,
        duration: 2000
    })
    return false
}
export default {
    error(message) {
        Message.error({
            title: '错误',
            message: (message || '未知异常'),
            duration: 2000
        })
    },
    warning(message) {
        Message.warning({
            title: '温馨提示',
            message: (message || '未知异常'),
            duration: 2000
        })
    },
    file(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url,
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then(checkStatus).catch(errStatus)
    },
    success(message) {
        Message.success({
            title: '成功',
            message: (message || '操作成功'),
            duration: 2000
        });
    },
    get(url, params) { //返回封装后的 get 方法
        if (!url) return
        return axios({
            method: 'get',
            url,
            params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(checkStatus).catch(errStatus)
    },
    post(url, data) { //返回封装后的 post 方法
        if (!url) return
        return axios({
            method: 'post',
            url,
            data,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(checkStatus).catch(errStatus)
    }
}
