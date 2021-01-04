import SourceServiceProvider from '../SourceServiceProviders/SourceServiceProvider';
import {SourceTypes} from 'dsm/DSM/SourceTypes';
import Quill from 'quill/core';
import Citations from 'dsm/quill/modules/Citations'



SourceTypes['CITATION_TEST'] = "citation-test";


// const Citations = {prop:'mock'} // Mock of Citations module.
const optionsCreateCB = jest.fn();
const optionsUpdateCB = jest.fn();
const optionsRemoveCB = jest.fn();


/** @type {SourceServiceProviderOptions} */
const SSPOptions = {
    name: 'citation_test',
    module: Citations,
    /** @type {CitationsOptions} */
    options: {
            type: SourceTypes.CITATION_TEST,
            class: 'citation-test',
            /**@type {ReferenceRenderHandlers} */
            handlers: {
                /** @type {ReferenceRenderCallback} */
                create: optionsCreateCB,
                update: optionsUpdateCB,
                remove: optionsRemoveCB
            }
    }
};

const Store = {};
const API = {};



it('calls callbacks specified in the options handlers', () => {
    const mySSP = new SourceServiceProvider(SSPOptions, Store, API);
    mySSP.create({}, {}, {});
    mySSP.update({}, {}, {});
    mySSP.remove({}, {}, {});
    expect(optionsCreateCB).toBeCalled();
    expect(optionsUpdateCB).toBeCalled();
    expect(optionsRemoveCB).toBeCalled();
})

/** @todo buscar la forma de chequear identidad con bunded functions */
// it('replaces the module options CB handlers with SSP CB handlers', () => {
//     const mySSP = new SourceServiceProvider(SSPOptions, Store, API);
//     expect(mySSP.citationsOptions.handlers.create).toBe(mySSP.create);
//     expect(mySSP.citationsOptions.handlers.update).toBe(mySSP.update);
//     expect(mySSP.citationsOptions.handlers.remove).toBe(mySSP.remove);
// })

it('registers module in Quill', () => {
    const mySSP = new SourceServiceProvider(SSPOptions, Store, API);
    // const myQuill = require('quill');
    mySSP.register(Quill);
    expect(Quill.import('modules/' + mySSP.name)).toBe(Citations);
    // console.log(Object.keys(myQuill.imports));
});


it('saves the quill Citations module instance', () => {
    jest.resetModules();
    const mySSP = new SourceServiceProvider(SSPOptions, Store, API);

    // console.log(Quill);
    mySSP.register(Quill);

    const container = document.createElement('div');
    container.id = "quill-container";

    const quill = new Quill(container, {
        modules: {
            citation_test: mySSP.citationsOptions
        }
    });
    mySSP.setController(quill);

    expect(mySSP.controller).toBe(quill.getModule(mySSP.name));
});

/**
 * @todo Probar integración con Vuex Store
 * @todo Probar integración con Backend
 */

 it('saves store', () => {
    jest.resetModules();
    const mySSP = new SourceServiceProvider(SSPOptions, Store, API);

    const mockStore = {
        registerModule: jest.fn(() => true)
    };
    mySSP.setStore(mockStore);
    expect(mySSP.store).toBe(mockStore);
    expect(mySSP.storeModuleName).toBe(mySSP.name); // default
 });

 it('saves api', () => {
    jest.resetModules();
    const mySSP = new SourceServiceProvider(SSPOptions, Store, API);

    const mockApi = {};
    mySSP.setAPI(mockApi);
    expect(mySSP.api).toBe(mockApi);
 });