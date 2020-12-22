<template>
<div class=" h-screen pt-10 px-7 bg-gray-100">
    <logos 
        :editor-class="['h-full', 'border', 'max-w-lg', 'mx-auto', 'bg-white', 'border-gray-200']" 
        :active-class="'border-blue-200'"
        class="h-1/2 mb-2"
        @input="post.content = $event"
        :setted-delta="settedDelta"
    />

    <lg-citations />
</div>



</template>

<script>
import Logos from '../../Logos/Components/LogosQuill'
import Vancouver from '../../Logos/SourceServiceProviders/Vancouver'
import lgCitations from '../../Logos/Components/Citations'

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
    components: {
        Logos,
        lgCitations
    },

}

</script>
