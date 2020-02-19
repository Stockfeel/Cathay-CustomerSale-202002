import Vue from 'vue'
import Router from 'vue-router'

import Profile from '../components/profile.vue'
import Service from '../components/service.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/service', name: 'Service', component: Service }
  ]
})


