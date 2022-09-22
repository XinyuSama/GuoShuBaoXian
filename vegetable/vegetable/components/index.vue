<template>
  <el-container class="index-container">
    <el-header>
      <h1>果蔬保鲜系统平台</h1>
      <h1>{{NowTime}}</h1>
      <el-button type="primary">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router default-active="/viewMain">
          <el-menu-item index="/viewMain" class="text">当天状态</el-menu-item>
          <el-menu-item index="/boxitem" class="text">单个状态</el-menu-item>
          <el-menu-item index="/boxinfo" class="text">故障恢复</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <!-- 根据路由的不同展示不同的组件 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getTime} from'../src/NowTime'
export default {
  data() {
    return {
      NowTime:''
    };
  },
  mounted() {
    setInterval(() => {
     this.NowTime= getTime()
    }, 1000);
  },
};
</script>

<style scoped>
.index-container {
  height: 1000px;
  width: 100%;
}
.el-header {
  background-color: rgb(121, 187, 255);
  color: #333;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-header h1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-button {
  width: 200px;
}
.el-aside {
  background-color: rgb(179, 216, 255);
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-menu {
  background-color: rgb(179, 216, 255);
  margin-top: 10px;
}

.el-main {
  background-color: rgb(217, 236, 255);
  color: #333;
}
.box-card-left {
  width: 100px;
}
.el-menu {
  height: 100vh;
}
.timeChose {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.text {
  font-size: 20px;
  background-color: rgb(121, 187, 255);
  border-bottom: rgb(64, 158, 255) 1px solid;
}
</style>