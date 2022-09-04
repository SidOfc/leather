import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const height = stream.skip(48).takeUInt32BE();
    const width = stream.takeUInt32BE();
    const result = {width, height, size: stream.size(), mime: 'image/jp2'};

    stream.close();

    return result;
}
