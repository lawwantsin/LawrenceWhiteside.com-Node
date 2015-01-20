module.exports = function(app){

  var supplemental = require('../app/controllers/supplemental');
  var labs = require('../app/controllers/labs');
  var portfolios = require('../app/controllers/portfolios');
  var actions = require('../app/controllers/actions');

  app.get('/about-me', supplemental.about);
  app.get('/questions', supplemental.faq);
  app.get('/testimonials', supplemental.clients);

  app.get('/labs/angular', labs.angular);
  app.get('/labs/famous', labs.famous);
  
  app.get('/', portfolios.index);
  app.post('/contact', actions.contact);

};
