import { ExcelComponent } from '@core/ExcelComponent';

/** @class */
export class ExcelStateComponent extends ExcelComponent {
    /**
     * @constructor
     * @param  {...any} args
     */
    constructor(...args) {
        super(...args);
    }

    /**
     * Set initial state
     * @param {Object} initialState
     */
    initState(initialState = {}) {
        this.state = { ...initialState };
    }

    /**
     * Set new state
     * @param {Object} newState
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.$root.html(this.toHTML());
    }
}
