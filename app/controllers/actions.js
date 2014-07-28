// Sendgrid email function.  Used to notify me when someone uses the contact form.
var sendLawAnEmail = function(msg) {
  var email = new sendgrid.Email({
    to:       'law@cinemasetfree.com',
    from:     msg.email,
    subject:  ('New Contact from '+msg.name+' on LawrenceWhiteside.com'),
    text:     msg.message
  });
  sendgrid.send(email, function(err, json) {
    if (err) { return console.error(err); }
  });
}

// Contact route for express/connect.
exports.contact = function(req, res) {
  var msg = new Message(req.body);
  console.log(req.body);
  msg.save(function(err, msg) {
    if (err) {
      res.json({error: err});  // Encode error message as JSON and send back.
    }
    else {
      sendLawAnEmail(msg);    // No error?  Great, send the email and return JSON anyway.
      res.json(msg);
    }
  });
}
