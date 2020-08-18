import { capitalize } from '@core/utils';

/** @class */
export class DOMListener {
    /**
     * @constructor
     * @param {DOM} $root
     * @param {Array} [listeners]
     */
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DOMListener');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    /**
     * Init listeners for component
     */
    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            if (typeof this[method] !== 'function') {
                const name = this.name || '';
                throw new Error(
                    `Method ${method} is not implemented in ${name} component`
                );
            } else {
                this[method] = this[method].bind(this);
                this.$root.on(listener, this[method]);
            }
        });
    }

    /**
     * Remove all listeners for component
     */
    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}

function getMethodName(eventName) {
    return `on${capitalize(eventName)}`;
}
