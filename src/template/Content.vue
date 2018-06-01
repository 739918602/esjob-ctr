<template>
  <el-table
    v-loading="loading"
    :data="jobList"
    stripe
    style="width: 100%"
    height="600px"
    :expand-row-keys='[0]'
    :row-key="eachRow">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="任务名">
            <span>{{ props.row.jobName }}</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="实例数量">
            <span>{{ props.row.instanceCount }}</span>
          </el-form-item>
          <el-form-item label="分片数量">
            <span>{{ props.row.shardingTotalCount }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row.status }}</span>
          </el-form-item>
          <el-form-item label="">
            <span></span>
            
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      prop="jobName"
      label="任务名">
    </el-table-column>
    <el-table-column
      prop="description"
      align="center"
      label="描述">
    </el-table-column>
    <el-table-column
      align="center"
      prop="status"
      label="状态">
      <template slot-scope="scope">
        <el-tag :type="scope.row.statusStyle">{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.status!='DISABLED'"
          type="primary"
          size="mini"
          @click="operate('trigger',scope.row)"
          >触发</el-button>
        <el-button
          v-if="scope.row.status!='DISABLED'"
          size="mini"
          type="info"
          @click="operate('disable',scope.row)"
          >禁用</el-button>
        <el-button
          v-if="scope.row.status=='DISABLED'"
          size="mini"
          type="success"
          @click="operate('enable',scope.row)"
          >启用</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import apis from '../api/apis.vue'
  import Qs from 'qs'
export default {
  data(){
      return{
        jobList:[],
        loading:false,
        baseUrl:{},
        job:{},
        zk:{}
      }
  },
  created(){
    this.loadData(this.$route.params.path)
  },
  methods:{
    operate(op,row){
      let startTime = new Date().getTime();
      var url = this.baseUrl + this.job.namespace+'/'+ row.jobName +'/'+ op;
      this.$ajax.post(url,Qs.stringify({pass: "Bestpay!23",zkUrl:this.zk.zkUrl}),{
            timeout: 10000,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         }, 
         }).then(res=>{
           if(res.data.success){
              this.$notify({
                title: op + '成功  ' +  String(new Date().getTime() - startTime) + 'ms',
                message: this.job.name+'-'+ this.zk.name,
                type: 'success'
              });
              this.loadData(this.$route.params.path)
           }
         }).catch(res=>{
           this.$notify({
                title: op + '超时  ' + String(new Date().getTime() - startTime) + 'ms',
                message: this.job.name+'-'+ this.zk.name,
                type: 'error'
            });
            this.loadData(this.$route.params.path)
         });  

    },
    eachRow(row){
      switch (row.status) {
        case 'OK':row.statusStyle = 'success'
          break;
        case 'CRASHED':row.statusStyle = 'danger'
          break;
        case 'DISABLED':row.statusStyle = 'info'
          break;
        case 'SHARDING_FLAG':row.statusStyle = 'warning'
          break;
        default:
          break;
      }
      return row.jobName
    },
    loadData(menuPath,oldVal){        
        //下标0为菜单坐标 下标1为job坐标  2为zk信息坐标
        console.log(menuPath)
        let startTime = new Date().getTime()
        let coord = menuPath.split('-');
          this.loading = true;
          let job = this.job = apis.esjobs[coord[1]];
          let zk = this.zk = job.zkAddrs[coord[2]];
          this.baseUrl = apis.urls[zk.key].url;
          let url = this.baseUrl +job.namespace + '/*/' + 'getJobs';
          console.log(apis.urls[zk.key])
          this.$ajax.post(url,Qs.stringify({pass: "Bestpay!23",zkUrl:zk.zkUrl}),{
            timeout: 10000,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         }, 
         }).then(res=>{
           if(res.data.success){
              this.jobList = res.data.result
              this.$notify({
                title: '数据加载成功  ' +  String(new Date().getTime() - startTime) + 'ms',
                message: job.name+'-'+zk.name,
                type: 'success'
              });
           }
           this.loading = false;
         }).catch(res=>{
           console.log(res)
           this.$notify({
                title: '数据加载超时  ' + String(new Date().getTime() - startTime) + 'ms',
                message: job.name+'-'+zk.name,
                type: 'error'
            });
           this.loading = false;
           this.$router.push({name:'jobs',params:{path:oldVal}});
         });  
    },

  },
  watch:{
    "$route.params.path":function(newVal,oldVal){
      console.log('触发watch',newVal,oldVal)
      this.loadData(newVal,oldVal)
    }
  }
}
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    text-align: left;
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>