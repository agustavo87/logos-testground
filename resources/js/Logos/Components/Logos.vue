<template>

    <quill 
        @q-focus="$emit('l-focus')" 
        @q-blur="$emit('l-blur')"
        :active-class="activeClass"
        :editor-class="editorClass"
        @new-source-type="$emit('new-source-type', $event)"
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
    props: ['activeClass', 'editorClass']
}
</script>
