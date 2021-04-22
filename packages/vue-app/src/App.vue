<script>
  export default {
    mounted() {
      this.$nextTick(function () {
        window.dispatchEvent(new CustomEvent("loaded", { detail: "vueApp" }));
      })
    }
  }
</script>

<style>
  @import './index.css';
</style>

<template>
  <div class="row">
    <img class="logo" :src="require('./assets/logo.png')" />
    <span class="framework-name">Vue App</span>
  </div>
</template>
