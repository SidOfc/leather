import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'image/vnd.radiance',
    };

    for (const chunk of stream.overlappingChunks(64)) {
        const content = chunk.buffer.toString();
        const matches = content.match(/[-+][xy]\s+\d+\s/gi);

        if (matches?.length === 2) {
            for (const match of matches) {
                const cleanMatch = match.toLowerCase().trim().slice(1);
                const [axis, stringSize] = cleanMatch.split(/\s+/i);

                if (axis === 'x') result.width = parseInt(stringSize);
                if (axis === 'y') result.height = parseInt(stringSize);
            }

            break;
        }
    }

    stream.close();

    return result;
}
