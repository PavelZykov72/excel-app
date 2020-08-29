/** @class */
export class TableSelection {
    static classes = {
        selected: 'table__cell--selected',
    }

    /**
     * @constructor
     */
    constructor() {
        this.group = [];
        this.current = null;
    }

    /**
     * Select cell
     * @param {HTMLElement} $el
     */
    select($el) {
        this.clear();
        this.group = [];
        this.group.push($el);

        this.current = $el;
        $el.focus().addClass(TableSelection.classes.selected);
    }

    /**
     * Select group cells
     * @param {Array<DOM>} $group
     */
    selectGroup($group = []) {
        this.clear();

        this.group = $group;
        this.group.forEach(($el) =>
            $el.addClass(TableSelection.classes.selected)
        );
    }

    /**
     * Clear selected cells
     */
    clear() {
        this.group.forEach(($el) => {
            $el.removeClass(TableSelection.classes.selected);
        });
    }
}

