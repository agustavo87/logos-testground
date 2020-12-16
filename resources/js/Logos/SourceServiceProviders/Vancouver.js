/** @typedef {import('./SourceServiceProvider').SourceServiceProviderOptions} SourceServiceProviderOptions */
/** @typedef {import('dsm/quill/modules/Citations').CitationsOptions} CitationsOptions */
/** @typedef {import('dsm/quill/modules/Citations').ReferenceRenderHandlers} ReferenceRenderHandlers */
/** @typedef {import('dsm/quill/modules/Citations').ReferenceRenderCallback} ReferenceRenderCallback */



import SourceServiceProvider from './SourceServiceProvider';
import {SourceTypes} from 'dsm/DSM/SourceTypes'
import Citations from 'dsm/quill/modules/Citations';


SourceTypes['CITATION_VANCOUVER'] = "citation-vancouver";

/** @type {SourceServiceProviderOptions} */
const VancouverSSPOptions = {
    name: 'citation',
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
    create(node, data, controller) {
        super.create();
    }
    update(node, data, controller) {
        super.update();
    }
    remove(node, data, controller) {
        super.remove();
    }
}

export default Vancouver = new VancouverSSP(VancouverSSPOptions)