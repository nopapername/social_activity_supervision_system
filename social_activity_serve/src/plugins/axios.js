'use strict'
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
import { Message } from 'view-design';
import loadingSign from '@/plugins/loadingSign'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localStorage.adminToken) {
      config.headers.Authorization = localStorage.adminToken
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    const { status } = error.response
    loadingSign.end()
    if (status == 401) {
      localStorage.removeItem("adminToken")
      Message.error({
        content:'密码失效，重新登录',
        duration:3
      })
      router.push('/login')
  } else {
      Message.error({
        content:error.response.data.result,
        duration:2
      })
    }
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
