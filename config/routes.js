module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/old', home.index);

  var web = require('../app/controllers/web');
  app.get('/', web.index);


};
