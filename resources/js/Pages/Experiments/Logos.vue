<template>
<div class="logos-container">
<logos />
</div>
</template>

<script>
import Logos from '../../Logos/Components/Logos'

export default {
    components: {
        Logos
    }
}
</script>

<style>
/* 
.main-container {
    height: 100vh;
}

.quill-section {
    height: 33%;
    box-sizing: border-box;
}

.quill-title {
    height: 3rem;
    box-sizing: border-box;
    padding: 0.5rem 0.5rem;
}
*/
.logos-container {
    height: 300px;
    box-sizing: border-box;
    background-color: white;
}
/*
.ql-editor {
    padding: 1rem 0.5rem;
} */

</style>