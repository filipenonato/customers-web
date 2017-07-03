
var sanitize = require('mongo-sanitize');
module.exports = function(app) {
	
  var Customer = app.models.customer;

  var controller = {};
    
  controller.create = function(req, res) {
        
     var data = {       
      "cpf" : req.body.cpf,
      "name" : req.body.name, 
      "email" : req.body.email, 
      "address" : req.body.address,
      "phone": req.body.phone
    };

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

  controller.update = function(req, res) {
    
    var _id = sanitize(req.params.id);

    var data = {       
      "cpf" : req.body.cpf,
      "name" : req.body.name, 
      "email" : req.body.email, 
      "address" : req.body.address,
      "phone": req.body.phone
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

  return controller;
}