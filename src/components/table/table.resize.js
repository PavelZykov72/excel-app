import { $ } from '@/core/DOM';

export function tableResizeHandler($root, event) {
    return new Promise((resolve) => {
        const { resize: type } = event.target.dataset;

        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();

        if (type === 'column') {
            $resizer.css({
                bottom: '-100vh',
            });

            const { colIndex: index } = $parent.data;
            const $cells = $root.findAll(`[data-col-index="${index}"]`);

            let value;
            document.onmousemove = (e) => {
                const delta = e.pageX - coords.right;
                value = coords.width + delta;

                $resizer.css({
                    right: `${-delta}px`,
                });
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;

                $cells.forEach((el) => el.style.width = `${value}px`);
                $parent.css({
                    width: `${value}px`,
                });
                $resizer.css({
                    bottom: '',
                    right: '',
                });
                resolve({
                    value,
                    type,
                    id: $parent.data.colIndex,
                });
            };
        } else if (type === 'row') {
            $resizer.css({
                right: '-100vw',
            });

            let value;
            document.onmousemove = (e) => {
                const delta = e.pageY - coords.bottom;
                value = coords.height + delta;
                $resizer.css({
                    bottom: `${-delta}px`,
                });
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;

                $parent.css({
                    height: `${value}px`,
                });
                $resizer.css({
                    bottom: '',
                    right: '',
                });
                resolve({
                  value,
                  type,
                  id: $parent.data.rowIndex,
                });
            };
        }
    });
}
