import { ExcelComponent } from '@core/ExcelComponent';

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
            ...options,
        });
    }

    template = `
        <input
            type="text"
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
