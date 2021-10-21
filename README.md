# Leather

Have you ever wished for the ability to retrieve image or video file dimensions
in Node without having to resort to external libraries such as `ffprobe`?

Yeah, **me too!** Unfortunately no one has actually written such a package.
At the moment, the only package that does something similar is
[`image-size`](https://www.npmjs.com/package/image-size)
and while it does work well, it does not handle video formats.

Enter `leather`, an attempt to extract dimensions from both image and
video files!

# How

`leather` reads image and video files one byte at a time and as soon
as dimensions have been extracted, the file will be closed. Some file
formats have a well-defined fixed position in which these dimensions
can be found, in those cases, `leather` skips any bytes before that
position and reads the dimensions directly.

# Why

Before `leather`, if you wanted to do something like this in Node
you would need to install `image-size` to handle images and either
use `ffprobe` directly or using some kind of wrapper package to
handle video files.

While I love `ffprobe` for its capabilities, setting up a cross-platform
package requires some configuration. This package aims to solve that
by steering clear of any command-line tools which makes it more portable.

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

// => {width: 200, height: 200, size: 40000}
```

The _width_ and _height_ are _pixel based_. The _size_ is the same as
[`fs.stat`](https://nodejs.org/api/fs.html#fsstatpath-options-callback).
If the width or height could not be extracted, they will default to `0`.

## Using specific extractors

If you are only using one or a few of the extractors, you can opt to
require only the extractors you need, e.g. for jpg/jpeg using commonjs:

```javascript

const jpg = require('leather/extractors/jpg');

console.log(jpg.attributes('cat.jpg'));

// => {width: 200, height: 200, size: 40000}
```

Or using ES modules:

```javascript

import jpg from 'leather/extractors/jpg';

console.log(jpg.attributes('cat.jpg'));

// => {width: 200, height: 200, size: 40000}
```

# Supported formats

| identifier | type  | mime type                 |
|:----------:|:-----:|:--------------------------|
|    jpg     | image | image/jpeg                |
|    png     | image | image/png                 |
|    gif     | image | image/gif                 |
|    bmp     | image | image/bmp                 |
|    dds     | image | image/vnd.ms-dds          |
|    psd     | image | image/vnd.adobe.photoshop |
|    svg     | image | image/svg+xml             |
|    ico     | image | image/x-icon              |
|    cur     | image | image/x-icon              |
|    avi     | video | video/x-msvideo           |
|    ogv     | video | video/ogg                 |
|    mkv     | video | video/x-matroska          |
|    mp4     | video | video/mp4                 |
|    webm    | video | video/webm                |

# Credits

A lot of the image dimension extraction is based on
[`image-size`](https://www.npmjs.com/package/image-size) with a few
alterations in some of the extractors.

