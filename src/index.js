import {lazystream} from './util';
import {attributes as bmp} from './extractors/bmp';
import {attributes as dds} from './extractors/dds';
import {attributes as gif} from './extractors/gif';
import {attributes as icns} from './extractors/icns';
import {attributes as ico} from './extractors/ico';
import {attributes as j2c} from './extractors/j2c';
import {attributes as jpg} from './extractors/jpg';
import {attributes as ktx} from './extractors/ktx';
import {attributes as png} from './extractors/png';
import {attributes as pnm} from './extractors/pnm';
import {attributes as psd} from './extractors/psd';
import {attributes as svg} from './extractors/svg';
import {attributes as tiff} from './extractors/tiff';
import {attributes as webp} from './extractors/webp';
import {attributes as avi} from './extractors/avi';
import {attributes as fli} from './extractors/fli';
import {attributes as flv} from './extractors/flv';
import {attributes as ogv} from './extractors/ogv';
import {attributes as mp4} from './extractors/mp4';
import {attributes as webm} from './extractors/webm';
import {attributes as wmv} from './extractors/wmv';

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
    dds,
    gif,
    icns,
    ico, // also used for: cur
    j2c, // also used for: jp2
    jpg,
    ktx,
    png,
    pnm,
    psd,
    svg,
    tiff,
    webp,
    avi,
    fli, // also used for: flc
    flv,
    ogv,
    mp4,
    webm, // also used for: mkv
    wmv,
};

export function attributes(file) {
    const stream = lazystream(file);
    const result = {width: 0, height: 0, size: 0, mime: undefined};
    const extract = extractors[stream.identifier()];

    if (extract) Object.assign(result, extract(stream));

    stream.close();

    return result;
}
