<template>
   <div class="p-5">
       <h1 class="text-3xl py-5">Experimento con Modal</h1>
       <button @click="modalOpen = !modalOpen" class="btn btn-orange">Mostrar</button>
       <arete-alert-modal v-if="modalOpen" @accept="modalOpen = false" @cancel="modalOpen=false">
             <template v-slot:title>
            Cerrar cuenta
            </template>
           Estás seguro que queres cerrar tu cuenta guachin?
       </arete-alert-modal>
   </div>
</template>

<script>
import AreteAlertModal from '../../Components/AlertModal';
export default {
    components: {
        AreteAlertModal
    },
    data () {
        return {
            modalOpen: false
        }
    }
}
</script>