import { $ } from '@/core/DOM';

import { ExcelComponent } from '@core/ExcelComponent';
import { keyboard } from '../table/table.types';

/** @class */
export class Formula extends ExcelComponent {
    /**
     * @static className
     */
    static className = 'excel__formula formula';

    /**
     * @constructor
     * @param {Object} $root
     * @param {Object} options
     */
    constructor($root, options) {
        super($root, {
            listeners: [ 'input', 'keydown' ],
            ...options,
        });
    }

    /**
     * Init Component hook
     */
    init() {
        super.init();

        this.$formula = this.$root.find('#formula');
        this.$on('table:select', ($cell) => {
            this.$formula.text($cell.text());
        });
        this.$on('table:input', ($cell) => {
            this.$formula.text($cell.text());
        });
    }

    /**
     * Input event
     * @param {Event} event
     */
    onInput(event) {
        const text = $(event.target).text();
        this.$emit('formula:input', text);
    }

    /**
     * Keydown event
     * @param {Event} event
     */
    onKeydown(event) {
        const keys = [
            keyboard.ENTER,
            keyboard.TAB,
        ];

        const { keyCode } = event;
        if (!keys.includes(keyCode)) {
            return;
        }
        event.preventDefault();
        this.$emit('formula:done');
    }

    template = `
        <div class="formula__info">fx</div>
        <div
            id="formula"
            class="formula__input"
            contenteditable
            spellcheck="false">
        </div>
    `
}
