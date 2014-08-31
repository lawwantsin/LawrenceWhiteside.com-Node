// Setup mongoose.
var mongoose = require('mongoose')
, mongules = require('mongules');

// Custom currency validator
mongules.extend('isCurrency', function(str) {
  var a = RegExp.new("^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$");
  return a.test(str);;
});

// Payment schema.  Not working in Message schema for some reason.
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
        rule: 'isCurrency',
        msg: 'Not a valid amount'
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


// Rules for storing a message in the MongoDB
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
  payment : {},
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

// Instantiate the validation plugin.
messageSchema.plugin(mongules.validate);

// Set the model
Message = mongoose.model('Message', messageSchema)

// Stripe config. TODO: change private keys and move to ENV vars for security sake.  (Since this will be open sourced).
var privateKey = {
  test : "JEh4yaQUyeFhG7mq45R5OG6lCTys0uZo",
  live : "evqlV7tfmmOxptGjTEKgxoHF6hVY0wPQ"
}
var env = 'test';

// Setup stripe for credit card transactions
var stripe = require("stripe")(privateKey[env]);

/*  
  Pre save hook for the message model.  
  If there's a payment in the params, process the payment with stripe first
*/
messageSchema.pre('save', function(next) {
  
  var msg = this;
  msg.createdOn = new Date();
  if (msg.payment) {
    stripe.charges.create({
      amount: parseInt(msg.payment.amount*100),  // param is in dollars, stripe needs amount in cents.
      currency: "usd",
      card: msg.payment.card,
      receipt_email: msg.email,
      description: (msg.name+": "+msg.message),
      metadata: {
        email: msg.email,
        name: msg.name
      }
    }, function(res) {
      console.log(res);  // Error
    });
  }  
  next();
});
