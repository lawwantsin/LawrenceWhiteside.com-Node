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
