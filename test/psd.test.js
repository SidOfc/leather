import {attributes} from '../lib/index.js';

test('psd', () => {
    expect(attributes('test/files/example.psd')).toEqual({
        width: 1,
        height: 2,
        size: 954,
    });
});
