const CODES = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt(),
};

function createCell(_, index) {
    return `
        <div
            class="table__cell"
            data-col-index="${index}"
            contenteditable>
        </div>
    `;
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

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const baseLine = new Array(colsCount).fill('');
    const cols = baseLine.map(toChar).map(createColumn).join('');
    const cells = baseLine.map(createCell).join('');

    rows.push(createRow(void 0, cols));
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
}
