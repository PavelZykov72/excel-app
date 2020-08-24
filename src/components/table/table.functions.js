export function shouldResize(event) {
    const { resize } = event.target.dataset;

    if (!resize) {
        return false;
    }

    return true;
}
