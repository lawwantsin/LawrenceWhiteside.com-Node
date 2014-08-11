module.exports = function(app){

  var supplemental = require('../app/controllers/supplemental');
  app.get('/about-me', supplemental.about);
  app.get('/questions', supplemental.faq);
  app.get('/client-testimonials', supplemental.clients);
  app.get('/test', supplemental.test);

  var portfolios = require('../app/controllers/portfolios');
  var actions = require('../app/controllers/actions');
  
  app.get('/', portfolios.index);
  app.post('/contact', actions.contact);

};
