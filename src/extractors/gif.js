import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const width = stream.skip(6).takeUInt16LE();
    const height = stream.takeUInt16LE();

    stream.close();

    return {width, height};
}
