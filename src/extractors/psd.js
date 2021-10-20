export function attributes(stream) {
    const height = stream.skip(14).takeUInt32BE();
    const width = stream.takeUInt32BE();

    return {width, height};
}
