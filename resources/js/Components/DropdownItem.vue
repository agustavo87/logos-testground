<template>
<din-anchor 
    :current="current" 
    class="block px-4 py-2 text-gray-200 sm:text-gray-800" 
    @selection="$emit('selection')"
    :class="classes"
>
    <slot />
</din-anchor>
</template>

<script>

import DinAnchor from './DinAnchor';

export default {
    components: {
        DinAnchor
    },
    props: {
        current: Boolean
    },
    computed: {
        classes() {
            return this.current
                ? 'font-medium'
                : 'hover:bg-gray-700 sm:hover:bg-indigo-500 hover:text-white'
        }
    }
    
}
</script>