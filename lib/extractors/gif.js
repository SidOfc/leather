export default function attributes(stream) {
    const width = stream.skip(6).takeUInt16LE();
    const height = stream.takeUInt16LE();

    return {width, height};
}
