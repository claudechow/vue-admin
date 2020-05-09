import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    hidden: true,
    meta: {
      name: "主页"
    },
    redirect: "Index"
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/consoleView",
    name: "ConsoleView",
    meta: {
      name: "控制台"
    },
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  {
    path: "/infoView",
    name: "Infoview",
    meta: {
      name: "信息管理"
    },
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/infoList",
        name: "InfoList",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/list.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  {
    path: "/infoView",
    name: "Infoview",
    meta: {
      name: "用户管理"
    },
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/userList",
        name: "UserList",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/list.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
