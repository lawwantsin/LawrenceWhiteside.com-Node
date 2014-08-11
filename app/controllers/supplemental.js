// Routes for supplimental pages of the site.  About, FAQ, Testimonials.
exports.about = function(req, res){
  res.render('supplemental/about', {
    title: 'About Me'
  });
};

exports.faq = function(req, res){
  res.render('supplemental/faq', {
    title: 'Frequently Asked Questions'
  });
};

exports.clients = function(req, res){
  res.render('supplemental/clients', {
    title: 'Client Testimonials'
  });
};

exports.test = function(req, res){
  res.render('supplemental/test', {
    title: 'Test Page'
  });
};
