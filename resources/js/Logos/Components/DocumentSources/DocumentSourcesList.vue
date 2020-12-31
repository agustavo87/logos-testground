<template>  
<ul>
    <li v-for="item in listData" :key="item.key">
        {{ item.data }}
    </li>

</ul>
</template>

<script>
export default {
    name:'DocumentSourcesList',
    inject: ['logosSSP'],
    props: ['moduleName', 'storeName'],
    data () {
        return {
            list: []
        }
    },
    mounted () {
        this.list = this.logosSSP.get(this.moduleName).controller.data.list;
    },
    computed: {
        listData() {
            return this.list.map(key => {
                return this.$store.state[this.storeName].document.get(key);
                // return key;
            });
        }
    }
}
</script>