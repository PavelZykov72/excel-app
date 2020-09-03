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
     * Get or set text content for element
     * @param {any} [text]
     * @return {String|DOM} Text Element | this
     */
    text(text) {
        if (typeof text !== 'undefined') {
            if (this.$el.tagName === 'INPUT') {
                this.$el.value = `${text}`;
            } else {
                this.$el.textContent = `${text}`;
            }
            return this;
        }

        if (this.$el.tagName === 'INPUT') {
            return this.$el.value.trim();
        }

        return this.$el.textContent.trim();
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

    get nativeElement() {
        return this.$el;
    }

    /**
     * Get id for element, if parse = true - "id "parsed for row, col
     * @param {Boolean} [parse]
     * @return {String|Object} id or object with row, col
     */
    id(parse) {
        if (!parse) {
            return this.data.id;
        }

        const id = this.id();
        const [ row, col ] = id.split(':');

        return {
            row: +row,
            col: +col,
        };
    }

    /**
     * Get or set attribute for element
     * @param {String} name
     * @param {String} value
     * @return {DOM|string} this instance or attribute value
     */
    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value);
            return this;
        }

        return this.$el.getAttribute(name);
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
     * Returns the first element that is a descendant
     * of node that matches selectors.
     * @param {String} selector
     * @return {Element}
     */
    find(selector) {
        return $(this.$el.querySelector(selector));
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

    /**
     * Get style values for specify list
     * @param {Array<string>} styles
     * @return {Object} current styles
     */
    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            return (res[s] = this.$el.style[s], res);
        }, {});
    }

    /**
     * Focus element
     * @param {Object} [FocusOptions]
     * @return {DOM} this
     */
    focus(FocusOptions) {
        this.$el.focus(FocusOptions);
        return this;
    }

    /**
     * Add classes to element
     * @param {String} classes
     * @return {DOM} this
     */
    addClass(classes) {
        this.$el.classList.add(...classes.split(' '));
        return this;
    }

    /**
     * Remove classes
     * @param {String} classes
     * @return {DOM} this
     */
    removeClass(classes) {
        this.$el.classList.remove(...classes.split(' '));
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
