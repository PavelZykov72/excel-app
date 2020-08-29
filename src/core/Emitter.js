/** @class */
export class Emitter {
    /**
     * @constructor
     */
    constructor() {
        this.listeners = {};
    }

    /**
     * Emit event
     * @param {String} name
     * @param  {...any} args
     */
    emit(name, ...args) {
        if (!Array.isArray(this.listeners[name])) {
            return;
        }

        this.listeners[name].forEach((listener) => {
            listener(...args);
        });
    }

    /**
     * Subscribe on event
     * @param {String} name
     * @param {Function} fn
     * @return {Function} unsubscribe event
     */
    subscribe(name, fn) {
        this.listeners[name] = this.listeners[name] || [];
        this.listeners[name].push(fn);

        return () => {
            this.listeners[name] = this.listeners[name].filter((listener) =>
                listener !== fn
            );
        };
    }
}
