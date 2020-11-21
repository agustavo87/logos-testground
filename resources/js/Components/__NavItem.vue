<template>
<component 
  :is="componentName" 
  class="block px-2 mt-1 sm:mt-0 sm:ml-2 py-1 font-semibold rounded "
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
      current: Boolean,
      href: String,
      inertia: Boolean
    },
    computed: {
      componentName() {
        if (this.current) {
          return 'span'
        } else {
          return this.inertia ? 'inertia-link' : 'a' 
        }
      },
      classes() {
        return this.current
          ? 'text-white cursor-default'
          : 'text-white opacity-75 cursor-pointer hover:bg-gray-800 hover:opacity-100 active:opacity-100 active:bg-gray-700'
      }
    },
  }
</script>
