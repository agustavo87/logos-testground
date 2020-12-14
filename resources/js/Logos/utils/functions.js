import _ from "lodash";
import axios from 'axios';

function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
}

/**
 * Try to decode JSON, and return if this is possible. If not, 
 * returns the error (without throwing it)
 * @param {*} data to get json
 * @returns {object|Error} datos js evaluados o Error si no es parseable by JSON.
 */
function getJSON (data) {
    try {
        return JSON.parse(data)
    } catch (e) {
        return e;
    }
}

/**
 * @typedef improvedJSON
 * @type {object}
 * @property {string|Array|object|null} get the json value parsed if ok, 
 * null otherwise.
 * @property {boolean} errored
 * @property {SyntaxError} error
 */

/**
 * Try to parse a JSON string. Returns an 
 * improvedJSON to mannage the result.
 * @param {string} json the JSON string to parse
 * @returns {improvedJSON}
 */
function iJSON (json) {
    let ijson = {
        get: null,
        errored: false,
        error: null
    };

    try {
        ijson.get = JSON.parse(json)
    } catch (error) {
        ijson.errored = true;
        ijson.error = error;
    }

    return ijson;
}


/**
 * Utilidades para el procesamiento de Deltas
 */
const getDelta = {
    deltaOperations: ['insert','delete','retain'],

    /**
     * Chequea que un objeto tenga la propiedad ops, propia
     * de un delta.
     * 
     * @param {object} obj el objeto a chequear
     * @returns {boolean}
     */
    hasOps: function (obj) {
        return 'ops' in obj;
    },

    /**
     * Chequea que el primer mimebtro de un array sea 
     * una operación delta válida.
     * 
     * @param {array} array
     * @returns {boolean}  
     */
    matchOperations: function (array) {
        return this.deltaOperations.indexOf(_.keys(array[0])[0]) > -1;
    },

    /**
     * Chequea si un determinado dato es un delta válido.
     * 
     * @param {*} input El objeto que se quiere chequear
     * @returns {boolean}
     */
    check: function (input) {
        if (_.isArray(input)) {
            return this.matchOperations(input);
        } else if (_.isObject(input)) {
            if (this.hasOps(input)) {
                return this.matchOperations(input.ops);
            } else {
                return false;
            }
        } else {
            return false
        }
    },

    /**
     * Chequea y regresa los valores en datos JS, si 
     * son un delta válido, false si no.
     * 
     * @param {*} data 
     * @returns {object|Array|boolean} los datos si son válidos, false si no.
     */
    fromData: function (data) {
        if (this.check(data)) {
            return data;
        } else {
            return false;
        }
    },

    /**
     * Obtiene un delta a partir de información en JSON.
     * 
     * @param {string} JSON 
     * @returns {object|Array|boolean}  delta if valid, false otherwise
     */
    fromJSON: function (JSON) {
        return this.fromData(iJSON(JSON).get)
    },

    /**
     * Obtiene el delta de cualquir tipo de dato si es un delta
     * válido, false de otro modo.
     * 
     * @param {*} rawData
     * @returns {object|Array|boolean} delta si es válido, false de otro modo.
     */
    fromRaw: function (rawData) {
        let ijson = iJSON(rawData);
        if (!ijson.errored) {
            return this.fromData(ijson.get)
        } else {
            return this.fromData(rawData);
        }
    }
};

function jump(h) {
    let top = document.getElementById(h).offsetTop;
    window.scrollTo(0, top);
}

function logAjaxError (error) {
    if (error.response) {
        console.log('--error: server response--');
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('data:',error.response.data);
        console.log('status:', error.response.status);
        console.log('headers:', error.response.headers);
    } else if (error.request) {
        console.log('--error: no response--');
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('request', error.request);
    } else {
        console.log('--error: problem with requesting--');
        // Something happened in setting up the request that triggered an Error
        console.log('message:', error.message);
    }
    console.log('Error.config:',error.config);
}


// to be imported with an '$' alias.
function queryProxy (selector, el) {
    if (!el) {el = document;}
    return el.querySelector(selector);
}
function queryProxyAll (selector, el) {
    if (!el) {el = document;}
    return el.querySelectorAll(selector);
    // Note: the returned object is a NodeList.
    // If you'd like to convert it to a Array for convenience, use this instead:
    // return Array.prototype.slice.call(el.querySelectorAll(selector));
}

function cargarPost(post, vm) {
    vm.loadingPost = true;
    axios.get('/post/' + post)
        .then(response => {
            console.log(response);
            let data = response.data;
            let delta = getDelta.fromRaw(data.body);
            if (delta) {
                quill.setContents(delta);
                postTitle.value = data.title;
                updatePostInfo(data)
            } else {
                vm.errored = true;
                console.error('Delta no válido: \'%s\'', response.data.body);
            }
        })
        .catch(e => {
            vm.errored = true;
            logAjaxError(e);
        })
        .finally( () => vm.loadingPost = false );
}

export {
    isElement, jump,
    cargarPost, getDelta, getJSON, iJSON, logAjaxError,
    queryProxy, queryProxyAll
}
