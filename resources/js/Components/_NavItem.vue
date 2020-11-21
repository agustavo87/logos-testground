<template>
<component 
  :is="componentName" 
  class="font-bold py-2 px-4 rounded-sm focus:outline-none mx-1"
  :class="classes" 
  :href="href"
>
  <slot></slot>
</component>
</template>
<script>
  export default {
    inheritAttrs:false,
    props: {
      disabled: Boolean,
      href: String,
      inertia: Boolean
    },
    computed: {
      componentName() {
        if (this.disabled) {
          return 'span'
        } else {
          return this.inertia ? 'inertia-link' : 'a' 
        }
      },
      classes() {
        return this.disabled
          ? 'bg-blue-600 cursor-default'
          : 'bg-blue-500 text-blue-100 cursor-pointer hover:bg-blue-400 active:bg-blue-700'
      }
    },
  }
</script>
