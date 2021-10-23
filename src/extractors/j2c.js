import {lazystream} from '../util';

export function attributes(file) {
    const stream = lazystream(file);
    const height = stream.skip(48).takeUInt32BE();
    const width = stream.takeUInt32BE();
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
