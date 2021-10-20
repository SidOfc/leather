import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const height = stream.skip(12).takeUInt32LE();
    const width = stream.takeUInt32LE();

    stream.close();

    return {width, height};
}
