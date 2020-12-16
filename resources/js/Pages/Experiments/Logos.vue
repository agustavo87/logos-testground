<template>
<div class=" h-screen pt-10 px-7 bg-gray-100">
    <logos 
        :editor-class="['h-1/2', 'border', 'max-w-lg', 'mx-auto', 'bg-white', 'border-gray-200']" 
        :active-class="'border-blue-200'"
        class=" h-full "
        @new-source-controller="onNewSourceController"
        @input="post.content = $event"
        :setted-delta="settedDelta"
    />
    <button @click="aumentar">Aumentar</button>
    <p>{{ count }}</p>
    <p>{{ cuadrado }}</p>
    <p>{{ doneTodosCount }}</p>
    <p>Second todo status: {{ secondTodoStatus }}</p>
</div>
</template>

<script>
import Logos from '../../Logos/Components/LogosQuill'
import Citations from 'dsm/quill/modules/Citations';
import {SourceTypes} from 'dsm/DSM/SourceTypes';
import { mapState, mapGetters, mapActions } from 'vuex'

/** @type {SourceProviderOptions} */
const CitationsSource = {
    name: 'citation',
    module: Citations,
    /** @type {SourceProperties} */
    options: {
            type: SourceTypes.CITATION_DOCUMENT,
            class: 'citation',
            /**@type {ReferenceRenderHandlers} */
            handlers: {
                /** @type {ReferenceRenderCallback} */
                create: function (node, data, controller) {
                    node.setAttribute('title', data.key)
                }
            }
    }
};
window.SourceProviders = [CitationsSource];

const logosSourceControllers = new Map()
window.logosSourceControllers = logosSourceControllers;

export default {
    sources: logosSourceControllers,
    provide () {
        return {
            SourceProviders: [
                CitationsSource
            ],
            SourceControllers: logosSourceControllers
        }
    },
    data() {
        return {
            post: {
                content: {}
            },
            settedDelta: {}
        }
    },
    components: {
        Logos
    },
    computed:{   
        cuadrado () {
            return this.count * this.count;
        },
        secondTodoStatus () {
            return this.$store.getters.getTodoById(2).done;
        },
        ...mapState(
            {
                count: state => state.count
            }
        ),
        ...mapGetters([
            'doneTodosCount'
        ])
    },
    methods: {
        onNewSourceController (SourceController) {
            this.$options.sources.set(SourceController.name, SourceController.module);
            console.log('new source type:');
            console.log(this.$options.sources.get(SourceController.name));
        },
        aumentar() {
            this.$store.commit('increment', 2);
            console.log(this.count);
        },
        ...mapActions([
            'increment',
            'incrementBy'
        ])
    }
}

</script>
