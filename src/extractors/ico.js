import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const [width, height] = stream.skip(6).take(2);
    const result = {width, height, size: stream.size(), mime: 'image/x-icon'};

    stream.close();

    return result;
}
