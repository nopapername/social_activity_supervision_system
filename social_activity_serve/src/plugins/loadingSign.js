/*
 * @Author: Mr_Oyjh
 * @Date: 2020-03-10 15:52:50
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-10 17:45:12
 */
/* eslint-disable */
import {
  Loading
} from 'element-ui'
import Vue from 'vue'

let loadingInstance
const loadingSign = {
  start: (notice, bgcolor, fullscreen) => {
    loadingInstance = Loading.service({
      fullscreen: fullscreen ? fullscreen : true,
      text: notice ? notice : '加载中...',
      background: bgcolor ? bgcolor : 'rgba(0,0,0,.7)',
      lock: true
    })
  },
  end: () => {
    Vue.nextTick(() => {
      loadingInstance.close()
    })
  }
}

export default loadingSign
