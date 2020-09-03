import { $ } from '@/core/DOM';
import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@/store/actions';
import { defaultTitle } from '@/constants';
import { debounce } from '@/core/utils';

/** @class */
export class Header extends ExcelComponent {
    /**
     * @static className
     */
    static className = 'excel__header header';

    /**
     * @constructor
     * @param {DOM} $root
     * @param {Object} options
     */
    constructor($root, options) {
        super($root, {
            listeners: [ 'input' ],
            subscribe: [ 'title' ],
            ...options,
        });
    }

    /**
     * Init Component hook
     */
    init() {
        super.init();
        this.$title = this.$root.find('#title');

        const title = this.store.getState().title || defaultTitle;
        this.$title.text(title);
    }

    /**
     * Prepare data hook
     */
    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    /**
     * Update title value in store
     * @param {String} title
     */
    updateTitleInStore(title) {
        this.$dispatch(changeTitle(title));
    }

    /**
     * Get only changed subscribe fields for component
     * @param {Object} changes field
     */
    storeChanged({ title }) {
        this.$title.text(title);
    }

    /**
     * Input event
     * @param {Event} event
     */
    onInput(event) {
        this.updateTitleInStore($(event.target).text());
    }

    template = `
        <input
            type="text"
            id="title"
            class="header__input"
            value="Новая таблица"></input>

        <div>
            <div class="header__button">
                <i class="material-icons">delete</i>
            </div>
            <div class="header__button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>
    `
}
