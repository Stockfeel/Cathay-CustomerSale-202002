import Vue from 'vue'
import Router from 'vue-router'

import Profile from '../components/profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/profile', name: 'Profile', component: Profile }
  ]
})


