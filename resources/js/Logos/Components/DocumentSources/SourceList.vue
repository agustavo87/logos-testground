<template>
<div class="my-2 mx-auto max-w-lg">
        <ul class="list-disc">
            <li v-for="source in sources" :key="source.key">
                {{ source.data }}
                a
            </li>
        </ul>
</div>
</template>
<script>
export default {
    name: 'SourceList',
    props: ['moduleName', 'storeName'],
    computed: {
        sources() {
            return this.$store.state[this.storeName].repository
        }
    }
}
</script>