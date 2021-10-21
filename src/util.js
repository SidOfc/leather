import fs from 'fs';

const BYTE_IDENTIFIERS = {
    ['424d']: 'bmp',
    ['ffd8']: 'jpg',
    ['44445320']: 'dds',
    ['89504e47']: 'png',
    ['47494638']: 'gif',
    ['38425053']: 'psd',
    ['52494646']: 'avi',
    ['4f676753']: 'ogv',
    ['00000020']: 'mp4',
    ['1a45dfa3']: 'webm',

    // ico and cur files have similar byte layouts
    // so we can use the same converter for both
    ['00000100']: 'ico', // ico starts with 000001
    ['00000200']: 'cur', // cur starts with 000002

    // svg can start with "<?xm", "<?XM", "<svg", or "<SVG"
    ['3c3f786d']: 'svg', // match initial bytes: <?xm
    ['3c3f584d']: 'svg', // match initial bytes: <?XM
    ['3c737667']: 'svg', // match initial bytes: <svg
    ['3c535647']: 'svg', // match initial bytes: <SVG
};

export function lazystream(file) {
    if (file && file._lazystream) return file;

    let position = 0;
    let closed = false;
    let identifier = null;
    const fd = fs.openSync(file, 'r');
    const {size} = fs.fstatSync(fd);
    const methods = {
        _lazystream: true,
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
            return identifier;
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
            if (closed) return;

            closed = true;
            fs.closeSync(fd);
        },
    };

    const firstBytes = methods.takeHex(8);
    methods.rewind();

    for (const key in BYTE_IDENTIFIERS) {
        if (firstBytes.startsWith(key)) {
            identifier = BYTE_IDENTIFIERS[key];

            break;
        }
    }

    return methods;
}
