import Vue from "vue";
import Router from "vue-router";
import index from "../components/index.vue";
import viewMain from "../components/viewMain.vue";
import boxitem from "../components/boxitem.vue";
import boxinfo from "../components/boxinfo.vue";
import itemDetail from "../components/itemDetail.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: index,
      redirect: "/viewMain", //重定向两个路由都会加载
      children: [
        {
          // path: "/index/viewMain" , component:viewMain也可以
          path: "/viewMain",
          component: viewMain,
        },
        {
          path: "/boxitem",
          component: boxitem,
        },
        {
          path: "/boxinfo",
          component: boxinfo,
        },
        {
          path: "/itemDetail",
          component: itemDetail,
        },
      ],
    },
  ],
});
