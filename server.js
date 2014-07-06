var express = require('express');
var app = express();

app.use(express.static(__dirname + '/result'));
app.listen(process.env.PORT || 3080);
module.exports = app;

