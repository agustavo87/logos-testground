<template>
<div>
    <input
      v-bind:id="name" 
      v-bind:name="name" 
      type="checkbox" 
      v-bind="$attrs"
      v-bind:value="value"
      @input="$emit('input', $event.target.checked)"
    />
    <arete-label v-bind:for="name" >
      <slot></slot>
    </arete-label>
</div>
</template>

<script>
  import AreteLabel from './Label'
  export default {
    inheritAttrs: false,
    props: ['name', 'value'],
    components:{
      AreteLabel
    }
  }


</script>