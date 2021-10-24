import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const width = stream.skip(8).takeUInt16LE();
    const height = stream.takeUInt16LE();

    stream.close();

    return {...stream.attrs(), width, height};
}
