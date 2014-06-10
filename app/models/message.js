var mongoose = require('mongoose')
, mongules = require('mongules');

var messageSchema = mongoose.Schema({
  message : {
    type : String,
    // Validation Rules
    mongules : [
      {
        rule : 'isLength',
        args : 10,
        msg : "Tell me a little more."
      },
    ]
  },
  name : {
    type: String,
    mongules : [
      {
        rule : 'isLength',
        args : 2,
        msg : "This name doesn't look right"
      },
    ]
  },
  email : { 
    type: String,
    mongules : [
      {
        rule : 'isEmail',
        msg : "Is this an E-Mail Address?"
      },
    ]
  }
});

messageSchema.plugin(mongules.validate);

Message = mongoose.model('Message', messageSchema)

