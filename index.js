var through = require('through');

module.exports = function limitStream(limit) {
    "use strict";

    var stream = through(write);
    stream.count = 0;
    stream.lastItem = {};

    function write(data) {
        stream.count++;
        stream.lastItem = data;
        stream.queue(data);
        if (limit <= stream.count) {
            stream.end();
        }
    }

    return stream;
};