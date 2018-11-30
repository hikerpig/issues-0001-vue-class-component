/* global navigator:false */
import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import PageProgressBar from './components/common/PageProgressBar.vue'
import { hostGlobal, isProduction } from 'src/envs'

import Bluebird from 'bluebird'
import { last } from 'lodash'

/**
 * Global Vue mixin
 */
Vue.mixin({
  mounted() {
    console.log("Hi! I'm mounted!", this._uid, this._vnode.tag)
  },
})

Vue.config.performance = !isProduction
Vue.config.devtools = !isProduction

Bluebird.config({
  warnings: false,
})

const { app, router, store } = createApp()

hostGlobal.store = store

router.onReady(() => {
  app.$mount('#app')
})
