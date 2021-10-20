export function attributes(stream) {
    const startIndex = stream.indexOf(Buffer.from('IHDR'));

    if (startIndex === -1) return {width: 0, height: 0};

    const width = stream.skip(startIndex + 4).takeUInt32BE();
    const height = stream.takeUInt32BE();

    return {width, height};
}
