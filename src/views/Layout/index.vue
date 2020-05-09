<template>
  <div>
    <LayoutNav />
    <LayoutHeader />
    <LayoutMain />
  </div>
</template>
<script>
import LayoutNav from "../Layout/Componets/nav";
import LayoutHeader from "../Layout/Componets/header";
import LayoutMain from "../Layout/Componets/main";
export default {
  name: "mainview",
  components: { LayoutNav, LayoutHeader, LayoutMain },
  setup() {}
};
</script>
<style lang="scss" scoped></style>
