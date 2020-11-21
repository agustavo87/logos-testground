<template>
<din-anchor
    class="block text-white opacity-75" 
    :class="classes"
    :current="current"
    v-bind="$attrs"
>
    <slot></slot>
</din-anchor>
</template>

<script>

import DinAnchor from './DinAnchor';

export default {
    inheritAttrs:false,
    components: {
        DinAnchor
    },
    props: {
        current:Boolean,
        first:Boolean,
    },
    computed: {
        classes() {
            let classes = this.current
            ? 'cursor-default opacity-100'
            : 'hover:opacity-100';

            classes += this.first ? ' ' : ' mt-3' ;
            return classes;
        }
    }
}
</script>