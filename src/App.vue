<template>
  <div id="app">
    <router-view></router-view>
    <Home />
  </div>
</template>

<script>
import Home from './components/home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
#app, html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
