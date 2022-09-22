<template>
	<view class="contentbaox">
		<view class="mapbox">
			<view>
				<view class="page-body">
					<view class="page-section page-section-gap">
						<map style="width: 100%; height: 200px;" :latitude="latitude" :longitude="longitude"
							:markers="covers">
						</map>
					</view>
				</view>
			</view>

		</view>
		<view class="infotop u-m-t-15">
			<view class="info-top-titles">

				<u-row gutter="16" justify="around">
					<u-col span="3">
						<view class="demo-layout ">
							<view class="info-top-image">
								<u-image width="100%" height="100%" src='../../static/icebox.svg'></u-image>
							</view>
							<view class="info-top-title">
								<h3>制冷情况</h3>
							</view>
						</view>

					</u-col>
					<u-col span="3">
						<view class="demo-layout ">
							<h3>温度:<span class='u-font-35'>{{'10℃'}}</span></h3>
						</view>
					</u-col>
					<u-col span="3">
						<view class="demo-layout ">
							<h3>湿度:<span class='u-font-35'>{{'10%'}}</span></h3>
						</view>
					</u-col>
				</u-row>



			</view>
		</view>


		<view class="infotop">
			<view class="info-top-titles">

				<u-row gutter="16" justify="around">
					<u-col span="3">
						<view class="demo-layout ">
							<view class="info-top-image">
								<u-image width="100%" height="100%" src='../../static/car.svg'></u-image>
							</view>
							<view class="info-top-title">
								<h3>运输状态</h3>
							</view>
						</view>

					</u-col>
					<u-col span="3">
						<view class="demo-layout ">
							<h3><span class='u-font-35'>{{'运输中'}}</span></h3>
						</view>
					</u-col>
					<u-col span="3">
						<view class="demo-layout ">
							<h3><span class='u-font-35'>{{'25小时'}}</span></h3>
						</view>
					</u-col>
				</u-row>



			</view>
		</view>
		<view class="infotop">
			<view class="info-top-titles">

				<u-row gutter="16" justify="around">
					<u-col span="3">
						<view class="demo-layout ">
							<view class="info-top-image">
								<u-image width="100%" height="100%" src='../../static/shezhi_.svg'></u-image>
							</view>
							<view class="info-top-title">
								<h3>远程启动</h3>
							</view>
						</view>

					</u-col>
					<u-col span="3">
						<view class="demo-layout ">
							<h3>

								<span class='u-font-35'>{{checked?'运行中':'未启动'}}</span>
							</h3>
						</view>
					</u-col>
					<u-col span="3">
						<view class="demo-layout ">
							<u-switch v-model="checked" :loading="loading"></u-switch>
						</view>
					</u-col>
				</u-row>



			</view>
		</view>
		<view class="echarbox">
			<view class="echarboxm">
				<Echarts :option='option' :id="id" style="width: 100%;height: 100%;"></Echarts>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	// import * as echarts from 'echarts';
	import Echarts from '@/commput/echarts/echarts.vue'
	export default {
		components: {
			Echarts,
		},
		onLoad(optin) {
			console.log(optin)
			this.op = optin

		},
		onShow() {
			// setTimeout(()=>{this.draw()},2000)

		},
		mounted() {
			// setTimeout(()=>{this.draw()},2000)
		},
		watch: {
			checked(val) {
				// 等于false，意味着用户手动关闭了switch
				if (val) {
					this.checked = true;
					this.loading = true;
					setTimeout(() => {
						this.showToast()
						this.loading = false;
					}, 500)
				} else {
					this.checked = false;
					this.loading = true;
					setTimeout(() => {
						this.showToast()
						this.loading = false;
					}, 500)
				}

			}
		},
		data() {
			return {
				checked: false,
				controlStatus: false,
				loading: false,
				op: {},
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../../static/location.png'
				}],
				option: {
					title: {
						text: '温湿度监控数据'
					},
					tooltip: {
						trigger: 'axis',
					
					},
					color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: []
					}],
					yAxis: [{
						type: 'value', 
						
					}],
					series: [{
							name: '温度',
							type: 'line',
						
						
							data: [0, -1, -2, -3, -3, -5, -5,0, -1, -2, -3, -3, -5, -5]
						},
						{
							name: '湿度',
							type: 'line',
						
							
							
							data: [50, 30, 46, 38, 77, 30, 50,50, 30, 46, 38, 77, 30, 50]
						},
				

					]
				},
			};
		},
		methods: {
			draw() {
				var myChart = echarts.init(document.getElementById('main'));
				myChart.setOption({
					title: {
						text: '温湿度监控表'
					},

					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						smooth: true
					}]
				});
			},
			change(status) {
				console.log(status)
				this.showToast()
			},
			showToast() {
				this.$refs.uToast.show({
					title: this.checked ? '启动成功' : "关闭成功",
					type: this.checked ? 'success' : 'warning'

				})
			},
		}
	}
</script>

<style lang="scss">
	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {

		width: 160rpx;
		height: 130rpx;

		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;



	}


	.contentbaox {
		width: 100%;
		height: 100%;

	}

	.infotop {
		width: 99%;
		height: 300rpx;
		margin: 5rpx auto;
		padding: 20rpx;
	}

	.echarbox {
		width: calc(99%);
		height: calc(500rpx);
		margin: 5rpx auto;
		padding: 0 20rpx;

	}

	.echarboxm {

		width: calc(99%);
		height: calc(500rpx);
		border-radius: 30rpx;
		box-shadow: $uni-box-shadow;
		background-color: #FFFFFF;
		padding: 20rpx;

	}

	.info-top-titles {
		width: 100%;
		height: 100%;
		border-radius: 30rpx;
		box-shadow: $uni-box-shadow;
		background-color: #FFFFFF;
		padding: 10rpx 10rpx;


	}

	.info-top-title {

		height: 50rpx;

		position: absolute;
		bottom: -50rpx;

	}

	.info-top-image {

		width: 120rpx;
		height: 120rpx;
		margin: 0 auto;
	}
</style>
