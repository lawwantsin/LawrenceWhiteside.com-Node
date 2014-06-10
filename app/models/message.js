var mongoose = require('mongoose')
, mongules = require('mongules');

var messageSchema = mongoose.Schema({
  message : {
    type : String,
    // Validation Rules
    mongules : [
      {
        rule : 'isAlphanumeric',
        msg : "This message doesn't look right"
      },
    ]
  },
  name : {
    type: String,
    mongules : [
      {
        rule : 'isAlphanumeric',
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

