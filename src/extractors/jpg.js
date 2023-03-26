import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/jpeg',
    };

    stream.skip(4);

    while (stream.more()) {
        stream.skip(stream.takeUInt16BE() - 2);

        const header = stream.take(2);
        const mark = header.readUInt8();
        const next = header.readUInt8(1);

        if (mark !== 0xff) break;
        if (next === 0xc0 || next === 0xc1 || next === 0xc2) {
            const dimensions = stream.skip(3).take(4);

            result.height = dimensions.readUInt16BE();
            result.width = dimensions.readUInt16BE(2);

            break;
        }
    }

    stream.close();

    return result;
}
