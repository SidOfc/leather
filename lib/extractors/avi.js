export default function attributes(stream) {
    const width = stream.skip(64).takeUInt32LE();
    const height = stream.takeUInt32LE();

    return {width, height};
}
