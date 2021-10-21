import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const size = stream.size();
    const width = parseInt(stream.skip(42).takeHex(3), 16);
    const height = parseInt(stream.takeHex(3), 16);

    stream.close();

    return {width, height, size};
}
