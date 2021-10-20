export function attributes(stream) {
    const width = parseInt(stream.skip(42).takeHex(3), 16);
    const height = parseInt(stream.takeHex(3), 16);

    return {width, height};
}
