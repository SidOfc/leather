import {lazystream} from '../util';

export function attributes(file) {
    const stream = lazystream(file);
    const width = stream.skip(6).takeUInt16LE();
    const height = stream.takeUInt16LE();
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
