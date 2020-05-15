import cookie from "cookie_js";

export function getToken() {
  return cookie.get("token");
}
export function setToken(token) {
  cookie.set("token", token);
}
export function removeToken() {
  cookie.remove("token");
}
export function getUsername() {
  return cookie.get("username");
}
export function setUsername(username) {
  cookie.set("username", username);
}
export function removeUsername() {
  cookie.remove("username");
}
export function getYearStr() {
  let nowDate = new Date();
  return nowDate.getFullYear();
}
