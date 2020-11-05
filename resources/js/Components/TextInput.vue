<template>
  <input 
    class="p-2 leading-tight border border-gray-400 rounded-sm focus:outline-none"
    v-bind:value="value"
    @input="$emit('input',$event.target.value)"
  >  
</template>

<script>
  export default {
    props: ['value']
  }

</script>