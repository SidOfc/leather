import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const height = stream.skip(12).takeUInt32LE();
    const width = stream.takeUInt32LE();
    const result = {
        width,
        height,
        size: stream.size(),
        mime: 'image/vnd.ms-dds',
    };

    stream.close();

    return result;
}
