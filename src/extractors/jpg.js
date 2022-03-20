import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/jpeg',
    };

    stream.skip(4);

    while (stream.more()) {
        const size = stream.takeUInt16BE();
        const mark = stream.skip(size - 2).takeUInt8();
        const next = stream.takeUInt8();

        if (mark !== 0xff) break;
        if (next === 0xc0 || next === 0xc1 || next === 0xc2) {
            result.height = stream.skip(3).takeUInt16BE();
            result.width = stream.takeUInt16BE();

            break;
        }
    }

    stream.close();

    return result;
}
