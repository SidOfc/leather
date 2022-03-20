import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(8).takeUInt16LE();
    const height = stream.takeUInt16LE();
    const result = {width, height, size: stream.size(), mime: 'video/x-flic'};

    stream.close();

    return result;
}
