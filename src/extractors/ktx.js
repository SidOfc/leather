import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(36).takeUInt32LE();
    const height = stream.takeUInt32LE();

    return {...stream.attrs(), width, height};
}
