import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const isFried = stream.skip(12).take(4).toString('ascii') === 'CgBI';
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/png',
    };

    if (isFried) {
        result.width = stream.skip(16).takeUInt32BE();
        result.height = stream.takeUInt32BE();
    } else {
        result.width = stream.takeUInt32BE();
        result.height = stream.takeUInt32BE();
    }

    stream.close();

    return result;
}
