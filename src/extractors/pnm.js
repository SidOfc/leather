import {lazystream} from '../util.js';

const WHITESPACE = [0x20, 0x09, 0x0d, 0x0a];
const MIME_TYPES = {
    ['PF']: 'application/x-font-type1',
    ['P1']: 'image/x-portable-bitmap',
    ['P2']: 'image/x-portable-graymap',
    ['P3']: 'image/x-portable-pixmap',
    ['P4']: 'image/x-portable-bitmap',
    ['P5']: 'image/x-portable-graymap',
    ['P6']: 'image/x-portable-pixmap',
    ['P7']: 'image/x-portable-arbitrarymap',
};

export function attributes(input) {
    const stream = lazystream(input);
    const type = stream.take(2).toString();
    const attrs = type === 'P7' ? pam(stream) : pnm(stream);
    const result = {
        ...attrs,
        size: stream.size(),
        mime: MIME_TYPES[type],
    };

    stream.close();

    return result;
}

function pnm(stream) {
    while (stream.more()) {
        const byte = stream.take()[0];

        if (WHITESPACE.includes(byte)) {
            continue;
        } else if (byte === 0x23) {
            stream.skipLine();
        } else {
            stream.rewind(1);

            break;
        }
    }

    return {
        width: parseInt(stream.takeUntil(WHITESPACE).toString(), 10),
        height: parseInt(
            stream.skipWhile(WHITESPACE).takeUntil(WHITESPACE).toString(),
            10
        ),
    };
}

function pam(stream) {
    const result = {width: 0, height: 0};

    while (stream.more()) {
        const key = stream.takeUntil(WHITESPACE).toString();

        if (key === 'WIDTH' || key === 'HEIGHT') {
            result[key.toLowerCase()] = parseInt(
                stream.skipWhile(WHITESPACE).takeUntil(WHITESPACE).toString(),
                10
            );

            if (result.width && result.height) break;
        } else {
            stream.skipLine();
        }
    }

    return result;
}
