import {lazystream} from '../util';

export function attributes(file) {
    const stream = lazystream(file);
    const height = stream.skip(12).takeUInt32LE();
    const width = stream.takeUInt32LE();
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
