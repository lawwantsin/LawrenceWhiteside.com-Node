module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/old', home.index);

  var supplemental = require('../app/controllers/supplemental');
  app.get('/about-me', supplemental.about);
  app.get('/questions', supplemental.faq);
  app.get('/client-testimonials', supplemental.clients);

  var portfolios = require('../app/controllers/portfolios');
  var actions = require('../app/controllers/actions');
  
  app.get('/', portfolios.index);
  app.post('/contact', actions.contact);
  app.post('/payment', actions.payment);
};
