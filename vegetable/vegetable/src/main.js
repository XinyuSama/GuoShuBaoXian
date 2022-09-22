import Vue from 'vue';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import echart from '../components/echart.vue'
import mapss from '../components/mapss.vue'
import store from '../store/index.js'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use(ElementUI); //使用模块

Vue.component('mapss',mapss)
Vue.component('echart',echart)
// Vue.prototype.$echarts = echarts; 可以挂在原型上 全局使用也可以但组件使用


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App,router)
});