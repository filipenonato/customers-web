
var sanitize = require('mongo-sanitize');
var customerValidator = require('../validators/customer-validator.js')();

module.exports = function(app) {
	
  var Customer = app.models.customer;

  var controller = {};
    
  controller.create = function(req, res) {
        
     var data = {       
      "cpf" : req.body.cpf,
      "name" : req.body.name, 
      "maritalStatus": req.body.maritalStatus,
      "email" : req.body.email, 
      "address" : req.body.address,
      "phones": req.body.phones
    };

    var _cpf = sanitize(req.body.cpf);

    Customer.find({ cpf: _cpf}).exec()
    .then(
      function(customer) {
        
        if(!customer || customer.length === 0) {
          
          var resultValidation = customerValidator.validate(data);

          if (resultValidation.length === 0) {
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
            res.status(500).json({ messages:  resultValidation});
          }
        }
        else {
          res.status(500).json({ messages: ['Não foi possível gravar os dados do novo cliente. O CPF informado já pertece a um cliente cadastrado no sistema.'] });
        }
      },
      function(error) {
        console.error(error) ;
        res.status(500).json({ messages: ['Erro interno! Falha ao processar criação do novo cliente!!!!'] });   
      } 
    );                
    
    
  };

  controller.update = function(req, res) {
    
    var _cpf = sanitize(req.params.cpf);
    
    Customer.find({ cpf: _cpf}).exec()
        .then(
          function(result) {
            
            if(result.length > 0) {

              var customerObj = result[0];
              var data = {             
                "cpf" : customerObj.cpf, 
                "name" : req.body.name || customerObj.name, 
                "maritalStatus": req.body.maritalStatus || customerObj.maritalStatus,
                "email" : req.body.email || customerObj.email, 
                "address" : req.body.address || customerObj.address,
                "phones": req.body.phones || customerObj.phones
              };
              
              var resultValidation = customerValidator.validate(data);

              if (resultValidation.length === 0) {
                Customer.update(data)
                .then(
                  function(customer) {
                    res.status(201).json(data);
                  }, 
                  function(error) {
                    console.log(error);
                    res.status(500).json(error);
                  }
                );
              } else {
                res.status(500).json({ messages:  resultValidation});
              }
            }
            else {
              res.status(500).json({ messages: ['Não foi possível atualizar os dados do cliente. Pois o CPF informado não ser refere a nenhum cadastro no sistema.'] });
            }
          },
          function(error) {
            console.error(error) ;
            res.status(500).json({ messages: ['Erro interno! Falha ao processar criação do novo cliente!!!!'] });   
          } 
        );

  };

  controller.retrieve = function(req, res) {

    var _cpf = sanitize(req.params.cpf);
    
    Customer.findOne({cpf: _cpf}).exec()
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
    
    var _cpf = sanitize(req.params.cpf);

    Customer.remove({"cpf" : _cpf}).exec()
    .then(
      function() {
        res.end();  
      }, 
      function(error) {
        return console.error(error);
      }
    );
  };

  controller.listAll = function(req, res) {
    Customer.find().exec()
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
            
  return controller;
}