import { $ } from '../DOM';
import { ActiveRoute } from './ActiveRouter';
import { Loader } from '../../components/Loader';

/** @class */
export class Router {
    /**
     * @constructor
     * @param {String} selector
     * @param {Object} routes
     */
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router');
        }

        this.loader = new Loader();

        this.$placeholder = $(selector);
        this.routes = routes;
        this.page = null;
        this.changePageHandler = this.changePageHandler.bind(this);

        this.init();
    }

    /**
     * Init router
     */
    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    }

    /**
     * Destroy router
     */
    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    }

    /**
     * Change hash location event
     */
    async changePageHandler(/* event */) {
        if (this.page) {
            this.page.destroy();
        }

        this.$placeholder.clear().append(this.loader);
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard;

        this.page = new Page(ActiveRoute.param);

        const $root = await this.page.getRoot();
        this.$placeholder.clear().append($root);
        this.page.afterRender();
    }
}
