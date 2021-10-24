import fs from 'fs';

const BYTE_INFO = new Map();
// prettier-ignore
{
    BYTE_INFO.set(/^424d/i,     {id: 'bmp',  mime: 'image/bmp'});
    BYTE_INFO.set(/^00000200/i, {id: 'cur',  mime: 'image/x-icon'});
    BYTE_INFO.set(/^44445320/i, {id: 'dds',  mime: 'image/vnd.ms-dds'});
    BYTE_INFO.set(/^47494638/i, {id: 'gif',  mime: 'image/gif'});
    BYTE_INFO.set(/^00000100/i, {id: 'ico',  mime: 'image/x-icon'});
    BYTE_INFO.set(/^0000000c/i, {id: 'j2c',  mime: 'image/x-jp2-codestream'});
    BYTE_INFO.set(/^69636e73/i, {id: 'icns', mime: 'image/x-icns'});
    BYTE_INFO.set(/^ffd8/i,     {id: 'jpg',  mime: 'image/jpeg'});
    BYTE_INFO.set(/^ab4b5458/i, {id: 'ktx',  mime: 'image/ktx'});
    BYTE_INFO.set(/^89504e47/i, {id: 'png',  mime: 'image/png'});
    BYTE_INFO.set(/^38425053/i, {id: 'psd',  mime: 'image/vnd.adobe.photoshop'});
    BYTE_INFO.set(
        /^3c(?:3f[57]8[46]d|[57]3[57]6[46]7)/i,
        {id: 'svg',  mime: 'image/svg+xml'}
    );
    BYTE_INFO.set(/^(?:49492a00|4d4d002a)/i, {id: 'tiff', mime: 'image/tiff'});
    BYTE_INFO.set(/^52494646.{8}57454250/i,  {id: 'webp', mime: 'image/webp'});
    BYTE_INFO.set(/^52494646/i,              {id: 'avi',  mime: 'video/x-msvideo'});
    BYTE_INFO.set(/^.{8}1[12]af/i,           {id: 'fli',  mime: 'video/x-flic'});
    BYTE_INFO.set(/^1a45dfa3a3/i,            {id: 'mkv',  mime: 'video/x-matroska'});
    BYTE_INFO.set(/^00000020/i,              {id: 'mp4',  mime: 'video/mp4'});
    BYTE_INFO.set(/^4f676753/i,              {id: 'ogv',  mime: 'video/ogg'});
    BYTE_INFO.set(/^1a45dfa3(?:01|9f)/i,     {id: 'webm', mime: 'video/webm'});
}

const BYTE_ALIASES = {
    'j2c.jp2': {id: 'jp2', mime: 'image/jp2'},
    'fli.flc': {id: 'flc', mime: 'video/x-flic'},
};

export function lazystream(file) {
    if (file && file._lazystream) return file;

    let position = 0;
    let closed = false;
    let identifier;
    let mime;
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
            return mime;
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

        takeUIntBE(bytes) {
            return methods.take(bytes).readUIntBE(0, bytes);
        },

        takeUIntLE(bytes) {
            return methods.take(bytes).readUIntLE(0, bytes);
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

    const magicBytes = methods.take(12).toString('hex');
    methods.rewind();

    for (const [bytes, info] of BYTE_INFO) {
        if (magicBytes.match(bytes)) {
            const data = BYTE_ALIASES[`${info.id}.${ext}`] || info;
            identifier = data.id;
            mime = data.mime;

            break;
        }
    }

    return methods;
}

export function roundToPrecision(number, precision = 0) {
    const multiplier = Math.pow(10, precision);

    return Math.round(number * multiplier) / multiplier;
}
