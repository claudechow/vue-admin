import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入布局组件
import Layout from "@/views/Layout/index.vue";

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
      name: "控制台",
      icon: "console"
    },
    component: Layout,
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
      name: "信息管理",
      icon: "info"
    },
    component: Layout,
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
      name: "用户管理",
      icon: "user"
    },
    component: Layout,
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
