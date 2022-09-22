<template>
  <div class="main">
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%; font-size: 18px">
        //*直接绑定一个方法改变classname来改变颜色,原理都是通过改变class来改变颜色
        <el-table-column prop="index" label="箱号" align="center" width="100">
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <!-- //!也可以获取到整个table数据 -->
          <template slot-scope="Tip">
            <el-tag
              class="TipBorder"
              disable-transitions
              effect="dark"
              size="medium"
              :color="Tip.row.state ? '#13ce66' : '#ff4949'"
              >{{ Tip.row.state ? "运行中" : "已关机" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="temp" label="温度" align="center">
        </el-table-column>
        <el-table-column prop="hum" label="湿度" align="center">
        </el-table-column>
        <el-table-column prop="state" label="控制" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-text="开启"
              inactive-text="关闭"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row.state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="transport" label="运输状况" align="center">
          <!-- 作用域插槽用于获取子组件的data,这里上这一行的data-->
          <template slot-scope="scope">
            <i class="el-icon-position"></i>
            <el-button
              style="width: 100%; font-size: 18px"
              @click="handleClick(scope.row.index)"
              type="text"
              size="medium"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //每一行数据
      tableData: [
        {
          index: "1",
          temp: "5.2℃",
          hum: "5.2%",
          transport: "否",
          state: true,
        },
        {
          index: "2",
          temp: "2.4℃",
          hum: "3.1%",
          transport: "是",
          state: true,
        },
        {
          index: "3",
          temp: "1.9℃",
          hum: "5.1%",
          transport: "否",
          state: true,
        },
        {
          index: "4",
          temp: "3.2℃",
          hum: "2.1%",
          transport: "是",
          state: true,
        },
        {
          index: "5",
          temp: "11℃",
          hum: "2.25%",
          transport: "否",
          state: false,
        },
        {
          index: "6",
          temp: "2.7℃",
          hum: "1.1%",
          transport: "是",
          state: true,
        },
        {
          index: "7",
          temp: "3.2℃",
          hum: "1.3%",
          transport: "是",
          state: true,
        },
        {
          index: "8",
          temp: "1.1℃",
          hum: "2.4%",
          transport: "是",
          state: true,
        },
        {
          index: "9",
          temp: "14℃",
          hum: "1.02%",
          transport: "是",
          state: false,
        },
        {
          index: "10",
          temp: "12℃",
          hum: "1.9%",
          transport: "是",
          state: true,
        },
        {
          index: "11",
          temp: "5.2℃",
          hum: "1.10%",
          transport: "是",
          state: true,
        },
        {
          index: "12",
          temp: "1.9℃",
          hum: "0.9%",
          transport: "是",
          state: true,
        },
        {
          index: "13",
          temp: "3℃",
          hum: "1.19%",
          transport: "否",
          state: true,
        },
      ],
    };
  },
  beforeMount() {
    this.$store.dispatch("AsyncDataChange");
  },
  mounted() {
    setInterval(() => {
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].state == false) {
          this.tableData[i].temp = "没有数据源";
          this.tableData[i].hum = "没有数据源";
        } else {
          this.tableData[i].temp =
            ((this.$store.state.Ydata1 + i) / 2).toFixed(2) + "℃";
          this.tableData[i].hum =
            ((this.$store.state.Ydata2 + i) / 2).toFixed(2) + "%";
        }
      }
    }, 1000);
  },
  methods: {
    changeSwitch(states) {
      if (states == true) {
        this.$message({
          message: "开启成功",
          type: "success",
          offset:'40'
        });
      }
      if (states == false) {
        this.$message({
          message: "关闭成功",
          type: "fail",
        });
      }
    },
    handleClick(row) {
      this.$router.push({
        path: "/itemDetail",
        query: {
          id: row,
        },
      }); //点击跳转路由 实现子路由的切换 并传参
    },
  },
};
</script>
<style scoped>
/* //! 使用:row-class-name如果有stripe需要把scoped(模块私有样式)*/
/* //!去掉互相冲突(去掉冲突但没有scoped很容易造成整体样式混淆) 最好一个页面一个css*/
.el-table {
  width: 100%;
}
.main {
  width: 100%;
  height: 100%;
}
.box-card {
  width: 100%;
  height: 100vh;
}
.TipBorder {
  border: 1px;
  width: 100%;
  font-size: 18px !important;
}
</style>