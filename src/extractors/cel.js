import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: stream.goto(8).takeUInt16LE(),
        height: stream.takeUInt16LE(),
        size: stream.size(),
        mime: 'application/octet-stream',
    };

    stream.close();

    return result;
}
