import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(64).takeUInt32LE();
    const height = stream.takeUInt32LE();
    const result = {
        width,
        height,
        size: stream.size(),
        mime: 'video/x-msvideo',
    };

    stream.close();

    return result;
}
