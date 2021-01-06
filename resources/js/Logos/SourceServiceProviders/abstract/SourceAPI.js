
/**
 * The index response with the sources
 * @typedef {Object} IndexResponse
 * @property {{key: {key:string, field1:string, field2:string, fieldn:string}}}   data - the data of the Source Models
 * @property {{
 *  first:string, 
 *  last:string,
 *  prev:string,
 *  next:string
 *                  }}  links - linkse of the index.
 * @property {{
 *  current_page:number,
 *  from:number,
 *  path:string,
 *  per_page:number,
 *  to:number,
 *  total:numer
 *                  }}  meta - information abaut the index.
 */


/** Interface for API for dealing with sources */
class SourceAPI {

    /**
     * 
     * @param {string} host the base host of the api
     */
    constructor(host) {
        this.host = host;
    }

    setCORS() {
        
    }

    /**
     * Gets the index of available sources
     * 
     * @return {?Promise}  with data object {@link IndexResponse} in response.
     */
    index() {
        return null; // must be overriden
    }

    /**
     * stores a source
     * 
     * @param {object} data - the source model
     * @return {?Promise}
     */
    store(data) {
        return null; // must be overriden
    }

    /**
     * get a source
     * 
     * @param key - The source key
     * @return {?Promise}
     */
    obtain(key) {
        return null; // must be overriden
    }

    /**
     * updaate a source
     * 
     * @param key - the source model key
     * @param data - the data to be updated.
     * @return {?Promise}
     */
    update(key, data) {
        return null; // must be overriden
    }

    /**
     * delete a source.
     * 
     * @param key - the source key
     * @return {?Promise}
     */
    delete(key) {
        return null; // must be overriden
    }
}

export default SourceAPI;