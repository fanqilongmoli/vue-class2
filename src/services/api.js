import Axios from 'axios'

export default (Vue) => {
    Axios.interceptors.request.use(
        config => {

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    Axios.interceptors.response.use(
        response => {
            // 对错误码进行统一的处理
            if (response.data.code !== 0) {
                return Promise.reject('有错')
            }
            return response
        },
        error => {
            return Promise.reject(error.response.data) // 返回接口返回的错误信息
        })

    Vue.prototype.$axios = Axios;
}