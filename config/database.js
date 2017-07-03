var mongoose = require('mongoose');

module.exports = function(uri) {
	
	mongoose.connect(uri);
	
	mongoose.connection.on('disconnected', function() {
	  console.log('Desconectado (Mongoose) => ' + uri);
	});

	mongoose.connection.on('error', function(error) {
	  console.log('Erro na conexão (Mongoose)=> ' + error);
	});

    mongoose.connection.on('connected', function() {
	  console.log('Conectado (Mongoose) =>  ' + uri);
	});

	process.on('SIGINT', function() {
  	  mongoose.connection.close(function() {
        console.log('Desconexão (Mongoose)...Fechamento da aplicação');
        process.exit(0);
      });
    });
}