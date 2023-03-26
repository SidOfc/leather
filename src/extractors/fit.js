import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/fits',
    };

    while (stream.more()) {
        const header = stream.take(30);
        const label = header.subarray(0, 8);

        if (label.includes('NAXIS1')) {
            result.width = parseInt(header.subarray(22, 30));
        } else if (label.includes('NAXIS2')) {
            result.height = parseInt(header.subarray(22, 30));

            break;
        } else if (
            label.includes('NAXIS') &&
            parseInt(header.subarray(22, 30)) < 2
        ) {
            break;
        }

        stream.skip(50);
    }

    stream.close();

    return result;
}
