// Route for express/connect for home page of site.
exports.index = function(req, res){

  res.render('portfolios/index', {
    title: 'Lawrence Whiteside - Filmmaker/Web Architect'
  });

};


