<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" >{{activeName}}</el-menu-item>
  <el-submenu index="2">
    <template slot="title">环境切换</template>
    <!-- job循环生成 -->
    <el-submenu :index="'2-'+ index" v-for="(job, index)  in esjobs" :key="index">
      <template slot="title">{{job.name}}</template>
      <!-- zk信息循环  -->
      <el-menu-item :index="'2-'+index+'-'+i" v-for="(zk,i) in job.zkAddrs" :key="i">
        {{zk.name}}
      </el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4">调度管理</el-menu-item>
</el-menu>

</template>


<script>
  import apis from '../api/apis.vue'
  import Qs from 'qs'
  export default {
    mounted(){
        this.activeNameChange();
    },
    data() {
      return {
        activeIndex: '1',
        activeName:'环境未指定',
        esjobs:apis.esjobs
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        //下标0为菜单坐标 下标1为job坐标  2为zk信息坐标
        if(keyPath[0]==2){
          this.$router.push({name:'jobs',params:{path:key}});
        }
      },
      activeNameChange(){
        this.activeIndex= this.$route.params.path
        let res = this.activeIndex.split('-');
        let job = apis.esjobs[res[1]];
        let zk = job.zkAddrs[res[2]];
        this.activeName = job.name + '-' + zk.name;
      }
    },
    watch:{
      "$route.params.path":function(newVal,oldVal){
          this.activeNameChange();
      }
    }
  }
</script>