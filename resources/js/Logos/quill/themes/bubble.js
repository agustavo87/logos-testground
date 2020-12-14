/**
 * Extensión del tema Bubble
 * 
 * Principalmente para modificar los íconos.
 */

import BubbleTheme , {BubbleTooltip} from 'quill/themes/bubble';
import icons from '../ui/icons';


BubbleTheme.prototype.extendToolbar =   function (toolbar) {
    this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
    this.tooltip.root.appendChild(toolbar.container);
    this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), icons);
    this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), icons);
  }


export { BubbleTooltip, BubbleTheme as default };