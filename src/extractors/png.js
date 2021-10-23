import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {width: 0, height: 0, ...stream.attrs()};
    const startIndex = stream.indexOf(Buffer.from('IHDR'));

    if (startIndex !== -1) {
        result.width = stream.skip(startIndex + 4).takeUInt32BE();
        result.height = stream.takeUInt32BE();
    }

    stream.close();

    return result;
}
