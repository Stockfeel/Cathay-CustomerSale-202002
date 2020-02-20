<template>
  <div id="app">
    <GlobalFonts />
    <InitialLayout />
    <router-view></router-view>
    <Home />
  </div>
</template>

<script>
import Home from './components/home.vue'
import GlobalFonts from './fonts/fonts';
import { InitialLayout } from './style';

export default {
  name: 'App',
  components: {
    Home,
    GlobalFonts,
    InitialLayout
  }
}
</script>