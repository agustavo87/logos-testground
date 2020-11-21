<template>
<component 
  :is="componentName" 
  v-bind="$attrs"
  @click="$emit('selection')"
>
  <slot></slot>
</component>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        current: Boolean,
        inertia: Boolean
    },
    methods: {
      log() {
        console.log('visitando')
      }
    },
    computed: {
        componentName() {
            return this.current ? 'span' : this.inertia
                    ? 'inertia-link'
                    : 'a'
        }
    }
    
}
</script>