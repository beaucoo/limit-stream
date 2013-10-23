require('should'); // 'should.js' https://github.com/visionmedia/should.js
var es = require('event-stream');
var _ = require('lodash');
var limitStream = require('../index');


describe('Limit Stream should emit', function () {
    "use strict";


//    before(function (done) {
//        done();
//    });
//    after(function (done) {
//        done();
//    });


    function getItems(count) {
        return _.range(1, count + 1);
    }


    it('fewer than the limit when input is less', function (done) {
        var limit = 5;
        var input = limit - 2;
        var ls = limitStream(limit);
        es.readArray(getItems(input)).pipe(ls).pipe(es.writeArray(function(err, outArray) {
            (!err).should.be.true;
            outArray.should.eql(getItems(input));
            ls.count.should.equal(outArray.length);
            ls.lastItem.should.eql(_.last(outArray));
            done();
        }));
    });


    it('same as the limit when input is the same', function (done) {
        var limit = 5;
        var input = limit;
        var ls = limitStream(limit);
        es.readArray(getItems(input)).pipe(ls).pipe(es.writeArray(function(err, outArray) {
            (!err).should.be.true;
            outArray.should.eql(getItems(limit));
            ls.count.should.equal(outArray.length);
            ls.lastItem.should.eql(_.last(outArray));
            done();
        }));
    });


    it('same as the limit when input is more', function (done) {
        var limit = 5;
        var input = limit + 2;
        var ls = limitStream(limit);
        es.readArray(getItems(input)).pipe(ls).pipe(es.writeArray(function(err, outArray) {
            (!err).should.be.true;
            outArray.should.eql(getItems(limit));
            ls.count.should.equal(outArray.length);
            ls.lastItem.should.eql(_.last(outArray));
            done();
        }));
    });
});