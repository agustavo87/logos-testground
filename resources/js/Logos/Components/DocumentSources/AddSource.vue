<template>
<div class="flex flex-col max-w-lg mx-auto">
    <lg-label for="key">Clave:</lg-label >
    <lg-text-input id="key" name="key" type="text" v-model="source.key" placeholder="pedro2020" required />
    <lg-label for="data">Data:</lg-label >
    <lg-text-input id="data" name="key" type="text" v-model="source.data" placeholder="Pedro, J. (2020). Titulo. Lugar: Editorial." required />
    <lg-button class=" w-24 self-end mt-2" v-on:click="putSource">Insertar</lg-button>
</div>
</template>
<script>
import lgLabel from '../Base/Label';
import lgTextInput from '../Base/TextInput';
import lgButton from '../Base/Button';

export default {
    name: 'AddSource',
    components: {
        lgLabel,
        lgTextInput,
        lgButton
    },
    data() {
        return {
            source: {
                key: '',
                data: ''
            }
        }
    },
    methods: {
        putSource() {
            console.log('poniendo cita');
            this.$store.commit('academic/save', this.source);
            this.source = {
                key: '',
                data: ''
            }
        }
    }
    
}
</script>