
import Quill from 'quill/core';

import Toolbar from 'quill/modules/toolbar';
// import BubbleTheme from 'quill/themes/bubble';
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

const quillComponentsArray = [
    SourceBlot
]


//safe register. Avouds overwritting.
for (const [name, component] of Object.entries(quillComponents)) {
    if (!Quill.imports.hasOwnProperty(name)) {
        Quill.register(name, component);
    } else {
        console.warn('componente: ' + name + ' ya se encuentra registrado')
    }
}



Quill.register(SourceBlot);


const logos = {
    Quill
}

export {logos};

