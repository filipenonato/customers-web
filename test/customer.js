process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var gerador = require('gerador-validador-cpf');
var cpfTest = gerador.generate('digits');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

var data = {            
            "cpf": "31260821226",
            "name": "Gregório de Matos",
            "maritalStatus": "divorciado",
            "email": "filipe.nonato2@outlook.com",
            "address": "Rua Joaquim de Bica, 65 - Alagoas",            
            "phones": [
                "3322-4381"
            ]
    };    


describe('customers', function() {
       
before(function() {
    chai.request(server);        
});

describe('/POST/customer', function() {
        
    data.cpf = cpfTest;
    data.email = data.cpf + "@test.com.br";
    
    it('Test: Successful customer creation', function(done) {
         
        chai.request(server)
        .post('/api/v1/customer')
        .send(data)
        .end(function(error, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');            
            res.body.should.have.property('_id');
            res.body.should.have.property('cpf');
            res.body.should.have.property('name');
            res.body.should.have.property('maritalStatus');
            res.body.should.have.property('email');
            res.body.should.have.property('address');
            res.body.should.have.property('phones');            
        done();
        }); 
    });

    it('Test: Error on customer creation. CPF Duplicated!', function(done) {
                 
        chai.request(server)
        .post('/api/v1/customer')
        .send(data)
        .end(function(error, res) {
            res.should.have.status(500);
            res.should.be.json;
            res.body.should.be.a('object');            
            var  expected = ['Não foi possível gravar os dados do novo cliente. O CPF informado já pertece a um cliente cadastrado no sistema.'];
            res.body.should.have.property('messages').eql(expected);
        done();
        }); 
    });
});

describe('/PUT/customer:cpf', function(){
	 it('Test: Update a customer of database tracked by CPF', function(done){	  	
        
        var dataUpdate = {};  

        dataUpdate.name = "Arlindo Cruz";
        dataUpdate.email = "arlindo.cruz@samba.com.br";
        dataUpdate.address = "Avenida Raja Gabáglia";
        dataUpdate.maritalStatus = "amasiado";

		chai.request(server)
        .put('/api/v1/customer/' + cpfTest.toString())
        .send(dataUpdate)
        .end(function(error, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');  
            res.body.should.have.property('cpf');
            res.body.should.have.property('name');
            res.body.should.have.property('maritalStatus');
            res.body.should.have.property('email');
            res.body.should.have.property('address');
            res.body.should.have.property('phones');                       
            res.body.should.have.property('name').eql('Arlindo Cruz');
            res.body.should.have.property('email').eql('arlindo.cruz@samba.com.br');
            res.body.should.have.property('address').eql('Avenida Raja Gabáglia');
            res.body.should.have.property('maritalStatus').eql('amasiado');
            done();            
        }); 		      
     });
});

describe('/GET/customer', function() {
    it('Test: Return a list customers of database', function(done) {
        chai.request(server)
        .get('/api/v1/customer')
        .end(function(error, res) {
            
            res.should.have.status(200);   
            res.should.be.json;                     
            res.body.should.be.a('array');            
            done();
        });
    });
});

describe('/GET/customer:cpf', function() {
    it('Test: Return the customer of database tracked by CPF', function(done) {
        chai.request(server)
        .get('/api/v1/customer/'+cpfTest)
        .end(function(error, res) {
            
            res.should.have.status(200);  
            res.should.be.json;
            res.body.should.have.property('cpf').eql(cpfTest);                        
            res.body.should.be.a('object');            
            done();
        });
    });
});

describe('/DELETE/customer:cpf', function(){
	  it('Test: Delete the customer of database tracked by CPF', function(done){
	  	chai.request(server)
        .delete('/api/v1/customer/' + cpfTest)
        .end(function(error, res) {            
            res.should.have.status(200);                          
            done();
        });
	  });
   });   

});