import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
// import * as THREE from 'three'
// Vue.prototype.$THREE = THREE
new Vue({
  render: (h) => h(App),
}).$mount("#app");
