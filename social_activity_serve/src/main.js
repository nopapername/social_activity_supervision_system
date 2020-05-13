import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'

import '@/assets/css/reset.css'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入viewUI
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import ECharts from 'vue-echarts'
Vue.component('chart', ECharts)

Vue.use(ElementUI)
Vue.use(ViewUI)

Vue.config.productionTip = false

Vue.prototype.submitOperating = function (email, role, operate) {
  const optObj = {
    email: email,
    role: role,
    operate: operate
  }
  this.$axios.post('http://localhost:3000/api/admin/submitOperating', optObj).then(res => {
    if (res) {
      console.log('成功')
    }
  }).catch(err => {
    console.log(err)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
