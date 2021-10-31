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

Node version 12.20 and up are supported.

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
const leather = require('leather');
```

Or using ES modules:

```javascript
import leather from 'leather';
```

Then, it can be called on [supported image and video formats](#supported-formats):

```javascript

console.log(leather.attributes('cat.jpg'));

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

const jpg = require('leather/extractors/jpg');

console.log(jpg.attributes('cat.jpg'));

// => {width: 200, height: 200, size: 40000, mime: 'image/jpeg'}
```

Or using ES modules:

```javascript

import jpg from 'leather/extractors/jpg';

console.log(jpg.attributes('cat.jpg'));

// => {width: 200, height: 200, size: 40000, mime: 'image/jpeg'}
```

# Supported formats

All supported image and video formats can be found in the table below:

| identifier | type  | mime type                 |
|:----------:|:-----:|:--------------------------|
|    bmp     | image | image/bmp                 |
|    cur     | image | image/x-icon              |
|    dds     | image | image/vnd.ms-dds          |
|    gif     | image | image/gif                 |
|    icns    | image | image/x-icns              |
|    ico     | image | image/x-icon              |
|    j2c     | image | image/x-jp2-codestream    |
|    jp2     | image | image/jp2                 |
|    jpg     | image | image/jpeg                |
|    ktx     | image | image/ktx                 |
|    png     | image | image/png                 |
|    pnm     | image | image/x-portable-bitmap   |
|    psd     | image | image/vnd.adobe.photoshop |
|    svg     | image | image/svg+xml             |
|    tiff    | image | image/tiff                |
|    webp    | image | image/webp                |
|    avi     | video | video/x-msvideo           |
|    fli     | video | video/x-flic              |
|    flc     | video | video/x-flic              |
|    mkv     | video | video/x-matroska          |
|    mp4     | video | video/mp4                 |
|    ogv     | video | video/ogg                 |
|    webm    | video | video/webm                |

# Changelog

[View the changelog here.](CHANGELOG.md)

# Credits and other resources that saved my soul

- https://www.npmjs.com/package/image-size
- http://www.fastgraph.com/help/avi_header_format.html
- http://www.fastgraph.com/help/flic_header_format.html
- https://docs.microsoft.com/en-us/previous-versions/ms779632(v=vs.85)
- https://en.wikipedia.org/wiki/List_of_file_signatures
- https://www.fileformat.info/format/tiff/egff.htm#TIFF.FO
- http://netpbm.sourceforge.net/doc/#formats
