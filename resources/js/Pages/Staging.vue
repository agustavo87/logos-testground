<template>
<div>
  <a href="#">Hola</a>
</div>
</template>

<style scoped>
a {
  background-color: red;
  color:blue
}
a:focus {
  background: lightcoral;
}
</style>


  export default {
    props: ['request'],
    components: {
    },
    metaInfo() {
        title: 'Staging!'
    }
  }
</script>