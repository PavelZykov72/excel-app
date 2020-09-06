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

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }

    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
}

export function camelToDashCase(str) {
    return str.replace(/[A-Z]/g, '-$&').toLowerCase();
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
      .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
      .join('; ');
}

export function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            // eslint-disable-next-line no-invalid-this
            fn.apply(this, args);
        };

        clearTimeout(later);
        timeout = setTimeout(later, wait);
    };
}

export function clone(obj) {
    if (!obj) {
        return obj;
    }

    return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event) {
    event.preventDefault();
}
