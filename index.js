var through = require('through');
module.exports = function limitStream(limit) {
    "use strict";

    var stream = through(write);
    stream.areMore = false;
    stream.count = 0;
    stream.lastItem = {};

    function write(data) {
        stream.areMore = limit < stream.count + 1;
        if (stream.areMore) {
            stream.queue(null);
        } else {
            stream.count++;
            stream.lastItem = data;
            stream.queue(data);
        }
    }

    return stream;
};
