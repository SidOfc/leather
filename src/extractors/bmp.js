import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(18).takeUInt16LE();
    const height = Math.abs(stream.skip(2).takeUInt16LE());
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
