export function attributes(stream) {
    stream.skip(4);

    while (stream.more()) {
        const size = stream.takeUInt16BE();
        const mark = stream.skip(size - 2).takeUInt8();
        const next = stream.takeUInt8();

        if (mark !== 0xff) break;
        if (next === 0xc0 || next === 0xc1 || next === 0xc2) {
            const height = stream.skip(3).takeUInt16BE();
            const width = stream.takeUInt16BE();

            return {width, height};
        }
    }

    return {width: 0, height: 0};
}
