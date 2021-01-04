/**
 * Configure and initializes Source Services for enviroment
 * requirements.
 * 
 * - Insert API.
 */
import Vancouver from '../../Logos/SourceServiceProviders/Vancouver'


Vancouver.setAPI({
    index: () => true,
    store: (data) => true,
    obtain: (key) => true,
    update: (key, data) => true,
    delete: (key) => true
});

export default Vancouver;
