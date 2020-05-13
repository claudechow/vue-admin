<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
    <h1 class="copyright-info-content">
      抚顺公司数据综合管理平台-中国人民财产保险股份有限公司抚顺市分公司-周忠强 ©
      2015-2020
    </h1>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  // position: fixed;
  // left: $navWidth;
  // top: $headerHeight;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // -webkit-box-sizing: border;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $headerHeight + 30;
  padding-right: 30px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  @include webkit(box-sizing, border-box);
  background-color: #fff;
}
.copyright-info-content {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  text-align: center;
  font-size: 11px;
  font-weight: bold;
  color: #344a5f;
}
.close {
  .main-content {
    padding-left: $navMinWidth + 30px;
  }
}
.open {
  .main-content {
    padding-left: $navWidth + 30px;
  }
}
</style>
