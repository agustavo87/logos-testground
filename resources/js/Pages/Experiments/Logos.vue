<template>
<div class=" h-screen pt-10 px-7 bg-gray-100">
    <logos 
        :editor-class="['h-1/2', 'border', 'max-w-lg', 'mx-auto', 'bg-white', 'border-gray-200']" 
        :active-class="'border-blue-200'"
        class=" h-full "
    />

</div>
</template>

<script>
import Logos from '../../Logos/Components/Logos'

export default {
    components: {
        Logos
    }
}

</script>
