<template>
<component 
  :is="componentName" 
  v-bind="$attrs"
  @click="current ? null : $emit('selected')"
>
  <slot></slot>
</component>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        current: Boolean,
        inertia: Boolean,
        aButton: Boolean
    },
    methods: {
      log() {
        console.log('visitando')
      }
    },
    computed: {
        componentName() {
            return this.current 
                    ? 'span' 
                    : this.inertia
                      ? 'inertia-link'
                      : this.aButton
                        ? 'button'
                        : 'a'
        }
    }
    
}
</script>