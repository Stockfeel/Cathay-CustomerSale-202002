import Vue from 'vue'
import Router from 'vue-router'

import Profile from '../components/profile.vue'
import Service from '../components/service.vue'
import Market from '../components/market.vue'
import Suggest from '../components/suggest.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/service', name: 'Service', component: Service },
    { path: '/market', name: 'Market', component: Market },
    { path: '/suggest/:id', name: 'suggest', component: Suggest },
  ]
})


