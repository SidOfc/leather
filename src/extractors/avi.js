import {lazystream, roundToPrecision} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(64).takeUInt32LE();
    const height = stream.takeUInt32LE();
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
