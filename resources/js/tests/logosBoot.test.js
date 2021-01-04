import {logos} from '../logosBoot'

it('has API registered', () => {
    expect(true).toBe(true);
    for (const sspName in logos.SSPs) {
        expect(logos.SSPs[sspName].api).toMatchObject({
            index: expect.any(Function),
            store: expect.any(Function),
            obtain: expect.any(Function),
            update: expect.any(Function),
            delete: expect.any(Function),
        });
    }
})

it('registers Store', () => {
    const mockStore = {
        registerModule: jest.fn( (modName, module) => true )
    }
    logos.registerStoreModules(mockStore)
    expect(mockStore.registerModule).toHaveBeenCalled();

    for(const sspName in logos.SSPs) {
        expect(logos.SSPs[sspName].store).toBe(mockStore)
        expect(logos.SSPs[sspName].storeModuleName).toBe(sspName)
    }
})

it('Saves controllers', () => {
    const mockController = {};
    const mock_quill = {
        getModule: jest.fn( (modName) => mockController )
    }
    logos.setControllers(mock_quill)
    expect(mock_quill.getModule).toHaveBeenCalled();

    for(const sspName in logos.SSPs) {
        expect(logos.SSPs[sspName].controller).toBe(mockController)
    }
})