import { Page } from '@/core/Page';
import { rootReducer } from '@/store/root.reducer';
import { normalizeInitialState } from '@/store/initialState';
import { createStore } from '@/core/createStore';
import { debounce, storage } from '@/core/utils';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';

const storageName = (param) => `excel:${param}`;

/** @class */
export class ExcelPage extends Page {
    /**
     * Get content for page
     * @return {String} HTML content
     */
    getRoot() {
      const params = this.params ? this.params : Date.now().toString();
      const state = storage(storageName(params));
      const store = createStore(rootReducer, normalizeInitialState(state));

      const stateListener = debounce((state) => {
        console.log('App state', state);
        storage(storageName(params), state);
      }, 300);

      store.subscribe(stateListener);

      this.excel = new Excel({
        components: [ Header, Toolbar, Formula, Table ],
        store,
      });

      return this.excel.getRoot();
    }

    /**
     * After render hook
     */
    afterRender() {
      this.excel.init();
    }

    /**
     * Destroy page hooke
     */
    destroy() {
      this.excel.destroy();
    }
}
