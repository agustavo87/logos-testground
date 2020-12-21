import Quill from 'quill/core'
import SourceBlot from 'dsm/quill/blots/source';


let Vancouver = {}
const VancouverSSPOptions = require('../SourceServiceProviders/Vancouver').VancouverSSPOptions;
Vancouver = require('../SourceServiceProviders/Vancouver').default;



it('heritage basic props', () => {
    expect(Vancouver.name).toBe(VancouverSSPOptions.name);
    expect(Vancouver.module).toBe(VancouverSSPOptions.module);
});

it('saves _options', () => {
    expect(Vancouver._options).toBe(VancouverSSPOptions);
});

it('heritage computed props', () => {
    expect(Vancouver.citationsOptions.type).toBe(VancouverSSPOptions.options.type);
    expect(Vancouver.citationsOptions.class).toBe(VancouverSSPOptions.options.class);
})

// it('replaces callbacks in module props', () => { // dont know how to gen acces to the function from
//the bounded function.
//     // let createSpy = jest.spyOn(Vancouver, 'create');
//     // Vancouver.citationsOptions.handlers.create(document.createElement('div'),{},{});
//     // Vancouver.create(document.createElement('div'),{},{});
//     console.log(Vancouver.citationsOptions.handlers.create);
//     expect(true).toBe(true);
//     // expect(Vancouver.citationsOptions.handlers.create).toBe(Vancouver.create.bind(Vancouver));
//     // expect(Vancouver.citationsOptions.handlers.update).toBe(Vancouver.update.bind(Vancouver));
//     // expect(Vancouver.citationsOptions.handlers.remove).toBe(Vancouver.remove.bind(Vancouver));
    
// });

it('calls the original callbacks in options parameter', () => {
    let createSpy = jest.spyOn(VancouverSSPOptions.options.handlers, 'create')
    Vancouver.create(document.createElement('div'),{},{});
    expect(createSpy).toHaveBeenCalled();
    createSpy.mockRestore()
    
    let updateSpy = jest.spyOn(Vancouver, 'update')
    Vancouver.update(document.createElement('div'),{},{});
    expect(updateSpy).toHaveBeenCalled();
    updateSpy.mockRestore()

    let removeSpy = jest.spyOn(Vancouver, 'remove')
    Vancouver.remove(document.createElement('div'),{},{});
    expect(removeSpy).toHaveBeenCalled();
    removeSpy.mockRestore();
})

describe ('Function with Quill', () => {
    // const Quill = require('quill');
    // const SourceBlot = require('dsm/quill/blots/source').default;
    Quill.register(SourceBlot);

    const container = document.createElement('div');
    container.id = 'quill-container';
    document.body.append(container);
    let quill = {};

    it('registers correctly the module', () => {
        Vancouver.register(Quill);
        expect(Quill.imports).toHaveProperty('modules/' + Vancouver.name);
    })

    it('saves the module instance', () => {
        quill = new Quill(container, {
            modules: {
                [Vancouver.name]: Vancouver.citationsOptions
            }
        })
        Vancouver.setController(quill);
        expect(Vancouver.controller).toBe(quill.getModule(Vancouver.name));
    })

    it('puts a citation', () => {
        let key = 'gus2020'
        // Vancouver.controller.put('gus2020');
        expect(Vancouver.controller.quill).toBe(quill); // it's initialized
        expect(Vancouver.controller.quill.getSelection(true)).toBeInstanceOf(Object); // returns selection
        
        Vancouver.controller.put(key);
        // console.log(document.body.innerHTML)
        let sourceNode = container.querySelector('.ed-source');
        expect(sourceNode).toBeInstanceOf(HTMLElement);
        expect(sourceNode.dataset.key).toBe(key)
    })

})

