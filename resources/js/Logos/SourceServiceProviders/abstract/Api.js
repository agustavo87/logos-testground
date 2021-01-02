export default class SourceAPI {

    /**
     * Gets the index of available sources
     * 
     * @return {Promise} with 
     */
    index() {}

    /**
     * Store a source
     * 
     * @return {Promise}
     */
    store(data) {}

    /**
     * get a Source
     * 
     * @return {Promise}
     */
    obtain(key) {}

    /**
     * updaate a source
     * 
     * @return {Promise}
     */
    update(key, data) {}

    /**
     * delete a source.
     * 
     * @return {Promise}
     */
    delete(key) {}

}