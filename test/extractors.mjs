import test from 'ava';
import {attributes} from '../dist/index.mjs';

test('jpg', (t) =>
    t.like(
        {width: 1, height: 2, size: 1229, mime: 'image/jpeg'},
        attributes('test/files/example.jpg')
    ));

test('j2c', (t) =>
    t.like(
        {width: 1, height: 2, size: 282, mime: 'image/x-jp2-codestream'},
        attributes('test/files/example.j2c')
    ));

test('jp2', (t) =>
    t.like(
        {width: 1, height: 2, size: 282, mime: 'image/jp2'},
        attributes('test/files/example.jp2')
    ));

test('png', (t) =>
    t.like(
        {width: 1, height: 2, size: 550, mime: 'image/png'},
        attributes('test/files/example.png')
    ));

test('apng', (t) =>
    t.like(
        {width: 100, height: 100, size: 63435, mime: 'image/png'},
        attributes('test/files/example.apng')
    ));

test('png (fried)', (t) =>
    t.like(
        {width: 128, height: 68, size: 3099, mime: 'image/png'},
        attributes('test/files/example.fried.png')
    ));

test('svg', (t) =>
    t.like(
        {width: 1, height: 2, size: 377, mime: 'image/svg+xml'},
        attributes('test/files/example.svg')
    ));

test('gif', (t) =>
    t.like(
        {width: 1, height: 2, size: 56, mime: 'image/gif'},
        attributes('test/files/example.gif')
    ));

test('ico', (t) =>
    t.like(
        {width: 1, height: 2, size: 86, mime: 'image/x-icon'},
        attributes('test/files/example.ico')
    ));

test('cur', (t) =>
    t.like(
        {width: 1, height: 2, size: 78, mime: 'image/x-icon'},
        attributes('test/files/example.cur')
    ));

test('bmp', (t) =>
    t.like(
        {width: 1, height: 2, size: 130, mime: 'image/bmp'},
        attributes('test/files/example.bmp')
    ));

test('psd', (t) =>
    t.like(
        {width: 1, height: 2, size: 954, mime: 'image/vnd.adobe.photoshop'},
        attributes('test/files/example.psd')
    ));

test('dds', (t) =>
    t.like(
        {width: 1, height: 2, size: 134, mime: 'image/vnd.ms-dds'},
        attributes('test/files/example.dds')
    ));

test('ktx', (t) =>
    t.like(
        {width: 1, height: 2, size: 104, mime: 'image/ktx'},
        attributes('test/files/example.ktx')
    ));

test('webp', (t) =>
    t.like(
        {width: 1, height: 2, size: 44, mime: 'image/webp'},
        attributes('test/files/example.webp')
    ));

test('webp (animated)', (t) =>
    t.like(
        {width: 400, height: 400, size: 37342, mime: 'image/webp'},
        attributes('test/files/example.animated.webp')
    ));

test('webp (lossless)', (t) =>
    t.like(
        {width: 1, height: 2, size: 38, mime: 'image/webp'},
        attributes('test/files/example.lossless.webp')
    ));

test('webp (extended)', (t) =>
    t.like(
        {width: 1, height: 2, size: 2256, mime: 'image/webp'},
        attributes('test/files/example.extended.webp')
    ));

test('icns', (t) =>
    t.like(
        {width: 16, height: 16, size: 39985, mime: 'image/x-icns'},
        attributes('test/files/example.icns')
    ));

test('pfm', (t) =>
    t.like(
        {width: 1, height: 2, size: 36, mime: 'image/x-portable-bitmap'},
        attributes('test/files/example.pfm')
    ));

test('pam', (t) =>
    t.like(
        {width: 1, height: 2, size: 84, mime: 'image/x-portable-bitmap'},
        attributes('test/files/example.pam')
    ));

test('pbm', (t) =>
    t.like(
        {width: 1, height: 2, size: 55, mime: 'image/x-portable-bitmap'},
        attributes('test/files/example.pbm')
    ));

test('pbm (ascii)', (t) =>
    t.like(
        {width: 1, height: 2, size: 55, mime: 'image/x-portable-bitmap'},
        attributes('test/files/example.ascii.pbm')
    ));

test('pgm', (t) =>
    t.like(
        {width: 1, height: 2, size: 59, mime: 'image/x-portable-bitmap'},
        attributes('test/files/example.pgm')
    ));

test('pgm (ascii)', (t) =>
    t.like(
        {width: 1, height: 2, size: 65, mime: 'image/x-portable-bitmap'},
        attributes('test/files/example.ascii.pgm')
    ));

test('ppm', (t) =>
    t.like(
        {width: 1, height: 2, size: 63, mime: 'image/x-portable-bitmap'},
        attributes('test/files/example.ppm')
    ));

test('ppm (ascii)', (t) =>
    t.like(
        {width: 1, height: 2, size: 81, mime: 'image/x-portable-bitmap'},
        attributes('test/files/example.ascii.ppm')
    ));

test('webm', (t) =>
    t.like(
        {width: 2, height: 4, size: 765, mime: 'video/webm'},
        attributes('test/files/example.webm')
    ));

test('webm (alternate)', (t) =>
    t.like(
        {width: 768, height: 180, size: 9579, mime: 'video/webm'},
        attributes('test/files/example.alternate.webm')
    ));

test('tiff (little endian)', (t) =>
    t.like(
        {width: 1, height: 2, size: 222, mime: 'image/tiff'},
        attributes('test/files/example.tiff')
    ));

test('tiff (big endian)', (t) =>
    t.like(
        {width: 1, height: 2, size: 314, mime: 'image/tiff'},
        attributes('test/files/example.be.tiff')
    ));

test('mp4', (t) =>
    t.like(
        {width: 2, height: 4, size: 1548, mime: 'video/mp4'},
        attributes('test/files/example.mp4')
    ));

test('ogv', (t) =>
    t.like(
        {width: 2, height: 4, size: 3573, mime: 'video/ogg'},
        attributes('test/files/example.ogv')
    ));

test('mkv', (t) =>
    t.like(
        {width: 2, height: 4, size: 1656, mime: 'video/x-matroska'},
        attributes('test/files/example.mkv')
    ));

test('avi', (t) =>
    t.like(
        {width: 2, height: 4, size: 6512, mime: 'video/x-msvideo'},
        attributes('test/files/example.avi')
    ));

test('fli', (t) =>
    t.like(
        {width: 1, height: 2, size: 934, mime: 'video/x-flic'},
        attributes('test/files/example.fli')
    ));

test('flc', (t) =>
    t.like(
        {width: 1, height: 2, size: 934, mime: 'video/x-flic'},
        attributes('test/files/example.flc')
    ));

test('mng', (t) =>
    t.like(
        {width: 100, height: 100, size: 5133, mime: 'video/x-mng'},
        attributes('test/files/example.mng')
    ));

test('flv', (t) =>
    t.like(
        {width: 100, height: 100, size: 17818, mime: 'video/x-flv'},
        attributes('test/files/example.flv')
    ));

test('mov', (t) =>
    t.like(
        {width: 100, height: 100, size: 6156, mime: 'video/quicktime'},
        attributes('test/files/example.mov')
    ));

test('wmv', (t) =>
    t.like(
        {width: 100, height: 100, size: 19827, mime: 'video/x-ms-wmv'},
        attributes('test/files/example.wmv')
    ));
