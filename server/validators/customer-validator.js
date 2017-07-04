var validatorCPF = require('gerador-validador-cpf');

module.exports = function () {
    
    var validator = {};

    validator.validate = function(objCustomer) {
        
        var validationMessages = [];        
        var requiredFields = [ "cpf", "name", "maritalStatus", "email", "address", "phones" ];

        for(var i=0; i< requiredFields.length; i++){
            
            var propertyName = requiredFields[i];
            
            if(!objCustomer[propertyName])
            {
                validationMessages.push("O campo '"+ propertyName +"' é de preenchimento obrigatório.");
            }
        }

        if(objCustomer.cpf && !validatorCPF.validate(objCustomer.cpf)) {
            validationMessages.push("O CPF informado possui valor inválido!");
        }

        if(objCustomer.phones && objCustomer.phones.length === 0) {
            validationMessages.push("É necessário que seja informado no mínimo um contato de telefone (campo 'phones')");
        }
        
        return validationMessages;
    }

    return validator;
};