import { $ } from '@/core/DOM';

/** @class */
export class Excel {
    /**
     * @constructor
     * @param {String} selector
     * @param {Object} options
     */
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];

        this.render();
    }

    /**
     * @return {Object} Root element
     */
    getRoot() {
        const $root = $.create('div', 'excel');

        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.html(component.toHTML());
            $root.append($el);

            return component;
        });

        return $root;
    }

    /**
     * Render root element
     */
    render() {
        this.$el.append(this.getRoot());
        this.components.forEach((component) => component.init());
    }
}
