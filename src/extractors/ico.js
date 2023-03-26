import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const [width, height] = stream.skip(6).take(2);
    const result = {
        width,
        height,
        size: stream.size(),
        mime: 'image/vnd.microsoft.icon',
    };

    stream.close();

    return result;
}
