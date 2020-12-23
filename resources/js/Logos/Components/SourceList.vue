<template>
<div class=" my-10 mx-auto max-w-lg">
        <!-- Fuentes: {{sources}} -->
        <ul class="list-disc">
            <li v-for="source in sources" :key="source.key">
                {{ source.data }}
            </li>
        </ul>
</div>
</template>
<script>
export default {
    name: 'SourceList',
    computed: {
        sources() {
            return this.$store.state.sources
        }
    }
}
</script>