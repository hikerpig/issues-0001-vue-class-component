/* global navigator:false */
import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import PageProgressBar from './components/common/PageProgressBar.vue'
import { hostGlobal, isProduction } from 'src/envs'

import { callComponentsHookWith, getHookFromComponent } from 'src/util/router-util'

import Bluebird from 'bluebird'
import { addUnhandledrejectionListener } from 'src/util/rejection'
import { last } from 'lodash'

/**
 * Global Vue mixin
 */
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    console.log('hi! beforeRouteUpdate!', this._uid)
  },
})

Vue.config.performance = !isProduction
Vue.config.devtools = !isProduction

Bluebird.config({
  warnings: false,
})
addUnhandledrejectionListener()

const bar = (Vue.prototype.$bar = new Vue(PageProgressBar).$mount())
document.body.appendChild(bar.$el)

if (window.__INITIAL_STATE__) {
  // replaceState 需要发生在 router 创建前
  const _state = window.__INITIAL_STATE__
  const redirectUrl = _state.initialReplaceStateUrl
  if (redirectUrl) {
    console.log('initialReplaceStateUrl', redirectUrl)
    try {
      history.replaceState(null, null, redirectUrl)
    } catch (err) {
      window.location = redirectUrl
    }
  }
}

const { app, router, store } = createApp()

hostGlobal.store = store

if (window.__INITIAL_STATE__) {
  console.log('replace initial state')
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(initialRoute => {
  const initialMatched = router.getMatchedComponents(initialRoute)
  console.log('initialMatched', initialMatched)
  callComponentsHookWith(initialMatched, 'asyncData', {
    store,
    stage: 'client-onReady',
    route: initialRoute,
    componentName: getHookFromComponent(last(initialMatched), 'name'),
  })

  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matchedComponent = router.getMatchedComponents(to)
    console.log('matchedComponent', matchedComponent)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matchedComponent.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })
    console.log('activated', activated)

    bar.start()

    const componentsHookOptions = {
      store,
      route: to,
      stage: 'client-beforeResolve',
      componentName: getHookFromComponent(matchedComponent, 'name'),
    }

    const asyncDataResults = callComponentsHookWith(activated, 'asyncData', componentsHookOptions)

    Promise.all(asyncDataResults)
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  router.afterEach(to => {})

  app.$mount('#app')
})
