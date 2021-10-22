import test from 'ava';
import {attributes} from '../src';

test('jpg', (t) =>
    t.like(
        {width: 1, height: 2, size: 1229, mime: 'image/jpeg'},
        attributes('test/files/example.jpg')
    ));

test('png', (t) =>
    t.like(
        {width: 1, height: 2, size: 550, mime: 'image/png'},
        attributes('test/files/example.png')
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
        {
            width: 2,
            height: 4,
            size: 6512,
            duration: 0.1,
            mime: 'video/x-msvideo',
        },
        attributes('test/files/example.avi')
    ));
