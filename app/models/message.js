var mongoose = require('mongoose')
, mongules = require('mongules');

var paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    mongules : [
      {
        rule: 'isNumber',
        msg: 'Not a number'
      }
    ]
  },
  currency: {
    type: String,
    mongules : [ 
      {
        rule: 'isCreditCard',
        msg: 'This is a strange currency'
      }
    ]
  },
  card: {
    type: String,
    mongules : [
      {
        rule: 'isCreditCard',
        msg: 'Invalid card number'
      }
    ]
  },
  last4: {
    type: String,
    mongules : [
      {
        rule: 'isNumber',
        msg: 'Not a number'
      }
    ]
  }
});

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
  },
  payment : {
    type: [paymentSchema]
  },
  createdOn : {
    type: Date,
    mongules : [
      {
        rule: 'isDate',
        msg: 'Not a date'
      }
    ]
  }
});

messageSchema.plugin(mongules.validate);

Message = mongoose.model('Message', messageSchema)

messageSchema.pre('save', function(next) {
  
  stripe.charges.create({
    amount: parseInt(pay.amount*100),
    currency: "usd",
    card: pay.card
  }, function(res) {
    console.log(res);
  });
  
  next();
});
