import {lazystream} from '../util';

export function attributes(file) {
    const stream = lazystream(file);
    const width = parseInt(stream.skip(42).takeHex(3), 16);
    const height = parseInt(stream.takeHex(3), 16);
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
