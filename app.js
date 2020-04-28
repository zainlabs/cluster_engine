var http = require('http'),
  httpProxy = require('http-proxy');
var addresses = [{
    host: "localhost",
    port: 8181
  },
  {
    host: "localhost",
    port: 8383
  }
];
var proxyServers = addresses.map(function (target) {
  return new httpProxy.createProxyServer({
    target: target
  })
});
function a(req, res) {
  var proxy = proxyServers.shift();
  proxy.web(req, res, function (e) {
    //console.log(e.message);
    a(req, res)
  });
  proxyServers.push(proxy);
}
var server = http.createServer(function (req, res) {
  a(req, res)
});
server.listen(8877);