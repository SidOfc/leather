import test from 'ava';
import {attributes} from '../src';

test('jpg', (t) =>
    t.like(
        {width: 1, height: 2, size: 1229},
        attributes('test/files/example.jpg')
    ));

test('png', (t) =>
    t.like(
        {width: 1, height: 2, size: 550},
        attributes('test/files/example.png')
    ));

test('svg', (t) =>
    t.like(
        {width: 1, height: 2, size: 377},
        attributes('test/files/example.svg')
    ));

test('gif', (t) =>
    t.like(
        {width: 1, height: 2, size: 56},
        attributes('test/files/example.gif')
    ));

test('ico', (t) =>
    t.like(
        {width: 1, height: 2, size: 86},
        attributes('test/files/example.ico')
    ));

test('bmp', (t) =>
    t.like(
        {width: 1, height: 2, size: 130},
        attributes('test/files/example.bmp')
    ));

test('psd', (t) =>
    t.like(
        {width: 1, height: 2, size: 954},
        attributes('test/files/example.psd')
    ));

test('dds', (t) =>
    t.like(
        {width: 1, height: 2, size: 134},
        attributes('test/files/example.dds')
    ));

test('webm', (t) =>
    t.like(
        {width: 2, height: 4, size: 765},
        attributes('test/files/example.webm')
    ));

test('mp4', (t) =>
    t.like(
        {width: 2, height: 4, size: 1548},
        attributes('test/files/example.mp4')
    ));

test('ogv', (t) =>
    t.like(
        {width: 2, height: 4, size: 3573},
        attributes('test/files/example.ogv')
    ));

test('mkv', (t) =>
    t.like(
        {width: 2, height: 4, size: 1656},
        attributes('test/files/example.mkv')
    ));

test('avi', (t) =>
    t.like(
        {width: 2, height: 4, size: 6512},
        attributes('test/files/example.avi')
    ));
