import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const header = stream.skip(12).take(4).toString();
    const isLossless = stream.skip(4).take()[0] === 0x2f;
    const isLossy = stream.skip(2).take(3).toString('hex') === '9d012a';
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/webp',
    };

    if (header === 'VP8X') {
        result.width = 1 + stream.goto(24).takeUIntLE(3);
        result.height = 1 + stream.goto(27).takeUIntLE(3);
    } else if (header === 'VP8L' && isLossless) {
        const [b1, b2, b3, b4] = stream.goto(21).take(4);
        result.width = 1 + (((b2 & 0x3f) << 8) | b1);
        result.height =
            1 + (((b4 & 0xf) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
    } else if (header === 'VP8 ' && isLossy) {
        result.width = stream.goto(26).takeUInt16LE() & 0x3fff;
        result.height = stream.takeUInt16LE() & 0x3fff;
    }

    stream.close();

    return result;
}
