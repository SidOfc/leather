import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const result = {
        width: stream.goto(358).takeUInt32LE(),
        height: stream.takeUInt32LE(),
        size: stream.size(),
        mime: 'video/x-ms-wmv',
    };

    stream.close();

    return result;
}
