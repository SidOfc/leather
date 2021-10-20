import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const startIndex = stream.indexOf(Buffer.from('tkhd'));

    if (startIndex === -1) return {width: 0, height: 0};

    const width = stream.skip(startIndex + 78).takeUInt32BE();
    const height = stream.takeUInt32BE();

    stream.close();

    return {width, height};
}
