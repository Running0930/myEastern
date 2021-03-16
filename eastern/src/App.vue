<template>
  <div id="app">
    <Header v-if="!$route.meta.isHide"></Header>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
</template>

<script lang="js">
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less">
</style>
