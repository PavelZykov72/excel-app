import { DOMListener } from '@core/DOMListener';

/** @class */
export class ExcelComponent extends DOMListener {
    /**
     * @constructor
     * @param {Object} $root
     * @param {Object} [options]
     */
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || this.constructor.name;
    }

    /**
     * Return DOM element
     * @return {String} DOM element
     */
    toHTML() {
        return this.template || '';
    }

    /**
     * Init Component
     */
    init() {
        this.initDOMListeners();
    }

    /**
     * Destroy component
     */
    destroy() {
        this.removeDOMListeners();
    }
}
