import {lazystream, roundToPrecision} from '../util';

export function attributes(file) {
    const stream = lazystream(file);
    const micros = stream.skip(32).takeUInt32LE();
    const frames = stream.skip(12).takeUInt32LE();
    const width = stream.skip(12).takeUInt32LE();
    const height = stream.takeUInt32LE();
    const duration = roundToPrecision((frames * micros) / 1000000, 1);
    const result = {width, height, duration, ...stream.attrs()};

    stream.close();

    return result;
}
