/** @interface */
export class Page {
    /**
     * @constructor
     * @param {*} params
     */
    constructor(params) {
        this.params = params;
        console.log(this.params);
    }

    /**
     * Get content for page
     */
    getRoot() {
        throw new Error('Method "getRoout" should be implemented');
    }

    /**
     * After render hook
     */
    afterRender() {}

    /**
     * Destroy page hooke
     */
    destroy() {}
}
