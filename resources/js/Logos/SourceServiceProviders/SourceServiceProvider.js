/** @typedef {import('dsm/quill/modules/Citations').CitationsOptions} CitationsOptions */
/** @typedef {import('dsm/quill/modules/Citations').default} Citations */
/** @typedef {import('vuex').Store}  Store*/
/** @typedef {import('quill').default}  Quill*/

import SourceAPI from './abstract/Api';


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
  * - Vue data
  * - Backend API
  */
class SourceServiceProvider {

    // Instance Properties
    // - Quill - Quill class / after register
    // - module - the Citations module / after setted the controller
    // - controller - the Citations instance initialized by quill /once setted
    // - options - the CitationsOptions object.
    // - store - the Vuex store
    // - api - the Backend API interface


    /**
     * Instantiates the SourceServiceProvider
     * 
     * @param {SourceServiceProviderOptions} options 
     * @param {Object} storeModule  
     * @param {SourceCRUDInterface} api - Backend API
     */
    constructor(options, storeModule,  api = null) {
        this._options = options;
        
        this._api = api

        // setted on logos boot
        this.Quill = null;

        // is setted on quill boot
        this.quill = null;
        this._controller = null;

        // Store
        this._storeModule = storeModule;
        // is setted after Vuex boot
        this._store = null;
        this._storeModuleName = null;

        this.cacheCitationsOptions()
    }

    /**
     * Handles the Citations 'create' callback
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
     * Handles the Citations 'update' callback
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
     * Handles the Citations 'remove' callback
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

    get citationsOptions() {
        return this.cachedCitationsOptions;
    }


    /**
     * Registers the Quill's module.
     * 
     * @param {Quill} Quill - Quill class
     */
    register(Quill) {
        if (!Quill.imports.hasOwnProperty('modules/' + this._options.name )) {
            Quill.register('modules/' + this._options.name, this._options.module);
        } else {
            console.warn('Modulo: ' + this._options.name + ' ya se encuentra registrado')
        }
        this.Quill = Quill;
    }

    /**
     * Saves the Quill's module instance after initialized.
     * 
     * @param {Quill} quill - Quill instance where is the initialized
     * controller.
     */
    setController(quill) {
        let controller = null;
        if (controller = quill.getModule(this._options.name)) {
            this._controller = controller;
        } else {
            console.error('invalid quill controller');
        }
        this.quill = quill;
    }

    get controller() {
        return this._controller;
    }

    /**
     * Saves the Vuex Store
     * 
     * @param {VuexStore} store - Quill instance where is the initialized
     * @param {string} name - The module name
     * controller.
     */
    setStore(store, name = null) {
        name = name ? name : this._options.name;
        if (this._store != null) {
            console.warn('Store already set, will be overwritten.')
        }
        this._store = store;
        this._storeModuleName = name;

        // this.$store.registerModule('academic', moduleAcademicSources)
        this._store.registerModule(this._storeModuleName, this._storeModule )
    }

    get store() {
        return this._store;
    }

    get storeModuleName() {
        return this._storeModuleName;
    }

    get name() {
        return this._options.name;
    }

    get module() {
        return this._options.module;
    }



    /**
     * Saves the API interface
     * 
     * @param {SourceAPI} api 
     */
    setAPI(api) {
        if (this._api != null) {
            console.warn('API already set, will be overwritten.')
        }
        this._api = api;
    }

    get api() {
        return this._api;
    }


}


export default SourceServiceProvider;