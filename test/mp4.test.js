import {attributes} from '../lib/index.js';

test('mp4', () => {
    expect(attributes('test/files/example.mp4')).toEqual({
        width: 2,
        height: 4,
        size: 1548,
    });
});
