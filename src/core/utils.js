export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }

    return string.charAt(0).toLocaleUpperCase() + string.substring(1);
}
