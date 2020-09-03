import { toInlineStyles } from '@/core/utils';
import { parse } from '@/core/parse';
import { defaultStyles } from '@/constants';

const CODES = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt(),
};

function getStyleValue(state, index) {
  return (state[index]) ? `${state[index]}px` : null;
}

function createCell(state, rowi) {
    return function(_, celli) {
        const id = `${rowi}:${celli}`;
        const width = getStyleValue(state.colState, celli);
        const value = state.dataState[id];
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id],
        });

        return `
            <div
                class="table__cell"
                style="${styles}; ${ width ? `width: ${width}` : '' }"
                data-type="cell"
                data-id="${id}"
                data-col-index="${celli}"
                data-value="${value || ''}"
                contenteditable>
                ${parse(value) || ''}
            </div>
        `;
    };
}

function createColumn({ caption, index, width }) {
    return `
        <div
            class="table__column"
            ${ width ? `style="width: ${width}"` : '' }
            data-col-index="${index}"
            data-type="resizable">
            ${caption}
            <div class="table__column-resize" data-resize="column"></div>
        </div>
    `;
}

function createRow(index, content, state) {
    const height = getStyleValue(state, index);
    return `
        <div
            class="table__row"
            ${ height ? `style="height: ${height}"` : '' }
            data-row-index="${index}"
            data-type="resizable">
            <div class="table__row-info">
                ${(index || '')}
                <div class="table__row-resize" data-resize="row"></div>
            </div>
            <div class="table__row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
    return (caption, index) => {
        return {
            caption, index, width: getStyleValue(state, index),
        };
    };
}

export function createTable(
    rowsCount = 15,
    colsCount = CODES.Z - CODES.A + 1,
    state = {}) {
    const rows = [];

    const baseLine = new Array(colsCount).fill('');
    const cols = baseLine
        .map(toChar)
        .map(withWidthFrom(state.colState))
        .map(createColumn)
        .join('');

    rows.push(createRow(0, cols, {}));
    for (let row = 0; row < rowsCount; row++) {
        const cells = baseLine
            .map(createCell(state, row))
            .join('');
        rows.push(createRow(row + 1, cells, state.rowState));
    }

    return rows.join('');
}
