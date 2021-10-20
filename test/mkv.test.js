import {attributes} from '../lib/index.js';

test('mkv', () => {
    expect(attributes('test/files/example.mkv')).toEqual({
        width: 2,
        height: 4,
        size: 1656,
    });
});
