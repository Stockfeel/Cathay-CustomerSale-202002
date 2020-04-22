<template>
  <div id="app">
    <GlobalFonts />
    <InitialLayout />
    <iframe 
      :class="`${isClose ? '' : 'open'}`"
      src="https://stockfeel.github.io/Cathay-CustomerSys-201912/" 
      height="100%" 
      frameborder="0"
    ></iframe>
    <div :class="`tab ${isClose ? '' : 'open'}`" @click="toggleTab"></div>
    <div :class="`app ${isClose ? '' : 'hidden'}`">
      <router-view></router-view>
      <Home />
    </div>
  </div>
</template>

<script>
import Home from './components/home.vue'
import GlobalFonts from './fonts/fonts';
import { InitialLayout } from './style';

export default {
  name: 'App',
  data() {
    return {
      isClose: true
    }
  },
  methods: {
    toggleTab() {
      this.isClose = !this.isClose;
    }
  },
  components: {
    Home,
    GlobalFonts,
    InitialLayout
  },
  mounted() {
    if(document.querySelector("body").offsetWidth < 1280) {
      this.isClose = false;
    }
  }
}
</script>