<template>
<div class="pt-10 px-7 bg-gray-100">
    <logos 
        :editor-class="['h-full', 'border', 'max-w-lg', 'mx-auto', 'bg-white', 'border-gray-200']" 
        :active-class="'border-blue-200'"
        class=" h-44 mb-2"
        @input="post.content = $event"
        :setted-delta="settedDelta"
    />
    <div class=" max-w-xl mx-auto">
        <h2 class="font-semibold text-xl mt-5 mb-0">Insertar Fuente</h2>
        <select-source />
    </div>
    <div class=" max-w-xl mx-auto">
        <h2 class="font-semibold text-xl mt-5 mb-0">Agregar nueva fuente</h2>
        <add-source />
    </div >
    <div class=" max-w-xl mx-auto">
        <h2 class="font-semibold text-xl mt-5 mb-0">Fuentes disponibles</h2>
        <source-list />
    </div>
</div>


</template>

<script>
import Logos from '../../Logos/Components/LogosQuill'
import Vancouver from '../../Logos/SourceServiceProviders/Vancouver'
import moduleSourceRepository from '../../Logos/Modules/SourceRepository'
import AddSource from '../../Logos/Components/AddSource'
import SourceList from '../../Logos/Components/SourceList'
import SelectSource from '../../Logos/Components/SelectSource'

const logosSSP = new Map();
logosSSP.set(Vancouver.name, Vancouver);
window.logosSSP = logosSSP;

export default {
    sources: logosSSP,
    provide () {
        return {
            logosSSP
        }
    },
    data() {
        return {
            post: {
                content: {}
            },
            settedDelta: {}
        }
    },
    beforeCreate() {
        this.$store.registerModule('repository', moduleSourceRepository)
    },
    components: {
        Logos,
        AddSource,
        SourceList,
        SelectSource
    },

}

</script>
