# node-cluster
Sample app to test all cpu processors uses in node environment

## Installation

```bash
$ npm install 
```

## Features

  - zero-downtime restart
  - hard shutdown support
  - graceful shutdown support
  - workers closed automatically when master dies 
  - spawns one worker per cpu (by default)
  - supports node 4.0.x
  - supports node 6.0.x
  - supports TCP servers

## Example

server.js:

```javascript
var http = require('http');
 
module.exports = http.createServer(function(req, res){
  console.log('%s %s', req.method, req.url);
  var body = `Hello World `+new Date();
  res.writeHead(200, { 'Content-Length': body.length });
  res.end(body);
});
```

index.js:

```javascript
const cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  var server = require("./server");
 server.listen(3000);

  console.log(`Worker ${process.pid} started`);
}
```
## Running Node.js will now share port 8000 between the workers:
```
npm start 
Master 3596 is running
Worker 4324 started
Worker 4520 started
Worker 6056 started
Worker 5644 started

```
