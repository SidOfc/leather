import {lazystream} from '../util';

export function attributes(input) {
    const stream = lazystream(input);
    const height = stream.skip(14).takeUInt32BE();
    const width = stream.takeUInt32BE();
    const result = {...stream.attrs(), width, height};

    stream.close();

    return result;
}
