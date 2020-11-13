<template>
  <ul class="text-xs text-red-600 ml-2">
    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
  </ul>
</template>

<script>
  export default {
    props: {
      errors: Array
    }
  }

</script>