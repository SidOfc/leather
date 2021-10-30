import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const startIndex = stream.indexOf(Buffer.from('tkhd'));
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'video/mp4',
    };

    if (startIndex !== -1) {
        result.width = stream.goto(startIndex).skip(78).takeUInt32BE();
        result.height = stream.takeUInt32BE();
    }

    stream.close();

    return result;
}
