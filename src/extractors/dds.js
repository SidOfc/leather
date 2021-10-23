import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const height = stream.skip(12).takeUInt32LE();
    const width = stream.takeUInt32LE();
    const result = {...stream.attrs(), width, height};

    stream.close();

    return result;
}
