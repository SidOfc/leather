import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const dimensions = stream.skip(48).take(8);
    const height = dimensions.readUInt32BE();
    const width = dimensions.readUInt32BE(4);
    const result = {width, height, size: stream.size(), mime: 'image/jp2'};

    stream.close();

    return result;
}
