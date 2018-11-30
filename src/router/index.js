import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const appView = () => import('../App.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', name: 'index', component: appView },
    ]
  })
}
