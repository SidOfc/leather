import {attributes} from '../lib/index.js';

test('ico', () => {
    expect(attributes('test/files/example.ico')).toEqual({
        width: 1,
        height: 2,
        size: 86,
    });
});
