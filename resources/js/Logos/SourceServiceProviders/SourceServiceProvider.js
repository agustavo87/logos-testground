/** @typedef {import('dsm/quill/modules/Citations').CitationsOptions} CitationsOptions */


/**
 * @typedef SourceServiceProviderOptions
 * @type {object}
 * @property {string} name - The source module name.
 * @property {Citations} module - A Citation -or extended of- Quill's module.
 * @property {CitationsOptions} options - the options object to be pased to
 * the quills Citation Module.
 */

 /**
  * Ties toquether the diferents aspects
  * of source provision.
  * - Quill's modules
  * - Vue VM
  * - Backend API
  */
class SourceServiceProvider {

    // Instance Properties
    // - Quill - Quill class / after register
    // - module - the Citations module / after seted the controller
    // - controller - the Citations instance initialized by quill /once setted
    // - options - the CitationsOptions object.
    // - store - the Vuex store
    // - api - the Backend API interface


    /**
     * Instantiates the SourceServiceProvider
     * 
     * @param {SourceServiceProviderOptions} options 
     * @param {Vuex} store 
     * @param {SourceCRUDInterface} api 
     */
    constructor(options, store, api) {
        this._options = options;
        this.store = store;
        this.api = api

        this.controller = null;
        this.Quill = null;
        this.quill = null;

        this.cacheCitationsOptions()
    }

    cacheCitationsOptions() {
        this.cachedCitationsOptions = {
            type: this._options.options.type,
            class: this._options.options.class,
            handlers: {
                create: this.create,
                update: this.update,
                remove: this.remove
            }
        }
    }

    /**
     * Handles the Citations create callback
     * 
     * @param {external:HTMLElement} node - The node of the quill embed element
     * @param {object} data - Of the reference {i, key} 
     * @param {Citations} controller - The citations object that manage the Reference
    */
    create(node, data, controller) {
        this._options.options.handlers.create(node, data, controller);
    }

    /**
     * Handles the Citations update callback
     * 
     * @param {external:HTMLElement} node - The node of the quill embed element
     * @param {object} data - Of the reference {i, key} 
     * @param {Citations} controller - The citations object that manage the Reference
    */
    update(node, data, controller) {
        this._options.options.handlers.update(node, data, controller);
    }

    /**
     * Handles the Citations remove callback
     * 
     * @param {external:HTMLElement} node - The node of the quill embed element
     * @param {object} data - {i, key. id} 
     * @param {Citations} controller - The citations object that manage the Reference
    */
    remove(node, data, controller) {
        this._options.options.handlers.remove(node, data, controller);
    }

    /**
     * Quill instance in wich register the module
     * 
     * @param {Quill} quill 
     */
    register(Quill) {
        if (!Quill.imports.hasOwnProperty('modules/' + this._options.name )) {
            Quill.register('modules/' + this._options.name, this._options.module);
            console.log('Modulo: ' + this._options.name + ' registrado', Quill.import('modules/' + this._options.name));
        } else {
            console.log('Modulo: ' + this._options.name + ' ya se encuentra registrado')
        }
        this.Quill = Quill;
    }

    /**
     * Saves the Citations instance controller when initialized
     * 
     * @param {Quill} quill - Quill instance where is the initialized
     * controller.
     */
    setController(quill) {
        let controller = null;
        if (controller = quill.getModule(this._options.name)) {
            this.controller = controller;
        }
        this.quill = quill;

    }

    /**
     * Get the options object for the module.
     * 
     * It proxies the handler for the current class instance 
     * methods.
     */
    get citationsOptions() {
        return this.cachedCitationsOptions;
    }

}

export default SourceServiceProvider;