import {attributes} from '../lib/index.js';

test('png', () => {
    expect(attributes('test/files/example.png')).toEqual({
        width: 1,
        height: 2,
        size: 550,
    });
});
