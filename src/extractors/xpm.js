import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/x-xpixmap',
    };

    const target = '[] = {\n';
    const startIndex = stream.indexOf(target);
    const [widthString, heightString] = stream
        .skip(startIndex + target.length)
        .takeLine()
        .toString()
        .replace(/[^\d\s]/g, '')
        .split(/\s+/);

    if (widthString && heightString) {
        result.width = parseInt(widthString);
        result.height = parseInt(heightString);
    }

    stream.close();

    return result;
}
