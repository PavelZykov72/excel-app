import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';

/** @class */
export class Table extends ExcelComponent {
    static className = 'excel__table table';
    template = createTable();
}
