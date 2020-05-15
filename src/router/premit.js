import router from "./index";
import { getToken } from "@/utils/app.js";

const whiteRouter = ["/login"];

// 路由守卫
router.beforeEach((to, from, next) => {
  // Token有效
  if (getToken()) {
    // 判断如果已经登录时返回login页面时则不路由跳转
    if (to.path === "/login") {
      next(from);
    } else {
      next();
    }
  } else {
    /**
     * 1、直接进入index的时候，参数to被改变成了 "/index"，触发路由指向，就会跑beforeEach
     * 2、再一次 next 指向了login，再次发生路由指向，再跑beforeEach，参数的to被改变成了"/login"
     * 3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再次beforeEach。
     */
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
