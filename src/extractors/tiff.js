import {lazystream} from '../util.js';

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const isBigEndian =
        Buffer.compare(stream.take(2), Buffer.from([0x4d, 0x4d])) === 0;
    const attrs = isBigEndian
        ? readBigEndian(stream)
        : readLittleEndian(stream);
    const result = {...attrs, size: stream.size(), mime: 'image/tiff'};

    stream.close();

    return result;
}

function readBigEndian(stream) {
    const result = {width: 0, height: 0};
    const ifdIndex = stream.skip(2).takeUInt32BE();

    stream.goto(ifdIndex).skip(2);

    while (stream.more()) {
        const code = stream.takeUInt16BE();
        const type = stream.takeUInt16BE();
        const h = stream.skip(4).takeUInt16BE();
        const l = stream.takeUInt16BE();
        const value = (l << 16) + h;

        if (code === 0) break;
        else if (code === 256) result.width = value;
        else if (code === 257) result.height = value;

        if (result.width > 0 && result.height > 0) break;
    }

    return result;
}

function readLittleEndian(stream) {
    const result = {width: 0, height: 0};
    const ifdIndex = stream.skip(2).takeUInt32LE();

    stream.goto(ifdIndex).skip(2);

    while (stream.more()) {
        const code = stream.takeUInt16LE();
        const type = stream.takeUInt16LE();
        const value = stream.skip(4).takeUInt32LE();

        if (code === 0) break;
        else if (code === 256) result.width = value;
        else if (code === 257) result.height = value;

        if (result.width > 0 && result.height > 0) break;
    }

    return result;
}
