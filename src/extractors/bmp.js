import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(18).takeUInt16LE();
    const height = Math.abs(stream.skip(2).takeUInt16LE());
    const result = {width, height, size: stream.size(), mime: 'image/bmp'};

    stream.close();

    return result;
}
