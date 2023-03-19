import {lazystream} from '../util.js';

const MIME_TYPES = {
    ['667479704d345620']: 'video/x-m4v',
    ['6674797071742020']: 'video/quicktime',
};

export function attributes(input) {
    const stream = lazystream(input);
    const type = stream.skip(4).take(8).toString('hex');
    const mime = MIME_TYPES[type] || 'video/mp4';

    stream.goto(0);

    const result = Object.assign(parse(stream) ?? {}, {
        size: stream.size(),
        mime,
    });

    stream.close();

    return result;
}

function parse(stream, lastTkhd, ftypSize = 32) {
    while (stream.more()) {
        let size = stream.takeUInt32BE();
        const header = stream.take(4).toString();

        if (header === 'ftyp') ftypSize = size;

        if (['moov', 'mdia', 'trak'].includes(header)) {
            const result = parse(stream, lastTkhd, ftypSize);

            if (result) return result;
        } else if (ftypSize === 28 && header === 'mdat') {
            size += stream.skip(4).takeUInt32BE() - size;
        } else if (header === 'tkhd') {
            const pos = stream.position();
            lastTkhd = stream.take(size - 8);

            stream.goto(pos);
        } else if (header === 'hdlr') {
            const pos = stream.position();
            const hdlr = stream.skip(8).take(4);

            if (hdlr.includes('vide')) {
                return {
                    width: lastTkhd.readUInt32BE(lastTkhd.length - 8) / 65536,
                    height: lastTkhd.readUInt32BE(lastTkhd.length - 4) / 65536,
                };
            }

            stream.goto(pos);
        }

        stream.skip(size - 8);
    }
}
