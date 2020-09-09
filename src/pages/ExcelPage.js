import { Page } from '@/core/page/Page';
import { rootReducer } from '@/store/root.reducer';
import { normalizeInitialState } from '@/store/initialState';
import { createStore } from '@/core/createStore';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { StateProcessor } from '@/core/page/StateProcessor';
import { LocalStorageClient } from '@/shared/LocalStorageClient';

/** @class */
export class ExcelPage extends Page {
    /**
     * @constructor
     * @param {*} param
     */
    constructor(param) {
      super(param);

      this.storeSub = null;
      this.processor = new StateProcessor(
        new LocalStorageClient(this.params)
      );
    }

    /**
     * Get content for page
     * @return {String} HTML content
     */
    async getRoot() {
      const state = await this.processor.get();
      const initialState = normalizeInitialState(state);
      const store = createStore(rootReducer, initialState);

      store.subscribe(this.processor.listen);

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
