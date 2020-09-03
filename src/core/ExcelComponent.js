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
        this.subscribe = options.subscribe || [];
        this.emitter = options.emitter;
        this.store = options.store;

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
     * @param  {...any} args
     */
    $emit(...args) {
      this.emitter.emit(...args);
    }

    /**
     * Subscribe (facade pattern)
     * @param  {...any} args
     */
    $on(...args) {
      const unsubscriber = this.emitter.subscribe(...args);
      this.unsubscribers.push(unsubscriber);
    }

    /**
     * Dispatch action to store (facade pattern)
     * @param  {...any} args
     */
    $dispatch(...args) {
      this.store.dispatch(...args);
    }

    /**
     * Get only changed subscribe fields for component
     */
    storeChanged() {}

    /**
     * Check if the key in subscribe component
     * @param {String} key
     * @return {Boolean} is watching field
     */
    isWatching(key) {
      return this.subscribe.includes(key);
    }
}
