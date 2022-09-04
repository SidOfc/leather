import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const isMNG = stream.take(4).includes('MNG');
    const isFried = stream.skip(8).take(4).includes('CgBI');

    if (isFried) stream.skip(16);

    const result = {
        width: stream.takeUInt32BE(),
        height: stream.takeUInt32BE(),
        size: stream.size(),
        mime: isMNG
            ? 'video/x-mng'
            : isAPNG(stream)
            ? 'image/apng'
            : 'image/png',
    };

    stream.close();

    return result;
}

function isAPNG(stream) {
    const position = stream.position();
    const result = [256, 512, 1024].some((size) =>
        stream.take(size).includes('acTL')
    );

    stream.goto(position);

    return result;
}
