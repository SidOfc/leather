export function attributes(stream) {
    const [width, height] = stream.skip(6).take(2);

    return {width, height};
}
