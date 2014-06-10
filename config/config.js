var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'lawrencewhiteside'
    },
    port: 3000,
    db: 'mongodb://localhost/lawrencewhiteside-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'lawrencewhiteside'
    },
    port: 3000,
    db: 'mongodb://localhost/lawrencewhiteside-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'lawrencewhiteside'
    },
    db: process.env.MONGOHQ_URL,
    port : process.env.PORT
  },
};

module.exports = config[env];

sendgrid  = require('sendgrid')(
  process.env.SENDGRID_USERNAME,
  process.env.SENDGRID_PASSWORD
);
