<template>
  <div>
    <div style="width: 100%; height: 300px" ref="chart"></div>
  </div>

</template>

<script>
const echarts = require("echarts");//导入echarts模块
export default {
  name: "echart", //导出的名字
  data() {
    return {

    };
  },
  props:['QueryOption'],//接收父组件传来的参数
  methods: {
    //画图分为两个步骤 1.init选择容器初始化 2.setOption画图参数为画图数据
    initCharts() {
      // init初始化 实例一个对象 初始化时候就可以改变canvas大小
      

    },
  },
  mounted() {
    // this.initCharts();
    let myChart = echarts.init(this.$refs.chart,{width:'90%',height:'210px'});
    setInterval(()=>{
      // 绘制图表 数据更新需要重新绘制图标 每一秒刷新图
      // console.log(this.QueryOption)
      myChart.setOption(this.QueryOption);
    },1000)
  },
};
</script>
<style scoped>
</style>