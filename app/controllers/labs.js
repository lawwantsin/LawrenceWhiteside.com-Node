exports.angular = function(req, res){
  res.render('labs/angular', {
    title: 'Labs: Angular'
  });
};

exports.famous = function(req, res){
  res.render('labs/famous', {
    title: 'Labs: Famous'
  });
};
