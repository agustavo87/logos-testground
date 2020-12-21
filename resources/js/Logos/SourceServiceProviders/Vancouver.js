/** @typedef {import('./SourceServiceProvider').SourceServiceProviderOptions} SourceServiceProviderOptions */
/** @typedef {import('dsm/quill/modules/Citations').CitationsOptions} CitationsOptions */
/** @typedef {import('dsm/quill/modules/Citations').ReferenceRenderHandlers} ReferenceRenderHandlers */
/** @typedef {import('dsm/quill/modules/Citations').ReferenceRenderCallback} ReferenceRenderCallback */



import SourceServiceProvider from './SourceServiceProvider';
import {SourceTypes} from 'dsm/DSM/SourceTypes'
import Citations from 'dsm/quill/modules/Citations';


SourceTypes['CITATION_VANCOUVER'] = "citation-vancouver";

/** @type {SourceServiceProviderOptions} */
export const VancouverSSPOptions = {
    name: 'citation_vancouver',
    module: Citations,
    /** @type {CitationsOptions} */
    options: {
            type: SourceTypes.CITATION_VANCOUVER,
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


class VancouverSSP extends SourceServiceProvider {

    constructor() {
        super(...arguments);
        this._this = this;
        this.hola = 'hola';
    }

    create(node, data, controller) {
        // console.log('VancouverSSP.create.this:', this)
        // if(!this.hasOwnProperty('_options')) {
        //     console.error('error! no existe el objeto \'this\' correcto')
        // }

        super.create(node, data, controller)
    }
    update(node, data, controller) {
        // console.log('VancouverSSP.create.this:', this)
        // if(!this.hasOwnProperty('_options')) {
        //     console.error('error! no existe el objeto \'this\' correcto')
        // }
        super.update(node, data, controller)
    }
    remove(node, data, controller) {
        // console.log('VancouverSSP.create.this:', this)
        // if(!this.hasOwnProperty('_options')) {
        //     console.error('error! no existe el objeto \'this\' correcto')
        // }
        super.remove(node, data, controller)
    }

}

const store = {}; // temp mocks
const api = {};
const Vancouver = new VancouverSSP(VancouverSSPOptions, store, api)
export default Vancouver;
