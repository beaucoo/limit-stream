#LimitStream

A stream that truncates to a limit.

Install via <code>npm install limit-stream</code>

<pre>
// Example (see tests for more):
<code>
var limitStream = require('limit-stream');
var s = limitStream(10);
s.on('data', function(item) {
  console.log(item);
});
s.on('end', function() {
  console.log("areMore: %s, count: %d, lastItem: %j", s.areMore, s.count, s.lastItem);
});

// Then with some data stream having 11 items only the first 10 will be logged out.
dataStream.pipe(s);
</code>
</pre>


##Release Notes
v0.0.1 First

##Use Cases
Retrieve more data than desired thus detecting that more exists. Useful to indicate that more pages of data
exist for further requests.

##Running Tests

* Run 'npm test'
* or run `mocha test --require should --reporter spec --recursive`

##License
(The MIT License)

Copyright (c) 2013-20* BeauCoo Technologies Inc. <info@beaucoo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

