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
        <h2 class="font-semibold text-xl mt-5 mb-0">Fuentes del documento</h2>
        <document-sources-list />
    </div>
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
import moduleAcademicSources from '../../Logos/Modules/AcademicSources'
import AddSource from '../../Logos/Components/DocumentSources/AddSource'
import SourceList from '../../Logos/Components/DocumentSources/SourceList'
import SelectSource from '../../Logos/Components/DocumentSources/SelectSource'
import DocumentSourcesList from '../../Logos/Components/DocumentSources/DocumentSourcesList'

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
        this.$store.registerModule('academic', moduleAcademicSources)
        Vancouver.setStore(this.$store);
    },
    components: {
        Logos,
        AddSource,
        SourceList,
        SelectSource,
        DocumentSourcesList
    },

}

</script>
