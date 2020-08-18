const CODES = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt(),
};

function createCell() {
    return `
        <div class="table__cell" contenteditable></div>
    `;
}

function createColumn(caption) {
    return `
        <div class="table__column">${caption}</div>
    `;
}

function createRow(index, content) {
    return `
        <div class="table__row">
            <div class="table__row-info">${(index || '')}</div>
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
