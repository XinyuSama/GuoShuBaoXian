<!-- @format -->

<template>
  <!-- 定义一个全局组件（红灯涟漪效果） -->
  <div id="wrap">
    <div class="redBox">
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
      <span style="--i: 4"></span>
      <span style="--i: 5"></span>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
.redBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* 不要设置margin，不然在页面比例改变时，会造成位置的改动 */
  /* margin: 10px 0; */
}
 .redBox span {
  position: absolute;
  box-sizing: border-box;
  border: 5rpx solid #00FF7F;
  border-radius: 50%;
  animation: text 3s linear infinite;
  animation-delay: calc(0.5s * var(--i));
}

@keyframes text {
  0% {
    width: 0;
    height: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
