import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入Composition API模块
import VueCompositionApi from "@vue/composition-api";
// 引入自定义Icon图标
import "./icons/index.js";
// 引入路由守卫
import "./router/premit.js";

Vue.use(ElementUI);
// 显式调用 VueCompositionApi
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
