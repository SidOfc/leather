import {lazystream} from '../util.js';

const mimeIds = {
    '667479706d703432': 'video/x-m4v',
    '667479704d345620': 'video/x-m4v',
    6674797071742020: 'video/quicktime',
};

export function attributes(input) {
    const stream = lazystream(input);
    const startIndex = stream.indexOf(Buffer.from('tkhd'));
    const mimeId = stream.skip(4).take(8).toString('hex');
    const mime = mimeIds[mimeId] || 'video/mp4';

    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime,
    };

    if (startIndex !== -1) {
        result.width = stream.goto(startIndex).skip(78).takeUInt32BE();
        result.height = stream.takeUInt32BE();
    }

    stream.close();

    return result;
}
