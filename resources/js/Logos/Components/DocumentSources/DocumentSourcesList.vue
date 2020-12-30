<template>  
<ul>
    <li v-for="item in listData" :key="item.key">
        {{ item.data }}
    </li>

</ul>
</template>

<script>
export default {
    inject: ['logosSSP'],
    // props: [list],
    data () {
        return {
            list: []
        }
    },
    mounted () {
        this.list = this.logosSSP.get('citation_vancouver').controller.data.list;
    },
    computed: {
        listData() {
            return this.list.map(key => {
                return this.$store.state.academic.document.get(key);
                // return key;
            });
        }
    }
}
</script>