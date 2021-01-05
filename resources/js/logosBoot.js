
/**
 * Configuration and SetUp of Logos
 * 
 * - Choose the SSPs to be used, and register its.
 */

import {logos} from './Logos/logos'
import Vancouver from './Services/Logos/Vancouver'

const SSPs = [
    Vancouver
]

logos.registerSSPs(SSPs);

export {logos}




