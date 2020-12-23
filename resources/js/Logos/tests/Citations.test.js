import Citations from 'dsm/quill/modules/Citations'; // suele no querer funcionar con npm link
import SourceBlot from 'dsm/quill/blots/source'
import {SourceTypes} from 'dsm/DSM/SourceTypes'
import Quill from 'quill/core'

const container = document.createElement('div');
container.id = 'quill-container';
document.body.append(container);


it('Citations is Citations', () => {
    expect(Citations).toBe(Citations);
})

it('has a working DOM that mounts quill-container', () => {
    let dasContainer = document.getElementById('quill-container');
    expect(dasContainer).toBeInstanceOf(HTMLElement);
})

describe('quill functioning', () => {
    
    let quill = {};
    let citationsController = {};

    it('registers SourceBlot', () => {
        Quill.register(SourceBlot);
        expect(Quill.imports.hasOwnProperty('formats/source'));
    });

    it('registers Citation', () => {
        Quill.register('modules/citations', Citations);
        expect(Quill.imports.hasOwnProperty('modules/citations')).toBe(true);
    });

    it('initializes quill', () => {
        quill = new Quill(container, {
            modules: {
                'citations': {
                    type: SourceTypes.CITATION_DOCUMENT,
                    class: 'citation',
                    handlers: {
                        create: function (node, data, controller) {
                            node.setAttribute('title', data.key)
                        }
                    }
                }
            }
        });
    
        citationsController = quill.getModule('citations');
        expect(citationsController).toBeInstanceOf(Citations);
    });

    it('puts a citation', () => {
        let key = 'gus2020'
        citationsController.put(key);
        let sourceNode = container.querySelector('.ed-source');
        expect(sourceNode).toBeInstanceOf(HTMLElement);
        expect(sourceNode.dataset.key).toBe(key)
    });


});

