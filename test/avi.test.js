import {attributes} from '../lib/index.js';

test('avi', () => {
    expect(attributes('test/files/example.avi')).toEqual({
        width: 2,
        height: 4,
        size: 6512,
    });
});
