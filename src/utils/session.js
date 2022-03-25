import _ from "lodash";
import fs from "fs";

export default {
  get: function (key) {
    return localStorage.getItem(key) || null;
  },
  set: function (key, value) {
    localStorage.setItem(key, value);
  },
  getVersion: function () {
    return "v2.0.8"
  }
}
