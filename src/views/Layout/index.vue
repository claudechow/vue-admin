<template>
  <div>
    <LayoutNav />
    <LayoutHeader />
    <LayoutMain />
  </div>
</template>
<script>
import LayoutNav from "../Layout/Componets/Nav";
import LayoutHeader from "../Layout/Componets/Header";
import LayoutMain from "../Layout/Componets/Main";
export default {
  name: "mainview",
  components: { LayoutNav, LayoutHeader, LayoutMain },
  setup() {}
};
</script>
<style lang="scss" scoped></style>
