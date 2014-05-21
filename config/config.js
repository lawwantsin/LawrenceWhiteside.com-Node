var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'csf-me'
    },
    port: 3000,
    db: 'mongodb://localhost/csf-me-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'csf-me'
    },
    port: 3000,
    db: 'mongodb://localhost/csf-me-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'csf-me'
    },
    port: 3000,
    db: 'mongodb://localhost/csf-me-production'
  }
};

module.exports = config[env];

var sendgrid  = require('sendgrid')(
  process.env.SENDGRID_USERNAME,
  process.env.SENDGRID_PASSWORD
);
