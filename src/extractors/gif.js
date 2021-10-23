import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(6).takeUInt16LE();
    const height = stream.takeUInt16LE();
    const result = {...stream.attrs(), width, height};

    stream.close();

    return result;
}
