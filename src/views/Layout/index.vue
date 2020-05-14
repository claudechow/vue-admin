<template>
  <div :class="[menuStats ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import LayoutNav from "../Layout/Componets/nav";
import LayoutHeader from "../Layout/Componets/header";
import LayoutMain from "../Layout/Componets/main";
import { computed } from "@vue/composition-api";
export default {
  name: "layoutView",
  components: { LayoutNav, LayoutHeader, LayoutMain },
  setup(props, { root }) {
    /**
     *  computed 监听
     */
    const menuStats = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStats
    };
  }
};
</script>
<style lang="scss" scoped></style>
