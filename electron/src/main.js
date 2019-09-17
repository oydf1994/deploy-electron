import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.less'
import api from './assets/javascript/axios' // 请求封装
import VueCookies from 'vue-cookies'

Vue.prototype.$api = api;
Vue.use(ElementUI, {
  size: 'small'
});
Vue.use(VueCookies) //cookie

Vue.config.productionTip = false
Vue.prototype.$handleClose = function (done) {
  done() // 统一关闭弹窗
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
