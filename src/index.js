import {lazystream} from './util.js';
import {attributes as jpg} from './extractors/jpg.js';
import {attributes as png} from './extractors/png.js';
import {attributes as gif} from './extractors/gif.js';
import {attributes as bmp} from './extractors/bmp.js';
import {attributes as ico} from './extractors/ico.js';
import {attributes as dds} from './extractors/dds.js';
import {attributes as psd} from './extractors/psd.js';
import {attributes as svg} from './extractors/svg.js';
import {attributes as avi} from './extractors/avi.js';
import {attributes as ogv} from './extractors/ogv.js';
import {attributes as mp4} from './extractors/mp4.js';
import {attributes as webm} from './extractors/webm.js';

// dimension to byte mapping to make it easier
// to identify byte offsets of hexdump output
// because spec documentation is simply too
// exhausting to go through for a lazy
// developer like myself.
//
// [   2]x[    4] [00 e2]x[00 04]
// [1000]x[ 2000] [03 e8]x[07 d0]
// [6000]x[12000] [17 70]x[2e e0]

// extractor mapping table based on `lazystream(file).identifier()`
const extractors = {
    bmp,
    jpg,
    dds,
    png,
    gif,
    psd,
    ico,
    cur: ico,
    svg,
    avi,
    ogv,
    mp4,
    webm,
    mkv: webm,
};

export function attributes(file) {
    const stream = lazystream(file);
    const result = {width: 0, height: 0, size: 0};
    const extract = extractors[stream.identifier()];

    if (extract) Object.assign(result, extract(stream));

    stream.close();

    return result;
}
