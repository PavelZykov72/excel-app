import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { tableResizeHandler } from './table.resize';
import { shouldResize } from './table.functions';

/** @class */
export class Table extends ExcelComponent {
    /**
     * @static className
     */
    static className = 'excel__table table';

    /**
     * @constructor
     * @param {Object} $root
     */
    constructor($root) {
        super($root, {
            listeners: [ 'mousedown' ],
        });
    }

    /**
     * Mousedown event
     * @param {Event} event
     */
    onMousedown(event) {
        if (!shouldResize(event)) {
            return;
        }

        tableResizeHandler(this.$root, event);
    }

    template = createTable(50);
}
