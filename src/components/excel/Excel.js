import { $ } from '@/core/DOM';
import { Emitter } from '@/core/Emitter';
import { StoreSubscriber } from '@/core/StoreSubscriber';
import { updateDate } from '@/store/actions';
import { preventDefault } from '@/core/utils';

/** @class */
export class Excel {
    /**
     * @constructor
     * @param {Object} options
     */
    constructor(options) {
        this.components = options.components || [];
        this.store = options.store;
        this.emitter = new Emitter();
        this.subscriber = new StoreSubscriber(this.store);
    }

    /**
     * @return {Object} Root element
     */
    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = {
          emitter: this.emitter,
          store: this.store,
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
     * Init Component hook
     */
    init() {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault);
        }
        this.store.dispatch(updateDate());
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach((component) => component.init());
    }

    /**
     * Destroy all components
     */
    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach((component) => component.destroy());
        document.removeEventListener('contextmenu', preventDefault);
    }
}
