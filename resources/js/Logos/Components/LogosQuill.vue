/** 
* Instancia de Quill estilizada para Logos.
* 
* Quill + core + theme + overrides específicos de logos.
*/

<template>
<div>
    <div ref="toolbar">
        <select class="ql-header">
            <!-- Note a missing, thus falsy value, is used to reset to default -->
            <option selected></option>
            <option value="2">Encabezado 1</option>
            <option value="3">Encabezado 2</option>
        </select>
        <!-- Add a bold button -->
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-header" value='2'></button>
        <button class="ql-header" value='3'></button>
        <!-- Add subscript and superscript buttons -->
        <!-- <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>   -->
    </div>
    <div :class="focused ? activeClass : ''">
        <div 
            ref="quill"
        >
            <slot />
        </div>
    </div>
</div>
</template>

<script>
import Quill from "../quill/quill";
import { getDelta } from "../utils/functions";

var toolbarOptions = [
    ['bold', 'italic'], 
     [{ 'header': [2, 3, false] }],
    ];

export default {
    quill: null,
    name: "Quill",
    props: {
        options: {
            type: Object, 
            default: () => {
                return  {
                    theme: 'bubble',
                    placeholder: 'Escribe algo épico',
                    // modules: {
                    //     toolbar: {
                    //         container: this.$refs.toolbar
                    //     }
                    // }
                }
            }
        },
        value: {
            type: Object,
            default: null
        },
        activeClass: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            focused:false,
        }
    },

    /** @fires Quill#created */
    mounted () {

        if (this.$options.quill === null) {
            this.options['modules'] = {
                        toolbar: {
                            container: this.$refs.toolbar
                        }
                    };
            this.$options.quill = new Quill(this.$refs.quill, this.options);
            
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
                target: this.$options.quill,
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
            this.$options.quill.on('text-change', function (delta, oldDelta, source) {
                // 
                if (source !== 'value-watch') {
                    this.$emit('input', this.getContents(delta, oldDelta, source));
                }
            }.bind(this));

            this.$options.quill.scroll.domNode.addEventListener('focus', (event) => {
                this.focused = true;
                this.$emit('q-focus');
            });

            this.$options.quill.scroll.domNode.addEventListener('blur', (event) => {
                this.focused = false;
                this.$emit('q-blur');
            });
            
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
                delta: this.$options.quill.getContents(),
                html: this.$options.quill.scroll.domNode.innerHTML,
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
         * Updates quill contents
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
                this.$options.quill.setContents(data, 'value-watch');
            } else {
                console.warn('Quill: invalid delta %o', contents.delta);
                /** @todo mutate the original binded variable vía an 'input' event. */
                /** @todo emit some kind of error notification.. */
            }
        }
    }
}
</script>

<style>
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.bubble.css';
/* @import 'quill/dist/quill.snow.css'; */


.ql-container {
    font-family: 'Times New Roman', Times, serif;
}

</style>