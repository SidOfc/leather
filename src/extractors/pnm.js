import {lazystream} from '../util.js';

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

export function readMediaAttributes(input) {
    const stream = lazystream(input);
    const type = stream.take(3).toString().trim();
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
        const line = stream.takeLine().toString();

        if (line.match(/^\d+\s+\d+/)) {
            const [widthString, heightString] = line.split(/\s+/);

            return {
                width: parseInt(widthString),
                height: parseInt(heightString),
            };
        }
    }
}

function pam(stream) {
    const result = {width: 0, height: 0};

    while (stream.more()) {
        const [key, stringSize] = stream
            .takeLine()
            .toString()
            .toLowerCase()
            .split(/\s+/i);

        if (key === 'width' || key === 'height') {
            result[key] = parseInt(stringSize);

            if (result.width && result.height) break;
        }
    }

    return result;
}
