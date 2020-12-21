/** @typedef {import('dsm/quill/modules/Citations').CitationsOptions} CitationsOptions */
/** @typedef {import('dsm/quill/modules/Citations').default} Citations */
/** @typedef {import('vuex').Store}  Store*/
/** @typedef {import('quill').default}  Quill*/


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
     * @param {Store} store  - Vuex Store
     * @param {SourceCRUDInterface} api - Backend API
     */
    constructor(options, store, api) {
        this._options = options;
        this.store = store;
        this.api = api

        this._controller = null;
        this.Quill = null;
        this.quill = null;

        this.cacheCitationsOptions()
    }

    /**
     * Caches the merged citations options.
     * 
     * Replaces the CB handlers with methods in this
     * class. Wich calls at the time the provided CBs.
     */
    cacheCitationsOptions() {
        this.cachedCitationsOptions = {
            type: this._options.options.type,
            class: this._options.options.class,
            handlers: {
                create: this.create.bind(this),
                update: this.update.bind(this),
                remove: this.remove.bind(this),
            }
        }
    }

    /**
     * Handles the Citations create callback
     * 
     * @param {HTMLElement} node - The node of the quill embed element
     * @param {object} data - Of the reference {i, key} 
     * @param {Citations} controller - The citations object that manage the Reference
    */
    create(node, data, controller) {
        // console.log('root create called');
        if (this._options.options.handlers.create !== undefined) {
            this._options.options.handlers.create(node, data, controller);
        }
    }

    /**
     * Handles the Citations update callback
     * 
     * @param {HTMLElement} node - The node of the quill embed element
     * @param {object} data - Of the reference {i, key} 
     * @param {Citations} controller - The citations object that manage the Reference
    */
    update(node, data, controller) {
        // console.log('root update called');
        if (this._options.options.handlers.update !== undefined) {
            this._options.options.handlers.update(node, data, controller);
        }
    }

    /**
     * Handles the Citations remove callback
     * 
     * @param {HTMLElement} node - The node of the quill embed element
     * @param {object} data - {i, key. id} 
     * @param {Citations} controller - The citations object that manage the Reference
    */
    remove(node, data, controller) {
        // console.log('root remove called');
        if (this._options.options.handlers.remove !== undefined) {
            this._options.options.handlers.remove(node, data, controller);
        }
    }

    /**
     * Registers the module
     * 
     * @param {Quill} Quill - Quill class
     */
    register(Quill) {
        if (!Quill.imports.hasOwnProperty('modules/' + this._options.name )) {
            Quill.register('modules/' + this._options.name, this._options.module);
            // console.log('Modulo: ' + this._options.name + ' registrado', Quill.import('modules/' + this._options.name));
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
            this._controller = controller;
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

    get name() {
        return this._options.name;
    }

    get module() {
        return this._options.module;
    }

    get controller() {
        return this._controller ? this._controller : null;
    }

}


export default SourceServiceProvider;