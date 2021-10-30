import {lazystream} from '../util';

const TYPE_SIZES = {
    ICON: 32,
    'ICN#': 32,
    'icm#': 16,
    icm4: 16,
    icm8: 16,
    'ics#': 16,
    ics4: 16,
    ics8: 16,
    is32: 16,
    s8mk: 16,
    icp4: 16,
    icl4: 32,
    icl8: 32,
    il32: 32,
    l8mk: 32,
    icp5: 32,
    ic11: 32,
    ich4: 48,
    ich8: 48,
    ih32: 48,
    h8mk: 48,
    icp6: 64,
    ic12: 32,
    it32: 128,
    t8mk: 128,
    ic07: 128,
    ic08: 256,
    ic13: 256,
    ic09: 512,
    ic14: 512,
    ic10: 1024,
};

export function attributes(input) {
    const stream = lazystream(input);
    const type = stream.skip(8).take(4).toString('ascii');
    const size = TYPE_SIZES[type] || 0;
    const result = {
        width: size,
        height: size,
        size: stream.size(),
        mime: 'image/x-icns',
    };

    stream.close();

    return result;
}
