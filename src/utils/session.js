import _ from "lodash";
import fs from "fs";

export default {
  get: function (key) {
    return localStorage.getItem(key) || null;
  },
  set: function (key, value) {
    localStorage.setItem(key, value);
  },
  gotoHomeOrRole: function (that) {
    const cats = JSON.parse(localStorage.getItem("storyCharacters"));
    console.log('---gotoHomeOrRole', cats, cats[localStorage.storyId]);
    if (_.isEmpty(cats) || _.isEmpty(cats[localStorage.storyId]) || cats[localStorage.storyId] == 0) {
      that.$router.push("/character");
    } else {
      that.$router.push("/home");
    }
  },
  setRole: function (roleId) {
    const storyCharacter = "storyCharacters";
    const character =
      JSON.parse(localStorage.getItem(storyCharacter)) || {};
    character[localStorage.storyId] = roleId;
    localStorage.setItem(storyCharacter, JSON.stringify(character));
  },
  getVersion: function () {
    return "v2.0.7"
  }
}
