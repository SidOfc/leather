import {attributes} from '../lib/index.js';

test('jpg', () => {
    expect(attributes('test/files/example.jpg')).toEqual({
        width: 1,
        height: 2,
        size: 1229,
    });
});
