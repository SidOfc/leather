import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const height = stream.skip(12).takeUInt32LE();
    const width = stream.takeUInt32LE();
    const result = {
        width,
        height,
        size: stream.size(),
        mime: 'image/vnd.ms-dds',
    };

    stream.close();

    return result;
}
