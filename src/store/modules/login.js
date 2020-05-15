import { Login } from "@/api/login";
import { setToken, setUsername, getUsername } from "@/utils/app.js";
import { removeToken, removeUsername } from "../../utils/app";
const state = {
  token: "",
  username: getUsername() || ""
};
const getters = {
  token: state => state.token,
  username: state => state.username
};
const mutations = {
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
};
const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData)
        .then(response => {
          let data = response.data.data;
          let username = data.username;
          let token = data.token;
          content.commit("SET_TOKEN", token);
          setToken(token);
          content.commit("SET_USERNAME", username);
          setUsername(username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exit(content) {
    return new Promise(resolve => {
      removeToken();
      removeUsername();
      content.commit("SET_TOKEN", "");
      content.commit("SET_USERNAME", "");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
