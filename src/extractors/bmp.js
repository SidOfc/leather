export function attributes(stream) {
    const width = stream.skip(18).takeUInt16LE();
    const height = Math.abs(stream.skip(2).takeUInt16LE());

    return {width, height};
}
