import {lazystream} from './util.js';
import {readMediaAttributes as bmp} from './extractors/bmp.js';
import {readMediaAttributes as dds} from './extractors/dds.js';
import {readMediaAttributes as gif} from './extractors/gif.js';
import {readMediaAttributes as icns} from './extractors/icns.js';
import {readMediaAttributes as ico} from './extractors/ico.js';
import {readMediaAttributes as j2c} from './extractors/j2c.js';
import {readMediaAttributes as jpg} from './extractors/jpg.js';
import {readMediaAttributes as ktx} from './extractors/ktx.js';
import {readMediaAttributes as png} from './extractors/png.js';
import {readMediaAttributes as pnm} from './extractors/pnm.js';
import {readMediaAttributes as psd} from './extractors/psd.js';
import {readMediaAttributes as svg} from './extractors/svg.js';
import {readMediaAttributes as tiff} from './extractors/tiff.js';
import {readMediaAttributes as webp} from './extractors/webp.js';
import {readMediaAttributes as xpm} from './extractors/xpm.js';
import {readMediaAttributes as xbm} from './extractors/xbm.js';
import {readMediaAttributes as fit} from './extractors/fit.js';
import {readMediaAttributes as cel} from './extractors/cel.js';
import {readMediaAttributes as hdr} from './extractors/hdr.js';
import {readMediaAttributes as avi} from './extractors/avi.js';
import {readMediaAttributes as fli} from './extractors/fli.js';
import {readMediaAttributes as flv} from './extractors/flv.js';
import {readMediaAttributes as ogv} from './extractors/ogv.js';
import {readMediaAttributes as mp4} from './extractors/mp4.js';
import {readMediaAttributes as webm} from './extractors/webm.js';
import {readMediaAttributes as wmv} from './extractors/wmv.js';

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
    mp4, // also used for: m4v
    webm, // also used for: mkv
    wmv,
};

export function readMediaAttributes(file) {
    const stream = lazystream(file);
    const result = {width: 0, height: 0, size: 0, mime: undefined};
    const extract = extractors[stream.identifier()];

    if (extract) Object.assign(result, extract(stream));

    stream.close();

    return result;
}
