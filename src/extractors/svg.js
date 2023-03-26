import {lazystream} from '../util.js';

const UNITS = {
    m: 3779.5275590551178,
    cm: 37.795275590551178,
    mm: 3.7795275590551178,
    pc: 0.1111111111111111,
    pt: 1.3333333333333333,
    in: 96,
    ex: 8,
    px: 1,
    em: 16,
    rem: 16,
};

export function readMediaAttributes(input) {
    let attrQuote = null;
    const stream = lazystream(input);
    const found = {};
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/svg+xml',
    };

    for (const chunk of stream.overlappingChunks(64)) {
        const content = chunk.buffer.toString().toLowerCase();

        if (found.start) {
            let lastChar;
            const tail = chunk.offset === 0 ? content : content.slice(32);

            for (const char of tail) {
                if (lastChar !== '\\') {
                    if (lastChar === '=' && ['"', "'"].includes(char)) {
                        attrQuote = char;
                    } else if (char === attrQuote) {
                        attrQuote = null;
                    }

                    if (!char.match(/\s/)) lastChar = char;
                }

                if (!attrQuote && char === '>') {
                    found.end = chunk.offset + content.indexOf('>');

                    break;
                }
            }
        } else if (content.includes('<svg')) {
            found.start = chunk.offset + content.indexOf('<svg');
        }
    }

    if (found.start && found.end) {
        const data = stream
            .goto(found.start)
            .take(found.end - found.start)
            .toString();
        const width = extractWidth(data);
        const height = extractHeight(data);

        if (width && height) {
            Object.assign(result, {width, height});
        } else {
            const viewbox = extractViewbox(data);

            if (width)
                Object.assign(result, {
                    width,
                    height: Math.floor(width / viewbox.ratio),
                });
            else if (height)
                Object.assign(result, {
                    width: Math.floor(height * viewbox.ratio),
                    height,
                });
            else
                Object.assign(result, {
                    width: viewbox.width,
                    height: viewbox.height,
                });
        }
    }

    stream.close();

    return result;
}

function parseDimension(value) {
    const possibleUnits = Object.keys(UNITS).join('|');
    const pattern = new RegExp(`^([0-9.]+(?:e\\d+)?)(${possibleUnits})?$`);
    const matches = value.toLowerCase().match(pattern);

    if (matches)
        return Math.round(Number(matches[1]) * (UNITS[matches[2]] || UNITS.px));
}

function extractWidth(data) {
    const matches = data.match(/width=(["'])([^%]+?)\1/i);

    if (matches) return parseDimension(matches[2]);
}

function extractHeight(data) {
    const matches = data.match(/height=(["'])([^%]+?)\1/i);

    if (matches) return parseDimension(matches[2]);
}

function extractViewbox(data) {
    const matches = data.match(/viewbox=(["'])([^\1]+?)\1/i);

    if (matches) {
        const [width, height] = matches[2]
            .split(' ')
            .slice(2)
            .map(parseDimension);

        return {width, height, ratio: width / height};
    }

    return {width: 0, height: 0, ratio: 1};
}
