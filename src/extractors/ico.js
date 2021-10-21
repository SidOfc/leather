import {lazystream} from '../util';

export function attributes(file) {
    const stream = lazystream(file);
    const [width, height] = stream.skip(6).take(2);
    const result = {width, height, ...stream.attrs()};

    stream.close();

    return result;
}
