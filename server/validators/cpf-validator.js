var geradorValidatorCPF = require('gerador-validador-cpf');

module.exports = function () {
    
    var validator = {};

    validator.validate = function(CPF) {
                    
       return geradorValidatorCPF.validate(CPF);            
    }

    return validator;
}();