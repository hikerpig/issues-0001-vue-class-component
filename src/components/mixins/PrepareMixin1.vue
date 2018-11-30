<template>
<div class="component-1"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State } from 'vuex-class'
import { Watch, Prop } from 'vue-property-decorator'

@Component
export default class PrepareMixin1 extends Vue {
  data1 = 1
}
</script>