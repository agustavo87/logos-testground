<template>
<din-anchor 
  :current="current" 
  class="block px-2 py-1 mt-1 sm:mt-0 sm:ml-2 font-semibold rounded"
  :class="classes"
  v-bind="$attrs"
>
  <slot></slot>
</din-anchor>

</template>
<script>
import DinAnchor from './DinAnchor';
  export default {
    inheritAttrs:false,
    components: {
      DinAnchor
    },
    props: {
      current: Boolean,
    },
    computed: {
      classes() {
        return this.current
          ? 'text-white cursor-default'
          : 'text-white opacity-75 cursor-pointer hover:bg-gray-800 hover:opacity-100 active:opacity-100 active:bg-gray-700'
      }
    },
  }
</script>
