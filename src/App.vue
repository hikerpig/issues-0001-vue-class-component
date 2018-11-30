<template>
  <div id="app">
    this.$options.beforeRouteUpdate.length = {{length}}
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

import PrepareMixin1 from 'src/components/mixins/PrepareMixin1.vue'
import PrepareMixin2 from 'src/components/mixins/PrepareMixin2.vue'

import { PrepareMixin3, PrepareMixin4 } from 'src/util/prepareMixins'

@Component
export default class AppPage extends mixins(PrepareMixin3, PrepareMixin4) {
  length = 0
  mounted() {
    this.length = this.$options.beforeRouteUpdate.length
  }
}
</script>
