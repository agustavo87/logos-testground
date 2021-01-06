/**
 * Configure and initializes Source Services for enviroment
 * requirements.
 * 
 * - Insert API.
 */
import SourceAPI from '../../Logos/SourceServiceProviders/abstract/SourceAPI';
import Vancouver from '../../Logos/SourceServiceProviders/Vancouver'
import axios from 'axios';


class VancouverAPI extends SourceAPI {
    index() {
        // console.log(axios.)
        return axios.get(this.host + '/')
    }
}

Vancouver.setAPI(new VancouverAPI('http://localhost:8000'));

// Actually, it has to be and SourceApi implementation.
// Vancouver.setAPI({
//     index: () => true,
//     store: (data) => true,
//     obtain: (key) => true,
//     update: (key, data) => true,
//     delete: (key) => true
// });

export default Vancouver;
