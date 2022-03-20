import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'text/x-mpsub',
    };

    while (stream.more()) {
        const line = stream.takeLine().toString();

        if (line.match(/[-+][xy]/i)) {
            const parts = line
                .split(' ')
                .map((part) => part.replace(/[^a-z0-9]/gi, '').toUpperCase());

            if (parts[0] === 'Y') {
                result.width = parseInt(parts[3], 10);
                result.height = parseInt(parts[1], 10);
            } else {
                result.width = parseInt(parts[1], 10);
                result.height = parseInt(parts[3], 10);
            }
            break;
        }
    }

    stream.close();

    return result;
}
