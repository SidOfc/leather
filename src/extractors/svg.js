import {lazystream} from '../util';

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

const WIDTH_PATTERN = /width=(["'])([^%]+?)\1/i;
const HEIGHT_PATTERN = /height=(["'])([^%]+?)\1/i;
const VIEWBOX_PATTERN = /viewbox=(["'])([^\1]+?)\1/i;
const DIMENSION_PATTERN = new RegExp(
    `^([0-9.]+(?:e\\d+)?)(${Object.keys(UNITS).join('|')})?$`
);

function parseDimension(value) {
    const matches = value.toLowerCase().match(DIMENSION_PATTERN);

    if (matches)
        return Math.round(Number(matches[1]) * (UNITS[matches[2]] || UNITS.px));
}

function extractWidth(data) {
    const matches = data.match(WIDTH_PATTERN);

    if (matches) return parseDimension(matches[2]);
}

function extractHeight(data) {
    const matches = data.match(HEIGHT_PATTERN);

    if (matches) return parseDimension(matches[2]);
}

function extractViewbox(data) {
    const matches = data.match(VIEWBOX_PATTERN);

    if (matches) {
        const [width, height] = matches[2]
            .split(' ')
            .slice(2)
            .map(parseDimension);

        return {width, height, ratio: width / height};
    }

    return {width: 0, height: 0, ratio: 1};
}

export function attributes(file) {
    const stream = lazystream(file);
    const bytes = [];
    let startIndex = null;
    let insideAttr = false;

    while (stream.more()) {
        const byte = stream.take()[0];

        if (byte === 0x3c) {
            // found potential opening tag "<" character
            const nextByte = stream.take()[0];

            if (nextByte === 0x73 || nextByte === 0x53) {
                // next byte is either "s" or "S", assume
                // that we have found the opening svg tag
                stream.skip(3);
                startIndex = stream.position();
            }
        } else if (!Number.isInteger(startIndex)) {
            // we have not yet found svg opening tag,
            // continue reading the next byte immediately
            continue;
        } else if (byte === 0x5c) {
            // encountered a backslash, ignore next byte
            stream.take();
        } else if (byte === 0x22 || byte === 0x27) {
            // encountered single or double quote,
            // assume we are entering an attribute value
            insideAttr = !insideAttr;
            bytes.push(byte);
        } else if (!insideAttr && byte === 0x3e) {
            // encountered ">" character while not
            // inside an attribute value, assume
            // svg opening tag end
            break;
        } else {
            // store bytes so we can convert them
            // to a string for attribute parsing
            bytes.push(byte);
        }
    }

    const data = Buffer.from(bytes).toString();
    const width = extractWidth(data);
    const height = extractHeight(data);
    const result = {width: 0, height: 0, ...stream.attrs()};

    stream.close();

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

    return result;
}
