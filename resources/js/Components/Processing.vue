<template>
  <div 
    class="text-xs text-green-600 ml-2"
    :class="{invisible: !aIf}"
    >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['a-if']
  }

</script>