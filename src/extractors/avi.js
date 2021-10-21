import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const size = stream.size();
    const width = stream.skip(64).takeUInt32LE();
    const height = stream.takeUInt32LE();

    stream.close();

    return {width, height, size};
}
