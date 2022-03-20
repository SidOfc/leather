import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/fits',
    };

    let offset = 0;

    while (stream.more()) {
        const label = stream
            .goto(offset * 80)
            .takeUntil(0x20)
            .toString();

        if (label === 'NAXIS1' || label === 'NAXIS2') {
            const property = label === 'NAXIS1' ? 'width' : 'height';
            result[property] = parseInt(
                stream
                    .goto(offset * 80)
                    .skip(24)
                    .take(8)
                    .toString()
                    .trim()
            );

            if (result.width !== 0 && result.height !== 0) break;
        }

        offset += 1;
    }

    stream.close();

    return result;
}
