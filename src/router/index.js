import Vue from 'vue'
import Router from 'vue-router'
import Head from '../template/Head.vue'
import Content from '../template/Content.vue'
import App from '../App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {name:'jobs',path: '/content/:path', component: Content},
    {path: '/22', component: Head}
  ]
  
})
