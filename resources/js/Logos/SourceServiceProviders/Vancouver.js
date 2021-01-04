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
    name: 'vancouver',
    // name: 'citation_vancouver',
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

const VancouverVuexModule = {
    namespaced: true, 
    state: () => ({
      repository:[
        {
          key: 'gus2020',
          data: 'Gustavo, A. (2020). La condición de la maldad. Arkadia: Buenos Aires.'
        },
        {
          key: 'mar2019',
          data: 'Marambio, R. (2019). La tiranía de la democracia. Benchinon: México D.F..'
        }
      ],
      document: new Map()
    }),
    mutations: {
      save (state, source) {
        state.repository.push({
          key: source.key,
          data: source.data
        })
      },
      put (state, source) {
        state.document.set(source.key, source);
      }
    },
    actions: {
      put (context, payload) {
        context.commit('put', context.state.repository.find(source => source.key == payload.key));
        payload.controller.put(payload.key)
      }
    }
  };


class VancouverSSP extends SourceServiceProvider {

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

// const store = {}; // temp mocks
const api = {};
const Vancouver = new VancouverSSP(VancouverSSPOptions, VancouverVuexModule)
export default Vancouver;
