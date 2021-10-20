export function attributes(stream) {
    const height = stream.skip(12).takeUInt32LE();
    const width = stream.takeUInt32LE();

    return {width, height};
}
