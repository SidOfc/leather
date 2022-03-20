import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/x-xpixmap',
    };
    const startIndex = stream.indexOf(Buffer.from('{\n"'));

    if (startIndex !== -1) {
        result.width = parseInt(
            stream.goto(startIndex).skip(3).takeUntil(0x20).toString(),
            10
        );
        result.height = parseInt(stream.skip(1).takeUntil(0x20).toString(), 10);
    }

    stream.close();

    return result;
}
