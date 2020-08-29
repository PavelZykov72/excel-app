const CODES = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt(),
};

function createCell(rowi) {
    return function(_, celli) {
        return `
            <div
                class="table__cell"
                data-type="cell"
                data-id="${rowi}:${celli}"
                data-col-index="${celli}"
                contenteditable>
            </div>
        `;
    };
}

function createColumn(caption, index) {
    return `
        <div
            class="table__column"
            data-col-index="${index}"
            data-type="resizable">
            ${caption}
            <div class="table__column-resize" data-resize="column"></div>
        </div>
    `;
}

function createRow(index, content) {
    return `
        <div class="table__row" data-type="resizable">
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

export function createTable(rowsCount = 15, colsCount = CODES.Z - CODES.A + 1) {
    const rows = [];

    const baseLine = new Array(colsCount).fill('');
    const cols = baseLine.map(toChar).map(createColumn).join('');

    rows.push(createRow(void 0, cols));
    for (let row = 0; row < rowsCount; row++) {
        const cells = baseLine.map(createCell(row)).join('');
        rows.push(createRow(row + 1, cells));
    }

    return rows.join('');
}
