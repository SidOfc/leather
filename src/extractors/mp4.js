import {lazystream} from '../util.js';

const MIME_TYPES = {
    ['667479704d345620']: 'video/x-m4v',
    ['6674797071742020']: 'video/quicktime',
};

export function attributes(input) {
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
        const initialSize = stream.takeUInt32BE();
        const header = stream.take(4).toString();
        const size = initialSize === 1 ? stream.takeUInt64BE() : initialSize;

        if (['moov', 'mdia', 'trak'].includes(header)) {
            const result = parse(stream, lastTkhd);

            if (result) return result;
        } else if (header === 'tkhd') {
            lastTkhd = stream.take(size - 8);

            stream.rewind(size - 8);
        } else if (header === 'hdlr') {
            if (stream.skip(8).take(4).includes('vide')) {
                return {
                    width: lastTkhd.readUInt32BE(lastTkhd.length - 8) / 65536,
                    height: lastTkhd.readUInt32BE(lastTkhd.length - 4) / 65536,
                };
            }

            stream.rewind(12);
        }

        stream.skip(size - 8);
    }

    return {width: 0, height: 0};
}
