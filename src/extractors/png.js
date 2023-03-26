import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const header = stream.take(16);

    if (header.includes('CgBI')) stream.skip(16);

    const dimensions = stream.take(8);
    const width = dimensions.readUInt32BE();
    const height = dimensions.readUInt32BE(4);
    const mime = header.includes('MNG')
        ? 'video/x-mng'
        : stream.take(128).includes('acTL')
        ? 'image/apng'
        : 'image/png';
    const result = {width, height, size: stream.size(), mime};

    stream.close();

    return result;
}
