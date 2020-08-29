import { ExcelComponent } from '@core/ExcelComponent';

/** @class */
export class Toolbar extends ExcelComponent {
    /**
     * @static className
     */
    static className = 'excel__toolbar toolbar';

    /**
     * @constructor
     * @param {DOM} $root
     * @param {Object} options
     */
    constructor($root, options) {
        super($root, {
            listeners: [ 'input' ],
            ...options,
        });
    }

    /**
     * Input event
     * @param {Event} event
     */
    onInput(event) {}

    template = `
        <div class="toolbar__button">
            <i class="material-icons">format_align_left</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_align_center</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_align_right</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_bold</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_italic</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_underline</i>
        </div>
    `
}
