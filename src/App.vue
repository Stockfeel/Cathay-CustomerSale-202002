<template>
  <div id="app">
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
#app, html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
