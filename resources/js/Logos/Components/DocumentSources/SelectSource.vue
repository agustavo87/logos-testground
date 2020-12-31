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
      <lg-button class=" w-24 self-end mt-2" v-on:click="putSource">Insertar</lg-button>

</div>
</template>
<script>
import lgSelect from '../Base/Select';
import lgButton from '../Base/Button';

export default {
    name: 'SelectSource',
    inject: ['logosSSP'],
    props: ['moduleName', 'storeName'],
    components: {
        lgSelect,
        lgButton
    },
    data() {
        return {
            selected: null
        }
    },
    computed: {
        sources() {
            return this.$store.state[this.storeName].repository
        }
    },
    methods: {
      putSource() {
        this.$store.dispatch(this.storeName + '/put', {
          key: this.selected,
          controller: this.logosSSP.get(this.moduleName).controller
        });
      }
    }
}
</script>