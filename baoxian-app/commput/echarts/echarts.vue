<template>
  <view>
    <view
      class="echarts"
      :id="option.id"
      :prop="option"
      :change:prop="echarts.update"
      @click="echarts.onClick"
    ></view>
  </view>
</template>

<script>
export default {
  name: "Echarts",
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  created() {
    // 设置随机数id
    let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let len = t.length;
    let id = "";
    for (let i = 0; i < 32; i++) {
      id += t.charAt(Math.floor(Math.random() * len));
    }
    this.option.id = id;
  },
  methods: {
    /**
     * renderjs内的点击事件，回调到父组件
     * @param {Object} params
     */
    onViewClick(params) {
      this.$emit("click", params);
    },
  },
};
</script>

<script module="echarts" lang="renderjs">
export default {
	data() {
		return {
			chart: null,
			clickData: null // echarts点击事件的值
		}
	},
	mounted() {
		if (typeof window.echarts === 'object') {
			this.init()
		} else {
			// 动态引入类库
			const script = document.createElement('script')
			script.src = './static/echats/echarts.min.js'
			// script.src = '../echarts.min.js'
			script.onload = this.init
			document.head.appendChild(script)
		}
	},
	methods: {
		/**
		 * 初始化echarts
		 */
		init() {
			// 根据id初始化图表
			this.chart = echarts.init(document.getElementById(this.option.id))
			this.update(this.option)
			// echarts的点击事件
			this.chart.on('click', params => {
				// 把点击事件的数据缓存下来
				this.clickData = params
			})
		},
		/**
		 * 点击事件，可传递到外部
		 * @param {Object} event
		 * @param {Object} instance
		 */
		onClick(event, instance) {
			if (this.clickData) {
				// 把echarts点击事件相关的值传递到renderjs外
				instance.callMethod('onViewClick', {
					value: this.clickData.data,
					name: this.clickData.name,
					seriesName: this.clickData.seriesName
				})
				// 上次点击数据置空
				this.clickData = null
			}
		},
		/**
		 * 监测数据更新
		 * @param {Object} option
		 */
		update(option) {
			if (this.chart) {
				// 因App端，回调函数无法从renderjs外传递，故在此自定义设置相关回调函数
				if (option) {
					// tooltip
					if (option.tooltip) {
						// 判断是否设置tooltip的位置
						if (option.tooltip.positionStatus) {
							option.tooltip.position = this.tooltipPosition()
						}
						// 判断是否格式化tooltip
						if (option.tooltip.formatterStatus) {
							option.tooltip.formatter = this.tooltipFormatter(option.tooltip.formatterUnit, option.tooltip.formatFloat2, option.tooltip.formatThousands)
						}
					}
					// 颜色渐变
					if (option.series) {
						for (let i in option.series) {
							let linearGradient = option.series[i].linearGradient
							if (linearGradient) {
								option.series[i].color = new echarts.graphic.LinearGradient(linearGradient[0],linearGradient[1],linearGradient[2],linearGradient[3],linearGradient[4])
							}
						}
					}
				}
				// 设置新的option
				this.chart.setOption(option, option.notMerge)
			}
		},

	}
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;

}
</style>
