import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const result = {...stream.attrs(), width: 0, height: 0};
    const startIndex = stream.indexOf(Buffer.from('IHDR'));

    if (startIndex !== -1) {
        result.width = stream.goto(startIndex).skip(4).takeUInt32BE();
        result.height = stream.takeUInt32BE();
    }

    stream.close();

    return result;
}
