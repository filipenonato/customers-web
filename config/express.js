var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {

  var app = express();
  
  app.set('port', 3000);
  
  //TODO: será usado no futuro para prover as páginas estáticas para criação do frontend da aplicação
  app.use(express.static('./client'));
    
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
    
  app.use(require('method-override')());

  app.disable('x-powered-by');

  load('models', {cwd: 'server'})
    .then('controllers')    
    .then('routes')    
    .into(app);

  app.get('*', function(req, res) {    
     res.status(404).json({ message: 'Ação não permitida!!' });   
  });

  app.post('*', function(req, res) {    
     res.status(404).json({ message: 'Ação não permitida!!' });   
  });

  app.delete('*', function(req, res) {    
     res.status(404).json({ message: 'Ação não permitida!!' });   
  });

  app.put('*', function(req, res) {    
     res.status(404).json({ message: 'Ação não permitida!!' });   
  });

  app.patch('*', function(req, res) {    
     res.status(404).json({ message: 'Ação não permitida!!' });   
  });
    
  return app;
};