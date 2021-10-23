import {lazystream} from './util';
import {attributes as jpg} from './extractors/jpg';
import {attributes as j2c} from './extractors/j2c';
import {attributes as jp2} from './extractors/jp2';
import {attributes as png} from './extractors/png';
import {attributes as gif} from './extractors/gif';
import {attributes as bmp} from './extractors/bmp';
import {attributes as ico} from './extractors/ico';
import {attributes as cur} from './extractors/cur';
import {attributes as dds} from './extractors/dds';
import {attributes as psd} from './extractors/psd';
import {attributes as svg} from './extractors/svg';
import {attributes as avi} from './extractors/avi';
import {attributes as ogv} from './extractors/ogv';
import {attributes as mp4} from './extractors/mp4';
import {attributes as mkv} from './extractors/mkv';
import {attributes as webm} from './extractors/webm';

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
    j2c,
    jp2,
    dds,
    png,
    gif,
    psd,
    ico,
    cur,
    svg,
    avi,
    ogv,
    mp4,
    webm,
    mkv,
};

export function attributes(file) {
    const stream = lazystream(file);
    const result = {...stream.attrs(), height: 0, width: 0};
    const extract = extractors[stream.identifier()];

    if (extract) Object.assign(result, extract(stream));

    stream.close();

    return result;
}
