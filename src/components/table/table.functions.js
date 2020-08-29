import { getRange } from '@/core/utils';
import { keyboard } from './table.types';

export function shouldResize(event) {
    const { resize } = event.target.dataset;

    if (!resize) {
        return false;
    }

    return true;
}

export function isCell(event) {
    const { type } = event.target.dataset;
    return type === 'cell';
}

export function getMatrix($destination, $current) {
    const destination = $destination.id(true);
    const current = $current.id(true);

    const cols = getRange(current.col, destination.col);
    const rows = getRange(current.row, destination.row);

    return cols.reduce((acc, col) => {
        rows.forEach((row) => acc.push(`${row}:${col}`));
        return acc;
    }, []);
}

export function getNextSelector(key, { col, row }) {
    const MIN_VALUE = 0;
    switch (key) {
        case keyboard.ENTER:
        case keyboard.DOWN_ARROW:
            row++;
            break;
        case keyboard.TAB:
        case keyboard.RIGHT_ARROW:
            col++;
            break;
        case keyboard.LEFT_ARROW:
            col--;
            break;
        case keyboard.UP_ARROW:
            row--;
            break;
    }

    const getValue = (v) => Math.max(v, MIN_VALUE);
    return `[data-id="${getValue(row)}:${getValue(col)}"]`;
}
