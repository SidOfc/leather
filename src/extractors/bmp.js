import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const size = stream.size();
    const width = stream.skip(18).takeUInt16LE();
    const height = Math.abs(stream.skip(2).takeUInt16LE());

    stream.close();

    return {width, height, size};
}
