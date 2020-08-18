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
