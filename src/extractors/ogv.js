import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(42).takeUIntBE(3);
    const height = stream.takeUIntBE(3);
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
