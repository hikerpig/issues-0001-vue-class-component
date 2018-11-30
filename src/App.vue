<template>
  <div id="app">
    this.$options.mounted.length = {{length}}
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

import PrepareMixin1 from 'src/components/mixins/PrepareMixin1.vue'
import PrepareMixin2 from 'src/components/mixins/PrepareMixin2.vue'

import { PrepareMixin3, PrepareMixin4 } from 'src/util/prepareMixins'

@Component
export default class AppPage extends mixins(PrepareMixin1, PrepareMixin2) {
  length = 0
  mounted() {
    this.length = this.$options.mounted.length
    console.log("I'm AppPage")
  }
}
</script>
