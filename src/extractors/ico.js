import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const [width, height] = stream.skip(6).take(2);

    stream.close();

    return {width, height};
}
