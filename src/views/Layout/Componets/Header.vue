<template>
  <div id="header-wrap">
    <div class="header-icon pull-left" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/images/face.jpg" alt="" />
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  name: "headerView",
  setup(props, { root }) {
    const username = computed(() => root.$store.state.login.username);
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };
    const exit = () => {
      root
        .$confirm("是否退出系统登录?", "退出登录", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          root.$store.dispatch("login/exit").then(() => {
            root.$router.push({
              name: "Login"
            });
          });
        })
        .catch(() => {});
    };
    return {
      navMenuState,
      exit,
      username
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  height: $headerHeight;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  line-height: $headerHeight;
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
    width: 36px;
    height: 36px;
  }
}
.close {
  #header-wrap {
    left: $navMinWidth;
  }
}
.open {
  #header-wrap {
    left: $navWidth;
  }
}
</style>
