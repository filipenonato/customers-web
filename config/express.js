var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var helmet = require('helmet');

module.exports = function() {

  //Instancia express
  var app = express();
  
  //Porta onde roda o express
  app.set('port', 3000);
  
  //Midleware para servir arquivos estáticos
  app.use(express.static('./client'));
  
  //Middleware que realiza o parser da body da requisição
  //Extended  usado para indicar que utiliza a bibliotec QS para parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  //Habilita o tratamento de requisições que possuem o verbo DELETE e PUT, para browsers
  //não têm este suporte
  app.use(require('method-override')());

  app.use(cookieParser());
   
  /*
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  */

  //Disabilita informação da tecnologia presente no servidor
  app.disable('x-powered-by');

  //carrega os controllers(endpoints) da aplicação
  load('models', {cwd: 'server'})
    .then('controllers')    
    .then('routes')
    .into(app);

  app.get('*', function(req, res) {    
     res.status(404).json({ message: 'Ação não permitida' });   
  });
    
  return app;
};