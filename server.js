var http = require('http');
 
module.exports = http.createServer(function(req, res){
  console.log('%s %s', req.method, req.url);
  var body = `Hello World df afasdf asdf asdf ads fdafadff  
  asdf asdf sadfas
  asdfa sdfasdasdf
  asdf asdfads
  asdf asddsaf
  sdaf asas
  asdf asd`+new Date();
  res.writeHead(200, { 'Content-Length': body.length });
  res.end(body);
});