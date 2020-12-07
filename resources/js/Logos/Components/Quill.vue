<template>
    <div id="quill-container" ref="quill">
        <slot>
        </slot>
    </div>
</template>

<script>
import Quill from "../quill";
import { getDelta } from "../utils/functions";

let quill = null;

export default {
    name: "Quill",
    props: {
        options: {
            type: Object, 
            default: () => {
                return  {
                    theme: 'bubble',
                    placeholder: 'Escribe algo épico',
                    modules: {
                        toolbar: ['bold', 'italic', 'underline']
                    }
                }
            }
        },
        value: null,    
    },

    // data () {
    //     return {
    //         quill:null
    //     }
    // },

    /** @fires Quill#created */
    mounted () {
        if (quill === null) {
            quill = new Quill(this.$refs.quill, this.options);

            /**
             * Quill is created.
             * Can be used to have acces to the quill instance.
             *
             * @event Quill#created
             * @type {object}
             * @property {Quill} target - the quill instance.
             * @property {external:HTMLElement} container - the quill container node.
             */
            this.$emit('created', {
                target: quill,
                container: this.$refs.quill,
                contents: this.getContents()
            });

            /**
             * Happens when the content of quill is changed. Meant to be 
             * handeld by model-binder and assign the $event value to the 
             * binded variable.
             * It's not emitted if the change source is 'value-watch', to 
             * prevent an inifinite loop if the change of the variable binded
             * to value changes the value prop, that changes quill, and emits 
             * an input event that changes the binded variable.
             *
             * @event Quill#input
             * @type {object}
             * @property {Quill} target - the quill instance.
             * @property {external:HTMLElement} container - the quill container node.
             */
            quill.on('text-change', function (delta, oldDelta, source) {
                // 
                if (source !== 'value-watch') {
                    this.$emit('input', this.getContents(delta, oldDelta, source));
                }
            }.bind(this));
        }
    },
    methods: {
        /**
         * Gets the contents of quill in structured way.
         * Also handles 'change' events.
         * 
         * @param {object} delta new delta from change callback
         * @param {object} oldDelta from change callback
         * @param {string} source from change callback
         */
        getContents(delta = null, oldDelta = null, source = null) {
            return {
                delta: quill.getContents(),
                html: quill.scroll.domNode.innerHTML,
                change: {
                    delta, 
                    oldDelta,
                    source,
                    date: new Date()
                }
            }
        }
    },
    watch: {
        /** 
         * Used to set new contents 
         * 
         * @param {object} contents Has to have a 'delta' property with a valid 
         * delta and is provided by the parent setter.
         * @param {object} oldContents the anterior content object, provided 
         * by the vue watch callback.
         */
        value(contents, oldContents) {
            console.log('Quill-delta: new: %o, old: %o', contents.delta, oldContents.delta);
            let data = getDelta.fromRaw(contents.delta);
            if(data) {
                quill.setContents(data, 'value-watch');
            } else {
                console.warn('Quill: invalid delta %o', contents.delta);
                /** @todo mutate the original binded variable vía an 'input' event. */
                /** @todo emit some kind of error notification. */
            }
        }
    }
}
</script>

<style>
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.bubble.css';
</style>