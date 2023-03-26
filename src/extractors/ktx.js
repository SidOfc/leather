import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(36).takeUInt32LE();
    const height = stream.takeUInt32LE();
    const result = {width, height, size: stream.size(), mime: 'image/ktx'};

    stream.close();

    return result;
}
