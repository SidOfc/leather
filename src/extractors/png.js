import {lazystream} from '../util.js';

export function attributes(file) {
    const stream = lazystream(file);
    const result = {width: 0, height: 0, size: stream.size()};
    const startIndex = stream.indexOf(Buffer.from('IHDR'));

    if (startIndex !== -1) {
        result.width = stream.skip(startIndex + 4).takeUInt32BE();
        result.height = stream.takeUInt32BE();
    }

    stream.close();

    return result;
}
