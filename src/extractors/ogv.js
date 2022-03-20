import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(42).takeUIntBE(3);
    const height = stream.takeUIntBE(3);
    const result = {width, height, size: stream.size(), mime: 'video/ogg'};

    stream.close();

    return result;
}
