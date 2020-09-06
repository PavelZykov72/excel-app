import { isEqual } from '@core/utils';

/** @class */
export class StoreSubscriber {
    /**
     * @constructor
     * @param {CreateStore} store
     */
    constructor(store) {
        this.store = store;
    }

    /**
     * Subscribe components on change store
     * @param {Array<ExcelComponent>} components
     */
    subscribeComponents(components) {
        this.prevState = this.store.getState();

        this.subscribe = this.store.subscribe((state) => {
            Object.keys(state).forEach((key) => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach((component) => {
                        if (component.isWatching(key)) {
                            const changes = { [key]: state[key] };
                            component.storeChanged(changes);
                        }
                    });
                }
            });
            this.prevState = this.store.getState();

            if (process.env.NODE_ENV === 'development') {
                window.redux = this.prevState;
            }
        });
    }

    /**
     * Unsubscribe from store change
     */
    unsubscribeFromStore() {
        this.subscribe.unsubscribe();
    }
}
