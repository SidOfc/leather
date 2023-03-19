import fs from 'fs';

const BYTE_INFO = new Map();
// prettier-ignore
{
    BYTE_INFO.set(/^424d/i,                               'bmp');
    BYTE_INFO.set(/^00000200/i,                           'cur');
    BYTE_INFO.set(/^44445320/i,                           'dds');
    BYTE_INFO.set(/^47494638/i,                           'gif');
    BYTE_INFO.set(/^00000100/i,                           'ico');
    BYTE_INFO.set(/^0000000c/i,                           'j2c');
    BYTE_INFO.set(/^69636e73/i,                           'icns');
    BYTE_INFO.set(/^ffd8/i,                               'jpg');
    BYTE_INFO.set(/^ab4b5458/i,                           'ktx');
    BYTE_INFO.set(/^(?:8950|8a4d)4e47/i,                  'png');
    BYTE_INFO.set(/^38425053/i,                           'psd');
    BYTE_INFO.set(/^3c(?:3f[57]8[46]d|[57]3[57]6[46]7)/i, 'svg');
    BYTE_INFO.set(/^(?:49492a00|4d4d002a)/i,              'tiff');
    BYTE_INFO.set(/^52494646.{8}57454250/i,               'webp');
    BYTE_INFO.set(/^2f2a2058504d/i,                       'xpm');
    BYTE_INFO.set(/^23646566696e/i,                       'xbm');
    BYTE_INFO.set(/^4b695353/i,                           'cel');
    BYTE_INFO.set(/^53494d504c/i,                         'fit');
    BYTE_INFO.set(/^233f524144/i,                         'hdr');
    BYTE_INFO.set(/^52494646/i,                           'avi');
    BYTE_INFO.set(/^.{8}1[12]af/i,                        'fli');
    BYTE_INFO.set(/^464c56/i,                             'flv');
    BYTE_INFO.set(/^.{6}(?:20|1[4c]|6674)/i,              'mp4');
    BYTE_INFO.set(/^4f676753/i,                           'ogv');
    BYTE_INFO.set(/^1a45dfa3(?:01|9f|a3)/i,               'webm');
    BYTE_INFO.set(/^50(?:3[1-7]|46)/i,                    'pnm');
    BYTE_INFO.set(/^3026b2/i,                             'wmv');
}

export function lazystream(file) {
    if (file && file._lazystream) return file;

    let position = 0;
    let closed = false;
    let identifier;
    const isBuffer = Buffer.isBuffer(file);
    const reader = isBuffer ? file : fs.openSync(file, 'r');
    const size = isBuffer ? reader.length : fs.fstatSync(reader).size;

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

        take(bytes = 1) {
            if (isBuffer) {
                const buffer = reader.subarray(position, position + bytes);

                position += buffer.length;

                return buffer;
            } else {
                const buffer = Buffer.alloc(bytes);
                const bytesRead = fs.readSync(
                    reader,
                    buffer,
                    0,
                    bytes,
                    position
                );

                position += bytesRead;

                return buffer;
            }
        },

        takeUntil(target) {
            const bytes = [];
            const targets = Array.isArray(target) ? target : [target];

            while (methods.more()) {
                const byte = methods.take()[0];

                if (targets.includes(byte)) break;

                bytes.push(byte);
            }

            methods.rewind(1);

            return Buffer.from(bytes);
        },

        skipWhile(target) {
            const targets = Array.isArray(target) ? target : [target];

            while (methods.more()) {
                const byte = methods.take()[0];

                if (!targets.includes(byte)) break;
            }

            return methods.rewind(1);
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

        takeUInt64BE() {
            const v1 = methods.takeUInt32BE();
            const v2 = methods.takeUInt32BE();

            return 0x100000000 * v1 + v2;
        },

        takeUInt64LE() {
            const v1 = methods.takeUInt32LE();
            const v2 = methods.takeUInt32LE();

            return 0x100000000 * v2 + v1;
        },

        takeDoubleBE() {
            return methods.take(8).readDoubleBE();
        },

        indexOf(buffer) {
            let result = -1;
            const currentPosition = position;

            while (methods.more()) {
                const byte = methods.take()[0];

                if (byte === buffer[0]) {
                    if (
                        buffer.length === 1 ||
                        buffer
                            .slice(1)
                            .includes(methods.take(buffer.length - 1))
                    ) {
                        result = position - buffer.length;

                        break;
                    }
                }
            }

            position = currentPosition;
            return result;
        },

        takeLine() {
            const idx = methods.indexOf(Buffer.from('\n'));
            const result = methods.take((idx === -1 ? size : idx) - position);

            methods.skip(1);

            return result[result.length - 1] === 0x0d
                ? result.slice(0, -1)
                : result;
        },

        skipLine() {
            const idx = methods.indexOf(Buffer.from('\n'));

            return methods.skip((idx === -1 ? size : idx) - position + 1);
        },

        close() {
            if (closed) return;

            closed = true;
            if (!isBuffer) fs.closeSync(reader);
        },
    };

    const magicBytes = methods.take(12).toString('hex');
    methods.rewind();

    for (const [bytes, id] of BYTE_INFO) {
        if (magicBytes.match(bytes)) {
            identifier = id;

            break;
        }
    }

    return methods;
}

export function roundToPrecision(number, precision = 0) {
    const multiplier = Math.pow(10, precision);

    return Math.round(number * multiplier) / multiplier;
}
