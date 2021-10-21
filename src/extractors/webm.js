import {lazystream} from '../util';

export function attributes(file) {
    const stream = lazystream(file);
    const result = {width: 0, height: 0, ...stream.attrs()};
    const startIndex = stream.indexOf(Buffer.from([0xb0]));

    if (startIndex !== -1) {
        const widthSize = stream.skip(startIndex + 1).takeByte() & 0x7;
        result.width = parseInt(stream.takeHex(widthSize), 16);

        const heightSize = stream.skip(1).takeByte() & 0x7;
        result.height = parseInt(stream.takeHex(heightSize), 16);
    }

    stream.close();

    return result;
}
