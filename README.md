# Leather

![Licence](https://img.shields.io/badge/license-MIT-E9573F.svg)
[![npm](https://img.shields.io/npm/v/leather)](https://www.npmjs.com/package/leather)
[![Issues](https://img.shields.io/github/issues/SidOfc/leather.svg)](https://github.com/SidOfc/leather/issues)
[![Build Status](https://circleci.com/gh/SidOfc/leather.svg?style=shield)](https://app.circleci.com/pipelines/github/SidOfc/leather)

Have you ever wished for the ability to retrieve image or video file attributes
such as _width_, _height_, _size_, and _mime type_ in Node without having
to resort to external libraries such as `ffprobe`?

Yeah, **me too!** This is why `leather` was created.
At the moment, the only package that does something similar is
[`image-size`](https://www.npmjs.com/package/image-size)
and while it does work well, it does not handle video formats.

# How

`leather` uses streams to read image and video files in byte-sized chunks.
As soon attributes have been extracted, the stream will be closed. Some file
formats have a well-defined fixed position in which these attributes
can be found, in those cases, `leather` skips any bytes before that
position and reads only the bytes needed to extract attributes directly.

However, sometimes the byte offset of these attributes may vary, in these
scenarios `leather` makes a best-effort attempt to read as few bytes as
possible to get to the good stuff!

# Why

Before `leather`, if you wanted to do something like this in Node
you would need to install `image-size` to handle images and either
use `ffprobe` directly or using some kind of wrapper package to
handle video files.

While I love `ffprobe` for its capabilities, setting up a cross-platform
package requires some configuration. This package aims to solve that
by steering clear of any command-line tools which makes it more portable.

# Node support

Stable Node versions from 16.x and up are tested.

# Installation

Install the package locally using [`npm`](https://www.npmjs.com/):

```shell
npm install leather --save
```

Or using [`yarn`](https://yarnpkg.com/)

```shell
yarn add leather
```

# Usage

After [installing the package](#installation), it can be imported using commonjs:

```javascript
const {readMediaAttributes} = require('leather');
```

Or using ES modules:

```javascript
import {readMediaAttributes} from 'leather';
```

Then, it can be called on [supported image and video formats](#supported-formats):

```javascript
console.log(readMediaAttributes('cat.jpg'));

// => {width: 200, height: 200, size: 40000, mime: 'image/jpeg'}
```

## Buffer support

Starting from version **2.1.0**, all `readMediaAttributes` methods also accept `Buffer`
instances in addition to file paths:

```javascript
const buffer = fs.readFileSync('cat.png');

console.log(readMediaAttributes(buffer));

// => {width: 200, height: 200, size: 40000, mime: 'image/jpeg'}
```

The _width_ and _height_ are _pixel based_. The _size_ is the same as
[`fs.stat`](https://nodejs.org/api/fs.html#fsstatpath-options-callback).
If the width or height could not be extracted, they will default to `0`.
The _mime_ type is also returned if found, otherwise `undefined`.

## Using specific extractors

If you are only using one or a few of the extractors, you can opt to
require only the extractors you need, e.g. for jpg/jpeg using commonjs:

```javascript
const {readFileSync} = require('fs');
const {readMediaAttributes} = require('leather/extractors/jpg');

console.log(readMediaAttributes('cat.jpg'));
console.log(readMediaAttributes(readFileSync('cat.jpg')));

// => {width: 200, height: 200, size: 40000, mime: 'image/jpeg'}
```

Or using ES modules:

```javascript
import {readFileSync} from 'fs';
import {readMediaAttributes} from 'leather/extractors/jpg';

console.log(readMediaAttributes('cat.jpg'));
console.log(readMediaAttributes(readFileSync('cat.jpg')));

// => {width: 200, height: 200, size: 40000, mime: 'image/jpeg'}
```

# Supported formats

All supported image and video formats can be found in the table below:

|  format  | extractor                      | mime type                     |
|:---------|:-------------------------------|:------------------------------|
| **bmp**  | [bmp](src/extractors/bmp.js)   | image/bmp                     |
| **dds**  | [dds](src/extractors/dds.js)   | image/vnd.ms-dds              |
| **gif**  | [gif](src/extractors/gif.js)   | image/gif                     |
| **icns** | [icns](src/extractors/icns.js) | image/x-icns                  |
| **ico**  | [ico](src/extractors/ico.js)   | image/vnd.microsoft.icon      |
| **cur**  | [ico](src/extractors/ico.js)   | image/vnd.microsoft.icon      |
| **j2c**  | [j2c](src/extractors/j2c.js)   | image/jp2                     |
| **jp2**  | [j2c](src/extractors/j2c.js)   | image/jp2                     |
| **jpg**  | [jpg](src/extractors/jpg.js)   | image/jpeg                    |
| **ktx**  | [ktx](src/extractors/ktx.js)   | image/ktx                     |
| **png**  | [png](src/extractors/png.js)   | image/png                     |
| **apng** | [png](src/extractors/png.js)   | image/apng                    |
| **pfm**  | [pnm](src/extractors/pnm.js)   | application/x-font-type1      |
| **pam**  | [pnm](src/extractors/pnm.js)   | image/x-portable-arbitrarymap |
| **pbm**  | [pnm](src/extractors/pnm.js)   | image/x-portable-bitmap       |
| **pgm**  | [pnm](src/extractors/pnm.js)   | image/x-portable-graymap      |
| **ppm**  | [pnm](src/extractors/pnm.js)   | image/x-portable-pixmap       |
| **psd**  | [psd](src/extractors/psd.js)   | image/vnd.adobe.photoshop     |
| **svg**  | [svg](src/extractors/svg.js)   | image/svg+xml                 |
| **tiff** | [tiff](src/extractors/tiff.js) | image/tiff                    |
| **webp** | [webp](src/extractors/webp.js) | image/webp                    |
| **xpm**  | [xpm](src/extractors/xpm.js)   | image/x-xpixmap               |
| **xbm**  | [xbm](src/extractors/xbm.js)   | image/x-xbitmap               |
| **fit**  | [fit](src/extractors/fit.js)   | image/fits                    |
| **cel**  | [cel](src/extractors/cel.js)   | application/octet-stream      |
| **hdr**  | [hdr](src/extractors/hdr.js)   | image/vnd.radiance            |
| **avi**  | [avi](src/extractors/avi.js)   | video/x-msvideo               |
| **fli**  | [fli](src/extractors/fli.js)   | video/x-fli                   |
| **flc**  | [fli](src/extractors/fli.js)   | video/x-fli                   |
| **flv**  | [flv](src/extractors/flv.js)   | video/x-flv                   |
| **mng**  | [png](src/extractors/png.js)   | video/x-mng                   |
| **mp4**  | [mp4](src/extractors/mp4.js)   | video/mp4                     |
| **m4v**  | [mp4](src/extractors/mp4.js)   | video/x-m4v                   |
| **mov**  | [mp4](src/extractors/mp4.js)   | video/quicktime               |
| **ogv**  | [ogv](src/extractors/ogv.js)   | video/ogg                     |
| **mkv**  | [webm](src/extractors/webm.js) | video/x-matroska              |
| **webm** | [webm](src/extractors/webm.js) | video/webm                    |
| **wmv**  | [wmv](src/extractors/wmv.js)   | video/x-ms-wmv                |

# Changelog

[View releases.](https://github.com/SidOfc/leather/releases)

# Credits and other resources that saved my soul

- https://www.npmjs.com/package/image-size
- http://www.fastgraph.com/help/avi_header_format.html
- http://www.fastgraph.com/help/flic_header_format.html
- https://docs.microsoft.com/en-us/previous-versions/ms779632(v=vs.85)
- https://en.wikipedia.org/wiki/List_of_file_signatures
- https://www.fileformat.info/format/tiff/egff.htm#TIFF.FO
- http://netpbm.sourceforge.net/doc/#formats
- https://www.garykessler.net/library/file_sigs.html
- https://github.com/sannies/mp4parser/blob/c869d076e9cd42aba5a3e35d88827610dec6ca15/examples/src/main/java/com/google/code/mp4parser/example/GetHeight.java
- https://developer.apple.com/library/archive/documentation/QuickTime/QTFF/QTFFChap1/qtff1.html
