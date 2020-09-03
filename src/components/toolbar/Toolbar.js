import { $ } from '@/core/DOM';

import { ExcelStateComponent } from '@/core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { defaultStyles } from '@/constants';

/** @class */
export class Toolbar extends ExcelStateComponent {
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
            listeners: [ 'click' ],
            subscribe: [ 'currentStyles' ],
            ...options,
        });
    }

    /**
     * Prepare data hook
     */
    prepare() {
        this.initState(defaultStyles);
    }

    /**
     * Get only changed subscribe fields for component
     * @param {Object} changes field
     */
    storeChanged({ currentStyles }) {
        this.setState(currentStyles);
    }

    /**
     * Template
     * @getter
     * @return {String} html
     */
    get template() {
        return createToolbar(this.state);
    }

    /**
     * On click event
     * @param {Event} event
     */
    onClick(event) {
        const $target = $(event.target);
        if ($target.data.type !== 'button') {
            return;
        }

        const data = JSON.parse($target.data.value);
        this.$emit('toolbar:applyStyle', data);
    }
}
