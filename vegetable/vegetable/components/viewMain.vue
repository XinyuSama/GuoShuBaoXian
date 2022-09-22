<template>
  <div>
    <el-card class="box-card-top">
      <div slot="header" class="clearfix">
        <span>
          <b> 当天平均数据</b>
        </span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        >
      </div>
      <div class="TimeChose">
        <div class="block">
          日期选择：
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="TimeChoseEvent"
            value-format="dd"
          >
            <!-- 绑定value1格式,目前只要day -->
          </el-date-picker>
        </div>
        <el-card class="card-title" v-if="change"> 平均温度：3.28℃ </el-card>
        <el-card class="card-title" v-else> 平均温度：{{Ydata1}}℃ </el-card>
        <el-card class="card-title" v-if="change"> 平均湿度：2.71% </el-card>
        <el-card class="card-title" v-else> 平均湿度：{{Ydata2}}% </el-card>
        <el-card class="card-title">
          经纬度:({{ TofixedPosition1 }},{{ TofixedPosition2 }})
        </el-card>
      </div>
    </el-card>

    <div class="pic">
      <el-card class="box-card">
        <echart :QueryOption="option1"></echart>
        <echart :QueryOption="option2"></echart>
      </el-card>
      <el-card class="box-card">
        <mapss :position="position"></mapss>
        <!-- //! get set 会跟踪到组件中 -->
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      position: {
        lat: 30.91039,
        lng: 103.694,
      },
      value1: "",
      option1: {},
      option2: {},
      Ydata1: "0.82",
      Ydata2: "2.25",
      change: true,
    };
  },
  computed: {
    TofixedPosition1() {
      return this.position.lat.toFixed(6);
    },
    TofixedPosition2() {
      return this.position.lng.toFixed(6);
    },
  },
  mounted() {
        setInterval(() => {
      this.position.lat += (Math.random() / 10000) * Math.random();
      this.position.lng += (Math.random() / 10000) * Math.random();
    }, 500);
    this.option1 = {
      title: {
        text: "平均温度",
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
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} °C", //value指series里面的data 自动取整
        },
      },
      series: [
        {
          data: [3, 4, 4.22, 4.1, -1.2, 2.23, 1.12],
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
        text: "平均湿度",
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
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} %", //value指series里面的data 自动取整
        },
      },
      series: [
        {
          data: [5, 4, 5, 1, 1, 3, 5],
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
  methods: {
    TimeChoseEvent() {
      switch (this.value1[0]) {
        case "19":
          console.log("123");
          this.option1 = {
            title: {
              text: "平均温度",
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
              data: [
                "00:00",
                "4：00",
                "8：00",
                "12：00",
                "16：00",
                "20：00",
                "23：00",
              ],
            },
            yAxis: {
              type: "value",
              axisLabel: {
                formatter: "{value} °C", //value指series里面的data 自动取整
              },
            },
            series: [
              {
                data: [1.2, 0.92, 0.58, 0.23, -0.92, 0.2, 0.35],
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
              text: "平均湿度",
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
              data: [
                "00:00",
                "4：00",
                "8：00",
                "12：00",
                "16：00",
                "20：00",
                "23：00",
              ],
            },
            yAxis: {
              type: "value",
              axisLabel: {
                formatter: "{value} %", //value指series里面的data 自动取整
              },
            },
            series: [
              {
                data: [2.2, 2.6, 2.9, 3.2, 1.1, 1.01, 0.95],
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
          break;
      }
    },
  },
};
</script>
<style>
.card-title {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: -5px;
}
.TimeChose {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.box-card-top {
  height: 150px;
}
.box-card {
  height: 700px;
  width: 815px;
  /* margin-left: 5px; */
  margin-left: 5px;
}
.pic {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
}
</style>