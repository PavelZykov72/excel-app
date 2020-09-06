import { $ } from '@core/DOM';
import { ActiveRoute } from './ActiveRouter';

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
    changePageHandler(/* event */) {
        if (this.page) {
            this.page.destroy();
        }
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard;

        console.log(ActiveRoute.param);
        this.page = new Page(ActiveRoute.param);
        this.$placeholder.clear().append(this.page.getRoot());
        this.page.afterRender();
    }
}
