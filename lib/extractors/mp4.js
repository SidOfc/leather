export default function attributes(stream) {
    const startIndex = stream.indexOf(Buffer.from('tkhd'));

    if (startIndex === -1) return {width: 0, height: 0};

    const width = stream.skip(startIndex + 78).takeUInt32BE();
    const height = stream.takeUInt32BE();

    return {width, height};
}
