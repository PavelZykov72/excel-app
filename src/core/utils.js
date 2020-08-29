export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }

    return string.charAt(0).toLocaleUpperCase() + string.substring(1);
}

export function getRange(start, end) {
    const position = Math.abs(end - start);
    const lowerPosition = Math.min(start, end);

    return new Array(position + 1)
      .fill('')
      .map((_, index) => lowerPosition + index);
}

