import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const height = stream.skip(14).takeUInt32BE();
    const width = stream.takeUInt32BE();

    stream.close();

    return {width, height};
}
