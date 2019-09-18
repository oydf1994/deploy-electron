import Vue from 'vue'
import api from './assets/javascript/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import './assets/css/style.css'
Vue.use(VueCookies) //cookie
Vue.use(ElementUI, {
  size: 'small'
});
Vue.prototype.$api = api;
Vue.prototype.$handleClose = function (done) {
  done() // 统一关闭弹窗
}
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
