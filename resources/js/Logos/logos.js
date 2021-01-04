import Quill from 'quill/core';

import Toolbar from 'quill/modules/toolbar';
import BubbleTheme from './quill/themes/bubble';

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Underline from 'quill/formats/underline';
import Link from 'quill/formats/link';

import Blockquote from 'quill/formats/blockquote';
import Header from 'quill/formats/header';
import List, {ListItem} from "quill/formats/list";

import Image from "quill/formats/image";
import Video from "quill/formats/video";

import SourceBlot from 'dsm/quill/blots/source'


const quillComponents = {
    'modules/toolbar': Toolbar,
    'themes/bubble': BubbleTheme,
    'formats/bold': Bold,
    'formats/italic': Italic,
    'formats/underline': Underline,
    'formats/link': Link,
    'formats/list': List,
    'formats/list/item': ListItem,
    'formats/blockquote': Blockquote,
    'formats/header': Header,
    'formats/image': Image,
    'formats/video': Video,
}


// Safe register Quills imports. Avoids overwritting.
for (const [name, component] of Object.entries(quillComponents)) {
    if (!Quill.imports.hasOwnProperty(name)) {
        Quill.register(name, component);
    } else {
        console.warn('componente: ' + name + ' ya se encuentra registrado')
    }
}

/** @todo averiguar con que nombre se lo puede registrar */
Quill.register(SourceBlot);

const logos = {
    Quill,
    SSPs : {},
    
    registerSSPs: function (SSPs) {
        SSPs.forEach(SSP => {
            SSP.register(this.Quill);
            this.SSPs[SSP.name] = SSP;
        });
    },

    registerStoreModules: function (store) {
        for(const sspName in this.SSPs) {
            this.SSPs[sspName].setStore(store, sspName)
        }
    },

    setControllers(quill) {
        for(const sspName in this.SSPs) {
            this.SSPs[sspName].setController(quill)
        }
    },

    getStoresData() {
        for(const sspName in this.SSPs) {
            this.SSPs[sspName].setController(quill)
        }
    }
}

/** 
 * @todo crear método para guardar controladores (módulos) en cada SSP una vez
 * inicalizado quill.
 * 
 * @todo Crear método para registrar los módulos, una vez que se tiene el store de Vuex.
 * 
 * @todo Crear un método para inyectar los SSPs configurados
 */

export {logos};

