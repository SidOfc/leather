import {lazystream, readVint} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const byte = stream.goto(4).take()[0];
    const mime = byte === 0xa3 ? 'video/x-matroska' : 'video/webm';
    const path = ['18538067', '1654ae6b', 'ae', 'e0'];
    const targets = ['b0', 'ba'];
    const dimensions = new Map();

    stream.goto(0);

    while (stream.more()) {
        const header = stream.take(40);
        const tagVint = readVint(header);
        const sizeVint = readVint(header, tagVint.length);
        const tag = header.subarray(0, tagVint.length).toString('hex');
        const skip = !path.includes(tag);
        const extract = targets.includes(tag);

        stream.rewind(header.length - tagVint.length - sizeVint.length);

        if (extract) {
            const dimension = stream
                .take(sizeVint.value)
                .readUIntBE(0, sizeVint.value);

            dimensions.set(tag, dimension);
        } else if (skip) {
            stream.skip(sizeVint.value);
        }

        if (dimensions.size === targets.length) break;
    }

    const result = {
        width: dimensions.get('b0', 0),
        height: dimensions.get('ba', 0),
        size: stream.size(),
        mime: mime,
    };

    stream.close();

    return result;
}
