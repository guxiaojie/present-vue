import _ from "lodash";

export const ICP = '京ICP备14009930号-4'

export default {
  get: function (key) {
    return localStorage.getItem(key) || null;
  },
  set: function (key, value) {
    localStorage.setItem(key, value);
  },
  getVersion: function () {
    return "v2.0.9"
  }
}
