<template>
    <din-anchor 
    class="block px-4 py-2 text-gray-800"
    :class="classes"
    :current="current"
    v-bind="$attrs"
    @selected="$emit('selected')"
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
    },
    computed: {
        classes() {
            return this.current
            ? 'cursor-default font-semibold'
            : 'hover:bg-indigo-500 hover:text-white';
        }
    }
}
</script>