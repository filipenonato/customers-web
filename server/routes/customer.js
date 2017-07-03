module.exports = function (app) {
	
  var controller = app.controllers.customer;

  app.route('/api/v1/customer')
  	 .get(controller.listAll)
  	 .post(controller.create);

  app.route('/api/v1/customer/:cpf')
     .get(controller.retrieve)
     .delete(controller.delete)
     .put(controller.update)
     .patch(controller.update);
};