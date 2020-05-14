<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/images/picc.png" alt="" /></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      :collapse-transition="isTransition"
      router
    >
      <template v-for="(item, index) in routes">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, computed } from "@vue/composition-api";
export default {
  name: "navView",
  setup(props, { root }) {
    const routes = reactive(root.$router.options.routes);
    const isCollapse = computed(() => root.$store.state.isCollapse);
    return {
      routes,
      isCollapse,
      isTransition: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.logo {
  text-align: center;
  img {
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.close {
  #nav-wrap {
    width: $navMinWidth;
    .logo img {
      width: 70%;
    }
  }
}
.open {
  #nav-wrap {
    width: $navWidth;
  }
}
</style>
