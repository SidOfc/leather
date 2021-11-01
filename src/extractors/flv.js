import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime: 'video/x-flv',
    };

    const onMetaData = stream.goto(27).take(10).toString();

    if (onMetaData === 'onMetaData') {
        result.width = stream.skip(32).takeDoubleBE();
        result.height = stream.skip(9).takeDoubleBE();
    }

    stream.close();

    return result;
}
