<template>
  <select 
    class="p-2 text-red-100leading-tight border border-gray-400 rounded-sm focus:outline-none"
    :class="selected"
    @input="$emit('input', $event.target.value)"
    :value="value"
  >
    <option 
      value="" 
      v-if="$attrs.required || placeholder"
      class="placeholder"
    >
      {{ placeholder }}
    </option>
    <slot></slot>
  </select>
</template>

<script>
  export default {
    props: ['value', 'placeholder'],
    computed: {
      selected () {
        return this.value ? 'text-gray-900' : 'text-gray-600';
      }
    }
  }
</script>

<style scoped>
  option {
    color: #1a202c;
  }
  option.placeholder {
    color: #718096
  }
</style>