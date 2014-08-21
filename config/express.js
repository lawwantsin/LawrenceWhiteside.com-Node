var express = require('express');
var gzip = require('connect-gzip');

module.exports = function(app, config) {
  app.configure(function () {
    app.use(require('connect-assets')());
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.favicon(config.root + '/public/images/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(gzip.gzip({ matchType: /css/, flags: '--best' }));
    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};
