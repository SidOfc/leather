export default function attributes(stream) {
    const startIndex = stream.indexOf(Buffer.from([0xb0]));
    const widthSize = stream.skip(startIndex + 1).takeByte() & 0x7;
    const width = parseInt(stream.takeHex(widthSize), 16);
    const heightSize = stream.skip(1).takeByte() & 0x7;
    const height = parseInt(stream.takeHex(heightSize), 16);

    if (startIndex === -1) return {width: 0, height: 0};

    return {width, height};
}
