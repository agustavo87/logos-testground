/**
 * Configure and initializes Source Services for enviroment
 * requirements.
 * 
 * - Insert API.
 */
import Vancouver from '../../Logos/SourceServiceProviders/Vancouver'

// Actually, it has to be and SourceApi implementation.
Vancouver.setAPI({
    index: () => true,
    store: (data) => true,
    obtain: (key) => true,
    update: (key, data) => true,
    delete: (key) => true
});

export default Vancouver;
