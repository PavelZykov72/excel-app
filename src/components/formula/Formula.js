import { ExcelComponent } from '@core/ExcelComponent';

/** @class */
export class Formula extends ExcelComponent {
    /**
     * @static className
     */
    static className = 'excel__formula formula';

    /**
     * @constructor
     * @param {Object} $root
     */
    constructor($root) {
        super($root);
    }

    template = `
        <div class="formula__info">fx</div>
        <div
            class="formula__input"
            contenteditable
            spellcheck="false">
        </div>
    `
}
