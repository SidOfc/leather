import {lazystream} from './util.js';
import {attributes as bmp} from './extractors/bmp.js';
import {attributes as dds} from './extractors/dds.js';
import {attributes as gif} from './extractors/gif.js';
import {attributes as icns} from './extractors/icns.js';
import {attributes as ico} from './extractors/ico.js';
import {attributes as j2c} from './extractors/j2c.js';
import {attributes as jpg} from './extractors/jpg.js';
import {attributes as ktx} from './extractors/ktx.js';
import {attributes as png} from './extractors/png.js';
import {attributes as pnm} from './extractors/pnm.js';
import {attributes as psd} from './extractors/psd.js';
import {attributes as svg} from './extractors/svg.js';
import {attributes as tiff} from './extractors/tiff.js';
import {attributes as webp} from './extractors/webp.js';
import {attributes as xpm} from './extractors/xpm.js';
import {attributes as xbm} from './extractors/xbm.js';
import {attributes as fit} from './extractors/fit.js';
import {attributes as cel} from './extractors/cel.js';
import {attributes as hdr} from './extractors/hdr.js';
import {attributes as avi} from './extractors/avi.js';
import {attributes as fli} from './extractors/fli.js';
import {attributes as flv} from './extractors/flv.js';
import {attributes as ogv} from './extractors/ogv.js';
import {attributes as mp4} from './extractors/mp4.js';
import {attributes as webm} from './extractors/webm.js';
import {attributes as wmv} from './extractors/wmv.js';

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
    xpm,
    xbm,
    cel,
    hdr,
    fit,
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
