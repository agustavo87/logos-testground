<template>

    <quill class="border">
        <slot />
    </quill>


</template>

<script>

import Quill from "./Quill";

export default {
    components: {
        Quill
    }
}
</script>
