import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const startIndex = stream.indexOf(Buffer.from([0xb0]));
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: mime(stream),
    };

    if (startIndex !== -1) {
        const widthSize = stream.goto(startIndex).skip(1).take()[0] & 0x7;
        result.width = stream.takeUIntBE(widthSize);

        const heightSize = stream.skip(1).take()[0] & 0x7;
        result.height = stream.takeUIntBE(heightSize);
    }

    stream.close();

    return result;
}

function mime(stream) {
    const position = stream.position();
    const byte = stream.goto(4).take()[0];
    stream.goto(position);

    return byte === 0xa3 ? 'video/x-matroska' : 'video/webm';
}
