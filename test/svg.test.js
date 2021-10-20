import {attributes} from '../lib/index.js';

test('svg', () => {
    expect(attributes('test/files/example.svg')).toEqual({
        width: 1,
        height: 2,
        size: 377,
    });
});
