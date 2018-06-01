import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import Head from './template/Head.vue'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
//Vue.prototype.$router = router
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
