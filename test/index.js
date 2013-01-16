require('should'); // 'should.js' https://github.com/visionmedia/should.js
var limitStream = require('../index');
var ArrayStream = require('arraystream');


describe('Limit Stream', function () {
    "use strict";


//    before(function (done) {
//        done();
//    });
//    after(function (done) {
//        done();
//    });

//
    function getDataStream(count) {
        var a = [];
        for (var i = 1; i < count + 1; i++) {
            a.push({key:i});
        }

        return ArrayStream.create(a);
    }


    describe('when input is less than the limit', function() {
        var limit = 2;
        var input = limit - 1;

        it('data items should be emitted', function (done) {
            var count = 0;

            var ls = limitStream(limit);
            ls.on('data', function (data) {
                data.key.should.eql(++count);
            });
            ls.on('end', function () {
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('count should not be limited', function (done) {
            var count = 0;

            var ls = limitStream(limit);
            ls.on('data', function (data) {
                ++count;
            });
            ls.on('end', function () {
                ls.count.should.equal(input);
                count.should.equal(input);
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('there should not be more', function (done) {
            var ls = limitStream(limit);
            ls.on('end', function () {
                ls.areMore.should.be.false;
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('the last item should be correct', function (done) {
            var ls = limitStream(limit);
            ls.on('end', function () {
                ls.lastItem.should.eql({key:input});
                done();
            });
            getDataStream(input).pipe(ls);
        });
    });


    describe('when input is equal the limit', function() {
        var limit = 2;
        var input = limit;

        it('data items should be emitted', function (done) {
            var count = 0;

            var ls = limitStream(limit);
            ls.on('data', function (data) {
                data.key.should.eql(++count);
            });
            ls.on('end', function () {
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('count should be limited', function (done) {
            var count = 0;

            var ls = limitStream(limit);
            ls.on('data', function (data) {
                ++count;
            });
            ls.on('end', function () {
                ls.count.should.equal(limit);
                count.should.equal(limit);
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('there should not be more', function (done) {
            var ls = limitStream(limit);
            ls.on('end', function () {
                ls.areMore.should.be.false;
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('the last item should be correct', function (done) {
            var ls = limitStream(limit);
            ls.on('end', function () {
                ls.lastItem.should.eql({key:limit});
                done();
            });
            getDataStream(input).pipe(ls);
        });
    });


    describe('when input is greater than the limit', function() {
        var limit = 2;
        var input = limit + 1;

        it('data items should be emitted', function (done) {
            var count = 0;

            var ls = limitStream(limit);
            ls.on('data', function (data) {
                data.key.should.eql(++count);
            });
            ls.on('end', function () {
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('count should be limited', function (done) {
            var count = 0;

            var ls = limitStream(limit);
            ls.on('data', function (data) {
                ++count;
            });
            ls.on('end', function () {
                ls.count.should.equal(limit);
                count.should.equal(limit);
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('there should not be more', function (done) {
            var ls = limitStream(limit);
            ls.on('end', function () {
                ls.areMore.should.be.true;
                done();
            });
            getDataStream(input).pipe(ls);
        });


        it('the last item should be correct', function (done) {
            var ls = limitStream(limit);
            ls.on('end', function () {
                ls.lastItem.should.eql({key:limit});
                done();
            });
            getDataStream(input).pipe(ls);
        });
    });
});