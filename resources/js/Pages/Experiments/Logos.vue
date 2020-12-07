<template>
<div class="main-container bg-gray-200">
    <div class="quill-section p-5">
        <h1 class="quill-title text-2xl font-semibold"> Un título </h1>
        <div class="quill-container p-0">
            <log-quill class="border">
                Aquí va algo de texto
            </log-quill>
        </div>
    </div>
</div>
</template>

<script>

import logQuill from "./../../Logos/Components/Quill";

export default {
    components: {
        logQuill
    }
}
</script>

<style>
.main-container {
    height: 100vh;
    /* box-sizing: border-box; */
}

.quill-section {
    height: 33%;
    box-sizing: border-box;
    /* border: 1px solid gray; */
}

.quill-title {
    height: 3rem;
    box-sizing: border-box;
    /* border: 1px solid red; */
    padding: 0.5rem 0.5rem;
}

.quill-container {
    height: calc(100% - 2rem);
    box-sizing: border-box;
    background-color: white;
    /* border: 1px solid blue; */
}

.ql-editor {
    padding: 1rem 0.5rem;
}

</style>