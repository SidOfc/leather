import {attributes} from '../lib/index.js';

test('bmp', () => {
    expect(attributes('test/files/example.bmp')).toEqual({
        width: 1,
        height: 2,
        size: 130,
    });
});
