
/**
 * Configuración y Preparación de Logos para los requerimientos
 * del entorno.
 * 
 * - Seleccionar Servicios inicializados.
 */

import {logos} from './Logos/logos'
import Vancouver from './Services/Logos/Vancouver'

const SSPs = [
    Vancouver
]

logos.registerSSPs(SSPs);

export {logos}




