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
