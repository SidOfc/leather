import fs from 'fs';

export function lazystream(file) {
    let position = 0;
    const fd = fs.openSync(file, 'r');
    const {size} = fs.statSync(file);
    const methods = {
        skip(bytes = 1) {
            position += bytes;

            return methods;
        },

        file() {
            return file;
        },

        size() {
            return size;
        },

        position() {
            return position;
        },

        more() {
            return position < size;
        },

        rewind(bytes = position) {
            position -= bytes;

            return methods;
        },

        identifier() {
            const id = methods.takeHex(4);

            methods.rewind();

            return id;
        },

        take(bytes = 1) {
            const buffer = Buffer.alloc(bytes);
            const bytesRead = fs.readSync(fd, buffer, 0, bytes, position);
            position += bytesRead;

            return buffer;
        },

        takeByte() {
            return methods.take()[0];
        },

        takeHex(bytes) {
            return methods.take(bytes).toString('hex');
        },

        takeUInt8() {
            return methods.take().readUInt8();
        },

        takeUInt16BE() {
            return methods.take(2).readUInt16BE();
        },

        takeUInt16LE() {
            return methods.take(2).readUInt16LE();
        },

        takeUInt32BE() {
            return methods.take(4).readUInt32BE();
        },

        takeUInt32LE() {
            return methods.take(4).readUInt32LE();
        },

        indexOf(buffer) {
            let result = -1;
            const currentPosition = position;

            while (methods.more()) {
                const byte = methods.takeByte();

                if (byte === buffer[0]) {
                    const rest = methods.take(buffer.length - 1);

                    if (buffer.slice(1).includes(rest)) {
                        result = position - buffer.length;

                        break;
                    }
                }
            }

            position = currentPosition;
            return result;
        },

        close() {
            fs.closeSync(fd);
        },
    };

    return methods;
}
