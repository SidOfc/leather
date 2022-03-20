import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const firstLine = stream.takeLine().toString();
    const secondLine = stream.takeLine().toString();
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/x-xbitmap',
    };

    if (firstLine.match(/width/i)) {
        result.width = parseInt(firstLine.split(' ').pop(), 10);
        result.height = parseInt(secondLine.split(' ').pop(), 10);
    } else {
        result.width = parseInt(secondLine.split(' ').pop(), 10);
        result.height = parseInt(firstLine.split(' ').pop(), 10);
    }

    stream.close();

    return result;
}
