var express = require('express')
    , http = require('http');

var app = express();

var port = process.env.PORT || 3616;
var host = process.env.HOST || "0.0.0.0";

var server = http.createServer(app).listen(port, host, function() {
    console.log("Server listening to %s:%d within %s environment",
        host, port, app.get('env'));
});

app.use(express.static(__dirname+'/'));

console.log("Start use..............");