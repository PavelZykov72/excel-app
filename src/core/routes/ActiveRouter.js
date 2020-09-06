/** @class */
export class ActiveRoute {
    /** @static */
    static get path() {
        return window.location.hash.slice(1);
    }

    /** @static */
    static get param() {
        return ActiveRoute.path.split('/')[1];
    }

    /**
     * Navigate to hash
     * @param {String} path
     */
    static navigate(path) {
        window.location.hash = path;
    }
}
