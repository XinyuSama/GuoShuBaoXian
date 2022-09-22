import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
      //存储数据 相当于data
      Ydata1 :0,
      Ydata2 :0,
    },
    mutations:{
        //数据处理方法 相当于methods
        DataChange(state){
          if (Math.random() >= 0.5) {
            state.Ydata1 = state.Ydata1 + 0.05; 
          } else {
            state.Ydata1 =state.Ydata1- 0.05;
          }
          if (Math.random() >= 0.5) {
            state.Ydata2 =state.Ydata2+0.05;
          } else {
            state.Ydata2 =state.Ydata2- 0.05;
          }
        }
    },
    actions:{
      AsyncDataChange(data){
        setInterval(()=>{
          data.commit('DataChange')
        },1000)
      }
     
    }

})