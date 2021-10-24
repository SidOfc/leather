import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const isBigEndian =
        Buffer.compare(stream.take(2), Buffer.from([0x4d, 0x4d])) === 0;
    const attrs = isBigEndian ? attributesBE(stream) : attributesLE(stream);

    return {...stream.attrs(), ...attrs};
}

function attributesBE(stream) {
    const result = {width: 0, height: 0};
    const ifdIndex = stream.skip(2).takeUInt32BE();

    stream.goto(ifdIndex).skip(2);

    while (stream.more()) {
        const code = stream.takeUInt16BE();
        const type = stream.takeUInt16BE();
        const h = stream.skip(4).takeUInt16BE();
        const l = stream.takeUInt16BE();
        const value = (l << 16) + h;

        if (code === 0) break;
        else if (code === 256) result.width = value;
        else if (code === 257) result.height = value;

        if (result.width > 0 && result.height > 0) break;
    }

    return result;
}

function attributesLE(stream) {
    const result = {width: 0, height: 0};
    const ifdIndex = stream.skip(2).takeUInt32LE();

    stream.goto(ifdIndex).skip(2);

    while (stream.more()) {
        const code = stream.takeUInt16LE();
        const type = stream.takeUInt16LE();
        const value = stream.skip(4).takeUInt32LE();

        if (code === 0) break;
        else if (code === 256) result.width = value;
        else if (code === 257) result.height = value;

        if (result.width > 0 && result.height > 0) break;
    }

    return result;
}
