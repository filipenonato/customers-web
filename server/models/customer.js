var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({    
    cpf: {
      type: String, 
      required: true, 
      index: {
        unique: true
      }
    },
    name: { 
      type: String, 
      required: true
    }, 
    email: {
      type: String, 
      required: true, 
      index: {
        unique: true
      }
    },     
    address:{
      type: String, 
      required: true,       
    },
    phone:{
      type: String, 
      required: true,       
    }
  });

  return mongoose.model('Customer', schema);
};