import {lazystream} from '../util';

export function attributes(input) {
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
