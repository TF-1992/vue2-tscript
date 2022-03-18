<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png" />-->
<!--    <HelloWorld msg="aaa" />-->
    <svgTest />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld.vue";
import svgTest from "./components/svgTest.vue";

@Component({
  components: {
    // HelloWorld
    svgTest
  }
})
export default class App extends Vue {
}
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
