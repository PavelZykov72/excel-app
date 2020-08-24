/** @class */
class DOM {
    /**
     * @constuctor
     * @param {(String|HTMLElement)} selector
     */
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    /**
     * Get or set HTML for element
     * @param {String} [html]
     * @return {(String|DOM)} HTML DOMElement | this
     */
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }

        return this.$el.innerHTML.trim();
    }

    /**
     * Clear HTML for current node
     * @return {DOM} this
     */
    clear() {
        this.html('');
        return this;
    }

    /**
     * Add event listener
     * @param {String} eventType
     * @param {Function} fn
     */
    on(eventType, fn) {
        this.$el.addEventListener(eventType, fn);
    }

    /**
     * Remove event listener
     * @param {String} eventType
     * @param {Function} fn
     */
    off(eventType, fn) {
        this.$el.removeEventListener(eventType, fn);
    }

    /**
     * Append element into node
     * @param {(String|DOM)} node
     * @return {DOM} this
     */
    append(node) {
        node = node instanceof DOM ? node.$el : node;
        if (Element.prototype.append) {
            this.$el.append(node);
            return this;
        }

        this.$el.appendChild(node);

        return this;
    }

    get data() {
        return this.$el.dataset;
    }

    /**
     * Returns the first (starting at element) inclusive ancestor that matches
     * selectors, and null otherwise.
     * @param {String} selector
     * @return {DOM} Element instance
     */
    closest(selector) {
        return $(this.$el.closest(selector));
    }

    /**
     * Get client rect $el
     * @return {DOMRect}
     */
    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    /**
     * Returns all element descendants of node that match selectors.
     * @param {String} selector
     * @return {NodeListOf<Element>}
     */
    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    /**
     * Set styles for $el
     * @param {Object} styles
     */
    css(styles = {}) {
        for (const [ key, value ] of Object.entries(styles)) {
            if (!Object.prototype.hasOwnProperty.call(this.$el.style, key)) {
                continue;
            }
            this.$el.style[key] = value;
        }
    }
}

export function $(selector) {
    return new DOM(selector);
}

$.create = (name, classes) => {
    const el = document.createElement(name);
    if (classes) {
        el.classList.add(...classes.split(' '));
    }

    return $(el);
};
