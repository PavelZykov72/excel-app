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

        this.unsubscribers = [];
        this.name = options.name || this.constructor.name;
        this.emitter = options.emitter;

        this.prepare();
    }

    /**
     * Prepare data hook
     */
    prepare() {}

    /**
     * Init Component hook
     */
    init() {
        this.initDOMListeners();
    }

    /**
     * Destroy component hook
     */
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach((unsubscriber) => unsubscriber());
    }

    /**
     * Return DOM element
     * @return {String} DOM element
     */
    toHTML() {
      return this.template || '';
    }

    /**
     * Emit (facade pattern)
     * @param {String} name
     * @param  {...any} args
     */
    $emit(...args) {
      this.emitter.emit(...args);
    }

    /**
     * Subscribe (facade pattern)
     * @param {String} name
     * @param {Function} fn
     */
    $on(...args) {
      const unsubscriber = this.emitter.subscribe(...args);
      this.unsubscribers.push(unsubscriber);
    }
}
