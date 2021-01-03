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
        <document-sources-list 
            :store-name="sources.Vancouver.storeName"
            :module-name="sources.Vancouver.name"
        />
    </div>
    <div class=" max-w-xl mx-auto">
        <h2 class="font-semibold text-xl mt-5 mb-0">Insertar Fuente</h2>
        <select-source 
            :store-name="sources.Vancouver.storeName"
            :module-name="sources.Vancouver.name"
        />
    </div>
    <div class=" max-w-xl mx-auto">
        <h2 class="font-semibold text-xl mt-5 mb-0">Agregar nueva fuente</h2>
        <add-source 
            :store-name="sources.Vancouver.storeName"
            :module-name="sources.Vancouver.name"
        />
    </div >
    <div class=" max-w-xl mx-auto">
        <h2 class="font-semibold text-xl mt-5 mb-0">Fuentes disponibles</h2>
        <source-list 
            :store-name="sources.Vancouver.storeName"
            :module-name="sources.Vancouver.name"
        />
    </div>
</div>


</template>

<script>
import Logos from '../../Logos/Components/LogosQuill'
import Vancouver from '../../Logos/SourceServiceProviders/Vancouver'
import DocumentSourcesList from '../../Logos/Components/DocumentSources/DocumentSourcesList'
import AddSource from '../../Logos/Components/DocumentSources/AddSource'
import SelectSource from '../../Logos/Components/DocumentSources/SelectSource'
import SourceList from '../../Logos/Components/DocumentSources/SourceList'

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
            settedDelta: {},
            sources: {
                Vancouver: {
                    storeName: Vancouver.storeModuleName, 
                    name: Vancouver.name
                }
            }
        }
    },
    beforeCreate() {
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
