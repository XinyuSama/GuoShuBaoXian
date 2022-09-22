<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		
		
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
// 	@font-face{
// 		font-family: wendingcs;
// src:url('~@/static/font/WenDingCSZhongDengXian-1.ttf') format("truetype")
// 	}
		page{
			 // font-family: "wendingcs",sans-serif;
			 	background-color: #f3f3f3;
		}
</style>