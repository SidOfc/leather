import {lazystream} from '../util';

export function attributes(file) {
    const stream = lazystream(file);
    const width = stream.skip(42).takeUIntBE(3);
    const height = stream.takeUIntBE(3);
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
