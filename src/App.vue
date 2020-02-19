<template>
  <div id="app">
    <GlobalFonts />
    <InitialStyle />
    <router-view></router-view>
    <Home />
  </div>
</template>

<script>
import Home from './components/home.vue'
import GlobalFonts from './fonts/fonts';
import { InitialStyle } from './style';

export default {
  name: 'App',
  components: {
    Home,
    GlobalFonts,
    InitialStyle
  }
}
</script>