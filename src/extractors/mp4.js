import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const startIndex = stream.indexOf(Buffer.from('tkhd'));
    const result = {width: 0, height: 0, ...stream.attrs()};

    if (startIndex !== -1) {
        result.width = stream.skip(startIndex + 78).takeUInt32BE();
        result.height = stream.takeUInt32BE();
    }

    stream.close();

    return result;
}
