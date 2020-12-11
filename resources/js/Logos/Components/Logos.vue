<template>

    <quill 
        @q-focus="$emit('l-focus')" 
        @q-blur="$emit('l-blur')"
        :active-class="activeClass"
    >
        <slot />
    </quill>

</template>

<script>

import Quill from "./LogosQuill";

export default {
    components: {
        Quill
    },
    props: ['activeClass']
}
</script>
