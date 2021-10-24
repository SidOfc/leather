import fs from 'fs';

const BYTE_IDENTIFIERS = {
    ['424d']: 'bmp',
    ['00000200']: 'cur',
    ['44445320']: 'dds',
    ['47494638']: 'gif',
    ['00000100']: 'ico',
    ['0000000c']: 'j2c',
    ['ffd8']: 'jpg',
    ['ab4b5458']: 'ktx',
    ['89504e47']: 'png',
    ['38425053']: 'psd',
    ['3c3f786d']: 'svg',
    ['3c3f584d']: 'svg',
    ['3c737667']: 'svg',
    ['3c535647']: 'svg',
    ['49492a00']: 'tiff',
    ['4d4d002a']: 'tiff',
    ['52494646']: 'avi',
    ['1a45dfa3a3']: 'mkv',
    ['00000020']: 'mp4',
    ['4f676753']: 'ogv',
    ['1a45dfa301']: 'webm',
    ['1a45dfa39f']: 'webm',
};

const MIME_TYPES = {
    bmp: 'image/bmp',
    cur: 'image/x-icon',
    dds: 'image/vnd.ms-dds',
    gif: 'image/gif',
    ico: 'image/x-icon',
    j2c: 'image/x-jp2-codestream',
    jp2: 'image/jp2',
    jpg: 'image/jpeg',
    ktx: 'image/ktx',
    png: 'image/png',
    psd: 'image/vnd.adobe.photoshop',
    svg: 'image/svg+xml',
    tiff: 'image/tiff',
    avi: 'video/x-msvideo',
    mkv: 'video/x-matroska',
    mp4: 'video/mp4',
    ogv: 'video/ogg',
    webm: 'video/webm',
};

export function lazystream(file) {
    if (file && file._lazystream) return file;

    let position = 0;
    let closed = false;
    let identifier = null;
    const fd = fs.openSync(file, 'r');
    const ext = (file.split('.').pop() || '').toLowerCase();
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

        goto(offset) {
            position = offset;

            return methods;
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

    const magicBytes = methods.take(5).toString('hex');
    methods.rewind();

    for (const key in BYTE_IDENTIFIERS) {
        if (magicBytes.startsWith(key)) {
            const byteId = BYTE_IDENTIFIERS[key];
            identifier = byteId === 'j2c' && ext === 'jp2' ? 'jp2' : byteId;

            break;
        }
    }

    return methods;
}

export function roundToPrecision(number, precision = 0) {
    const multiplier = Math.pow(10, precision);

    return Math.round(number * multiplier) / multiplier;
}
