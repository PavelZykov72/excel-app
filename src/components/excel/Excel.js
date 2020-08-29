import { $ } from '@/core/DOM';
import { Emitter } from '@/core/Emitter';

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
        this.emitter = new Emitter();

        this.render();
    }

    /**
     * @return {Object} Root element
     */
    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = {
          emitter: this.emitter,
        };

        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className);
            const component = new Component($el, componentOptions);
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

    /**
     * Destroy all components
     */
    destroy() {
        this.components.forEach((component) => component.destroy());
    }
}
