var http = require('http');
var app  = require('./config/express')();
require('./config/database.js')('mongodb://localhost/customers-web');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Aplicação rodando na porta => ' + app.get('port'));
});

module.exports = app;