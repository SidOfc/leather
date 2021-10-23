import fs from 'fs';

const BYTE_IDENTIFIERS = {
    ['424d']: 'bmp',
    ['ffd8']: 'jpg',
    ['0000000c']: 'j2c',
    ['44445320']: 'dds',
    ['89504e47']: 'png',
    ['47494638']: 'gif',
    ['38425053']: 'psd',
    ['52494646']: 'avi',
    ['4f676753']: 'ogv',
    ['00000020']: 'mp4',
    ['1a45dfa301']: 'webm',
    ['1a45dfa39f']: 'webm',
    ['1a45dfa3a3']: 'mkv',
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

const MIME_TYPES = {
    bmp: 'image/bmp',
    jpg: 'image/jpeg',
    j2c: 'image/x-jp2-codestream',
    dds: 'image/vnd.ms-dds',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    psd: 'image/vnd.adobe.photoshop',
    ico: 'image/x-icon',
    cur: 'image/x-icon',
    avi: 'video/x-msvideo',
    ogv: 'video/ogg',
    mp4: 'video/mp4',
    webm: 'video/webm',
    mkv: 'video/x-matroska',
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

        mime() {
            return MIME_TYPES[identifier];
        },

        attrs() {
            return {size: methods.size(), mime: methods.mime()};
        },

        take(bytes = 1) {
            const buffer = Buffer.alloc(bytes);
            const bytesRead = fs.readSync(fd, buffer, 0, bytes, position);
            position += bytesRead;

            return buffer;
        },

        takeUInt8() {
            return methods.take().readUInt8();
        },

        takeUIntLE(bytes) {
            return methods.take(bytes).readUIntLE(0, bytes);
        },

        takeUIntBE(bytes) {
            return methods.take(bytes).readUIntBE(0, bytes);
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

        takeUInt64LE() {
            const v1 = methods.takeUInt32LE();
            const v2 = methods.takeUInt32LE();

            return 0x100000000 * v2 + v1;
        },

        indexOf(buffer) {
            let result = -1;
            const currentPosition = position;

            while (methods.more()) {
                const byte = methods.take()[0];

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

    const firstBytes = methods.take(5).toString('hex');
    methods.rewind();

    for (const key in BYTE_IDENTIFIERS) {
        if (firstBytes.startsWith(key)) {
            identifier = BYTE_IDENTIFIERS[key];

            break;
        }
    }

    return methods;
}

export function roundToPrecision(number, precision = 0) {
    const multiplier = Math.pow(10, precision);

    return Math.round(number * multiplier) / multiplier;
}
