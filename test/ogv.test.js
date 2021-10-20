import {attributes} from '../lib/index.js';

test('ogv', () => {
    expect(attributes('test/files/example.ogv')).toEqual({
        width: 2,
        height: 4,
        size: 3573,
    });
});
