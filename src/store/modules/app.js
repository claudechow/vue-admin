const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};
const getters = {
  isCollapse: state => state.isCollapse
};
// 同步 不可以处理回调
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    // sessionStorage 会话级别，关闭浏览器即清除，最大可保存5M
    // localStorage   存储在本地，需要手动清除
    // Cookie_js      需要添加依赖 npm install cookie_js -save 需要手动清除
    // 将菜单状态放到sessionStorage中
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
