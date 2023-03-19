import {lazystream} from '../util.js';

const MIME_TYPES = {
    ['667479704d345620']: 'video/x-m4v',
    ['6674797071742020']: 'video/quicktime',
};

export function attributes(input) {
    const stream = lazystream(input);
    const type = stream.skip(4).take(8).toString('hex');
    const mime = MIME_TYPES[type] || 'video/mp4';

    const result = Object.assign(v2(stream) ?? {}, {size: stream.size(), mime});

    if (!Number.isInteger(result.width) || !Number.isInteger(result.height)) {
        stream.goto(0);

        const startIndex = stream.indexOf(Buffer.from('tkhd'));

        if (startIndex === -1) {
            result.width = 0;
            result.height = 0;
        } else {
            result.width = stream.goto(startIndex).skip(78).takeUInt32BE();
            result.height = stream.takeUInt32BE();
        }
    }

    stream.close();

    return result;
}

const containers = ['moov', 'mdia', 'trak'];

function v2(stream, lastTkhd) {
    while (stream.more()) {
        const size = stream.takeUInt32BE();
        const header = stream.take(4).toString();

        if (containers.includes(header)) {
            const result = v2(stream, lastTkhd);

            if (result) return result;
        } else if (header === 'tkhd') {
            const pos = stream.position();
            lastTkhd = stream.take(size - 8);

            stream.goto(pos);
        } else if (header === 'hdlr') {
            const pos = stream.position();
            const hdlr = stream.take(size - 8);

            if (
                hdlr[8] == 0x76 &&
                hdlr[9] == 0x69 &&
                hdlr[10] == 0x64 &&
                hdlr[11] == 0x65
            ) {
                const width =
                    lastTkhd.readUInt32BE(lastTkhd.length - 8) / 65536;
                const height =
                    lastTkhd.readUInt32BE(lastTkhd.length - 4) / 65536;

                return {width, height};
            }

            stream.goto(pos);
        }

        stream.skip(size);
    }
}
