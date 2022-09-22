<template>
  <div>
    <div>
      <div>
        <el-card class="card-top">
          <h2 class="title">{{ queryId }}号箱实时数据采集</h2>
          <!-- <el-time-picker
            class="picker"
            is-range
            arrow-control
            v-model="value2"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker> -->
        </el-card>
      </div>
      <div style="margin-top: 10px">
        <el-card class="box-card-top">
          <div slot="header" class="clearfix">
            <span>
              <b> {{ queryId }}号箱数据 </b>
            </span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div class="TimeChose">
            <el-card class="card-title"> 平均温度：{{ Yaverage1 }}℃ </el-card>
            <el-card class="card-title"> 平均湿度：{{ Yaverage2 }}% </el-card>
            <el-card class="card-title"> 最高温度：{{ Maxtep }}℃ </el-card>
            <el-card class="card-title"> 最低温度：{{ Mintep }}℃ </el-card>
            <el-card class="card-title"> 最高湿度：{{ Maxhum }}% </el-card>
            <el-card class="card-title"> 最低湿度：{{ Minhum }}% </el-card>
            <el-card class="card-title">
              经纬度:({{ TofixedPosition1 }},{{ TofixedPosition2 }})
            </el-card>
          </div>
        </el-card>
      </div>
    </div>
    <div class="pic">
      <el-card class="box-card">
        <echart :QueryOption="option1"></echart>
        <echart :QueryOption="option2"></echart>
      </el-card>
      <el-card class="box-card">
        <mapss :position="position"></mapss>
      </el-card>
    </div>
  </div>
</template>
<script>
function getTime() {
  let date = new Date();
  let House = date.getHours();
  let Minutes = date.getMinutes();
  let Seconds = date.getSeconds();
  let nowDate = House + "-" + Minutes + "-" + Seconds;
  return nowDate;
}
export default {
  data() {
    return {
      position: {
        lat: 30.91039,
        lng: 103.694,
      },
      queryId: "",
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      option1: {},
      option2: {},
      Ydata2: [],
      Ydata1: [],
      Xtime2: [],
      array: [],
    };
  },
  //当其依赖的属性的值发生变化时(通常是data里面的值)，计算属性会重新计算，反之，则使用缓存中的属性值。
  computed: {
    //返回值一般用于展示在template
    SortTime() {
      //   // let NewArray = this.Xtime2.map(i=>i+'11') //每一项加'11'
      let NewArray = this.Xtime2.sort((x, y) => {
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      return NewArray;
    },
    Yaverage1() {
      //将array的长度赋给len
      let len = this.Ydata1.length;
      let sum = 0;
      //利用for循环遍历数组的内容，利用sum累加求和
      for (var i = 0; i < len; i++) {
        sum += this.Ydata1[i];
      }
      //        返回数组的和与长度求平均值
      return (sum / len).toFixed(2);
    },
    Yaverage2() {
      let len = this.Ydata2.length;
      let sum = 0;
      //利用for循环遍历数组的内容，利用sum累加求和
      for (var i = 0; i < len; i++) {
        sum += this.Ydata2[i];
      }

      //        返回数组的和与长度求平均值
      // return sum/len;
      return (sum / len).toFixed(2);
    },
    TofixedPosition1() {
      return this.position.lat.toFixed(6);
    },
    TofixedPosition2() {
      return this.position.lng.toFixed(6);
    },
    Maxtep() {
      return Math.max(...this.Ydata1).toFixed(2);
    },
    Mintep() {
      return Math.min(...this.Ydata1).toFixed(2);
    },
    Maxhum() {
      return Math.max(...this.Ydata2).toFixed(2);
    },
    Minhum() {
      return Math.min(...this.Ydata2).toFixed(2);
    },
  },
  watch: {
    //?Ydata1发生改变时直接调用相应函数
    Ydata1() {
      this.position.lat += (Math.random() / 10000) * Math.random();
      this.position.lng += (Math.random() / 10000) * Math.random();
      this.Xtime2.push(getTime());
    },
  },
  // *created常用于接受数据的生命周期
  created() {
    this.receptionQuery();
    this.DataChange();
  },
  //!在mouted时data里面的数据已经挂载上去了 但是响应式的 set get会跟踪 data中的数据
  beforeMount() {
    //       data: this.Xtime2, //指向Xtime2这个数组[], 为而不是array 所以没有值    ////option写在这里只能跟踪一次便没有数据更新了 必须更新一次调用一次才会更新数据
    //在setinterval中存在闭包需要let that = this
  },
  mounted() {},
  methods: {
    receptionQuery() {
      this.queryId = this.$route.query.id; //!接收参数route不是router 没有r
    },
    DataChange() {
      // *Ydata1、2一变 所有都变
      this.Ydata1.push(this.$store.state.Ydata1);
      this.Ydata2.push(this.$store.state.Ydata2);
      setInterval(() => {
        // !echarts需要传入一个Number类型
        this.Ydata1.push(Number(this.$store.state.Ydata1.toFixed(2)));
        this.Ydata2.push(Number(this.$store.state.Ydata2.toFixed(2)));
        //!把data数组给复制给一个新数组 会取消跟踪 详情变异数组
        // this.Xtime2.push(
        //   `${Math.round(Math.random() * 23)}:${Math.round(Math.random() * 5)}0`
        // );
        // this.array.push(
        //   `${Math.round(Math.random() * 23)}:${Math.round(Math.random() * 5)}0`
        // );

        ////this.Xtime = this.array  option里面的this.Xtime指向Xtime2这个数组[], 为而不是array 所以没有值
        this.genOption();
      }, 1000);
    },
    genOption() {
      this.option1 = {
        title: {
          text: `${this.queryId}号箱温度`,
        },
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: this.Xtime2,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C", //value指series里面的data 自动取整
          },
        },
        series: [
          {
            data: this.Ydata1,
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#F56C6C",
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      };
      this.option2 = {
        title: {
          text: `第${this.queryId}号箱湿度`,
        },
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: this.Xtime2,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} %", //value指series里面的data 自动取整
          },
        },
        series: [
          {
            data: this.Ydata2,
            type: "line",
            smooth: true,

            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      };
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
}
.box-card {
  height: 700px;
  width: 820px;
}
.pic {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
}
.card-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
.TimeChose {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.box-card-top {
  height: 150px;
}
</style>