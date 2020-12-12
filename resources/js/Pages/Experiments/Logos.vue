<template>
<div class=" h-screen pt-10 px-7 bg-gray-100">
    <logos 
        :editor-class="['h-1/2', 'border', 'max-w-lg', 'mx-auto', 'bg-white', 'border-gray-200']" 
        :active-class="'border-blue-200'"
        class=" h-full "
        @new-source-type="onNewSourceType"
    />
</div>
</template>

<script>
import Logos from '../../Logos/Components/LogosQuill'
import Citations from 'dsm/quill/modules/Citations';
import {SourceTypes} from 'dsm/DSM/SourceTypes';

/** @type {SourceProvider} */
const CitationsSource = {
    name: 'citation',
    module: Citations,
    /** @type {CitationsProperties} */
    options: {
            type: SourceTypes.CITATION_DOCUMENT,
            class: 'citation',
            /**@type {ReferenceRenderHandlers} */
            handlers: {
                /** @type {ReferenceRenderCallback} */
                create: function (node, data, controller) {
                    node.setAttribute('title', data.key)
                }
            }
    }
};


export default {
    sources: new Map(),
    provide () {
        return {
            SourceProviders: [
                CitationsSource
            ]
        }
    },
    components: {
        Logos
    },
    methods: {
        onNewSourceType (data) {
            this.$options.sources.set(data.name, data.module);
            console.log('new source type:');
            console.log(this.$options.sources.get(data.name));
        }
    }

}

</script>
