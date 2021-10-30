import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const height = stream.skip(48).takeUInt32BE();
    const width = stream.takeUInt32BE();
    const result = {width, height, size: stream.size(), mime: mime(stream)};

    stream.close();

    return result;
}

function mime(stream) {
    return stream.file().endsWith('j2c')
        ? 'image/x-jp2-codestream'
        : 'image/jp2';
}
