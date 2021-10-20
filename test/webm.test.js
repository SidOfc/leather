import {attributes} from '../lib/index.js';

test('webm', () => {
    expect(attributes('test/files/example.webm')).toEqual({
        width: 2,
        height: 4,
        size: 765,
    });
});
