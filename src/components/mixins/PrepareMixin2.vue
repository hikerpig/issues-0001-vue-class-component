<template>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State } from 'vuex-class'
import { Watch, Prop } from 'vue-property-decorator'

@Component
export default class PrepareMixin2 extends Vue {
  data2 = 2
}
</script>