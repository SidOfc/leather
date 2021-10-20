import {attributes} from '../lib/index.js';

test('dds', () => {
    expect(attributes('test/files/example.dds')).toEqual({
        width: 1,
        height: 2,
        size: 134,
    });
});
