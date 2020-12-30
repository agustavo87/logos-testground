<template>
<div class=" my-2 mx-auto max-w-lg">
      <lg-select v-model="selected" required size="4" class=" max-w-lg mx-auto">
        <option 
          v-for="source in sources" 
          :key="source.key" 
          :value="source.key"
        >
          {{ source.key}}: {{ source.data }}  
        </option>
      </lg-select>
      <p>Seleccionado: {{selected}}</p>

</div>
</template>
<script>
import lgSelect from '../Base/Select';

export default {
    name: 'SelectSource',
    components: {
        lgSelect
    },
    data() {
        return {
            selected: null
        }
    },
    computed: {
        sources() {
            return this.$store.state.academic.repository
        }
    }
}
</script>