
var sanitize = require('mongo-sanitize');
var cpfValidator = require('../validators/cpf-validator.js');

module.exports = function(app) {
	
  var Customer = app.models.customer;

  var controller = {};
    
  controller.create = function(req, res) {
        
     var data = {       
      "cpf" : req.body.cpf,
      "name" : req.body.name, 
      "email" : req.body.email, 
      "address" : req.body.address,
      "phones": req.body.phone
    };

    if (!data.cpf || !cpfValidator.validate(data.cpf)) {
      res.status(500).json({ message: 'O CPF informado possui valor inválido!' });
    } else {
            
        var customer = await Customer.find({ cpf: data.createCPF}).exec();
        
        Customer.find({ cpf: data.createCPF}).exec()
        .then(
          function(customer) {
            
            if(!customer) {
              
              Customer.create(data)
              .then(
                function(customer) {
                  res.status(201).json(customer);
                }, 
                function(error) {
                  console.log(error);
                  res.status(500).json(error);
                }
              );

            }
            else {
              res.status(500).json({ message: 'Não foi possível gravar os dados do novo cliente. O CPF informado já pertece a um cliente cadastrado no sistema.' });
            }
          },
          function(error) {
            console.error(error) ;
            res.status(500).json({ message: 'Erro interno! Falha ao processar criação do novo cliente!!!!' });   
          } 
        );                
    }
    
  };

  controller.update = function(req, res) {
    
    var _id = sanitize(req.params.id);

    var data = {             
      "name" : req.body.name, 
      "email" : req.body.email, 
      "address" : req.body.address,
      "phones": req.body.phone
    };

    Customer.findByIdAndUpdate(_id, data).exec()
     .then(
      function(customer) {
        res.json(customer);
      }, 
      function(error) {
        console.error(error)
        res.status(500).json(error);
      }
     );

  };

  controller.retrieve = function(req, res) {

    var _id = sanitize(req.params.id);
    
    Customer.findById(_id).exec()
    .then(
      function(customer) {
         res.json(customer); 
       },
       function(error) {
         console.error(error)
         res.status(500).json(error);
       } 
    ); 
  };
  
  controller.delete = function(req, res) { 
    
    var _id = sanitize(req.params.id);

    Customer.remove({"_id" : _id}).exec()
    .then(
      function() {
        res.end();  
      }, 
      function(error) {
        return console.error(error);
      }
    );
  };

  controller.search = function(req, res) {
    Customer.find().populate('_id').exec()
    .then(
      function(customer) {
         res.json(customer); 
       },
       function(error) {
         console.error(error)
         res.status(500).json(error);
       } 
    );  
  };
  
  function validateRequiredFields(data){

        
  }
        
  return controller;
}