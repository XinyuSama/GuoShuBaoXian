<template>
	<view class="content">
		<view class="topbox">

		</view>

		<view class="mainbox">

			<view class="wrap">
				<u-swiper :list="list" mode="dot" indicator-pos="bottomRight"></u-swiper>
			</view>
			<view class="boxlistbox">
				<view class="boxlistboxs">
					<view class='boxlistboxi' v-for='(i,index) in 9 ' :key='index' @tap="goinfo(i)">
						<view class="boxlistbox-img">
				<u-image width="100%" height="100%" src="../../static/icebox.svg"></u-image>
						</view>
						<view class="img-text"><h3>{{i+"号盒子"}}</h3></view>
						<view class="statebox">
							<!-- <Gling></Gling> -->
							<view class="state-round" :style="{
								background:(i%3==0?'#00FF7F':'#707070')
							}"></view>
							<view class="state-transport" v-if="i%3==0?true:false">
								<u-image width="120%" height="120%" src='../../static/car.svg'></u-image>
							</view>
							<view class="state-transport" v-else>
								<u-image width="120%" height="120%" src='../../static/car1.svg'></u-image>
							</view>
						</view>
					</view>

				</view>


			</view>
		</view>
		<view class="foter"></view>

	</view>
</template>

<script>
	import Gling from '../../commput/glint.vue'
	export default {
		components:{
			Gling
		},
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],

			}
		},
		onLoad() {

		},
		methods: {
			goinfo(val){
				console.log(val)
				uni.navigateTo({
				url:'../info/info?id='+val
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f3f3f3;
	}

	.mainbox {
		width: 99%;
		height: 99%;

	}

	.wrap {
		width: 99%;
		height: 300rpx;
		padding: 10rpx;
	}

	.boxlistbox {
		width: 99%;
		height: 80%;
	
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.boxlistboxs {
		margin: 0 auto;
		width: 95%;
		height: auto;
		// border: 1px solid red;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		flex-direction: row;
		flex-wrap: wrap;

	}

	.boxlistboxi {

		width: 320rpx;
		height: 230rpx;
		margin: 10rpx;
		border-radius: 30rpx;
		box-shadow: $uni-box-shadow;
		background-color: #FFFFFF;
		padding: 10px;
		position: relative;

	}
	.boxlistbox-img{
		width: 130rpx;
		height: 130rpx;
		// border: 1px solid red;
	}
	.img-text{
		
		// border: 1px solid red;
		margin: 10rpx 0 0 10rpx;
	}
	.statebox{
	width:70rpx;
	height: 160rpx;
		// border: 1rpx solid #ff53e0;
	
		position: absolute;
		right: 60rpx;
		top: 30rpx;
		// display: flex;
		// justify-content: space-around;
		// align-items: center;
		// flex-direction: column;
		
		
	}
	.state-round{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		// border: 1rpx solid #00FF7F;
		background-color: #00FF7F;
		margin-bottom: 10rpx;
	}.state-transport{
		width: 60rpx;
		height: 60rpx;
		// border: 1rpx solid #00FF7F;
	}
</style>
