import { $ } from '@/core/DOM';

import { ExcelComponent } from '@core/ExcelComponent';
import { TableSelection } from './TableSelection';
import { createTable } from './table.template';
import { tableResizeHandler } from './table.resize';
import { keyboard } from './table.types';
import {
    shouldResize,
    isCell,
    getMatrix,
    getNextSelector,
} from './table.functions';

/** @class */
export class Table extends ExcelComponent {
    /**
     * @static className
     */
    static className = 'excel__table table';
    /**
     * @static DEFAULT_ROWS
     */
    static DEFAULT_ROWS = 50;
    /**
     * @static DEFAULT_COLS
     */
    static DEFAULT_COLS = 26;

    /**
     * @constructor
     * @param {DOM} $root
     * @param {Object} options
     */
    constructor($root, options) {
        super($root, {
            listeners: [ 'mousedown', 'keydown', 'input' ],
            ...options,
        });

        this.rows = Table.DEFAULT_ROWS;
        this.cols = Table.DEFAULT_COLS;

        this.template = createTable(this.rows, this.cols);
    }

    /**
     * Init Component hook
     */
    init() {
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        this.$on('formula:input', (text) => {
            this.selection.current.text(text);
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
    }

    /**
     * Select cell & trigger emit
     * @param {DOM} $cell
     */
    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    /**
     * Prepare data hook
     */
    prepare() {
        this.selection = new TableSelection();
    }

    /**
     * Mousedown event
     * @param {Event} event
     */
    onMousedown(event) {
        if (shouldResize(event)) {
            tableResizeHandler(this.$root, event);
        }

        if (isCell(event)) {
            const $target = $(event.target);
            const { shiftKey } = event;

            if (shiftKey) {
                const $cells = getMatrix($target, this.selection.current)
                    .map((id) => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
            }
        }
    }

    /**
     * Keydown event
     * @param {Event} event
     */
    onKeydown(event) {
        const keys = [
            keyboard.ENTER,
            keyboard.TAB,
            keyboard.LEFT_ARROW,
            keyboard.RIGHT_ARROW,
            keyboard.UP_ARROW,
            keyboard.DOWN_ARROW,
        ];

        const { keyCode, shiftKey } = event;
        if (!keys.includes(keyCode) || shiftKey) {
            return;
        }
        event.preventDefault();

        const id = this.selection.current.id(true);
        const selector = getNextSelector(keyCode, id);
        const $next = this.$root.find(selector);

        this.selectCell($next);
    }

    /**
     * Input event
     * @param {Event} event
     */
    onInput(event) {
        this.$emit('table:input', $(event.target));
    }

    template = '';
}
