import test from 'ava';
import {readMediaAttributes} from '../src/index.js';
import {readFileSync} from 'fs';

test('jpg', (t) => {
    const expected = {width: 1, height: 2, size: 1229, mime: 'image/jpeg'};
    const pathAttributes = readMediaAttributes('test/files/example.jpg');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.jpg')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('j2c', (t) => {
    const expected = {width: 1, height: 2, size: 282, mime: 'image/jp2'};
    const pathAttributes = readMediaAttributes('test/files/example.j2c');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.j2c')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('jp2', (t) => {
    const expected = {width: 1, height: 2, size: 282, mime: 'image/jp2'};
    const pathAttributes = readMediaAttributes('test/files/example.jp2');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.jp2')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('png', (t) => {
    const expected = {width: 1, height: 2, size: 550, mime: 'image/png'};
    const pathAttributes = readMediaAttributes('test/files/example.png');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.png')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('apng', (t) => {
    const expected = {width: 100, height: 100, size: 63435, mime: 'image/apng'};
    const pathAttributes = readMediaAttributes('test/files/example.apng');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.apng')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('png (fried)', (t) => {
    const expected = {width: 128, height: 68, size: 3099, mime: 'image/png'};
    const pathAttributes = readMediaAttributes('test/files/example.fried.png');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.fried.png')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('svg', (t) => {
    const expected = {width: 1, height: 2, size: 377, mime: 'image/svg+xml'};
    const pathAttributes = readMediaAttributes('test/files/example.svg');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.svg')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('svg (rect)', (t) => {
    const expected = {width: 640, height: 480, size: 201, mime: 'image/svg+xml'};
    const pathAttributes = readMediaAttributes('test/files/example.rect.svg');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.rect.svg')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('svg (without XML processing instruction)', (t) => {
    const expected = {width: 320, height: 240, size: 104, mime: 'image/svg+xml'};
    const pathAttributes = readMediaAttributes('test/files/example.noxml.svg');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.noxml.svg')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('gif', (t) => {
    const expected = {width: 1, height: 2, size: 56, mime: 'image/gif'};
    const pathAttributes = readMediaAttributes('test/files/example.gif');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.gif')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('ico', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 86,
        mime: 'image/vnd.microsoft.icon',
    };
    const pathAttributes = readMediaAttributes('test/files/example.ico');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.ico')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('cur', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 78,
        mime: 'image/vnd.microsoft.icon',
    };
    const pathAttributes = readMediaAttributes('test/files/example.cur');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.cur')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('bmp', (t) => {
    const expected = {width: 1, height: 2, size: 130, mime: 'image/bmp'};
    const pathAttributes = readMediaAttributes('test/files/example.bmp');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.bmp')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('psd', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 954,
        mime: 'image/vnd.adobe.photoshop',
    };
    const pathAttributes = readMediaAttributes('test/files/example.psd');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.psd')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('dds', (t) => {
    const expected = {width: 1, height: 2, size: 134, mime: 'image/vnd.ms-dds'};
    const pathAttributes = readMediaAttributes('test/files/example.dds');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.dds')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('ktx', (t) => {
    const expected = {width: 1, height: 2, size: 104, mime: 'image/ktx'};
    const pathAttributes = readMediaAttributes('test/files/example.ktx');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.ktx')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('webp', (t) => {
    const expected = {width: 1, height: 2, size: 44, mime: 'image/webp'};
    const pathAttributes = readMediaAttributes('test/files/example.webp');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.webp')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('webp (animated)', (t) => {
    const expected = {width: 400, height: 400, size: 37342, mime: 'image/webp'};
    const pathAttributes = readMediaAttributes(
        'test/files/example.animated.webp'
    );
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.animated.webp')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('webp (lossless)', (t) => {
    const expected = {width: 1, height: 2, size: 38, mime: 'image/webp'};
    const pathAttributes = readMediaAttributes(
        'test/files/example.lossless.webp'
    );
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.lossless.webp')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('webp (extended)', (t) => {
    const expected = {width: 1, height: 2, size: 2256, mime: 'image/webp'};
    const pathAttributes = readMediaAttributes(
        'test/files/example.extended.webp'
    );
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.extended.webp')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('icns', (t) => {
    const expected = {width: 16, height: 16, size: 39985, mime: 'image/x-icns'};
    const pathAttributes = readMediaAttributes('test/files/example.icns');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.icns')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('pfm', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 36,
        mime: 'application/x-font-type1',
    };
    const pathAttributes = readMediaAttributes('test/files/example.pfm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.pfm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('pam', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 84,
        mime: 'image/x-portable-arbitrarymap',
    };
    const pathAttributes = readMediaAttributes('test/files/example.pam');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.pam')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('pbm', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 55,
        mime: 'image/x-portable-bitmap',
    };
    const pathAttributes = readMediaAttributes('test/files/example.pbm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.pbm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('pbm (ascii)', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 55,
        mime: 'image/x-portable-bitmap',
    };
    const pathAttributes = readMediaAttributes('test/files/example.ascii.pbm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.ascii.pbm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('pgm', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 59,
        mime: 'image/x-portable-graymap',
    };
    const pathAttributes = readMediaAttributes('test/files/example.pgm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.pgm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('pgm (ascii)', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 65,
        mime: 'image/x-portable-graymap',
    };
    const pathAttributes = readMediaAttributes('test/files/example.ascii.pgm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.ascii.pgm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('ppm', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 63,
        mime: 'image/x-portable-pixmap',
    };
    const pathAttributes = readMediaAttributes('test/files/example.ppm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.ppm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('ppm (ascii)', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 81,
        mime: 'image/x-portable-pixmap',
    };
    const pathAttributes = readMediaAttributes('test/files/example.ascii.ppm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.ascii.ppm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('webm', (t) => {
    const expected = {width: 2, height: 4, size: 765, mime: 'video/webm'};
    const pathAttributes = readMediaAttributes('test/files/example.webm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.webm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('webm (alternate)', (t) => {
    const expected = {width: 768, height: 180, size: 9579, mime: 'video/webm'};
    const pathAttributes = readMediaAttributes(
        'test/files/example.alternate.webm'
    );
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.alternate.webm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('tiff (little endian)', (t) => {
    const expected = {width: 1, height: 2, size: 222, mime: 'image/tiff'};
    const pathAttributes = readMediaAttributes('test/files/example.tiff');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.tiff')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('tiff (big endian)', (t) => {
    const expected = {width: 1, height: 2, size: 314, mime: 'image/tiff'};
    const pathAttributes = readMediaAttributes('test/files/example.be.tiff');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.be.tiff')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('xpm', (t) => {
    const expected = {width: 1, height: 2, size: 79, mime: 'image/x-xpixmap'};
    const pathAttributes = readMediaAttributes('test/files/example.xpm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.xpm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('xbm', (t) => {
    const expected = {width: 1, height: 2, size: 106, mime: 'image/x-xbitmap'};
    const pathAttributes = readMediaAttributes('test/files/example.xbm');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.xbm')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('cel', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 40,
        mime: 'application/octet-stream',
    };
    const pathAttributes = readMediaAttributes('test/files/example.cel');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.cel')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('fit', (t) => {
    const expected = {width: 1, height: 2, size: 5760, mime: 'image/fits'};
    const pathAttributes = readMediaAttributes('test/files/example.fit');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.fit')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('hdr', (t) => {
    const expected = {
        width: 1,
        height: 2,
        size: 67,
        mime: 'image/vnd.radiance',
    };
    const pathAttributes = readMediaAttributes('test/files/example.hdr');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.hdr')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('mp4', (t) => {
    const expected = {width: 2, height: 4, size: 1548, mime: 'video/mp4'};
    const pathAttributes = readMediaAttributes('test/files/example.mp4');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.mp4')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('mp4 (mp42)', (t) => {
    const expected = {width: 2, height: 4, size: 1580, mime: 'video/mp4'};
    const pathAttributes = readMediaAttributes('test/files/example.mp42.mp4');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.mp42.mp4')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('m4v', (t) => {
    const expected = {width: 2, height: 4, size: 1580, mime: 'video/x-m4v'};
    const pathAttributes = readMediaAttributes('test/files/example.m4v');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.m4v')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('ogv', (t) => {
    const expected = {width: 2, height: 4, size: 3573, mime: 'video/ogg'};
    const pathAttributes = readMediaAttributes('test/files/example.ogv');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.ogv')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('mkv', (t) => {
    const expected = {
        width: 2,
        height: 4,
        size: 1656,
        mime: 'video/x-matroska',
    };
    const pathAttributes = readMediaAttributes('test/files/example.mkv');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.mkv')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('avi', (t) => {
    const expected = {width: 2, height: 4, size: 6512, mime: 'video/x-msvideo'};
    const pathAttributes = readMediaAttributes('test/files/example.avi');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.avi')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('fli', (t) => {
    const expected = {width: 1, height: 2, size: 934, mime: 'video/x-fli'};
    const pathAttributes = readMediaAttributes('test/files/example.fli');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.fli')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('flc', (t) => {
    const expected = {width: 1, height: 2, size: 934, mime: 'video/x-fli'};
    const pathAttributes = readMediaAttributes('test/files/example.flc');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.flc')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('mng', (t) => {
    const expected = {width: 100, height: 100, size: 5133, mime: 'video/x-mng'};
    const pathAttributes = readMediaAttributes('test/files/example.mng');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.mng')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('flv', (t) => {
    const expected = {
        width: 100,
        height: 100,
        size: 17818,
        mime: 'video/x-flv',
    };
    const pathAttributes = readMediaAttributes('test/files/example.flv');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.flv')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('mov', (t) => {
    const expected = {
        width: 100,
        height: 100,
        size: 6156,
        mime: 'video/quicktime',
    };
    const pathAttributes = readMediaAttributes('test/files/example.mov');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.mov')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});

test('wmv', (t) => {
    const expected = {
        width: 100,
        height: 100,
        size: 19827,
        mime: 'video/x-ms-wmv',
    };
    const pathAttributes = readMediaAttributes('test/files/example.wmv');
    const bufferAttributes = readMediaAttributes(
        readFileSync('test/files/example.wmv')
    );

    t.like(expected, pathAttributes);
    t.like(pathAttributes, bufferAttributes);
});
