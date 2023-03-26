import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const height = stream.skip(14).takeUInt32BE();
    const width = stream.takeUInt32BE();
    const result = {
        width,
        height,
        size: stream.size(),
        mime: 'image/vnd.adobe.photoshop',
    };

    stream.close();

    return result;
}
