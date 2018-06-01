<template>
  <div id="app">
    <!-- head占位 -->
  <hd/>
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  </div>
</template>

<script>
import Head from './template/Head.vue'

export default {
  methods: {
  },
  components:{
    'hd':Head
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
