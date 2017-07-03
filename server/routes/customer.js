module.exports = function (app) {
	
  var controller = app.controllers.customer;

  app.route('/v1/customer')
  	 .get(controller.search)
  	 .post(controller.create);

  app.route('/v1/customer/:id')
     .get(controller.retrieve)
     .delete(controller.delete)
     .put(controller.update)
     .patch(controller.update);
};