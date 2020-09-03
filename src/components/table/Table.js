import { $ } from '@/core/DOM';

import { ExcelComponent } from '@core/ExcelComponent';
import { parse } from '@/core/parse';

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
import * as actions from '@/store/actions';
import { defaultStyles } from '@/constants';

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

        this.template = createTable(
            this.rows,
            this.cols,
            this.store.getState()
        );
    }

    /**
     * Init Component hook
     */
    init() {
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        this.$on('formula:input', (value) => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value));
            this.updateTextInStore(value);
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyles({
                value,
                ids: this.selection.selected,
            }));
        });
    }

    /**
     * Prepare data hook
     */
    prepare() {
      this.selection = new TableSelection();
    }

    /**
     * Select cell & trigger emit
     * @param {DOM} $cell
     */
    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);

        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }

    /**
     * Resize table handler
     * @param {Event} event
     */
    async resizeTable(event) {
        try {
            const data = await tableResizeHandler(this.$root, event);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn('Resize error', e.message);
        }
    }

    /**
     * Update cell value in store
     * @param {String} value
     */
    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value: value,
        }));
    }

    /**
     * Mousedown event
     * @param {Event} event
     */
    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        }

        if (isCell(event)) {
            const $target = $(event.target);
            const { shiftKey } = event;

            if (shiftKey) {
                const $cells = getMatrix($target, this.selection.current)
                    .map((id) => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.selectCell($target);
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
        this.updateTextInStore($(event.target).text());
    }

    template = '';
}
