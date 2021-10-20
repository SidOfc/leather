import {attributes} from '../lib/index.js';

test('gif', () => {
    expect(attributes('test/files/example.gif')).toEqual({
        width: 1,
        height: 2,
        size: 56,
    });
});
