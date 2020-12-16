/** 
* Instancia de Quill preparada para Logos.
* 
* - Quill + core + theme + overrides CSS específicos de logos.
* - Manejo de módulos de fuentes.
*/

<template>
<div>
    <div ref="toolbar">
        <!-- Add a bold button -->
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-header" value='2'></button>
        <button class="ql-header" value='3'></button>
    </div>
    <div :class="computedClasses" v-bind="$attrs">
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
import SourceBlot from 'dsm/quill/blots/source'
import { getDelta } from "../utils/functions";

window.Quill = Quill;

let toolbarOptions = [
    ['bold', 'italic'], 
     [{ 'header': [2, 3, false] }],
    ];

export default {
    name: "Logos",
    quill: null,
    inheritAttrs: false,
    inject: ['SourceProviders'],
    props: {
        options: {
            type: Object, 
            default: () => {
                return  {
                    theme: 'bubble',
                    placeholder: 'Escribe algo épico',
                    modules: {}
                }
            }
        },
        settedDelta: {
            type: Object,
            default: null
        },
        activeClass: {
            type: String,
            default: ''
        },
        editorClass: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            focused:false,
        }
    },
    computed: {
        computedClasses () {
            return [
                this.focused ? this.activeClass : '',
                ...this.editorClass
            ]
        }
    },

    created () {
        this.registerSourceBlot();
        this.registerSourceControllers();
    },

    /** @fires Quill#created */
    mounted () {
        if (this.$options.quill === null) {
            this.options['modules']['toolbar'] = {
                container: this.$refs.toolbar
            };

            this.$options.quill = new Quill(this.$refs.quill, this.options);
            this.shareSourceControllers();

            window.quill = this.$options.quill;
            
            
            /**
             * Quill is created.
             * 
             * Can be used to have acces to the quill instance.
             * @event Quill#created
             * @type {object}
             */
            this.$emit('created', {
                target: this.$options.quill,
                container: this.$refs.quill,
                contents: this.getContents()
            });

            /**
             * Emit 'input' on quill change content.
             * 
             * @event Quill#input
             * @type {object}
             */
            this.$options.quill.on('text-change', function (delta, oldDelta, source) {
                this.$emit('input', this.getContents(delta, oldDelta, source));
            }.bind(this));

            this.$options.quill.scroll.domNode.addEventListener('focus', (event) => {
                this.focused = true;
                this.$emit('focus', event);
            });

            this.$options.quill.scroll.domNode.addEventListener('blur', (event) => {
                this.focused = false;
                this.$emit('blur', event);
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
         * @returns {object}
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
        },
        registerSourceBlot() {
            if(!Quill.imports.hasOwnProperty('formats/source')) {
                // console.log('registrando source blot');
                Quill.register(SourceBlot);
            }
        },
        registerSourceControllers () {
            this.SourceProviders.forEach(sp => {
                // if (Object.keys(Quill.imports).indexOf('modules/' + sp.name ) < 0) {
                if (!Quill.imports.hasOwnProperty('modules/' + sp.name )) {
                Quill.register('modules/' + sp.name, sp.module);
                    console.log('Modulo: ' + sp.name + ' registrado', Quill.import('modules/' + sp.name));
                } else {
                    console.log('Modulo: ' + sp.name + ' ya se encuentra registrado')
                }
                this.options['modules'][sp.name] = sp.options;
            });
        },
        shareSourceControllers () {
            let SourceController = {};
            this.SourceProviders.forEach(sp => {
                if (SourceController = this.$options.quill.getModule(sp.name)) {
                    this.$emit('new-source-controller', {
                        name: sp.name,
                        module: SourceController
                    });
                }
            });
        }
    },
    watch: {
        /** 
         * Binds value prop change to quill contents
         * 
         * @param {object} Delta 
         * @param {object} oldDelta 
         */
        settedDelta(Delta, oldDelta) {
            console.log('Quill-delta: new: %o, old: %o', Delta, oldDelta);
            let data = getDelta.fromRaw(Delta);
            if(data) {
                this.$options.quill.setContents(Delta, 'setted-delta-watch');
            } else {
                console.warn('Quill: invalid delta %o', Delta);
                /** @todo emit some kind of error notification.. */
            }
        }
    }
}
</script>

<style>
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.bubble.css';
@import '../css/logos.css';

.ql-editor {
    @apply font-sans
}

.ql-editor h2, .ql-editor h3 {
    @apply font-semibold text-gray-700;
}
.ql-editor h2 {
    @apply mt-5 mb-1 ;

}

.ql-editor h3 {
    @apply mt-3 mb-1;

}

.ql-editor p {
    @apply mb-2 ;

}
</style>

