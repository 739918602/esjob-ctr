<script>
    const urls = {
        preProd:{url:"https://zhongchou-pre.bestpay.com.cn/elasticJob/",name:"准生产"},
        prod:{url:"https://zhongchou.bestpay.com.cn/elasticJob/",name:"生产"},
        test:{url:"http://116.228.151.160:48088/elasticJob/",name:"新综测"},
        test46:{url:"http://zhongchou.test1.bestpay.net/elasticJob/",name:"46环境"},
        local:{url:"http://127.0.0.1:8080/financing-crowdfunding-front/elasticJob/",name:"本地"}
    }
    const esjobs = [
          {
            name:'贵金属核心',
            namespace: 'financing-crowdfunding-core-job',
            zkAddrs:[
              {name:"准生产",zkUrl:"pre-lock-zk.bestpay.mid:2181",key:"preProd"},
              {name:"生产",zkUrl:"elasticjob-zk.bestpay.mid:2181",key:"prod"},            
              {name:"新综测",zkUrl:"172.17.164.250:2181",key:"test"},
              {name:"46环境",zkUrl:"172.17.45.15:2181",key:"test46"},
              {name:"本地",zkUrl:"172.17.42.12:2181",key:"local"}
          ]},
          {
            name:'综管台',
            namespace: 'mis-mis-job',
            zkAddrs:[
              {name:"准生产",zkUrl:"pre-dubbo-zk.bestpay.mid:2181",key:"preProd"},
              {name:"生产",zkUrl:"dubbo-zk.bestpay.mid:2181",key:"prod"},            
              {name:"新综测",zkUrl:"172.17.164.250:2181 ",key:"test"},
              {name:"46环境",zkUrl:"172.17.45.14:2181",key:"test46"}
            
          ]}
        ]
    export default {
        urls,
        esjobs
    }
</script>
