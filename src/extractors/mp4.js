import {lazystream} from '../util.js';

const MIME_TYPES = {
    ['667479704d345620']: 'video/x-m4v',
    ['6674797071742020']: 'video/quicktime',
};

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const size = stream.size();
    const type = stream.skip(4).take(8).toString('hex');
    const mime = MIME_TYPES[type] || 'video/mp4';

    stream.goto(0);

    const result = Object.assign(parse(stream), {size, mime});

    stream.close();

    return result;
}

function parse(stream, lastTkhd) {
    while (stream.more()) {
        const header = stream.take(8);
        const initialSize = header.readUInt32BE();
        const type = header.subarray(4, 8).toString();
        const size =
            initialSize === 1
                ? stream.takeUInt64BE()
                : initialSize === 0
                  ? stream.size() - stream.position() + header.length
                  : initialSize;

        if (['moov', 'mdia', 'trak'].includes(type)) {
            const result = parse(stream, lastTkhd);

            if (result) return result;
        } else if (type === 'tkhd') {
            lastTkhd = stream.take(size - header.length);

            stream.rewind(size - header.length);
        } else if (type === 'hdlr') {
            if (stream.skip(8).take(4).includes('vide')) {
                return {
                    width: Math.floor(
                        lastTkhd.readUInt32BE(lastTkhd.length - 8) / 65536,
                    ),
                    height: Math.floor(
                        lastTkhd.readUInt32BE(lastTkhd.length - 4) / 65536,
                    ),
                };
            }

            stream.rewind(12);
        }

        stream.skip(size - header.length);
    }

    return {width: 0, height: 0};
}
