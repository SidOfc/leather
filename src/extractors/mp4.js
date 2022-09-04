import {lazystream} from '../util.js';

export function attributes(input) {
    const stream = lazystream(input);
    const startIndex = stream.indexOf(Buffer.from('tkhd'));
    const identifier = stream.skip(4).take(8).toString('hex');
    let mime;
    switch(identifier){
    	case '667479706d703432':
		    mime = 'video/x-m4v';
    	break;
    	case '6674797071742020':
		    mime = 'video/quicktime';
    	break;
    	default:
		    mime = 'video/mp4';
    }
    const result = {
        width: 0,
        height: 0,
        size: stream.size(),
        mime,
    };

    if (startIndex !== -1) {
        result.width = stream.goto(startIndex).skip(78).takeUInt32BE();
        result.height = stream.takeUInt32BE();
    }

    stream.close();

    return result;
}
